# Website photography

## Current website identity

Company name: **FL CONSTRUCTION VENTURE**. The shield, F, and upward-arrow symbol in `public/brand-symbol.svg` was redrawn as a clean vector from the user's supplied reference, using the website's navy `#193d59` and orange `#e9773e`. The same symbol is used in the favicon, header, footer, and standalone error pages. Earlier logo exploration PDFs and exports are historical concepts.

## Hero background video

Update: the active hero now uses the original Arno Senoner rooftop photograph below with CSS zoom/pan animation, following the user's preference. This is animated photography, not video footage or animated fan blades. The Pexels clip below is retained as an unused alternative.

- `public/videos/hvac-hero.mp4` — "Spinning Air Ventilation", Eduardo Cano Photo Co., Pexels: https://www.pexels.com/video/spinning-air-ventilation-5327934/
- Download: https://videos.pexels.com/video-files/5327934/5327934-hd_1920_1080_30fps.mp4
- Pexels license (checked 2026-11-18): https://www.pexels.com/license/ — free website use and modification permitted. The clip is illustrative stock footage, not company equipment or work.
- Local 1080p MP4, approximately 4 MB, played muted and looped. The existing hero photograph is used when reduced motion/data saving is enabled, or the video cannot load. A pause/play control is available.

## Photos

The photos are illustrative stock photography, not company staff or completed jobs.

- hvac-repair.jpg — José Andrés Pacheco Cortes, Pexels: https://www.pexels.com/photo/repairman-repairing-a-air-conditioner-5463587/
- hvac-service.jpg — José Andrés Pacheco Cortes, Pexels: https://www.pexels.com/photo/man-repairing-cables-in-a-car-6471913/
- hvac-installation.jpg — Kathleen Austin Kuhn, Pexels: https://www.pexels.com/photo/technician-inspecting-outdoor-hvac-unit-32497161/
- about-team.jpg — Gustavo Fring, Pexels: https://www.pexels.com/photo/architects-looking-at-blueprint-6285152/
- contact-support.jpg — MART PRODUCTION, Pexels: https://www.pexels.com/photo/a-woman-wearing-a-headset-7709252/
- ac-installation.jpg — Andrianto Cahyono Putro, Unsplash: https://unsplash.com/photos/an-air-conditioning-unit-mounted-on-a-wall-ItJsBJlf5Qw
- emergency-ac-repair.jpg — José Andrés Pacheco Cortes, Pexels: https://www.pexels.com/photo/man-repairing-an-aircon-5463580/
- ductless-mini-split.jpg — NEOSiAM, Pexels: https://www.pexels.com/photo/wall-mounted-air-conditioner-in-modern-interior-38788452/
- air-ducts.jpg — Lillian Katrine Kofod, Pexels: https://www.pexels.com/photo/photo-of-the-ceiling-with-steel-pipes-12658691/
- indoor-air-quality.jpg — Fujiphilm, Unsplash: https://unsplash.com/photos/a-white-air-conditioner-sitting-under-a-table-oodKiqDIyCE
- commercial-hvac.jpg — Arno Senoner, Unsplash: https://unsplash.com/photos/industrial-cooling-fans-on-a-rooftop-cU_hS2TlDZI
- service-areas.jpg — Nick Adams, Pexels: https://www.pexels.com/photo/aerial-shot-of-houses-in-town-12569258/

Photos are downloaded locally from the photographers' stock listings. They have been visually checked for the intended subject; stock-page titles are not always technically accurate. Each of the nine service detail pages uses its own photograph. Background crops are controlled by `imagePosition` in `src/data/services.js`; overview-page crops are set on the page hero.

`public/images/thumbs/` holds 240px-wide copies of the nine service photos for the Services menu in the header. Regenerate a thumbnail when its service photo changes.

Licenses: https://www.pexels.com/license/ and https://unsplash.com/license

Reference website for information structure: https://floridaairandheat.com/
Company name, nationwide scope, and the nine-service list were supplied by the user.
Phone and email are intentionally marked samples. Update src/data/site.js when real details are available.

DM Sans variable font: https://github.com/google/fonts/tree/main/ofl/dmsans
The SIL Open Font License is included in public/fonts/OFL.txt.

