# Portfolio

A single-page portfolio website built with React, HTML, CSS, and JavaScript. Deployed via GitHub Pages.

## Sections

- **Home** — Hero with interactive particle background
- **About** — Bio and skills grid
- **Projects** — Project showcase cards
- **Contact** — Contact form and footer

## Local Development

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

1. Create a GitHub repository named `Portfolio` (or update `base` in `vite.config.js` to match your repo name).
2. Push this code to the repository.
3. Run:

```bash
npm run deploy
```

This builds the site and publishes the `dist` folder to the `gh-pages` branch.

4. In your GitHub repo settings, set **Pages** source to the `gh-pages` branch.

Your site will be live at `https://<username>.github.io/Portfolio/`.

## Customization

Edit `src/data/content.js` to update your name, bio, skills, projects, and social links.

Add project screenshots by placing images in `public/` and setting the `image` field in the projects array.
