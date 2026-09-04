# Celestial Radio

Live Ghana, Africa and world radio in the browser. Built by [Celestial Web Solutions](https://celestialwebsolutions.net) with **Next.js 16**, **TypeScript**, and **Tailwind CSS**.

## Features

- Ghana and Africa station dials, plus world search via [Radio Browser](https://radio-browser.info)
- Sticky live player with volume, mute, favourites, sleep timer, and dark/light theme
- TuneIn-style browse tiles for news, sports, music, talk, gospel, and more
- About, Terms, and Privacy overlays so audio keeps playing
- PWA install support (service worker is registered in production)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Adding stations

Edit `src/lib/stations.ts`. Add the station to `GHANA` or `AFRICA`, then drop artwork in `public/logos/` and set `favicon` to that path:

```ts
{
  id: "gh-mystation",
  name: "My Station FM",
  city: "Accra",
  country: "Ghana",
  freq: "98.7 FM",
  tags: ["music", "pop"],
  streamUrl: "https://your-stream-url/stream",
  website: "https://mystationfm.com",
  favicon: "/logos/gh-mystation.png",
}
```

Use a direct audio URL for `streamUrl` (`https://.../stream` or similar). Local files belong under `public/logos/`, not `public/logo/`.

## Project structure

```
src/
  app/            # Next.js App Router, metadata, PWA register
  components/     # Player, browse rows, footer, legal sheet, theme
  content/        # About, Terms, Privacy copy
  lib/
    stations.ts   # Ghana & Africa directory (edit here)
    browse.ts     # Browse category tiles
```

## Built by

**Celestial Web Solutions** — [celestialwebsolutions.net](https://celestialwebsolutions.net)
