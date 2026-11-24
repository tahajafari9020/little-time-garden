# Little Time Garden

A lightweight, offline-friendly study-time tracker.

## Included
- Stopwatch with pause/resume and session saving
- Manual time entries
- Subjects created in Study Garden and selected when tracking time
- Per-subject time totals and session counts
- Monthly calendar with daily detail
- Daily, 7-day, and 30-day statistics
- History with subject filtering and confirmed deletion
- JSON backup and restore from Settings
- Two selectable themes: Flower Garden and Sky & Little Adventures
- Full interface language selection: English or Persian, with right-to-left layout in Persian
- Language preference saved separately from study records and backup data
- Local-first storage; no account or server database

## Install on Android
This is a Progressive Web App. For the install prompt and offline support, serve the folder from an HTTPS website (for example, GitHub Pages), then open that website in Chrome on Android and choose **Install app** or **Add to Home screen**.

Opening `index.html` directly as a file lets you test the app, but service-worker offline caching and PWA installation require HTTPS (or localhost).

## Data and backups
The app stores records, theme choice, and language choice in browser local storage on the device. A downloaded JSON backup is saved by the browser (usually in Downloads); it is not automatically sent to cloud storage. Restore imports the selected JSON file and replaces the current app data on that device. Export a backup before changing phones or clearing browser site data.

## Files
- `index.html`: app
- `manifest.webmanifest`: install metadata
- `sw.js`: offline cache
- `icon.svg`: app icon


## Offline update (v10 service worker)
- Pre-caches the app shell (home page, HTML, manifest, and icon).
- Uses the network for page navigation when available and falls back to the cached app when offline.
- Caches successful same-origin GET resources and does not intercept third-party requests.
- Keeps cache cleanup limited to Little Time Garden's own cache names.

After uploading this version to the same HTTPS website, open the app once while online and wait for the update to install. Then test airplane mode. Existing browser local-storage data is not intentionally cleared by this update.
