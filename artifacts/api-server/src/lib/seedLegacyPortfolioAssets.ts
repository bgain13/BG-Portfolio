import { assetImportsTable, assetsTable, db } from '@workspace/db';

const legacyImportKey = 'bivash-homepage-assets-v1';

const legacyPortfolioAssets = [
  {
    title: 'Wedding / Event Highlight',
    assetType: 'reel',
    category: '9:16 / Event',
    description:
      'A vertical highlight built for fast, emotional viewing. A cinematic edit blending candid moments, music, and color grading.',
    externalUrl: 'https://youtube.com/shorts/RxIgpfHJ6qs?si=bKULV6V6LsJ-yAcy',
    mediaUrl: null,
    thumbnailUrl: null,
    isPublished: true,
    sortOrder: 10,
    createdBy: null,
  },
  {
    title: 'Social Media Short',
    assetType: 'reel',
    category: '9:16 / Social',
    description:
      'A short-form edit made for mobile-first feeds, YouTube Shorts, and social platforms.',
    externalUrl: 'https://youtube.com/shorts/2ilbgN4EVOU?si=uRBkFHPAlEMVjrbt',
    mediaUrl: null,
    thumbnailUrl: null,
    isPublished: true,
    sortOrder: 20,
    createdBy: null,
  },
  {
    title: 'Promotional / Brand Edit',
    assetType: 'video',
    category: 'Commercial',
    description:
      'A brand-focused promotional video combining visuals, pacing, and clean graphics.',
    externalUrl: 'https://youtu.be/2ZsugB3Q7O8?si=8cgUfil6sLcOSqMW',
    mediaUrl: null,
    thumbnailUrl: null,
    isPublished: true,
    sortOrder: 30,
    createdBy: null,
  },
  {
    title: 'Creative Film Edit',
    assetType: 'video',
    category: 'Short Film / Creative',
    description:
      'A narrative-driven edit focused on rhythm, emotion, and visual flow.',
    externalUrl: 'https://youtu.be/Ss-1DNglKGg?si=NmPR7R6c065YfT87',
    mediaUrl: null,
    thumbnailUrl: null,
    isPublished: true,
    sortOrder: 40,
    createdBy: null,
  },
  {
    title: 'Event / Documentary Cut',
    assetType: 'video',
    category: 'Event / Documentary',
    description: 'Event coverage edited into a concise, shareable story.',
    externalUrl: 'https://youtu.be/Z1Ugd1pe_P0?si=OQd36wqIgnZOJuDN',
    mediaUrl: null,
    thumbnailUrl: null,
    isPublished: true,
    sortOrder: 50,
    createdBy: null,
  },
  {
    title: 'Motion / Graphics Piece',
    assetType: 'video',
    category: 'Motion Graphics',
    description:
      'A graphics-heavy edit with typography, transitions, and visual effects.',
    externalUrl: 'https://youtu.be/2EZ8uSAA4QY?si=2THXaOqPnScqLAGG',
    mediaUrl: null,
    thumbnailUrl: null,
    isPublished: true,
    sortOrder: 60,
    createdBy: null,
  },
  {
    title: 'Additional Edit A',
    assetType: 'video',
    category: 'Mixed',
    description: 'Additional portfolio sample.',
    externalUrl: 'https://youtu.be/iuPhOGzo1gg?si=C-ACUAOsx2U1cmbf',
    mediaUrl: null,
    thumbnailUrl: null,
    isPublished: true,
    sortOrder: 70,
    createdBy: null,
  },
  {
    title: 'Additional Edit B',
    assetType: 'video',
    category: 'Mixed',
    description: 'Additional portfolio sample.',
    externalUrl: 'https://youtu.be/CZ1MB7cG-gU?si=a1ooNTjgT46H2pjT',
    mediaUrl: null,
    thumbnailUrl: null,
    isPublished: true,
    sortOrder: 80,
    createdBy: null,
  },
  {
    title: 'Additional Edit C',
    assetType: 'video',
    category: 'Mixed',
    description: 'Additional portfolio sample.',
    externalUrl: 'https://youtu.be/dRN7CJ7WjtI?si=zvGgFy8XcSW3DnXH',
    mediaUrl: null,
    thumbnailUrl: null,
    isPublished: true,
    sortOrder: 90,
    createdBy: null,
  },
  {
    title: 'Additional Edit D',
    assetType: 'video',
    category: 'Mixed',
    description: 'Additional portfolio sample.',
    externalUrl: 'https://youtu.be/ut17Var2aB8?si=DyrvRbkUFQrOlbJ_',
    mediaUrl: null,
    thumbnailUrl: null,
    isPublished: true,
    sortOrder: 100,
    createdBy: null,
  },
  {
    title: 'Drive Portfolio Sample 1',
    assetType: 'file',
    category: 'Long-form / Drive',
    description: 'A longer project hosted on Google Drive.',
    externalUrl:
      'https://drive.google.com/file/d/1m0__H7w55YZhg5XKi61nTBGuFvg8C-iD/view?usp=drivesdk',
    mediaUrl: null,
    thumbnailUrl: null,
    isPublished: true,
    sortOrder: 110,
    createdBy: null,
  },
  {
    title: 'Drive Portfolio Sample 2',
    assetType: 'file',
    category: 'Long-form / Drive',
    description: 'A longer project hosted on Google Drive.',
    externalUrl:
      'https://drive.google.com/file/d/1pTzmBGAMSSqYpWgNLYCi0U4PTJB2JseR/view?usp=drivesdk',
    mediaUrl: null,
    thumbnailUrl: null,
    isPublished: true,
    sortOrder: 120,
    createdBy: null,
  },
  {
    title: 'Portfolio Folder A',
    assetType: 'file',
    category: 'Google Drive Folder',
    description: 'Full portfolio folder on Google Drive.',
    externalUrl:
      'https://drive.google.com/drive/folders/1MRhtp7MnGyNAawEN3_NlA5rnFOYNQrSP',
    mediaUrl: null,
    thumbnailUrl: null,
    isPublished: true,
    sortOrder: 130,
    createdBy: null,
  },
  {
    title: 'Portfolio Folder B',
    assetType: 'file',
    category: 'Google Drive Folder',
    description: 'Full portfolio folder on Google Drive.',
    externalUrl:
      'https://drive.google.com/drive/folders/1FddlpJMcNspKa-shLU3R1nOPExRaT-6S',
    mediaUrl: null,
    thumbnailUrl: null,
    isPublished: true,
    sortOrder: 140,
    createdBy: null,
  },
] satisfies Array<typeof assetsTable.$inferInsert>;

export async function seedLegacyPortfolioAssets(): Promise<number> {
  return db.transaction(async (transaction) => {
    const [claimedImport] = await transaction
      .insert(assetImportsTable)
      .values({ key: legacyImportKey })
      .onConflictDoNothing()
      .returning({ key: assetImportsTable.key });

    if (!claimedImport) return 0;

    const existingAssets = await transaction
      .select({ externalUrl: assetsTable.externalUrl })
      .from(assetsTable);
    const existingUrls = new Set(
      existingAssets.flatMap((asset) => (asset.externalUrl ? [asset.externalUrl] : [])),
    );
    const assetsToImport = legacyPortfolioAssets.filter(
      (asset) => asset.externalUrl && !existingUrls.has(asset.externalUrl),
    );

    if (assetsToImport.length > 0) {
      await transaction.insert(assetsTable).values(assetsToImport);
    }

    return assetsToImport.length;
  });
}
