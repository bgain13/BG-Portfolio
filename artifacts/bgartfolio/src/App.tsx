import { type ComponentType, type ReactNode, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useListPublicAssets, type Asset } from '@workspace/api-client-react';
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronRight,
  ExternalLink,
  Film,
  Instagram,
  Linkedin,
  MapPin,
  Menu,
  Phone,
  Play,
  X,
  Youtube,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import Admin from '@/pages/admin';
import ServicePage from '@/pages/service';
import {
  bio,
  contact,
  driveFolders,
  personalInfo,
  projects,
  reels,
  skills,
  getServiceSlug,
  type Reel,
  type Project,
} from '@/lib/portfolio-data';
import { getYouTubeEmbedUrl } from '@/lib/youtube';
import { Link, Route, Router as WouterRouter, Switch, useLocation } from 'wouter';

const queryClient = new QueryClient();

const navItems = [
  { label: 'Reels', href: '#reels' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

function useReveal() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = root.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return rootRef;
}

function Home() {
  const pageRef = useReveal();
  const publicAssetsQuery = useListPublicAssets();
  const managedAssets = publicAssetsQuery.data ?? [];
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    document.title = 'Bivash Gain | Video Editor & Motion Designer';
    const description = 'Portfolio of Bivash Gain — video editor, videographer, and motion designer with 10 years of experience at Bivaan Cine Edit.';
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;

    const handleScroll = () => {
      const sections = navItems
        .map((item) => document.querySelector(item.href))
        .filter((section): section is Element => Boolean(section));
      const current = sections.reduce((closest, section) => {
        const distance = Math.abs(section.getBoundingClientRect().top - 130);
        return distance < closest.distance ? { id: section.id, distance } : closest;
      }, { id: 'about', distance: Number.POSITIVE_INFINITY });
      setActiveSection(current.id);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={pageRef} className="film-grain min-h-[100dvh] overflow-hidden bg-background text-foreground">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} activeSection={activeSection} />
      <main>
        <HeroSection />
        <ReelsSection managedAssets={managedAssets.filter((asset) => asset.assetType === 'reel')} />
        <AboutSection />
        <SkillsSection />
        <WorkSection managedAssets={managedAssets.filter((asset) => ['video', 'graphic', 'project'].includes(asset.assetType))} />
        <DriveSection managedAssets={managedAssets.filter((asset) => asset.assetType === 'file' || asset.assetType === 'project')} />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

function Header({
  menuOpen,
  setMenuOpen,
  activeSection,
}: {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  activeSection: string;
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#101413]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a
          href="#top"
          onClick={() => setMenuOpen(false)}
          className="group flex items-center gap-3"
          data-testid="link-home"
        >
          <span className="flex h-9 w-9 items-center justify-center bg-primary text-background transition-transform duration-300 group-hover:rotate-6">
            <Film className="h-4 w-4" strokeWidth={2.5} />
          </span>
          <span className="font-display text-[25px] leading-none tracking-[0.07em] text-foreground">
            BG<span className="text-primary">.</span>
          </span>
        </a>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => {
            const sectionId = item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                className={`nav-link ${activeSection === sectionId ? 'nav-link-active' : ''}`}
                data-testid={`link-nav-${sectionId}`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <a href="#contact" className="header-availability hidden sm:inline-flex" data-testid="link-header-contact">
          <span className="availability-dot" />
          Available for projects
        </a>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center border border-white/15 text-foreground transition-colors hover:border-primary hover:text-primary md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          data-testid="button-mobile-menu"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className={`mobile-menu md:hidden ${menuOpen ? 'mobile-menu-open' : ''}`}>
        <nav className="flex flex-col gap-1 px-5 pb-5 pt-2" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-white/10 py-3 font-display text-3xl tracking-wide text-foreground"
              data-testid={`link-mobile-nav-${item.href.slice(1)}`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-3 inline-flex items-center gap-2 font-mono-ui text-[10px] uppercase tracking-[0.15em] text-primary"
            data-testid="link-mobile-contact"
          >
            Available for projects <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </nav>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section id="top" className="hero-section relative flex min-h-[100dvh] items-end" data-testid="section-hero">
      <div className="hero-orbit hero-orbit-one" />
      <div className="hero-orbit hero-orbit-two" />
      <div className="hero-grid" />
      <div className="absolute right-6 top-[112px] hidden font-mono-ui text-[9px] uppercase tracking-[0.28em] text-white/35 lg:block">
        EST. / BIVAAN CINE EDIT
      </div>
      <div className="absolute left-5 top-1/2 hidden -translate-y-1/2 -rotate-90 font-mono-ui text-[9px] uppercase tracking-[0.28em] text-white/30 lg:block">
        CUT / COLOR / MOTION / SOUND
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-16 pt-32 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
        <div className="mb-10 flex items-center gap-4 reveal">
          <span className="h-px w-10 bg-primary" />
          <p className="font-mono-ui text-[10px] uppercase tracking-[0.22em] text-primary" data-testid="text-hero-studio">
            {personalInfo.studio}
          </p>
        </div>
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div>
            <h1 className="font-display text-[clamp(6rem,19vw,18rem)] leading-[0.75] tracking-[-0.02em] text-foreground reveal">
              <span className="block">Bivash</span>
              <span className="hero-name-outline block pl-[9vw] text-transparent">Gain</span>
            </h1>
            <div className="mt-10 flex flex-col gap-7 sm:ml-[9vw] sm:flex-row sm:items-end reveal">
              <p className="max-w-[360px] text-sm leading-7 text-white/60 sm:text-base" data-testid="text-hero-tagline">
                {personalInfo.tagline}
              </p>
              <a href="#work" className="button-primary group" data-testid="link-hero-work">
                See the work
                <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
              </a>
            </div>
          </div>
          <div className="hidden pb-1 lg:block reveal">
            <p className="font-mono-ui text-[10px] uppercase tracking-[0.2em] text-white/40">The role</p>
            <p className="mt-3 font-display text-5xl leading-none tracking-wide text-primary">
              {personalInfo.title}
            </p>
            <p className="mt-7 border-l border-primary/50 pl-4 text-xs leading-6 text-white/45">
              A decade of turning raw footage into stories with a pulse.
            </p>
          </div>
        </div>
        <div className="mt-20 flex items-end justify-between border-t border-white/15 pt-4 font-mono-ui text-[9px] uppercase tracking-[0.2em] text-white/35 reveal">
          <span>01 — Introduction</span>
          <span className="hidden sm:inline">Scroll to explore ↓</span>
          <span>India / 10 years</span>
        </div>
      </div>
    </section>
  );
}

function ReelsSection({ managedAssets }: { managedAssets: Asset[] }) {
  return (
    <section id="reels" className="reels-section section-rule" data-testid="section-reels">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end reveal">
          <div>
            <SectionMarker number="02" label="Reels" />
            <h2 className="mt-9 font-display text-8xl leading-[0.8] tracking-wide text-foreground sm:text-[10rem]">
              Small <span className="text-primary">frame.</span>
            </h2>
          </div>
          <div className="max-w-[330px] md:pb-2">
            <p className="text-sm leading-7 text-white/55">
              Vertical edits, visual posts, and quick cuts made for the way people watch now.
            </p>
            <p className="mt-4 font-mono-ui text-[9px] uppercase tracking-[0.18em] text-primary">
              Swipe or drag to explore →
            </p>
          </div>
        </div>

        <div className="reel-rail mt-14" role="list" aria-label="Portrait reels">
          {reels.map((reel, index) => (
            <ReelCard key={reel.id} reel={reel} index={index} />
          ))}
          {managedAssets.map((asset, index) => (
            <ManagedReelCard key={asset.id} asset={asset} index={reels.length + index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function publicMediaUrl(path: string | null) {
  if (!path) return null;
  return path.startsWith('/objects/') ? `/api/storage${path}` : path;
}

function ManagedReelCard({ asset, index }: { asset: Asset; index: number }) {
  const mediaUrl = publicMediaUrl(asset.mediaUrl);
  const thumbnailUrl = publicMediaUrl(asset.thumbnailUrl);
  const embedUrl = asset.externalUrl ? getYouTubeEmbedUrl(asset.externalUrl) : null;
  const openUrl = asset.externalUrl || mediaUrl;

  return (
    <article className="reel-card reveal" role="listitem" data-testid={`card-managed-reel-${asset.id}`}>
      <div className="reel-media">
        {embedUrl ? (
          <iframe src={embedUrl} title={asset.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0 h-full w-full border-0" data-testid={`iframe-managed-reel-${asset.id}`} />
        ) : mediaUrl && /\.(mp4|webm|mov|m4v)(?:$|[?#])/i.test(mediaUrl) ? (
          <video src={mediaUrl} poster={thumbnailUrl ?? undefined} controls playsInline preload="metadata" className="h-full w-full object-cover" data-testid={`video-managed-reel-${asset.id}`} />
        ) : thumbnailUrl || mediaUrl ? (
          <img src={thumbnailUrl || mediaUrl || ''} alt={asset.title} loading="lazy" className="h-full w-full object-cover" data-testid={`image-managed-reel-${asset.id}`} />
        ) : (
          <div className="flex h-full items-center justify-center bg-secondary text-center font-mono-ui text-[9px] uppercase tracking-[0.15em] text-white/45">Reel / {String(index + 1).padStart(2, '0')}</div>
        )}
        <span className="reel-index font-mono-ui">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="reel-copy">
        <div>
          <p className="font-mono-ui text-[9px] uppercase tracking-[0.18em] text-primary">{asset.category}</p>
          <h3 className="mt-3 font-display text-3xl leading-none tracking-wide text-foreground">{asset.title}</h3>
          {asset.description && <p className="mt-3 text-xs leading-5 text-white/55">{asset.description}</p>}
        </div>
        {openUrl && <a href={openUrl} target="_blank" rel="noopener noreferrer" className="project-link" data-testid={`link-managed-reel-${asset.id}`}>Open reel <ExternalLink className="h-3.5 w-3.5" /></a>}
      </div>
    </article>
  );
}

function ReelCard({ reel, index }: { reel: Reel; index: number }) {
  const embedUrl = reel.youtubeUrl ? getYouTubeEmbedUrl(reel.youtubeUrl) : null;

  return (
    <article className="reel-card reveal" role="listitem" data-testid={`card-reel-${reel.id}`}>
      <div className="reel-media">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={reel.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
            data-testid={`iframe-reel-${reel.id}`}
          />
        ) : reel.videoUrl ? (
          <video
            src={reel.videoUrl}
            controls
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
            data-testid={`video-reel-${reel.id}`}
          />
        ) : reel.imageUrl ? (
          <img
            src={reel.imageUrl}
            alt={reel.title}
            loading="lazy"
            className="h-full w-full object-cover"
            data-testid={`image-reel-${reel.id}`}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-secondary text-center font-mono-ui text-[9px] uppercase tracking-[0.15em] text-white/45">
            Add portrait media
          </div>
        )}
        <span className="reel-index font-mono-ui">0{index + 1}</span>
      </div>
      <div className="reel-copy">
        <div>
          <p className="font-mono-ui text-[9px] uppercase tracking-[0.18em] text-primary">{reel.category}</p>
          <h3 className="mt-3 font-display text-3xl leading-none tracking-wide text-foreground">{reel.title}</h3>
          <p className="mt-3 text-xs leading-5 text-white/55">{reel.description}</p>
        </div>
        {reel.link && (
          <a
            href={reel.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
            data-testid={`link-reel-${reel.id}`}
          >
            Open reel <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </article>
  );
}

function AboutSection() {
  return (
    <section id="about" className="section-shell section-rule" data-testid="section-about">
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-28">
          <div className="reveal">
            <SectionMarker number="03" label={bio.heading} />
            <h2 className="mt-10 max-w-[390px] font-display text-7xl leading-[0.88] tracking-wide text-foreground sm:text-8xl">
              Hands on.
              <br />
              <span className="text-primary">All in.</span>
            </h2>
          </div>
          <div className="reveal lg:pt-16">
            <div className="max-w-[720px] space-y-6 text-base leading-8 text-white/65 sm:text-lg sm:leading-9">
              {bio.paragraphs.map((paragraph, index) => (
                <p key={paragraph} data-testid={`text-about-paragraph-${index + 1}`}>
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-14 grid grid-cols-2 border-t border-white/15 pt-5 sm:grid-cols-3">
              <div>
                <p className="font-display text-6xl leading-none text-primary">10</p>
                <p className="mt-2 font-mono-ui text-[9px] uppercase tracking-[0.15em] text-white/40">Years in edit</p>
              </div>
              <div>
                <p className="font-display text-6xl leading-none text-foreground">01</p>
                <p className="mt-2 font-mono-ui text-[9px] uppercase tracking-[0.15em] text-white/40">Editing farm</p>
              </div>
              <div className="col-span-2 mt-8 sm:col-span-1 sm:mt-0">
                <p className="font-display text-6xl leading-none text-foreground">∞</p>
                <p className="mt-2 font-mono-ui text-[9px] uppercase tracking-[0.15em] text-white/40">Ways to tell it</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionMarker({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-3 font-mono-ui text-[10px] uppercase tracking-[0.2em]">
      <span className="text-primary">{number}</span>
      <span className="h-px w-8 bg-white/20" />
      <span className="text-white/45">{label}</span>
    </div>
  );
}

function SkillsSection() {
  return (
    <section className="skills-section section-rule" data-testid="section-skills">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="reveal">
            <SectionMarker number="04" label="The toolkit" />
            <p className="mt-7 max-w-[440px] text-sm leading-7 text-white/55">
              Every project gets the same attention to rhythm, texture, and the small decisions that make a cut feel alive.
            </p>
          </div>
          <div className="skills-ticker reveal" data-testid="list-skills">
            {skills.map((skill, index) => (
              <Link
                key={skill}
                href={`/services/${getServiceSlug(skill)}`}
                className="skill-item skill-item-link"
                data-testid={`link-skill-${index + 1}`}
                aria-label={`Open ${skill} service page`}
              >
                {skill}
                <span className="skill-star" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkSection({ managedAssets }: { managedAssets: Asset[] }) {
  const youtubeProjects = projects.filter((project) => project.youtubeUrl);

  return (
    <section id="work" className="section-shell section-rule" data-testid="section-work">
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end reveal">
          <div>
            <SectionMarker number="05" label="Selected work" />
            <h2 className="mt-9 font-display text-8xl leading-[0.8] tracking-wide text-foreground sm:text-[10rem]">
              The <span className="text-primary">cut.</span>
            </h2>
          </div>
          <p className="max-w-[330px] text-sm leading-7 text-white/55 md:pb-2">
            A selection of edits, stories, and motion pieces. Press play when you’re ready.
          </p>
        </div>
        <div className="work-grid mt-16">
          {youtubeProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
          {managedAssets.map((asset, index) => (
            <ManagedWorkCard key={asset.id} asset={asset} index={youtubeProjects.length + index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ManagedWorkCard({ asset, index }: { asset: Asset; index: number }) {
  const mediaUrl = publicMediaUrl(asset.mediaUrl);
  const thumbnailUrl = publicMediaUrl(asset.thumbnailUrl);
  const embedUrl = asset.externalUrl ? getYouTubeEmbedUrl(asset.externalUrl) : null;
  const visualUrl = thumbnailUrl || mediaUrl;
  const isVideo = asset.assetType === 'video' || asset.assetType === 'project';
  const externalUrl = asset.externalUrl || mediaUrl;
  const Icon = asset.assetType === 'graphic' ? Film : Play;

  return (
    <article className={`project-card reveal ${index === 0 ? 'project-card-featured' : ''}`} data-testid={`card-managed-project-${asset.id}`}>
      <div className="project-media">
        {embedUrl ? (
          <iframe src={embedUrl} title={asset.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0 h-full w-full border-0" data-testid={`iframe-managed-project-${asset.id}`} />
        ) : isVideo && mediaUrl ? (
          <video src={mediaUrl} poster={thumbnailUrl ?? undefined} controls playsInline preload="metadata" className="h-full w-full object-cover" data-testid={`video-managed-project-${asset.id}`} />
        ) : visualUrl ? (
          <img src={visualUrl} alt={asset.title} loading="lazy" className="h-full w-full object-cover" data-testid={`image-managed-project-${asset.id}`} />
        ) : (
          <div className="flex h-full items-center justify-center bg-secondary"><Icon className="h-10 w-10 text-primary" /></div>
        )}
        <span className="project-index font-mono-ui">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="project-copy">
        <div>
          <p className="font-mono-ui text-[9px] uppercase tracking-[0.18em] text-primary">{asset.category}</p>
          <h3 className="mt-3 font-display text-4xl leading-none tracking-wide text-foreground">{asset.title}</h3>
          {asset.description && <p className="mt-4 max-w-[430px] text-sm leading-6 text-white/55">{asset.description}</p>}
        </div>
        {externalUrl && <a href={externalUrl} target="_blank" rel="noopener noreferrer" className="project-link" data-testid={`link-managed-project-${asset.id}`}>Open project <ExternalLink className="h-3.5 w-3.5" /></a>}
      </div>
    </article>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const embedUrl = project.youtubeUrl ? getYouTubeEmbedUrl(project.youtubeUrl) : null;
  const isFeatured = index === 0;

  return (
    <article className={`project-card reveal ${isFeatured ? 'project-card-featured' : ''}`} data-testid={`card-project-${project.id}`}>
      <div className="project-media">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={project.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
            data-testid={`iframe-project-${project.id}`}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-secondary">
            <Play className="h-10 w-10 text-primary" />
          </div>
        )}
        <span className="project-index font-mono-ui">0{index + 1}</span>
      </div>
      <div className="project-copy">
        <div>
          <p className="font-mono-ui text-[9px] uppercase tracking-[0.18em] text-primary">{project.category}</p>
          <h3 className="mt-3 font-display text-4xl leading-none tracking-wide text-foreground">{project.title}</h3>
          <p className="mt-4 max-w-[430px] text-sm leading-6 text-white/55" data-testid={`text-project-description-${project.id}`}>
            {project.description}
          </p>
        </div>
        {project.youtubeUrl && (
          <a
            href={project.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
            data-testid={`link-youtube-${project.id}`}
          >
            Watch on YouTube <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </article>
  );
}

function DriveSection({ managedAssets }: { managedAssets: Asset[] }) {
  const driveProjects = projects.filter((project) => project.driveUrl);

  return (
    <section className="drive-section section-rule" data-testid="section-drive">
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <div className="reveal">
            <SectionMarker number="06" label="The archive" />
            <h2 className="mt-9 max-w-[430px] font-display text-7xl leading-[0.86] tracking-wide text-foreground sm:text-8xl">
              More work,
              <br />
              <span className="text-accent">off the reel.</span>
            </h2>
            <p className="mt-8 max-w-[360px] text-sm leading-7 text-white/55">
              Longer projects and additional samples stored on Google Drive.
            </p>
          </div>
          <div className="reveal lg:pt-14">
            <div className="drive-list">
              {driveProjects.map((project, index) => (
                <a
                  key={project.id}
                  href={project.driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="drive-item group"
                  data-testid={`link-drive-project-${project.id}`}
                >
                  <span className="font-mono-ui text-[10px] text-primary">0{index + 1}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-4xl tracking-wide text-foreground transition-colors duration-300 group-hover:text-primary">
                      {project.title}
                    </span>
                    <span className="mt-2 block text-xs text-white/45">{project.description}</span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-white/35 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
                </a>
              ))}
              {managedAssets.map((asset, index) => {
                const href = asset.externalUrl || publicMediaUrl(asset.mediaUrl);
                if (!href) return null;
                return (
                  <a key={asset.id} href={href} target="_blank" rel="noopener noreferrer" className="drive-item group" data-testid={`link-managed-archive-${asset.id}`}>
                    <span className="font-mono-ui text-[10px] text-primary">{String(driveProjects.length + index + 1).padStart(2, '0')}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-4xl tracking-wide text-foreground transition-colors duration-300 group-hover:text-primary">{asset.title}</span>
                      <span className="mt-2 block text-xs text-white/45">{asset.description || asset.category}</span>
                    </span>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-white/35 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
                  </a>
                );
              })}
            </div>
            <div className="mt-10 border-t border-white/15 pt-6">
              <p className="font-mono-ui text-[9px] uppercase tracking-[0.18em] text-white/40">Full portfolio folders</p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                {driveFolders.map((folder) => (
                  <a
                    key={folder.url}
                    href={folder.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-foreground underline decoration-white/25 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
                    data-testid={`link-drive-folder-${folder.title.toLowerCase().replaceAll(' ', '-')}`}
                  >
                    {folder.title} <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="contact-section section-rule" data-testid="section-contact">
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
        <div className="grid gap-16 lg:grid-cols-[1fr_0.8fr] lg:gap-28">
          <div className="reveal">
            <SectionMarker number="07" label="Make something" />
            <h2 className="mt-10 max-w-[700px] font-display text-[clamp(5rem,12vw,11rem)] leading-[0.78] tracking-wide text-foreground">
              Let’s make
              <br />
              <span className="text-primary">a scene.</span>
            </h2>
            <a href={`mailto:${contact.email}`} className="contact-email group" data-testid="link-contact-email">
              {contact.email}
              <ArrowUpRight className="h-7 w-7 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
          </div>
          <div className="reveal lg:pt-16">
            <p className="max-w-[380px] text-sm leading-7 text-white/55">
              Interested in working together? Reach out and I&apos;ll get back to you as soon as possible.
            </p>
            <div className="mt-10 space-y-3">
              <ContactLink href={`tel:${contact.phone.replace(/\s/g, '')}`} icon={Phone} label="Phone" value={contact.phone} testId="link-contact-phone" />
              <div className="contact-detail" data-testid="text-contact-location">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{contact.location}</span>
              </div>
            </div>
            <div className="mt-12 border-t border-white/15 pt-5">
              <p className="font-mono-ui text-[9px] uppercase tracking-[0.18em] text-white/40">Find Bivash online</p>
              <div className="mt-5 flex flex-wrap gap-5">
                {contact.youtubeChannel && (
                  <SocialLink href={contact.youtubeChannel} icon={Youtube} label="YouTube" testId="link-social-youtube" />
                )}
                {contact.instagram && (
                  <SocialLink href={contact.instagram} icon={Instagram} label="Instagram" testId="link-social-instagram" />
                )}
                {contact.linkedin && (
                  <SocialLink href={contact.linkedin} icon={Linkedin} label="LinkedIn" testId="link-social-linkedin" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactLink({
  href,
  icon: Icon,
  label,
  value,
  testId,
}: {
  href: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  testId: string;
}) {
  return (
    <a href={href} className="contact-detail contact-detail-link group" data-testid={testId}>
      <Icon className="h-4 w-4 text-primary" />
      <span>
        <span className="block font-mono-ui text-[9px] uppercase tracking-[0.16em] text-white/35">{label}</span>
        <span className="mt-1 block text-sm text-foreground transition-colors group-hover:text-primary">{value}</span>
      </span>
      <ChevronRight className="ml-auto h-4 w-4 text-white/25 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
    </a>
  );
}

function SocialLink({
  href,
  icon: Icon,
  label,
  testId,
}: {
  href: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
  testId: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="social-link group"
      data-testid={testId}
    >
      <Icon className="h-4 w-4 transition-colors group-hover:text-primary" />
      <span>{label}</span>
      <ArrowUpRight className="h-3.5 w-3.5 text-white/25 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
    </a>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10" data-testid="site-footer">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <a href="#top" className="font-display text-3xl tracking-wide text-foreground" data-testid="link-footer-home">
          Bivash Gain<span className="text-primary">.</span>
        </a>
        <p className="font-mono-ui text-[9px] uppercase tracking-[0.15em] text-white/35">
          © {new Date().getFullYear()} {personalInfo.name} / {personalInfo.studio}
        </p>
        <a href="#top" className="inline-flex items-center gap-2 font-mono-ui text-[9px] uppercase tracking-[0.15em] text-white/45 transition-colors hover:text-primary" data-testid="link-back-to-top">
          Back to top <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </footer>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/" component={Home} />
        <Route path="/services/:slug" component={ServicePage} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;