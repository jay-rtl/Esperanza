# Fixed header — scoped delivery audit

## Implemented

`src/styles/global.css`: fixed the shared header to the top on every route, reserved its responsive height above page content, and offset anchors and sticky sidebars below it. `src/scripts/site.ts`: a ResizeObserver synchronizes the offset with the actual header height when viewport or text sizing changes, with CSS defaults when JavaScript is disabled. The observer disconnects on page exit.

## Design review

Retained the existing Esperanza identity, opaque cream background and fine border. The native menu remains above the fixed header in the dialog top layer. The initial viewport retains its previous composition through reserved header space. Scrolled desktop and mobile screenshots are stored as `docs/screenshots/fixed-header-*.png`.

## Audit matrix

| Category / subcheck | Status | Evidence / scope |
|---|---|---|
| Functionality | PASS | Fixed header while scrolled, initial content clearance, anchor offset, menu open/close, local navigation and scroll/focus restoration tested at four viewport sizes |
| SEO | PASS | Three output/metadata checks passed: unique page metadata and headings, independent output, staging indexing guard |
| Responsive/Visual | PASS | Browser checks at 1440, 768, 390 and 320px; scrolled screenshots inspected at desktop and mobile widths |
| Accessibility — header/menu | PASS | Menu focus wrapping, Escape, focus restoration, reduced motion and modal axe scans passed at tested sizes |
| Accessibility — existing video captions | FAIL | Verified captions/transcript remain missing; unrelated to this header change |
| Security/Privacy — frontend output | PASS | Output independence tests passed; no new endpoint, dependency, credential or data collection introduced |
| Security/Privacy — deployed/legal | NOT TESTED | Production backend, headers and legal approvals remain unavailable |
| Performance — new lab measurement | NOT TESTED | Lighthouse not rerun for this scoped header adjustment; earlier measurements apply to the previous build |
| Code/Regression | PASS | TypeScript check, static production build, three output tests and fixed-header/menu browser checks |

## Tests run

Windows, Node 24.18.0, Astro 7.4.2, Playwright Chromium 156, local production preview `http://127.0.0.1:4322/`.

- `npm run check`: zero errors, warnings and hints.
- `npm run build`: 11 HTML pages generated.
- `node --test --test-isolation=none tests/independence.test.mjs tests/metadata.test.mjs`: 3 passed.
- `node scripts/menu-test.mjs`: checks fixed header at scroll position 800px, reserved initial space, service-anchor clearance, menu animation, focus wrapping/restoration, Escape, repeated opening/closing, local route navigation and reduced motion at four sizes.

## Outstanding items

No new header-specific blocker identified. Safari/Firefox, physical devices, actual browser zoom and new field/lab performance were not tested. Existing captions, testimonials, guide files, live integrations, final domain and privacy approvals remain pending; see `QA.md`.

## Launch readiness

**READY FOR REVIEW**. This scoped change is implemented; the broader project still has the documented launch requirements. No deployment occurred.

## Next action

Refresh the local preview and scroll any page; the header stays visible. Check the service chapter links and animated menu from a scrolled position.
