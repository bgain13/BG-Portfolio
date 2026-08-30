export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  youtubeUrl?: string;
  driveUrl?: string;
  thumbnail?: string;
  link?: string;
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
