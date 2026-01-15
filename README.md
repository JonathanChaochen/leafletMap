# Leaflet Map Project

A modern, responsive map application built with **React 18**, **Vite**, and **Leaflet**.

## Features

- 🗺 **Interactive Map**: Standard zooming and panning.
- 📍 **Locate Me**: Quickly find your current location with high accuracy.
- 🛰 **Satellite Layers**: Switch between Mapbox Streets and Esri High-Res Satellite imagery.
- ⚡ **Fast Performance**: Powered by Vite for instant server start and optimized builds.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd leafletMap
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Building for Production

To create a production-ready build:

```bash
npm run build
```

The output will be in the `dist/` folder, ready to be deployed to Netlify, Vercel, or any static host.

## Deployment

### Netlify

This project includes a `netlify.toml` for easy deployment.
1. Connect your repository to Netlify.
2. The build settings should automatically be detected:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`

## Technologies

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [React Leaflet](https://react-leaflet.js.org/)
- [Styled Components](https://styled-components.com/)
