# Portfolio

A personal portfolio site built from a Figma design — Vite + React + TypeScript + Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
```

## Adding your content

Every piece of copy, image, and link on the site lives in one file:
[src/content.ts](src/content.ts). Everything there starts empty on purpose —
fill in the fields and the corresponding section fills in automatically. No
other file needs to change for text/links/images.

- **Images** — drop files into `src/assets/` and import them (e.g.
  `import photo from './assets/photo.jpg'`), then point the relevant
  `content.ts` field at that import. A plain URL string also works.
- **Skill badges / social icons** — each entry needs a `slug` from
  [simple-icons](https://simpleicons.org/). Only a subset of slugs are
  currently wired into [src/components/SimpleIcon.tsx](src/components/SimpleIcon.tsx)
  (to keep the bundle small); if you need a brand that isn't listed there,
  import its `si<Name>` export from `simple-icons` into that file first.

## Build

```bash
npm run build      # outputs static files to dist/
npm run preview    # preview the production build locally
```

## Deploying for free

`dist/` is a fully static site — any static host works:

- **Vercel** — `vercel.com/new`, import the repo, framework preset "Vite", deploy.
- **Netlify** — drag-and-drop the `dist/` folder at `app.netlify.com/drop`, or connect the repo (build command `npm run build`, publish directory `dist`).
- **Cloudflare Pages** — connect the repo, build command `npm run build`, output directory `dist`.
- **GitHub Pages** — run `npm run build` and publish the `dist/` folder to a `gh-pages` branch (e.g. via the `gh-pages` npm package), or use the official Pages GitHub Action.

## Project structure

```
src/
  components/   UI building blocks (Header, Hero, Experience, SkillsOrbit, FeaturedProjects, Contact, ...)
  hooks/        useReveal (scroll-triggered fade-in), useTypewriter
  content.ts    All site copy/media/links — edit this to populate the site
  index.css     Design tokens (colors, fonts) and global styles/animations
```
