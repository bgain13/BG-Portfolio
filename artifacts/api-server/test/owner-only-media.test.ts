import { once } from 'node:events';
import type { Server } from 'node:http';
import express, { type Request } from 'express';
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { eq } from 'drizzle-orm';
import { PgDialect } from 'drizzle-orm/pg-core';
import { assetsTable } from '@workspace/db/schema';

const mocks = vi.hoisted(() => ({
  db: {
    select: vi.fn(),
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  selectRows: [] as Array<Record<string, unknown>>,
  selectQueries: [] as any[],
  storage: {
    getObjectEntityUploadURL: vi.fn(),
    normalizeObjectEntityPath: vi.fn(),
    searchPublicObject: vi.fn(),
    downloadObject: vi.fn(),
    getObjectEntityFile: vi.fn(),
  },
}));

vi.mock('@workspace/db', async () => {
  const schema = await vi.importActual<typeof import('@workspace/db/schema')>(
    '@workspace/db/schema',
  );
  return { ...schema, db: mocks.db };
});

vi.mock('../src/lib/objectStorage', () => ({
  ObjectNotFoundError: class ObjectNotFoundError extends Error {},
  ObjectStorageService: class {
    constructor() {
      return mocks.storage;
    }
  },
}));

import assetsRouter from '../src/routes/assets';
import storageRouter from '../src/routes/storage';

const app = express();
app.use(express.json());
app.use((req: Request, _res, next) => {
  const email = req.header('x-test-user-email') ?? undefined;
  const authenticatedRequest = req as Request & {
    isAuthenticated: () => boolean;
    user?: { id: string; email: string };
  };
  authenticatedRequest.isAuthenticated = () => Boolean(email);
  if (email) {
    authenticatedRequest.user = { id: 'test-user', email };
  }
  next();
});
app.use('/api', assetsRouter);
app.use('/api', storageRouter);

const dialect = new PgDialect();
let server: Server;
const originalAdminEmails = process.env.ADMIN_EMAILS;

function createSelectQuery() {
  const query = {
    from: vi.fn(() => query),
    where: vi.fn(() => query),
    orderBy: vi.fn(() => query),
    limit: vi.fn(() => query),
    then: (
      resolve: (value: Array<Record<string, unknown>>) => unknown,
      reject: (reason: unknown) => unknown,
    ) => {
      const whereCondition = query.where.mock.calls.at(-1)?.[0];
      const compiled = whereCondition
        ? dialect.sqlToQuery(whereCondition)
        : null;
      const requiresPublishedAsset =
        compiled?.sql.includes('is_published') &&
        compiled.params.includes(true);
      const rows = requiresPublishedAsset
        ? mocks.selectRows.filter((row) => row.isPublished === true)
        : mocks.selectRows;
      return Promise.resolve(rows).then(resolve, reject);
    },
  };
  mocks.selectQueries.push(query);
  return query;
}

beforeAll(async () => {
  server = app.listen(0);
  await once(server, 'listening');
});

beforeEach(() => {
  process.env.ADMIN_EMAILS = ' owner@example.com, second@example.com ';
  mocks.selectRows = [];
  mocks.selectQueries = [];
  vi.clearAllMocks();

  mocks.db.select.mockImplementation(createSelectQuery);
  mocks.db.insert.mockImplementation(() => {
    throw new Error('Unexpected insert in an access-control test');
  });
  mocks.db.update.mockImplementation(() => {
    throw new Error('Unexpected update in an access-control test');
  });
  mocks.db.delete.mockImplementation(() => {
    throw new Error('Unexpected delete in an access-control test');
  });

  mocks.storage.getObjectEntityUploadURL.mockResolvedValue(
    'https://storage.example.test/signed-upload',
  );
  mocks.storage.normalizeObjectEntityPath.mockReturnValue(
    '/objects/uploads/new-file',
  );
  mocks.storage.searchPublicObject.mockResolvedValue(null);
  mocks.storage.downloadObject.mockResolvedValue(
    new Response(null, { status: 200 }),
  );
  mocks.storage.getObjectEntityFile.mockResolvedValue({
    name: 'private-object',
  });
});

afterAll(async () => {
  await new Promise<void>((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
  if (originalAdminEmails === undefined) {
    delete process.env.ADMIN_EMAILS;
  } else {
    process.env.ADMIN_EMAILS = originalAdminEmails;
  }
});

async function request(
  method: string,
  path: string,
  email?: string,
  body?: unknown,
) {
  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('Test server is not listening on a TCP port');
  }

  return fetch(`http://127.0.0.1:${address.port}${path}`, {
    method,
    headers: {
      ...(body === undefined ? {} : { 'content-type': 'application/json' }),
      ...(email === undefined ? {} : { 'x-test-user-email': email }),
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
}

const adminApiOperations = [
  ['GET', '/api/admin/assets'],
  ['POST', '/api/admin/assets'],
  ['PATCH', '/api/admin/assets/1'],
  ['DELETE', '/api/admin/assets/1'],
] as const;

const uploadRequest = {
  name: 'portfolio-image.png',
  size: 512,
  contentType: 'image/png',
};

describe('owner-only media management', () => {
  it.each(adminApiOperations)(
    'rejects unauthenticated %s %s requests',
    async (method, path) => {
      const response = await request(
        method,
        path,
        undefined,
        method === 'POST' || method === 'PATCH' ? {} : undefined,
      );

      expect(response.status).toBe(401);
      expect(mocks.db.select).not.toHaveBeenCalled();
      expect(mocks.db.insert).not.toHaveBeenCalled();
      expect(mocks.db.update).not.toHaveBeenCalled();
      expect(mocks.db.delete).not.toHaveBeenCalled();
    },
  );

  it.each(adminApiOperations)(
    'rejects non-allowlisted %s %s requests',
    async (method, path) => {
      const response = await request(
        method,
        path,
        'visitor@example.com',
        method === 'POST' || method === 'PATCH' ? {} : undefined,
      );

      expect(response.status).toBe(403);
      expect(mocks.db.select).not.toHaveBeenCalled();
      expect(mocks.db.insert).not.toHaveBeenCalled();
      expect(mocks.db.update).not.toHaveBeenCalled();
      expect(mocks.db.delete).not.toHaveBeenCalled();
    },
  );

  it.each([
    { email: undefined, status: 401 },
    { email: 'visitor@example.com', status: 403 },
  ])('rejects upload URL creation for $email', async ({ email, status }) => {
    const response = await request(
      'POST',
      '/api/storage/uploads/request-url',
      email,
      uploadRequest,
    );

    expect(response.status).toBe(status);
    expect(mocks.storage.getObjectEntityUploadURL).not.toHaveBeenCalled();
  });

  it('allows the configured owner to create an upload URL', async () => {
    const response = await request(
      'POST',
      '/api/storage/uploads/request-url',
      'OWNER@example.com',
      uploadRequest,
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      uploadURL: 'https://storage.example.test/signed-upload',
      objectPath: '/objects/uploads/new-file',
      metadata: uploadRequest,
    });
    expect(mocks.storage.getObjectEntityUploadURL).toHaveBeenCalledOnce();
  });

  it('returns published assets only to public visitors', async () => {
    const publishedAsset = {
      id: 1,
      title: 'Published frame',
      assetType: 'graphic',
      category: 'Portfolio',
      description: '',
      mediaUrl: null,
      thumbnailUrl: null,
      externalUrl: null,
      isPublished: true,
      sortOrder: 0,
      createdAt: new Date('2025-01-01T00:00:00.000Z'),
      updatedAt: new Date('2025-01-01T00:00:00.000Z'),
    };
    const draftAsset = {
      ...publishedAsset,
      id: 2,
      title: 'Private draft',
      isPublished: false,
    };
    mocks.selectRows = [publishedAsset, draftAsset];

    const response = await request('GET', '/api/assets');
    const returnedAssets = (await response.json()) as Array<{ id: number }>;

    expect(response.status).toBe(200);
    expect(returnedAssets.map((asset) => asset.id)).toEqual([1]);
    expect(mocks.selectQueries[0]?.where).toHaveBeenCalledWith(
      eq(assetsTable.isPublished, true),
    );
  });

  it('does not serve private objects that are not linked to a published asset', async () => {
    const response = await request(
      'GET',
      '/api/storage/objects/uploads/draft-only.png',
    );

    expect(response.status).toBe(404);
    expect(mocks.storage.getObjectEntityFile).not.toHaveBeenCalled();
    const whereCondition = mocks.selectQueries[0]?.where.mock.calls[0]?.[0];
    const compiled = dialect.sqlToQuery(whereCondition);
    expect(compiled.sql).toContain('is_published');
    expect(compiled.params).toContain('/objects/uploads/draft-only.png');
  });

  it('serves private objects linked to a published asset', async () => {
    mocks.selectRows = [{ id: 7, isPublished: true }];

    const response = await request(
      'GET',
      '/api/storage/objects/uploads/published-image.png',
    );

    expect(response.status).toBe(200);
    expect(mocks.storage.getObjectEntityFile).toHaveBeenCalledWith(
      '/objects/uploads/published-image.png',
    );
    expect(mocks.storage.downloadObject).toHaveBeenCalledOnce();
  });

  it('lets the configured owner read private objects even without a public asset link', async () => {
    const response = await request(
      'GET',
      '/api/storage/objects/uploads/unlisted-owner-file.png',
      'owner@example.com',
    );

    expect(response.status).toBe(200);
    expect(mocks.db.select).not.toHaveBeenCalled();
    expect(mocks.storage.getObjectEntityFile).toHaveBeenCalledWith(
      '/objects/uploads/unlisted-owner-file.png',
    );
  });
});
