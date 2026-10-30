# Tirupati–Tirumala Photographer's Association — Static Member Directory

A React + Vite + TypeScript static website containing 461 fixed member records and 461 member portrait images extracted from the six supplied PDFs.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Static member data

- `src/data/members.json` contains all 461 fixed records.
- `public/assets/members/` contains 461 portrait images.
- `src/data/site.ts` contains association details and navigation.
- Search, filters, categories, designation pages, pagination and member profiles run entirely in the browser.
- Call and WhatsApp actions show demonstration warning modals.
- Maps actions open Google Maps search for each available extracted studio address.
- No database, backend, admin dashboard, login, upload workflow or OCR runtime is required.

## SEO

Before deployment, set `VITE_SITE_URL` and `SITE_URL` to the final public domain. Then run:

```bash
npm run generate:sitemap
npm run build
```

The sitemap includes all 461 member profile URLs.

## Source records and transcription note

The six supplied scanned PDFs contain 461 pages in total. Handwritten text is transcribed using OCR best-effort; difficult handwriting can be imperfect. All 461 page records and portrait images are included. Private biodata fields such as Aadhaar number, date of birth, blood group and family details are not included in the public data.


## Portrait and directory display refinements

- All 461 portraits are conservatively trimmed to remove thin scan borders, while preserving the full photographed person.
- Portraits are resampled to 720px height with high-quality Lanczos interpolation and light sharpening for cleaner responsive display. This does not invent missing facial detail; the original scans are low-resolution.
- Directory shows exactly 15 members per page on desktop, tablet and mobile, with responsive 3-column / 2-column layouts.
- Member card portraits use `object-fit: contain` so the complete source portrait remains visible rather than cropping off the person's head or shoulders.

- Homepage and Categories page use the four photography-category image tiles cropped from the supplied website reference.


## Final member portrait layout correction

- The portrait image now explicitly overrides the legacy generic image-cover rule, using `object-fit: contain` with higher CSS specificity and `!important` to prevent head/shoulder cropping.
- Directory cards show 4 columns on desktop, 5 columns on extra-wide screens (1500px+), 3 columns on tablets, and 2 columns on phones.
- Portrait display height is increased to preserve more of the full source photograph.


## Rich member directory experience

- The homepage member section now paginates through the entire 461-record static dataset, 15 members at a time; it no longer shows only four featured members.
- All 461 records remain available in the Members Directory with search and filters.
- Call actions use a prominent gold treatment, WhatsApp actions use a prominent green treatment, and Maps actions use blue. All call and WhatsApp actions continue to show the demo warning modal.
- Added member ID overlays, stronger card elevation, richer section heading, record counts and responsive pagination.


## Rich association presentation update

- The homepage member showcase now browses the complete 461-record static directory in 15-member pages with previous/next controls; it is not limited to a four-member featured list.
- The Members Directory independently includes all 461 fixed records with search, filters and 15-member pagination.
- Call and WhatsApp actions use prominent gold and green buttons with clear icons. They continue to show the requested demo warning modal and do not initiate calls or open WhatsApp.
- Member profile contact actions use the same high-visibility styling.
- The About Association page has been expanded into an editorial presentation covering the association identity, registration reference 719/1992, professional purpose, shared vision and values, areas of focus, service regions and the office address.
- Official facts are limited to details visible in the supplied association membership form. Purpose, vision and values are presented as community positioning, not as unverified historical achievements or claims.


## Premium uniform member cards (latest revision)

- Standardized all member cards to a single flex-column structure with fixed portrait height, designation badge, two-line name area, reserved studio and address rows, and pinned contact icon row.
- Contact actions are now icon-only buttons: gold phone for Call (demo), green WhatsApp, and blue Google Maps location. Accessible labels and hover titles are included.
- Members without a location still show a disabled location icon so card action rows remain aligned.
- Text overflow is clamped consistently so missing studio/address fields do not change card heights.
- Responsive columns: 4 desktop, 5 extra-wide screens, 3 tablet, 2 mobile.


## Category showcase refresh

- Replaced incomplete/missing category placeholders with eight dedicated, high-resolution photography cover assets (WebP), one for each category actually present in the 461 static member records.
- Category cards now have full-bleed photography, navy gradient overlays, readable labels, exact member counts, short category descriptions and arrow affordances.
- Homepage and Categories page use a four-column desktop grid, three columns on medium screens and two columns on mobile. Only the eight populated categories are rendered; no empty category tiles are fabricated.
- Added the creative positioning line: “Where imagination finds its focus” and “Imagine · Create · Capture · Preserve.”
- Simplified the main navigation to Home, About, Members, Categories, Designations and Contact, with a highlighted Member Directory action. Empty Gallery, Events and Executive Committee links are no longer in the main navigation.
- Location buttons use a red Google Maps-style pin treatment.
