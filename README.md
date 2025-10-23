# weather-app-react

IMPORTANT — requires internet
--------------------------------
This app must be run with an active internet connection. It fetches live weather and forecast data from a remote API and will not display real-time information while offline.

Short description
-----------------
A minimal React + TypeScript weather single-page app (Vite + Tailwind). Search for a city to see current conditions and a short forecast. The code demonstrates typed API calls, a small component layout, and basic error/loading states.

Quick start
-----------
1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
```

3. Open your browser (typically http://localhost:5173)


Mockups
-------
Phone preview (public):

![phone mockup](/public/phone.png)

Desktop preview (public):

![desktop mockup](/public/laptop.png)

Note: the PNG mockups live in the project's `public/` directory as `public/mockup-phone.png` and `public/mockup-desktop.png` so they are served from the app root (e.g. `/mockup-phone.png`).

Notes
-----
- Add your API key (see `src/services/weatherApi.ts`) or an environment file before running.
- The UI will show error or offline states when the network or API is unavailable.

If you want, I can also add a `.env.example` with the expected variables or a small in-app offline banner. Which would you prefer?
