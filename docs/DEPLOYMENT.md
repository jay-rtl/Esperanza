# GitHub Pages deployment

Repository: https://github.com/jay-rtl/Esperanza

Intended site: https://jay-rtl.github.io/Esperanza/

The user explicitly authorized publishing to this repository. It was empty before upload. No existing remote history was overwritten. GitHub Pages uses the static Astro output; no WordPress or original-domain runtime dependency is deployed.

## Configuration

`.github/workflows/deploy.yml` builds pushes to `main`, installs locked dependencies with `npm ci`, runs the type/build/output checks and deploys the static artifact using the official GitHub actions pinned to specific commits. Set the repository Pages source to GitHub Actions. The workflow sets `SITE_URL=https://jay-rtl.github.io` and `BASE_PATH=/Esperanza/`. A shared URL helper prefixes all local routes and public assets. Root hosting remains supported with `BASE_PATH=/`.

`PUBLIC_LAUNCH_READY=false` retains noindex, disallowed robots and the empty sitemap while captions, approved legal text and integrations remain pending. Publicly hosting the review does not mean these launch requirements are resolved. Contact and guide forms remain explicit about unconfigured delivery; booking and community account links remain unconfigured.

No custom domain, DNS, email provider, analytics, database or live form service was configured. GitHub Pages hosting controls its own response headers; custom application response-header middleware is not available on this static deployment.

## Source hygiene

The public repository excludes `.env` files except `.env.example`, node_modules, generated build output, original-site reference archives, operational scripts/credentials under `.deployment/`, screenshots and raw audit results. Client assets used by the site and their font licenses are included. Git credentials are used only by the existing local credential manager and in-memory GitHub API calls; no access token is written into source, Git URLs or configuration.

## Future updates

Commit and push changes to `main`; the deployment workflow runs automatically. For a custom domain, change `SITE_URL` and `BASE_PATH` in workflow environment, then complete separately authorized DNS and domain settings. Do not enable indexing until the client approves the remaining launch requirements in `QA.md`.

## Validation

Local root and project-subdirectory builds, deployed routes/assets, fixed header/menu and staging metadata are verified during deployment. See `DEPLOYMENT-QA.md` for observed results and the final deployment state.
