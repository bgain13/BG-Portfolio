# Portfolio Plan: Bivash Gain — Video Editor & Motion Designer

## Goal
Build a clean, professional, single-click-shareable personal portfolio website that showcases 10 years of video editing, videography, and graphics work under the Bivaan Cine Edit editing farm.

## What we will build
A responsive one-page portfolio website at `/` with these sections:

1. **Hero** — Name, title, short value proposition, and a primary call-to-action.
2. **Selected Work** — A curated grid of projects. YouTube videos will embed directly; local-drive work will be represented by thumbnails with links or upload prompts.
3. **Services / Skills** — Clear labels for video editing, videography, motion graphics, color grading, and post-production.
4. **About** — A short bio highlighting 10 years of experience and the Bivaan Cine Edit background.
5. **Contact / Footer** — Email, phone, and social links so interviewers can reach you in one click.

## Content strategy
- YouTube links you provide will be embedded as playable cards.
- For files currently only on your local drive, we will create project cards with titles, descriptions, and thumbnail placeholders. You can later replace thumbnails with exported frames or upload videos to YouTube/Vimeo and swap the links.
- We will include a "Bivaan Cine Edit" studio credit in the About section.

## Design direction
- Clean and professional.
- Light-first palette using the existing Tailwind theme, with a subtle accent color for CTAs.
- Generous whitespace, clear typography, and a simple grid for project cards.
- Mobile-first responsive layout.

## Technical approach
- Replace the placeholder `src/routes/index.tsx` with the portfolio homepage.
- Add a portfolio data file (`src/lib/portfolio-data.ts`) so projects and contact details are easy to update without touching UI code.
- Use Tailwind CSS design tokens from `src/styles.css`; no hardcoded colors.
- Keep YouTube embeds privacy-friendly using `youtube-nocookie.com`.
- Add unique SEO metadata (title, description, OG tags) to the home route.

## Steps
1. Create `src/lib/portfolio-data.ts` with sample projects, skills, contact info, and bio.
2. Rewrite `src/routes/index.tsx` as the portfolio page using the data file.
3. Add route-level `head()` metadata for "Bivash Gain | Video Editor & Motion Designer".
4. Verify the build and preview the page.
5. Publish the site so you can share the link with one click.

## Notes for you
- Gather 3–6 YouTube links you want featured first.
- If you have exported thumbnails/frames from local projects, share them and we will upload them as assets.
- Decide on the best contact email/phone and any social links (LinkedIn, Instagram, YouTube channel) to include.
