# Performance measurement

Lighthouse 13.5.0, local production preview on Windows, mobile 412×823 emulation, simulated throttling (150 ms RTT, approximately 1.6 Mbps, 4× CPU slowdown). Run recorded 2026-10-28T09:20:21.233Z. Single final lab run; this does not measure real-user 75th percentile Core Web Vitals or INP.

| Check | Status | Observed result |
|---|---|---|
| LCP target ≤2.5 seconds | PASS | 2.5 s; raw 2452 ms |
| CLS target ≤0.1 | PASS | 0 |
| Mobile Lighthouse run | PASS | Performance 97, Accessibility 100, Best Practices 100, SEO 66 |
| Field CWV/INP | NOT TESTED | No deployment or field dataset |

TBT: 0 ms. TBT is a lab metric, not INP. SEO is intentionally reduced because the review site disallows indexing. No score is a legal, accessibility or security certification.

The initial CLS was 0.12; early navigation enhancement and font preloading removed that shift. The mobile portrait mask was removed to avoid delaying the main image; the portrait is compressed, fonts are locally hosted and declared in the same stylesheet, and the video has no preload. The tested LCP/CLS lab targets passed in this run; deployed performance remains to be measured.
