# Florida Construction Venture

Responsive HVAC website built with Vue and Vite.

## Run locally

Run `npm install` if dependencies are missing, then `npm run dev`.

Run `npm run build` for the production files in `dist`. Configure static hosting to serve `index.html` for application routes such as `/services/ac-repair`.

## Contact details

The phone and email in `src/data/site.js` are samples requested by the owner. The contact page explicitly identifies them as samples. The form prepares an email draft or downloads a text request; there is no server submission or booking backend.

When official contact details arrive, replace the shared values and update the sample notices in `ContactView.vue` and `SiteFooter.vue`. Connect a form endpoint if direct online submission is needed.

All nine services are defined in `src/data/services.js`. Photo sources are listed in `ASSET-CREDITS.md`. Images and the DM Sans font are served locally.
