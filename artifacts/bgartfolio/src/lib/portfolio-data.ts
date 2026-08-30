export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  youtubeUrl?: string;
  driveUrl?: string;
  thumbnail?: string;
  imageUrl?: string;
  videoUrl?: string;
  link?: string;
};

export type Reel = {
  id: string;
  title: string;
  category: string;
  description: string;
  youtubeUrl?: string;
  imageUrl?: string;
  videoUrl?: string;
  link?: string;
};

export type ServicePage = {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  description: string;
  capabilities: string[];
  projectIds: string[];
};

export type ContactInfo = {
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  instagram?: string;
  youtubeChannel?: string;
};

export const personalInfo = {
  name: "Bivash Gain",
  title: "Video Editor & Motion Designer",
  studio: "Bivaan Cine Edit",
  tagline:
    "Turning raw footage into polished stories — 10 years of video editing, videography, and motion graphics.",
};

export const bio = {
  heading: "About",
  paragraphs: [
    "I’m Bivash Gain, a video editor and motion designer with over a decade of hands-on experience in post-production, videography, and graphics creation.",
    "Much of my best work has been produced at Bivaan Cine Edit, my editing farm, where I’ve handled everything from color grading and sound design to motion graphics and final delivery for clients across weddings, events, short films, and promotional content.",
    "I’m comfortable across the full production pipeline — from shooting on location to cutting, polishing, and exporting content that holds attention.",
  ],
};

export const skills = [
  "Video Editing",
  "Videography",
  "Motion Graphics",
  "Color Grading",
  "Sound Design",
  "Post-Production",
  "Graphics Creation",
  "YouTube & Social Content",
];

export function getServiceSlug(label: string) {
  return label.toLowerCase().replaceAll('&', 'and').replaceAll(' ', '-');
}

export const servicePages: Record<string, ServicePage> = {
  "video-editing": {
    slug: "video-editing",
    title: "Video Editing",
    eyebrow: "Story / Rhythm / Finish",
    intro: "Raw footage, shaped into something people want to watch.",
    description:
      "From the first assembly to the final export, every cut is built around clarity, feeling, and momentum. I bring structure to long-form stories and energy to short-form content without losing the human moment.",
    capabilities: [
      "Story-first cutting and pacing",
      "Wedding, event, and documentary edits",
      "Short-form edits for YouTube and social",
      "Color grading, sound design, and final delivery",
    ],
    projectIds: ["project-1", "project-2", "project-3", "project-6"],
  },
  videography: {
    slug: "videography",
    title: "Videography",
    eyebrow: "Capture / Observe / Compose",
    intro: "Thoughtful coverage that gives the edit something real to work with.",
    description:
      "I approach production with the edit already in mind: looking for honest details, strong compositions, and the moments that give a finished film its pulse.",
    capabilities: [
      "Event and wedding coverage",
      "Location shooting and visual planning",
      "Interview and documentary-style coverage",
      "Edit-ready footage with intentional coverage",
    ],
    projectIds: ["project-1", "project-5", "project-4"],
  },
  "motion-graphics": {
    slug: "motion-graphics",
    title: "Motion Graphics",
    eyebrow: "Type / Energy / Movement",
    intro: "Graphic language that gives every frame a little more momentum.",
    description:
      "I use typography, transitions, compositing, and visual effects to make information feel immediate and give a film its own visual rhythm.",
    capabilities: [
      "Kinetic typography and title design",
      "Transitions, compositing, and visual effects",
      "Animated social assets and promotional graphics",
      "Motion systems that stay consistent across a project",
    ],
    projectIds: ["project-6", "project-3", "project-2"],
  },
  "color-grading": {
    slug: "color-grading",
    title: "Color Grading",
    eyebrow: "Tone / Texture / Atmosphere",
    intro: "A considered palette that makes the feeling of a scene land.",
    description:
      "Color is where the story gets its atmosphere. I shape contrast, skin tones, and palette so footage feels cohesive, intentional, and true to the moment.",
    capabilities: [
      "Cinematic color development",
      "Skin tone and exposure balancing",
      "Look matching across multiple cameras",
      "Final grade for web, social, and screening",
    ],
    projectIds: ["project-1", "project-4", "project-5"],
  },
  "sound-design": {
    slug: "sound-design",
    title: "Sound Design",
    eyebrow: "Listen / Layer / Land",
    intro: "The detail you feel before you notice you heard it.",
    description:
      "Music, dialogue, ambience, and small sound details work together to make edits feel physical. I build a clean, intentional sound bed that supports the cut.",
    capabilities: [
      "Dialogue cleanup and balancing",
      "Music editing and beat-driven pacing",
      "Ambience, foley, and transition effects",
      "Final mix for digital delivery",
    ],
    projectIds: ["project-1", "project-5", "project-3"],
  },
  "post-production": {
    slug: "post-production",
    title: "Post-Production",
    eyebrow: "Organise / Refine / Deliver",
    intro: "A calm, complete process from rushes to ready-to-share film.",
    description:
      "Good post-production is a series of small decisions made carefully. I keep the process organised while carrying a project through edit, graphics, grade, sound, and delivery.",
    capabilities: [
      "Media organisation and edit preparation",
      "Offline edit through picture lock",
      "Graphics, color, and sound finishing",
      "Exports sized for every final destination",
    ],
    projectIds: ["project-3", "project-4", "project-5", "project-6"],
  },
  "graphics-creation": {
    slug: "graphics-creation",
    title: "Graphics Creation",
    eyebrow: "Shape / Signal / Identity",
    intro: "Visual pieces that make a project feel recognisably yours.",
    description:
      "From clean titles to campaign-ready visuals, I create graphics that support the story, respect the brand, and remain clear at every size.",
    capabilities: [
      "Titles, lower thirds, and end cards",
      "Branded social templates",
      "Promotional layouts and visual assets",
      "Typography and graphic direction",
    ],
    projectIds: ["project-6", "project-3", "project-2"],
  },
  "youtube-and-social-content": {
    slug: "youtube-and-social-content",
    title: "YouTube & Social Content",
    eyebrow: "Hook / Hold / Share",
    intro: "Short-form stories built for the scroll without feeling disposable.",
    description:
      "I shape content around the way audiences watch now: a clear hook, purposeful pacing, strong visual beats, and versions that are ready for each platform.",
    capabilities: [
      "YouTube Shorts and vertical edits",
      "Hooks, pacing, and retention-focused structure",
      "Platform-ready crops and captions",
      "Repeatable content systems for creators and brands",
    ],
    projectIds: ["project-2", "project-7", "project-8"],
  },
};

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Wedding / Event Highlight",
    category: "Wedding / Event",
    description:
      "A cinematic highlight edit blending candid moments, music, and color grading.",
    youtubeUrl: "https://youtube.com/shorts/RxIgpfHJ6qs?si=bKULV6V6LsJ-yAcy",
  },
  {
    id: "project-2",
    title: "Social Media Short",
    category: "Social Content",
    description:
      "A fast-paced short-form edit built for YouTube Shorts and social feeds.",
    youtubeUrl: "https://youtube.com/shorts/2ilbgN4EVOU?si=uRBkFHPAlEMVjrbt",
  },
  {
    id: "project-3",
    title: "Promotional / Brand Edit",
    category: "Commercial",
    description:
      "A brand-focused promotional video combining visuals, pacing, and clean graphics.",
    youtubeUrl: "https://youtu.be/2ZsugB3Q7O8?si=8cgUfil6sLcOSqMW",
  },
  {
    id: "project-4",
    title: "Creative Film Edit",
    category: "Short Film / Creative",
    description:
      "A narrative-driven edit focused on rhythm, emotion, and visual flow.",
    youtubeUrl: "https://youtu.be/Ss-1DNglKGg?si=NmPR7R6c065YfT87",
  },
  {
    id: "project-5",
    title: "Event / Documentary Cut",
    category: "Event / Documentary",
    description:
      "Event coverage edited into a concise, shareable story.",
    youtubeUrl: "https://youtu.be/Z1Ugd1pe_P0?si=OQd36wqIgnZOJuDN",
  },
  {
    id: "project-6",
    title: "Motion / Graphics Piece",
    category: "Motion Graphics",
    description:
      "A graphics-heavy edit with typography, transitions, and visual effects.",
    youtubeUrl: "https://youtu.be/2EZ8uSAA4QY?si=2THXaOqPnScqLAGG",
  },
  {
    id: "project-7",
    title: "Additional Edit A",
    category: "Mixed",
    description: "Additional portfolio sample.",
    youtubeUrl: "https://youtu.be/iuPhOGzo1gg?si=C-ACUAOsx2U1cmbf",
  },
  {
    id: "project-8",
    title: "Additional Edit B",
    category: "Mixed",
    description: "Additional portfolio sample.",
    youtubeUrl: "https://youtu.be/CZ1MB7cG-gU?si=a1ooNTjgT46H2pjT",
  },
  {
    id: "project-9",
    title: "Additional Edit C",
    category: "Mixed",
    description: "Additional portfolio sample.",
    youtubeUrl: "https://youtu.be/dRN7CJ7WjtI?si=zvGgFy8XcSW3DnXH",
  },
  {
    id: "project-10",
    title: "Additional Edit D",
    category: "Mixed",
    description: "Additional portfolio sample.",
    youtubeUrl: "https://youtu.be/ut17Var2aB8?si=DyrvRbkUFQrOlbJ_",
  },
  {
    id: "project-11",
    title: "Drive Portfolio Sample 1",
    category: "Long-form / Drive",
    description: "A longer project hosted on Google Drive.",
    driveUrl: "https://drive.google.com/file/d/1m0__H7w55YZhg5XKi61nTBGuFvg8C-iD/view?usp=drivesdk",
  },
  {
    id: "project-12",
    title: "Drive Portfolio Sample 2",
    category: "Long-form / Drive",
    description: "A longer project hosted on Google Drive.",
    driveUrl: "https://drive.google.com/file/d/1pTzmBGAMSSqYpWgNLYCi0U4PTJB2JseR/view?usp=drivesdk",
  },
];

export const reels: Reel[] = [
  {
    id: "reel-1",
    title: "Wedding / Event Highlight",
    category: "9:16 / Event",
    description: "A vertical highlight built for fast, emotional viewing.",
    youtubeUrl: projects[0].youtubeUrl,
    link: projects[0].youtubeUrl,
  },
  {
    id: "reel-2",
    title: "Social Media Short",
    category: "9:16 / Social",
    description: "A short-form edit made for mobile-first feeds.",
    youtubeUrl: projects[1].youtubeUrl,
    link: projects[1].youtubeUrl,
  },
  // Add future portrait media here:
  // { id: "reel-3", title: "Poster", category: "9:16 / Image", description: "...", imageUrl: "/assets/poster.jpg" },
  // { id: "reel-4", title: "Vertical Film", category: "9:16 / Video", description: "...", videoUrl: "/assets/reel.mp4" },
];

export const driveFolders = [
  {
    title: "Portfolio Folder A",
    url: "https://drive.google.com/drive/folders/1MRhtp7MnGyNAawEN3_NlA5rnFOYNQrSP",
  },
  {
    title: "Portfolio Folder B",
    url: "https://drive.google.com/drive/folders/1FddlpJMcNspKa-shLU3R1nOPExRaT-6S",
  },
];

export const contact: ContactInfo = {
  email: "bivashgain@example.com",
  phone: "+91 00000 00000",
  location: "India",
  linkedin: "https://linkedin.com/in/bivashgain",
  instagram: "https://instagram.com/bivashgain",
  youtubeChannel: "https://youtube.com/@bivashgain",
};
