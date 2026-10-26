import { sql } from 'drizzle-orm';
import { boolean, integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod/v4';

export const assetTypes = ['reel', 'video', 'graphic', 'file', 'project'] as const;

export const assetsTable = pgTable('assets', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 180 }).notNull(),
  assetType: varchar('asset_type', { length: 24 }).notNull(),
  category: varchar('category', { length: 100 }).notNull().default('Portfolio'),
  description: text('description').notNull().default(''),
  mediaUrl: text('media_url'),
  thumbnailUrl: text('thumbnail_url'),
  externalUrl: text('external_url'),
  isPublished: boolean('is_published').notNull().default(true),
  sortOrder: integer('sort_order').notNull().default(0),
  createdBy: varchar('created_by'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const assetImportsTable = pgTable('asset_imports', {
  key: varchar('key', { length: 120 }).primaryKey(),
  importedAt: timestamp('imported_at', { withTimezone: true }).notNull().defaultNow(),
});

export const insertAssetSchema = createInsertSchema(assetsTable)
  .omit({ id: true, createdAt: true, updatedAt: true })
  .extend({
    assetType: z.enum(assetTypes),
  });

export type InsertAsset = z.infer<typeof insertAssetSchema>;
export type Asset = typeof assetsTable.$inferSelect;

export const assetDefaultSort = sql`${assetsTable.sortOrder}, ${assetsTable.createdAt} desc`;