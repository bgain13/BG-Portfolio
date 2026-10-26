import {
  CreateAssetBody,
  CreateAssetResponse,
  DeleteAssetParams,
  ListAdminAssetsResponse,
  ListPublicAssetsResponse,
  UpdateAssetBody,
  UpdateAssetParams,
  UpdateAssetResponse,
} from '@workspace/api-zod';
import { assetsTable, db } from '@workspace/db';
import { asc, desc, eq } from 'drizzle-orm';
import { Router, type IRouter, type Request, type Response } from 'express';
import { requireAdmin } from '../lib/adminAccess';

const router: IRouter = Router();

router.get('/assets', async (_req: Request, res: Response): Promise<void> => {
  const assets = await db
    .select()
    .from(assetsTable)
    .where(eq(assetsTable.isPublished, true))
    .orderBy(asc(assetsTable.sortOrder), desc(assetsTable.createdAt));

  res.json(ListPublicAssetsResponse.parse(assets));
});

router.get('/admin/assets', async (req: Request, res: Response): Promise<void> => {
  if (!requireAdmin(req, res)) return;

  const assets = await db
    .select()
    .from(assetsTable)
    .orderBy(asc(assetsTable.sortOrder), desc(assetsTable.createdAt));

  res.json(ListAdminAssetsResponse.parse(assets));
});

router.post('/admin/assets', async (req: Request, res: Response): Promise<void> => {
  if (!requireAdmin(req, res)) return;

  const parsed = CreateAssetBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [asset] = await db
    .insert(assetsTable)
    .values({
      ...parsed.data,
      category: parsed.data.category ?? 'Portfolio',
      description: parsed.data.description ?? '',
      isPublished: parsed.data.isPublished ?? true,
      sortOrder: parsed.data.sortOrder ?? 0,
      createdBy: req.user!.id,
    })
    .returning();

  res.status(201).json(CreateAssetResponse.parse(asset));
});

router.patch('/admin/assets/:id', async (req: Request, res: Response): Promise<void> => {
  if (!requireAdmin(req, res)) return;

  const params = UpdateAssetParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateAssetBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [asset] = await db
    .update(assetsTable)
    .set({
      ...parsed.data,
      updatedAt: new Date(),
    })
    .where(eq(assetsTable.id, params.data.id))
    .returning();

  if (!asset) {
    res.status(404).json({ error: 'Asset not found' });
    return;
  }

  res.json(UpdateAssetResponse.parse(asset));
});

router.delete('/admin/assets/:id', async (req: Request, res: Response): Promise<void> => {
  if (!requireAdmin(req, res)) return;

  const params = DeleteAssetParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [asset] = await db
    .delete(assetsTable)
    .where(eq(assetsTable.id, params.data.id))
    .returning({ id: assetsTable.id });

  if (!asset) {
    res.status(404).json({ error: 'Asset not found' });
    return;
  }

  res.sendStatus(204);
});

export default router;