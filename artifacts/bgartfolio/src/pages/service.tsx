import { ArrowLeft, ArrowUpRight, ExternalLink, Film } from 'lucide-react';
import { Link, useRoute } from 'wouter';
import { contact, personalInfo, projects, servicePages, type Project } from '@/lib/portfolio-data';
import { getYouTubeEmbedUrl } from '@/lib/youtube';
import NotFound from '@/pages/not-found';

function ServiceProjectCard({ project }: { project: Project }) {
  const embedUrl = project.youtubeUrl ? getYouTubeEmbedUrl(project.youtubeUrl) : null;
  const imageUrl = project.imageUrl ?? project.thumbnail;
  const projectLink = project.youtubeUrl ?? project.driveUrl ?? project.link;

  return (
    <article className="service-project-card">
      <div className="service-project-media">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={project.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : project.videoUrl ? (
          <video
            src={project.videoUrl}
            controls
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />
        ) : imageUrl ? (
          <img src={imageUrl} alt={project.title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center bg-secondary font-mono-ui text-[9px] uppercase tracking-[0.15em] text-white/45">
            Add project media
          </div>
        )}
        <span className="project-index font-mono-ui">BG.</span>
      </div>
      <div className="service-project-copy">
        <div>
          <p className="font-mono-ui text-[9px] uppercase tracking-[0.18em] text-primary">{project.category}</p>
          <h2 className="mt-3 font-display text-4xl leading-none tracking-wide text-foreground">{project.title}</h2>
          <p className="mt-4 text-sm leading-6 text-white/55">{project.description}</p>
        </div>
        {projectLink && (
          <a
            href={projectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            {project.youtubeUrl ? 'Watch full piece' : 'Open project'} <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </article>
  );
}

export default function ServicePage() {
  const [, params] = useRoute<{ slug: string }>('/services/:slug');
  const service = params?.slug ? servicePages[params.slug] : undefined;

  if (!service) {
    return <NotFound />;
  }

  const selectedProjects = service.projectIds
    .map((projectId) => projects.find((project) => project.id === projectId))
    .filter((project): project is Project => Boolean(project));

  return (
    <div className="service-page film-grain min-h-[100dvh] overflow-hidden bg-background text-foreground">
      <header className="service-header">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link href="/" className="group flex items-center gap-3" data-testid="link-service-home">
            <span className="flex h-9 w-9 items-center justify-center bg-primary text-background transition-transform duration-300 group-hover:rotate-6">
              <Film className="h-4 w-4" strokeWidth={2.5} />
            </span>
            <span className="font-display text-[25px] leading-none tracking-[0.07em] text-foreground">
              BG<span className="text-primary">.</span>
            </span>
          </Link>
          <a href="/#contact" className="service-header-contact">
            Start a conversation <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      <main>
        <section className="service-hero">
          <div className="service-orbit service-orbit-one" />
          <div className="service-orbit service-orbit-two" />
          <div className="hero-grid" />
          <div className="relative z-10 mx-auto max-w-[1440px] px-5 pb-24 pt-36 sm:px-8 lg:px-12 lg:pb-32 lg:pt-48">
            <Link href="/" className="service-back-link">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to portfolio
            </Link>
            <div className="mt-16 grid gap-14 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-end lg:gap-24">
              <div>
                <p className="flex items-center gap-4 font-mono-ui text-[10px] uppercase tracking-[0.22em] text-primary">
                  <span className="h-px w-10 bg-primary" />
                  04 / The toolkit
                </p>
                <h1 className="service-title mt-8 max-w-[850px] font-display text-[clamp(5.5rem,14vw,13rem)] leading-[0.78] tracking-wide text-foreground">
                  {service.title}
                </h1>
              </div>
              <div>
                <p className="font-mono-ui text-[10px] uppercase tracking-[0.2em] text-white/40">{service.eyebrow}</p>
                <p className="mt-5 border-l border-primary/50 pl-4 text-base leading-7 text-white/65">
                  {service.intro}
                </p>
              </div>
            </div>
            <div className="mt-20 flex items-end justify-between border-t border-white/15 pt-4 font-mono-ui text-[9px] uppercase tracking-[0.2em] text-white/35">
              <span>Service / {service.slug}</span>
              <span>02 — Focus</span>
            </div>
          </div>
        </section>

        <section className="service-detail section-rule">
          <div className="mx-auto grid max-w-[1440px] gap-16 px-5 py-24 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-28 lg:px-12 lg:py-36">
            <div>
              <p className="font-mono-ui text-[10px] uppercase tracking-[0.2em] text-primary">The approach</p>
              <h2 className="mt-8 max-w-[410px] font-display text-7xl leading-[0.86] tracking-wide text-foreground sm:text-8xl">
                Make every
                <br />
                <span className="text-primary">second count.</span>
              </h2>
            </div>
            <div className="lg:pt-3">
              <p className="max-w-[700px] text-base leading-8 text-white/65 sm:text-lg sm:leading-9">{service.description}</p>
              <div className="mt-14 grid gap-0 border-t border-white/15 sm:grid-cols-2">
                {service.capabilities.map((capability, index) => (
                  <div key={capability} className="service-capability">
                    <span className="font-mono-ui text-[10px] text-primary">0{index + 1}</span>
                    <span>{capability}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="service-work section-rule">
          <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <p className="font-mono-ui text-[10px] uppercase tracking-[0.2em] text-primary">Selected work</p>
                <h2 className="mt-8 font-display text-8xl leading-[0.8] tracking-wide text-foreground sm:text-[10rem]">
                  Proof in <span className="text-accent">motion.</span>
                </h2>
              </div>
              <p className="max-w-[330px] text-sm leading-7 text-white/55 md:pb-2">
                A few pieces that show how this part of the toolkit comes together in practice.
              </p>
            </div>
            <div className="service-work-grid mt-16">
              {selectedProjects.map((project) => (
                <ServiceProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        <section className="service-cta section-rule">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-24 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-12 lg:py-32">
            <div>
              <p className="font-mono-ui text-[10px] uppercase tracking-[0.2em] text-primary">Have a story in mind?</p>
              <h2 className="mt-8 max-w-[720px] font-display text-[clamp(5rem,11vw,10rem)] leading-[0.78] tracking-wide text-foreground">
                Let&apos;s make
                <br />
                <span className="text-primary">a scene.</span>
              </h2>
            </div>
            <a href={`mailto:${contact.email}`} className="button-primary group">
              {contact.email}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <Link href="/" className="font-display text-3xl tracking-wide text-foreground">
            {personalInfo.name}<span className="text-primary">.</span>
          </Link>
          <p className="font-mono-ui text-[9px] uppercase tracking-[0.15em] text-white/35">
            {personalInfo.studio} / {service.title}
          </p>
        </div>
      </footer>
    </div>
  );
}