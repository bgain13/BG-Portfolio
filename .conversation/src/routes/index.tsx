import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Youtube, Instagram, Linkedin, ExternalLink, Play } from "lucide-react";
import {
  personalInfo,
  bio,
  skills,
  projects,
  driveFolders,
  contact,
} from "@/lib/portfolio-data";
import { getYouTubeEmbedUrl } from "@/lib/youtube";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Bivash Gain | Video Editor & Motion Designer" },
      {
        name: "description",
        content:
          "Portfolio of Bivash Gain — video editor, videographer, and motion designer with 10 years of experience at Bivaan Cine Edit.",
      },
      {
        property: "og:title",
        content: "Bivash Gain | Video Editor & Motion Designer",
      },
      {
        property: "og:description",
        content:
          "Portfolio of Bivash Gain — video editor, videographer, and motion designer with 10 years of experience at Bivaan Cine Edit.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <WorkSection />
        <DriveSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a href="#" className="text-lg font-semibold tracking-tight">
          {personalInfo.name}
        </a>
        <nav className="hidden gap-6 text-sm font-medium md:flex">
          <a href="#about" className="text-muted-foreground hover:text-foreground">
            About
          </a>
          <a href="#work" className="text-muted-foreground hover:text-foreground">
            Work
          </a>
          <a href="#contact" className="text-muted-foreground hover:text-foreground">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="px-4 py-20 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            {personalInfo.studio}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
            {personalInfo.name}
          </h1>
          <p className="mt-2 text-xl text-primary md:text-2xl">{personalInfo.title}</p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {personalInfo.tagline}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#work"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="border-t border-border px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">{bio.heading}</h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              {bio.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8">
            <h3 className="text-lg font-semibold text-card-foreground">At a glance</h3>
            <dl className="mt-6 space-y-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Experience</dt>
                <dd className="mt-1 text-2xl font-bold text-card-foreground">10+ years</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Studio</dt>
                <dd className="mt-1 text-lg font-medium text-card-foreground">
                  {personalInfo.studio}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Focus</dt>
                <dd className="mt-1 text-lg font-medium text-card-foreground">
                  Editing, Videography & Motion Design
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section className="border-t border-border px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold tracking-tight">Services & Skills</h2>
        <div className="mt-8 flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkSection() {
  const youtubeProjects = projects.filter((p) => p.youtubeUrl);

  return (
    <section id="work" className="border-t border-border px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold tracking-tight">Selected Work</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          A curated selection of edits and motion pieces. Click any project to watch on YouTube.
        </p>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {youtubeProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const embedUrl = project.youtubeUrl ? getYouTubeEmbedUrl(project.youtubeUrl) : null;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg">
      <div className="relative aspect-video w-full bg-muted">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={project.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <Play className="h-10 w-10" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-primary">
          {project.category}
        </p>
        <h3 className="mt-2 text-lg font-semibold text-card-foreground">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">{project.description}</p>
        {project.youtubeUrl && (
          <a
            href={project.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Watch on YouTube <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}

function DriveSection() {
  const driveProjects = projects.filter((p) => p.driveUrl);

  return (
    <section className="border-t border-border px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold tracking-tight">More Work on Drive</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Longer projects and additional samples stored on Google Drive.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {driveProjects.map((project) => (
            <a
              key={project.id}
              href={project.driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-colors hover:bg-accent"
            >
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-primary">
                  {project.category}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-card-foreground">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Open in Drive <ExternalLink className="h-3.5 w-3.5" />
              </span>
            </a>
          ))}
        </div>
        <div className="mt-10 rounded-2xl border border-border bg-secondary p-6">
          <h3 className="text-lg font-semibold text-secondary-foreground">Full Portfolio Folders</h3>
          <div className="mt-4 flex flex-wrap gap-4">
            {driveFolders.map((folder) => (
              <a
                key={folder.url}
                href={folder.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                {folder.title} <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="border-t border-border px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold tracking-tight">Get in Touch</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Interested in working together? Reach out and I&apos;ll get back to you as soon as possible.
        </p>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-accent"
            >
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="font-medium text-card-foreground">{contact.email}</p>
              </div>
            </a>
            <a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-accent"
            >
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Phone</p>
                <p className="font-medium text-card-foreground">{contact.phone}</p>
              </div>
            </a>
            <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Location</p>
                <p className="font-medium text-card-foreground">{contact.location}</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8">
            <h3 className="text-lg font-semibold text-card-foreground">Connect</h3>
            <div className="mt-6 flex flex-wrap gap-3">
              {contact.youtubeChannel && (
                <SocialLink href={contact.youtubeChannel} icon={Youtube} label="YouTube" />
              )}
              {contact.instagram && (
                <SocialLink href={contact.instagram} icon={Instagram} label="Instagram" />
              )}
              {contact.linkedin && (
                <SocialLink href={contact.linkedin} icon={Linkedin} label="LinkedIn" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
    >
      <Icon className="h-4 w-4" />
      {label}
    </a>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border px-4 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
        <p>
          © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </p>
        <p>
          Crafted at {personalInfo.studio}
        </p>
      </div>
    </footer>
  );
}
