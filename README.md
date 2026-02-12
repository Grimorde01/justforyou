# Just For You - Valentine's Website

A beautiful, interactive Valentine's Day website built with Vite, React, and TypeScript.

## 🌹 Features

- **Love Letter Component** - Animated envelope with opening/closing animation
- **Draggable Cards** - Interactive cards with images and messages that can be dragged around
- **Mobile Responsive** - Fully optimized for desktop and mobile devices
- **Touch Support** - Works seamlessly on touchscreen devices

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

The development server will start at `http://localhost:5173/`

## 📁 Project Structure

```
src/
├── components/       - Reusable React components
├── pages/           - Page components (for future use)
├── types/           - TypeScript type definitions
├── App.tsx          - Main app component
├── App.css          - App styles
├── main.tsx         - React entry point
└── index.css        - Global styles
public/             - Static assets
```

## 🛠️ Development

This project uses:
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool with HMR
- **CSS** - Styling (no frameworks, plain CSS)

## 📦 Deployment

This project is configured for easy deployment to Vercel:

```bash
npm run build
```

## 💝 Adding Content

### Create a Love Letter Component
Create `src/components/LoveLetter.tsx` with envelope animation

### Create Draggable Cards
Create `src/components/DraggableCard.tsx` with drag and touch support

### Add Images
Place images in the `public/` folder and import them as needed

## 📝 License

Made with ❤️
