# Esperanza Coaching Collective

An independent Astro + TypeScript website with local assets and GSAP enhancement. No WordPress, iframe, original-domain asset requests, or original form handlers. FJR attribution is discreetly included in the footer.

## Run locally

Requires Node 22.12+ (tested on Node 24.18.0) and npm.

```powershell
npm ci
$env:ASTRO_TELEMETRY_DISABLED='1'
npm run dev
```

Use the URL printed by Astro; another process may already occupy port 4321.

```powershell
npm run check
npm run build
npm test
npm run preview
```

If the sandbox blocks Node's child-process test isolation, run `node --test --test-isolation=none tests/independence.test.mjs`.

## Configuration and deployment

Copy `.env.example` to `.env`. All `PUBLIC_` values are public build-time configuration; never place credentials there. `SITE_URL` must be the final absolute HTTPS origin, without the old domain. Default output is noindex, robots disallowed and an empty sitemap. Set `PUBLIC_LAUNCH_READY=true` only after resolving the launch checklist in `docs/QA.md`.

Build with `npm run build` and upload **only `dist/`** to a static HTTPS host. Do not expose `reference/`, source, `.env`, or node_modules. Configure your host to serve directory indexes and `404.html` for missing pages. Enable compression and long-lived immutable caching for fingerprinted `/_astro/` assets. Test caching before long-lived image/font caching, since those currently use stable names. Configure host security headers: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, appropriate `Permissions-Policy`, and CSP allowing only your configured form endpoint in `connect-src`. Astro emits inline JSON-LD, so use CSP hashes for it rather than blindly blocking all inline scripts. Configure HSTS only after HTTPS is established. Hosting headers have not been deployed or validated.

GitHub Pages deployment is configured for `https://jay-rtl.github.io/Esperanza/` using `.github/workflows/deploy.yml`. See [deployment details](docs/DEPLOYMENT.md). This remains a noindex review site while the documented launch requirements are pending.

### Third-party links

The reference exposed the following accounts. Configure only after the client approves reuse:

- `PUBLIC_BOOKING_URL=https://calendly.com/esperanzacoachingcollective`
- `PUBLIC_COMMUNITY_URL=https://www.facebook.com/share/g/1ApFXondpn/`
- `PUBLIC_FJR_URL`: separately approved portfolio URL (blank by default).

These are ordinary outbound links, not embedded widgets. The default consultation CTA goes to local contact options. No fabricated booking account is used. A production CSP must also permit the small inline navigation bootstrap using a reviewed hash or nonce.

### Independent forms

See `docs/INTEGRATIONS.md`. No backend, mailing provider or guide file was supplied. Contact and guide forms have accessible validation and honest unconfigured feedback. No pretend delivery. Forms retain input in the current DOM only; no local storage, analytics, cookies or database is implemented. Hosting logs and external email provider behavior depend on the deployment.

### Assets and content

`reference/` contains the reference audit, public page HTML/text and metadata; it is excluded from the shipped build. `public/images/` contains independently hosted client material. Only the original Esperanza wordmark, portrait and story video are used. Other downloaded assets are archived under reference/assets for provenance and not shipped: `logo.png` is an Astra logo, `wordmark.png` names another person, and `botanical.png` was not verified. The source originals remain available for client review. Font families are DM Serif Display and DM Sans, sourced from Google Fonts and hosted locally; license notices are in `public/fonts/licenses/`.

Service descriptions, biography and FAQ facts are sourced from the original public website; clinical implications, credentials and geographic eligibility still require client/professional review. Editorial headlines are new design copy. There are no invented reviews or metrics. A separate source page inventory and original design concept are in `docs/PLAN.md`.

## Browser verification

```powershell
npx playwright install chromium
$env:AUDIT_URL='http://127.0.0.1:4322'
npm run audit:site
node scripts/integrations-test.mjs
```

The integration simulation currently uses the documented local preview port 4322. Screenshots and machine-readable results are written under `docs/`. See `docs/QA.md` for scope and limitations.
