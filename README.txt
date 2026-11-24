# Little Time Garden

A lightweight, offline-friendly time and study tracker.

## Included
- Stopwatch with pause/resume and session saving
- Manual time entries
- Study subjects and lessons with automatic totals
- Monthly calendar with daily detail
- Daily, 7-day, and 30-day statistics
- Activity history and filters
- JSON backup and restore
- Local-first storage; no account or server database

## Install on Android
This is a Progressive Web App. For the install prompt and offline support, serve the folder from an HTTPS website (for example, GitHub Pages), then open that website in Chrome on Android and choose **Install app** or **Add to Home screen**.

Opening `index.html` directly as a file lets you test the app, but service-worker offline caching and PWA installation require HTTPS (or localhost).

## Data and uninstalling
The app stores records in browser local storage on the device. Removing the installed PWA may not remove all browser site data in every browser. To ensure the records are gone, clear the website's stored data in browser settings. Export a backup before changing phones, clearing browser data, or uninstalling.

## Files
- `index.html`: app
- `manifest.webmanifest`: install metadata
- `sw.js`: offline cache
- `icon.svg`: app icon
