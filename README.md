# Driftrinth website

Static download page for Driftrinth, a mod manager for Orion Drift on Meta Quest. Plain HTML/CSS/JS, no build step, no trackers.

## Files
- `index.html`, `styles.css`, `script.js`, `favicon.svg`
- `fonts/` Inter woff2 files from `@fontsource/inter` 5.1.0, with `LICENSE` (SIL OFL 1.1)
- `.nojekyll` so GitHub Pages serves files as-is

## Download link
Set in one place: `DOWNLOAD_URL` at the top of `script.js` (the HTML `href`s are fallbacks for no-JS visitors).

## Deploy on GitHub Pages
1. Settings → Pages → Build and deployment → Source: **Deploy from a branch**.
2. Branch: `main`, folder: `/ (root)`, Save.
3. The site appears at `https://stripesvr.github.io/Driftrinth/`. All paths are relative, so a custom domain also works.

## Publish the APK
Releases → Draft a new release → create a tag (e.g. `v1.0.0`) → attach the file named exactly `Driftrinth.apk` → Publish (not pre-release, not draft).

## Screenshots
Screenshots live in `images/`. To add one, copy the `<figure class="shot">` in `index.html` and point it at the new file.
