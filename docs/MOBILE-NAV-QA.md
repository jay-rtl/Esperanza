# Mobile-only menu correction

## Implemented

The animated menu toggle appears only at viewport widths of 760px or less. Wider screens use ordinary desktop navigation, now including Why Esperanza and Reviews so no main page depends on the hidden mobile menu. The fixed header is retained.

If an open mobile menu is resized to desktop, it closes immediately, releases the scroll lock and moves focus to the active desktop link. The mobile entrance/exit animations, Escape behavior and reduced-motion alternative remain available.

Changed `src/styles/global.css`, `src/layouts/Layout.astro`, `src/scripts/site.ts`, and the meaningful responsive checks in `scripts/menu-test.mjs`.

## Design review

Retained the Esperanza brand, typography, colors and fixed-header design. Desktop header screenshots were inspected at 1440px and 768px. The desktop header now contains the six main page links; compact widths use tighter navigation spacing. Mobile retains the existing two-line animated toggle.

## Audit matrix

| Category / subcheck | Status | Scope and evidence |
|---|---|---|
| Functionality | PASS | Desktop route navigation, mobile menu, Escape, repeated open/close, scroll/focus restoration and resize cleanup in Chromium |
| SEO | PASS | Three output/metadata tests pass; page metadata, staging guard and independent runtime output retained |
| Responsive/Visual | PASS | Widths 1440, 1024, 768, 761 use desktop links with hidden toggle; 760, 390, 320 use mobile menu; no tested horizontal overflow |
| Accessibility — navigation subset | PASS | Mobile focus wrapping, Escape/focus restoration, reduced motion, modal axe checks and focus transfer after resizing |
| Accessibility — existing video captions | FAIL | Verified captions and reviewed transcript remain pending |
| Security/Privacy — frontend output | PASS | No new endpoint or collection; output-independence tests passed |
| Security/Privacy — backend/legal | NOT TESTED | Existing unavailable backend and privacy approvals remain pending |
| Performance | NOT TESTED | No fresh Lighthouse or field measurement for this scoped navigation correction |
| Code/Regression | PASS | Type check/build successful; three output tests and seven responsive navigation cases |

## Tests run

Windows, Node 24.18.0, Astro 7.4.2, Playwright Chromium 156.

- `npm run check`: zero errors, warnings and hints.
- `npm run build`: 11 HTML routes generated.
- `node --test --test-isolation=none tests/independence.test.mjs tests/metadata.test.mjs`: three passed.
- `node scripts/menu-test.mjs`: desktop/mobile breakpoint, fixed header, anchors, modal accessibility, local links and resize behavior tested at seven widths.

## Outstanding items

No new navigation-specific blocker. Safari/Firefox, physical devices and actual browser zoom were not tested. Existing content, captions, guide/integration and privacy launch requirements are unchanged; see `QA.md`.

## Launch readiness

**READY FOR REVIEW.** This correction is intended for the already authorized GitHub Pages deployment, with indexing disabled and existing integration limitations retained.

## Next action

Refresh the deployed page. Desktop displays the full navigation; mobile displays the animated menu toggle.
