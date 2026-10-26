import { useMemo, useState, type FormEvent } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  Archive,
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleAlert,
  Cloud,
  File,
  Film,
  FolderOpen,
  Image as ImageIcon,
  LayoutGrid,
  Link2,
  Loader2,
  LogOut,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  UploadCloud,
  Video,
  X,
} from 'lucide-react';
import {
  getListAdminAssetsQueryKey,
  useCreateAsset,
  useDeleteAsset,
  useListAdminAssets,
  useUpdateAsset,
  type Asset,
  type AssetInput,
  type AssetAssetType,
} from '@workspace/api-client-react';
import { useAuth } from '@workspace/replit-auth-web';
import { useUpload } from '@workspace/object-storage-web';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

type AssetType = AssetAssetType | 'all';

type DraftAsset = {
  title: string;
  assetType: AssetAssetType;
  category: string;
  description: string;
  mediaUrl: string;
  thumbnailUrl: string;
  externalUrl: string;
  isPublished: boolean;
  sortOrder: string;
};

const assetTypes: Array<{ value: AssetType; label: string }> = [
  { value: 'all', label: 'All assets' },
  { value: 'reel', label: 'Reels' },
  { value: 'video', label: 'Videos' },
  { value: 'graphic', label: 'Graphics' },
  { value: 'file', label: 'Files' },
  { value: 'project', label: 'Projects' },
];

const typeMeta: Record<AssetAssetType, { label: string; icon: typeof Film; color: string }> = {
  reel: { label: 'Reel', icon: Film, color: 'lime' },
  video: { label: 'Video', icon: Video, color: 'coral' },
  graphic: { label: 'Graphic', icon: ImageIcon, color: 'sky' },
  file: { label: 'File', icon: File, color: 'violet' },
  project: { label: 'Project', icon: FolderOpen, color: 'amber' },
};

const blankDraft: DraftAsset = {
  title: '',
  assetType: 'video',
  category: '',
  description: '',
  mediaUrl: '',
  thumbnailUrl: '',
  externalUrl: '',
  isPublished: false,
  sortOrder: '0',
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value));
}

function mediaSrc(path: string | null) {
  if (!path) return null;
  return path.startsWith('/objects/') ? `/api/storage${path}` : path;
}

function AdminSkeleton() {
  return (
    <div className="admin-page min-h-[100dvh]">
      <div className="admin-skeleton-sidebar" />
      <main className="admin-main">
        <div className="admin-skeleton-line w-32" />
        <div className="admin-skeleton-line mt-6 h-14 w-2/3" />
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((item) => <div className="admin-skeleton-card" key={item} />)}
        </div>
        <div className="admin-skeleton-table mt-6" />
      </main>
    </div>
  );
}

function Admin() {
  const { user, isLoading: authLoading, isAuthenticated, login, logout } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<AssetType>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [sortNewest, setSortNewest] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [draft, setDraft] = useState<DraftAsset>(blankDraft);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadTarget, setUploadTarget] = useState<'mediaUrl' | null>(null);

  const assetsQuery = useListAdminAssets({
    query: { queryKey: getListAdminAssetsQueryKey(), enabled: isAuthenticated },
  });
  const createAsset = useCreateAsset();
  const updateAsset = useUpdateAsset();
  const deleteAsset = useDeleteAsset();

  const uploaded = useUpload();

  const assets = assetsQuery.data ?? [];
  const filteredAssets = useMemo(() => {
    const query = search.trim().toLowerCase();
    return assets
      .filter((asset) => typeFilter === 'all' || asset.assetType === typeFilter)
      .filter((asset) => statusFilter === 'all' || (statusFilter === 'published' ? asset.isPublished : !asset.isPublished))
      .filter((asset) => !query || [asset.title, asset.category, asset.description].some((value) => value.toLowerCase().includes(query)))
      .sort((a, b) => sortNewest ? new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime() : a.sortOrder - b.sortOrder);
  }, [assets, search, sortNewest, statusFilter, typeFilter]);

  const publishedCount = assets.filter((asset) => asset.isPublished).length;
  const mediaCount = assets.filter((asset) => Boolean(asset.mediaUrl || asset.externalUrl)).length;

  const invalidate = () => queryClient.invalidateQueries({ queryKey: getListAdminAssetsQueryKey() });

  const openCreate = () => {
    setEditingAsset(null);
    setDraft(blankDraft);
    setIsCreateOpen(true);
  };

  const openEdit = (asset: Asset) => {
    setEditingAsset(asset);
    setDraft({
      title: asset.title,
      assetType: asset.assetType,
      category: asset.category,
      description: asset.description,
      mediaUrl: asset.mediaUrl ?? '',
      thumbnailUrl: asset.thumbnailUrl ?? '',
      externalUrl: asset.externalUrl ?? '',
      isPublished: asset.isPublished,
      sortOrder: String(asset.sortOrder),
    });
    setIsCreateOpen(true);
  };

  const closeEditor = () => {
    if (isSaving || uploaded.isUploading) return;
    setIsCreateOpen(false);
  };

  const saveAsset = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!draft.title.trim()) {
      toast({ title: 'Title required', description: 'Give this asset a working title before saving.', variant: 'destructive' });
      return;
    }
    setIsSaving(true);
    const data: AssetInput = {
      title: draft.title.trim(),
      assetType: draft.assetType,
      category: draft.category.trim(),
      description: draft.description.trim(),
      mediaUrl: draft.mediaUrl.trim() || null,
      thumbnailUrl: draft.thumbnailUrl.trim() || null,
      externalUrl: draft.externalUrl.trim() || null,
      isPublished: draft.isPublished,
      sortOrder: Number(draft.sortOrder) || 0,
    };
    const onSuccess = () => {
      invalidate();
      setIsCreateOpen(false);
      setIsSaving(false);
      toast({ title: editingAsset ? 'Asset updated' : 'Asset created', description: `${data.title} is ready in your library.` });
    };
    const onError = () => {
      setIsSaving(false);
      toast({ title: 'Could not save asset', description: 'Check the fields and try again.', variant: 'destructive' });
    };
    if (editingAsset) {
      updateAsset.mutate({ id: editingAsset.id, data }, { onSuccess, onError });
    } else {
      createAsset.mutate({ data }, { onSuccess, onError });
    }
  };

  const togglePublished = (asset: Asset) => {
    updateAsset.mutate(
      { id: asset.id, data: { isPublished: !asset.isPublished } },
      {
        onSuccess: () => {
          invalidate();
          toast({ title: asset.isPublished ? 'Moved to drafts' : 'Published to portfolio', description: asset.title });
        },
        onError: () => toast({ title: 'Publish status did not save', description: 'Try again in a moment.', variant: 'destructive' }),
      },
    );
  };

  const removeAsset = (asset: Asset) => {
    if (!window.confirm(`Delete “${asset.title}”? This cannot be undone.`)) return;
    deleteAsset.mutate(
      { id: asset.id },
      {
        onSuccess: () => {
          invalidate();
          toast({ title: 'Asset deleted', description: `${asset.title} was removed from the library.` });
        },
        onError: () => toast({ title: 'Could not delete asset', description: 'Try again in a moment.', variant: 'destructive' }),
      },
    );
  };

  if (authLoading) return <AdminSkeleton />;

  if (!isAuthenticated) {
    return (
      <div className="admin-auth min-h-[100dvh] film-grain">
        <div className="admin-auth-orbit" />
        <div className="admin-auth-card" data-testid="state-admin-unauthenticated">
          <div className="admin-brand-mark"><Film className="h-5 w-5" /></div>
          <p className="admin-eyebrow">BG / backstage 01</p>
          <h1>Make the next<br /><span>cut.</span></h1>
          <p className="admin-auth-copy">The private workspace for Bivash’s reels, films, frames, and project archive.</p>
          <button className="admin-button admin-button-primary mt-8 w-full justify-center" type="button" onClick={login} data-testid="button-admin-login">
            Log in to continue <ArrowUpRight className="h-4 w-4" />
          </button>
          <p className="admin-auth-footnote">Private studio workspace / owner access only</p>
        </div>
      </div>
    );
  }

  if (assetsQuery.isLoading) return <AdminSkeleton />;

  if (assetsQuery.isError) {
    const status = (assetsQuery.error as { status?: number } | null)?.status;
    return (
      <div className="admin-auth min-h-[100dvh]">
        <div className="admin-auth-card admin-error-state" data-testid="state-admin-error">
          <CircleAlert className="h-8 w-8 text-[hsl(var(--accent))]" />
          <p className="admin-eyebrow mt-6">{status === 403 ? 'Owner access required' : 'Library unavailable'}</p>
          <h1>{status === 403 ? <>Set the<br /><span>key.</span></> : <>Lost the<br /><span>thread.</span></>}</h1>
          <p className="admin-auth-copy">
            {status === 403
              ? 'This Replit account is not on the admin allowlist. Add your Replit sign-in email to the ADMIN_EMAILS environment variable, then reload this page.'
              : 'We couldn’t load your asset library. The work is safe — try reconnecting.'}
          </p>
          {status !== 403 && (
            <button className="admin-button admin-button-primary mt-8 w-full justify-center" type="button" onClick={() => assetsQuery.refetch()} data-testid="button-retry-assets">
              <RefreshCw className="h-4 w-4" /> Retry connection
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page film-grain min-h-[100dvh]" data-testid="page-admin">
      <AdminSidebar user={user} onLogout={logout} onCreate={openCreate} assetCount={assets.length} />
      <main className="admin-main">
        <div className="admin-mobile-bar">
          <div className="flex items-center gap-3"><span className="admin-mini-mark">BG</span><span className="font-mono-ui text-[10px] tracking-[0.18em] text-white/45">BACKSTAGE</span></div>
          <button className="admin-icon-button" onClick={logout} type="button" aria-label="Log out" data-testid="button-mobile-logout"><LogOut className="h-4 w-4" /></button>
        </div>
        <header className="admin-header">
          <div>
            <p className="admin-eyebrow">Asset library / 01</p>
            <h1>Everything<br /><span>in the cut.</span></h1>
          </div>
          <div className="admin-header-actions">
            <span className="admin-save-state"><span className="admin-live-dot" /> Cloud synced</span>
            <button className="admin-button admin-button-primary" type="button" onClick={openCreate} data-testid="button-create-asset">
              <Plus className="h-4 w-4" /> Add asset
            </button>
          </div>
        </header>

        <section className="admin-stat-grid" aria-label="Library overview">
          <StatBlock label="Total assets" value={assets.length} detail="Across the archive" icon={LayoutGrid} testId="stat-total-assets" />
          <StatBlock label="Published" value={publishedCount} detail={`${assets.length - publishedCount} in draft`} icon={Sparkles} accent testId="stat-published-assets" />
          <StatBlock label="Linked media" value={mediaCount} detail="Files + cloud links" icon={Cloud} testId="stat-linked-assets" />
        </section>

        <section className="admin-library" data-testid="section-asset-library">
          <div className="admin-library-head">
            <div>
              <p className="admin-eyebrow">Working archive</p>
              <h2>Asset library <span>{filteredAssets.length}</span></h2>
            </div>
            <button className="admin-filter-button" type="button" onClick={() => setSortNewest((current) => !current)} data-testid="button-sort-assets">
              <SlidersHorizontal className="h-4 w-4" /> {sortNewest ? 'Recently updated' : 'Editorial order'} <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="admin-toolbar">
            <label className="admin-search">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search assets</span>
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search title, category, notes…" data-testid="input-search-assets" />
              {search && <button type="button" onClick={() => setSearch('')} aria-label="Clear search" data-testid="button-clear-search"><X className="h-3.5 w-3.5" /></button>}
            </label>
            <div className="admin-filter-scroll" role="list" aria-label="Filter by type">
              {assetTypes.map((type) => (
                <button key={type.value} type="button" className={`admin-chip ${typeFilter === type.value ? 'admin-chip-active' : ''}`} onClick={() => setTypeFilter(type.value)} data-testid={`button-filter-${type.value}`}>
                  {type.label}
                </button>
              ))}
            </div>
            <div className="admin-status-toggle" role="group" aria-label="Filter by publication status">
              {(['all', 'published', 'draft'] as const).map((status) => (
                <button key={status} type="button" className={statusFilter === status ? 'active' : ''} onClick={() => setStatusFilter(status)} data-testid={`button-status-${status}`}>
                  {status === 'all' ? 'All' : status === 'published' ? 'Live' : 'Drafts'}
                </button>
              ))}
            </div>
          </div>

          {filteredAssets.length === 0 ? (
            <EmptyLibrary hasFilters={Boolean(search || typeFilter !== 'all' || statusFilter !== 'all')} onReset={() => { setSearch(''); setTypeFilter('all'); setStatusFilter('all'); }} onCreate={openCreate} />
          ) : (
            <div className="admin-asset-grid" data-testid="grid-assets">
              {filteredAssets.map((asset, index) => (
                <AssetCard key={asset.id} asset={asset} index={index} onEdit={openEdit} onDelete={removeAsset} onTogglePublish={togglePublished} isUpdating={updateAsset.isPending} isDeleting={deleteAsset.isPending} />
              ))}
            </div>
          )}
        </section>
      </main>
      <AssetEditor
        open={isCreateOpen}
        editingAsset={editingAsset}
        draft={draft}
        setDraft={setDraft}
        onOpenChange={(open) => !open && closeEditor()}
        onSubmit={saveAsset}
        isSaving={isSaving}
        upload={uploaded}
        uploadTarget={uploadTarget}
        setUploadTarget={setUploadTarget}
      />
    </div>
  );
}

function AdminSidebar({ user, onLogout, onCreate, assetCount }: { user: { firstName: string | null; lastName: string | null; email: string | null } | null; onLogout: () => void; onCreate: () => void; assetCount: number }) {
  const name = [user?.firstName, user?.lastName].filter(Boolean).join(' ') || 'Bivash Gain';
  return (
    <aside className="admin-sidebar">
      <div className="admin-side-top">
        <a href="/" className="admin-side-brand" data-testid="link-admin-home"><span className="admin-side-brand-mark"><Film className="h-4 w-4" /></span><span>BG<span>.</span></span></a>
        <p className="admin-side-caption">Production<br />workspace</p>
      </div>
      <nav className="admin-nav" aria-label="Backstage navigation">
        <p className="admin-eyebrow">Workspace</p>
        <button className="admin-nav-item admin-nav-item-active" type="button" data-testid="button-nav-library"><LayoutGrid className="h-4 w-4" /> Library <span>{assetCount}</span></button>
        <button className="admin-nav-item" type="button" onClick={onCreate} data-testid="button-nav-add"><Plus className="h-4 w-4" /> Add new <span>⌘ N</span></button>
      </nav>
      <div className="admin-side-note"><span className="admin-live-dot" /><div><p>Studio status</p><strong>Open for edits</strong></div></div>
      <div className="admin-side-bottom">
        <div className="admin-user"><span className="admin-avatar">{name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</span><span className="min-w-0"><strong className="block truncate">{name}</strong><small className="block truncate">{user?.email ?? 'Owner account'}</small></span></div>
        <button className="admin-logout" type="button" onClick={onLogout} data-testid="button-admin-logout"><LogOut className="h-4 w-4" /> Log out</button>
      </div>
    </aside>
  );
}

function StatBlock({ label, value, detail, icon: Icon, accent, testId }: { label: string; value: number; detail: string; icon: typeof LayoutGrid; accent?: boolean; testId: string }) {
  return <div className={`admin-stat ${accent ? 'admin-stat-accent' : ''}`} data-testid={testId}><Icon className="admin-stat-icon h-4 w-4" /><p>{label}</p><strong>{value}</strong><span>{detail}</span></div>;
}

function AssetCard({ asset, index, onEdit, onDelete, onTogglePublish, isUpdating, isDeleting }: { asset: Asset; index: number; onEdit: (asset: Asset) => void; onDelete: (asset: Asset) => void; onTogglePublish: (asset: Asset) => void; isUpdating: boolean; isDeleting: boolean }) {
  const meta = typeMeta[asset.assetType];
  const Icon = meta.icon;
  const preview = mediaSrc(asset.thumbnailUrl || asset.mediaUrl);
  return (
    <article className="admin-asset-card" data-testid={`card-asset-${asset.id}`}>
      <div className={`admin-asset-visual admin-asset-visual-${meta.color}`}>
        {preview ? <img src={preview} alt="" loading="lazy" /> : <div className="admin-visual-placeholder"><Icon className="h-7 w-7" /><span>{meta.label} / {String(index + 1).padStart(2, '0')}</span></div>}
        <div className="admin-asset-overlay"><span className="admin-type-pill"><Icon className="h-3 w-3" /> {meta.label}</span><span className={asset.isPublished ? 'admin-status-live' : 'admin-status-draft'}>{asset.isPublished ? 'Live' : 'Draft'}</span></div>
        {asset.mediaUrl && <span className="admin-media-badge"><Cloud className="h-3 w-3" /></span>}
      </div>
      <div className="admin-asset-body">
        <div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="admin-card-category">{asset.category || 'Uncategorized'}</p><h3 className="truncate" data-testid={`text-asset-title-${asset.id}`}>{asset.title}</h3></div><button className="admin-more-button" type="button" aria-label={`Edit ${asset.title}`} onClick={() => onEdit(asset)} data-testid={`button-edit-asset-${asset.id}`}><MoreHorizontal className="h-4 w-4" /></button></div>
        <p className="admin-card-description">{asset.description || 'No description added yet.'}</p>
        <div className="admin-card-footer"><span>{formatDate(asset.updatedAt)}</span><div className="flex items-center gap-1"><button className="admin-card-action" type="button" onClick={() => onTogglePublish(asset)} disabled={isUpdating} data-testid={`button-toggle-publish-${asset.id}`}>{isUpdating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : asset.isPublished ? <Archive className="h-3.5 w-3.5" /> : <Check className="h-3.5 w-3.5" />} {asset.isPublished ? 'Unpublish' : 'Publish'}</button><button className="admin-card-delete" type="button" onClick={() => onDelete(asset)} disabled={isDeleting} aria-label={`Delete ${asset.title}`} data-testid={`button-delete-asset-${asset.id}`}><Trash2 className="h-3.5 w-3.5" /></button></div></div>
      </div>
    </article>
  );
}

function EmptyLibrary({ hasFilters, onReset, onCreate }: { hasFilters: boolean; onReset: () => void; onCreate: () => void }) {
  return <div className="admin-empty" data-testid="state-assets-empty"><div className="admin-empty-icon">{hasFilters ? <Search className="h-6 w-6" /> : <Film className="h-6 w-6" />}</div><p className="admin-eyebrow">{hasFilters ? 'No matching frames' : 'The first frame is yours'}</p><h3>{hasFilters ? 'Nothing in this cut.' : 'Build the library.'}</h3><p>{hasFilters ? 'Try another search or clear the active filters to see more of your archive.' : 'Bring in a reel, a graphic, a cloud project, or a file to start shaping the public portfolio.'}</p>{hasFilters ? <button className="admin-button admin-button-quiet" type="button" onClick={onReset} data-testid="button-reset-filters">Clear filters</button> : <button className="admin-button admin-button-primary" type="button" onClick={onCreate} data-testid="button-empty-create"><Plus className="h-4 w-4" /> Add first asset</button>}</div>;
}

function AssetEditor({ open, editingAsset, draft, setDraft, onOpenChange, onSubmit, isSaving, upload, uploadTarget, setUploadTarget }: { open: boolean; editingAsset: Asset | null; draft: DraftAsset; setDraft: (draft: DraftAsset | ((current: DraftAsset) => DraftAsset)) => void; onOpenChange: (open: boolean) => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void; isSaving: boolean; upload: ReturnType<typeof useUpload>; uploadTarget: 'mediaUrl' | null; setUploadTarget: (target: 'mediaUrl' | null) => void }) {
  const { toast } = useToast();
  const update = (key: keyof DraftAsset, value: string | boolean) => setDraft((current) => ({ ...current, [key]: value }));
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="admin-dialog-content">
        <DialogHeader className="admin-dialog-header"><p className="admin-eyebrow">{editingAsset ? 'Edit asset' : 'New asset'} / library</p><DialogTitle>{editingAsset ? 'Refine the frame.' : 'Add to the cut.'}</DialogTitle><DialogDescription>Keep the working details clear. You can change the public status at any time.</DialogDescription></DialogHeader>
        <form onSubmit={onSubmit} className="admin-form" data-testid="form-asset-editor">
          <div className="admin-form-grid"><label><span>Title <b>*</b></span><input autoFocus value={draft.title} onChange={(event) => update('title', event.target.value)} placeholder="e.g. Monsoon — title sequence" data-testid="input-asset-title" required /></label><label><span>Asset type</span><select value={draft.assetType} onChange={(event) => update('assetType', event.target.value as AssetAssetType)} data-testid="select-asset-type">{assetTypes.slice(1).map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}</select></label></div>
          <div className="admin-form-grid"><label><span>Category</span><input value={draft.category} onChange={(event) => update('category', event.target.value)} placeholder="Commercial / Documentary" data-testid="input-asset-category" /></label><label><span>Sort order</span><input type="number" value={draft.sortOrder} onChange={(event) => update('sortOrder', event.target.value)} data-testid="input-asset-sort-order" /></label></div>
          <label><span>Description</span><textarea value={draft.description} onChange={(event) => update('description', event.target.value)} placeholder="A short note about the cut, client, or story…" rows={3} data-testid="textarea-asset-description" /></label>
           <div className="admin-upload-box"><div><span className="admin-form-label">Media file</span><p>{draft.mediaUrl ? 'A stored file is attached.' : 'Upload a video, image, or project file directly to cloud storage.'}</p></div><label className="admin-upload-button"><UploadCloud className="h-4 w-4" /> {upload.isUploading ? `Uploading ${upload.progress}%` : draft.mediaUrl ? 'Replace file' : 'Choose file'}<input className="sr-only" type="file" accept="video/*,image/*,application/pdf,.zip,.aep,.prproj" disabled={upload.isUploading} onChange={async (event) => { const file = event.target.files?.[0]; if (!file) return; setUploadTarget('mediaUrl'); const response = await upload.uploadFile(file); if (response) { setDraft((current) => ({ ...current, mediaUrl: response.objectPath })); toast({ title: 'Upload complete', description: 'The media file is attached to this asset.' }); } else { toast({ title: 'Upload failed', description: upload.error?.message ?? 'The file could not be stored. Try again.', variant: 'destructive' }); } setUploadTarget(null); event.target.value = ''; }} data-testid="input-asset-media-upload" /></label>{upload.isUploading && <div className="admin-upload-progress"><span style={{ width: `${upload.progress}%` }} /></div>}{draft.mediaUrl && <p className="admin-upload-path" data-testid="text-uploaded-media-path"><Link2 className="h-3.5 w-3.5" /> {draft.mediaUrl}</p>}</div>
          <div className="admin-form-grid"><label><span>Thumbnail URL</span><input value={draft.thumbnailUrl} onChange={(event) => update('thumbnailUrl', event.target.value)} placeholder="https://…" data-testid="input-asset-thumbnail-url" /></label><label><span>External project link</span><input value={draft.externalUrl} onChange={(event) => update('externalUrl', event.target.value)} placeholder="Drive, Vimeo, YouTube…" data-testid="input-asset-external-url" /></label></div>
          <label className="admin-publish-row"><span><strong>Show on portfolio</strong><small>Published assets appear in the public work sections.</small></span><button className={`admin-switch ${draft.isPublished ? 'on' : ''}`} type="button" role="switch" aria-checked={draft.isPublished} onClick={() => update('isPublished', !draft.isPublished)} data-testid="button-editor-publish-toggle"><span /></button></label>
          <DialogFooter className="admin-dialog-footer"><button className="admin-button admin-button-quiet" type="button" onClick={() => onOpenChange(false)} disabled={isSaving || upload.isUploading} data-testid="button-cancel-editor">Cancel</button><button className="admin-button admin-button-primary" type="submit" disabled={isSaving || upload.isUploading} data-testid="button-save-asset">{isSaving ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</> : <><Check className="h-4 w-4" /> {editingAsset ? 'Save changes' : 'Create asset'}</>}</button></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default Admin;