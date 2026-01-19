# Halki - Fixed Point Gazing Meditation App

## Project Overview

Halki is a Trataka (fixed-point gazing) meditation app for beginners. Users focus on an animated heart while following breathing cues, with optional webcam-based eye tracking to detect blinks. Built for the HealthyGamer GG MAYke-it 2024 Hackathon.

**Live demo:** https://halki.app/
**License:** Apache 2.0

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 18 + TypeScript |
| Animation | Framer Motion |
| State | Zustand (persisted to localStorage) |
| Eye Tracking | MediaPipe FaceLandmarker |
| PWA | Workbox |
| Styling | SCSS |
| Build | Create React App (react-scripts) |

## Project Structure

```
src/
├── AppManager.tsx          # Root component, screen routing
├── screens/                # Full-page views
│   ├── TitleScreen.tsx     # Welcome/start screen
│   ├── ConfigScreen.tsx    # Settings screen
│   ├── FocusingScreen.tsx  # Main meditation session
│   └── FinishScreen.tsx    # Session completion
├── components/
│   ├── state/              # Zustand stores
│   │   ├── appProgressState.ts  # Navigation state (screen)
│   │   └── appSaveState.ts      # Persisted user preferences
│   ├── BlinkDetector.tsx   # Webcam + MediaPipe integration
│   ├── BlinkUI.tsx         # Eye state visual feedback
│   ├── Heart.tsx           # Animated focal point
│   ├── Breathing.tsx       # Breathing guide animation
│   ├── HeartAndBreath.tsx  # Animation controller
│   └── ui/                 # Generic UI components
├── utils/
│   ├── eyeDetection.ts     # Blink detection from MediaPipe data
│   ├── animation.ts        # Animation constants
│   ├── browser.ts          # Browser capability checks
│   └── lang.ts             # Cat name/pronoun strings
├── types/
│   └── global.ts           # App-wide types (TCatPattern, IFaceState)
└── font/                   # Custom pixel font (Edit Undo BRK)

public/
└── sprites/                # Cat and heart sprite images
```

## Commands

```bash
yarn install    # Install dependencies
yarn start      # Dev server at http://localhost:3000
yarn build      # Production build to /build
```

Tests are available via `react-scripts test` but no test files are currently implemented.

## Key Architecture

### State Management

Two Zustand stores manage app state:

- **Progress state** (`src/components/state/appProgressState.ts:11`): Current screen navigation
- **Save state** (`src/components/state/appSaveState.ts:25`): Persisted user preferences (eye tracking, breathing guide, calm mode, session duration, cat customization)

### Screen Flow

Defined in `src/AppManager.tsx:29-32`:
```
title → config → focusing → finish
```

### Eye Tracking

1. `BlinkDetector.tsx:44` initializes webcam
2. MediaPipe FaceLandmarker detects face landmarks
3. `eyeDetection.ts:4` analyzes blendshapes to detect blinks (threshold: 0.4)
4. `FocusingScreen.tsx` triggers fail popup if blink detected after 5-second safe period

### Accessibility

- Calm mode reduces animations (`src/AppManager.tsx:17-20` auto-enables if `prefers-reduced-motion`)
- All animations respect calm mode flag

## Key Types

- `TScreen`: `"title" | "config" | "focusing" | "finish"` (`appProgressState.ts:3`)
- `TCatPattern`: `"black" | "grey" | "calico"` (`types/global.ts`)
- `IFaceState`: Eye tracking state interface (`types/global.ts`)

## Browser Requirements

- Modern browser with WebGL support (for MediaPipe GPU acceleration)
- Webcam access required for eye tracking feature (optional)
- PWA-capable (service worker currently disabled in `src/index.tsx`)

## Additional Documentation

When working on specific features, check these files for context:

| Topic | Reference |
|-------|-----------|
| Eye tracking implementation | `src/components/BlinkDetector.tsx`, `src/utils/eyeDetection.ts` |
| Animation system | `src/utils/animation.ts`, `src/components/Heart.tsx`, `src/components/Breathing.tsx` |
| User preferences | `src/components/state/appSaveState.ts` |
| Meditation session logic | `src/screens/FocusingScreen.tsx` |
| PWA configuration | `src/service-worker.ts`, `public/manifest.json` |
