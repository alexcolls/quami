# @kwami Architecture

## 🏗️ System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         KWAMI                                │
│  (Main orchestration class)                                  │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │    BODY      │  │    MIND      │  │    SOUL      │      │
│  │  (Visual)    │  │  (AI Config) │  │ (Personality)│      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                  │                  │              │
└─────────┼──────────────────┼──────────────────┼──────────────┘
          │                  │                  │
          ▼                  ▼                  ▼
    [IMPLEMENTED]       [TODO]             [TODO]
```

## 📦 Component Structure

### 1. Core Layer (`src/core/`)

```
┌──────────────────────────────────────────────┐
│              Core Classes                     │
├──────────────────────────────────────────────┤
│                                              │
│  ┌────────────────────────────────────┐     │
│  │          Kwami.ts                  │     │
│  │  Main orchestration class          │     │
│  │  - Manages Body, Mind, Soul        │     │
│  │  - State management                │     │
│  │  - High-level API                  │     │
│  └───────────┬────────────────────────┘     │
│              │                               │
│     ┌────────┴────────┐                     │
│     │                 │                     │
│  ┌──▼──────────┐  ┌──▼──────────┐          │
│  │  Body.ts    │  │  Audio.ts   │          │
│  │  - 3D Scene │  │  - Playback │          │
│  │  - Renderer │  │  - Analysis │          │
│  │  - Camera   │  │  - Freq Data│          │
│  │  - Blob Mgmt│  │  - Volume   │          │
│  └─────────────┘  └─────────────┘          │
│                                              │
└──────────────────────────────────────────────┘
```

### 2. Blob Layer (`src/blob/`)

```
┌──────────────────────────────────────────────┐
│              Blob System                      │
├──────────────────────────────────────────────┤
│                                              │
│  ┌────────────────────────────────────┐     │
│  │          Blob.ts                   │     │
│  │  Main blob implementation          │     │
│  │  - Mesh management                 │     │
│  │  - Animation control               │     │
│  │  - Skin switching                  │     │
│  │  - Customization API               │     │
│  └───────┬──────────────┬─────────────┘     │
│          │              │                   │
│     ┌────▼────┐    ┌────▼────┐            │
│     │geometry │    │animation│            │
│     │.ts      │    │.ts      │            │
│     └─────────┘    └─────────┘            │
│          │              │                   │
│     ┌────▼────────────────────┐            │
│     │      skins/              │            │
│     │  ┌──────────┐            │            │
│     │  │tricolor/ │            │            │
│     │  │- vertex  │            │            │
│     │  │- fragment│            │            │
│     │  │- index   │            │            │
│     │  └──────────┘            │            │
│     │  ┌──────────┐            │            │
│     │  │ zebra/   │            │            │
│     │  │- vertex  │            │            │
│     │  │- fragment│            │            │
│     │  │- index   │            │            │
│     │  └──────────┘            │            │
│     └─────────────────────────┘            │
│                                              │
└──────────────────────────────────────────────┘
```

### 3. Scene Layer (`src/scene/`)

```
┌──────────────────────────────────────────────┐
│           Scene Management                    │
├──────────────────────────────────────────────┤
│                                              │
│  ┌────────────────────────────────────┐     │
│  │        setup.ts                    │     │
│  │  - Renderer creation               │     │
│  │  - Camera setup                    │     │
│  │  - Lighting configuration          │     │
│  │  - OrbitControls (optional)        │     │
│  └────────────────────────────────────┘     │
│                                              │
└──────────────────────────────────────────────┘
```

### 4. Types Layer (`src/types/`)

```
┌──────────────────────────────────────────────┐
│         TypeScript Definitions                │
├──────────────────────────────────────────────┤
│                                              │
│  - KwamiConfig                               │
│  - KwamiState                                │
│  - BodyConfig                                │
│  - AudioConfig                               │
│  - SceneConfig                               │
│  - BlobConfig                                │
│  - BlobSkinType                              │
│  - SkinConfigs (Tricolor, Zebra)            │
│  - Event types                               │
│                                              │
└──────────────────────────────────────────────┘
```

### 5. Utils Layer (`src/utils/`)

```
┌──────────────────────────────────────────────┐
│           Utility Functions                   │
├──────────────────────────────────────────────┤
│                                              │
│  ┌────────────┐  ┌────────────┐            │
│  │ randoms.ts │  │recorder.ts │            │
│  │- UUID      │  │- Speech    │            │
│  │- Numbers   │  │  synthesis │            │
│  │- Colors    │  │- Recording │            │
│  │- Boolean   │  │            │            │
│  │- DNA       │  │            │            │
│  └────────────┘  └────────────┘            │
│                                              │
└──────────────────────────────────────────────┘
```

## 🔄 Data Flow

### Audio Visualization Flow

```
┌─────────────┐
│ Audio File  │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│  HTMLAudio      │
│  Element        │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│  Web Audio      │
│  Context        │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│  AnalyserNode   │
│  (Freq Data)    │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│  Animation      │
│  Function       │
│  - Vertex       │
│    modification │
│  - Simplex      │
│    noise        │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│  Blob Mesh      │
│  (Visual Output)│
└─────────────────┘
```

### Initialization Flow

```
1. User creates Kwami instance
   └── new Kwami(canvas, config)
       │
       ├── 2. Initialize KwamiBody
       │   ├── Create scene, renderer, camera
       │   ├── Initialize KwamiAudio
       │   └── Create Blob
       │       ├── Create geometry
       │       ├── Create materials (skins)
       │       └── Start animation loop
       │
       ├── 3. Initialize Mind (TODO)
       └── 4. Initialize Soul (TODO)
```

### Animation Loop

```
┌─────────────────────────────────────────┐
│      requestAnimationFrame              │
└────────────┬────────────────────────────┘
             │
     ┌───────▼───────┐
     │ Get frequency │
     │ data from     │
     │ audio analyser│
     └───────┬───────┘
             │
     ┌───────▼────────┐
     │ Calculate noise│
     │ for each vertex│
     └───────┬────────┘
             │
     ┌───────▼────────┐
     │ Apply scale    │
     │ based on audio │
     └───────┬────────┘
             │
     ┌───────▼────────┐
     │ Update mesh    │
     │ geometry       │
     └───────┬────────┘
             │
     ┌───────▼────────┐
     │ Apply rotation │
     └───────┬────────┘
             │
     ┌───────▼────────┐
     │ Render scene   │
     └───────┬────────┘
             │
             └──► Loop back
```

## 🎯 Design Principles

### 1. Single Responsibility
Each class has one clear purpose:
- `Kwami`: Orchestration
- `KwamiBody`: Visual management
- `KwamiAudio`: Audio management
- `Blob`: 3D mesh representation

### 2. Separation of Concerns
```
Presentation Layer  → Kwami (API)
Business Logic      → Body, Audio, Blob
Data/Configuration  → Types, Config
Utilities           → Utils
```

### 3. Dependency Injection
```typescript
// Dependencies injected through constructor
const blob = new Blob({
  scene,
  camera,
  renderer,
  audio,
  // ...config
});
```

### 4. Composition over Inheritance
```
Kwami
 ├─ has-a Body
 │   ├─ has-a Audio
 │   └─ has-a Blob
 ├─ has-a Mind (TODO)
 └─ has-a Soul (TODO)
```

## 🔌 Extension Points

### Adding New Skins

1. Create shader files in `src/blob/skins/newskin/`
2. Create index.ts with material factory
3. Update `src/blob/skins/index.ts`
4. Add type to `BlobSkinType`

### Adding AI Features

1. Implement Mind in `src/core/Mind.ts`
2. Implement Soul in `src/core/Soul.ts`
3. Update Kwami class to integrate
4. Add configuration types

### Adding New Animations

1. Create animation function in `src/blob/`
2. Add to Blob class
3. Expose through API

## 📊 Module Dependencies

```
index.ts
  ├─→ core/Kwami.ts
  │     ├─→ core/Body.ts
  │     │     ├─→ core/Audio.ts
  │     │     ├─→ blob/Blob.ts
  │     │     │     ├─→ blob/geometry.ts
  │     │     │     ├─→ blob/animation.ts
  │     │     │     └─→ blob/skins/
  │     │     └─→ scene/setup.ts
  │     └─→ types/
  ├─→ utils/randoms.ts
  └─→ utils/recorder.ts
```

## 🎨 Visual Hierarchy

```
┌──────────────────────────────────────┐
│           User Code                   │
└───────────────┬──────────────────────┘
                │
┌───────────────▼──────────────────────┐
│         @kwami/core API               │
│  (Kwami, KwamiBody, KwamiAudio)      │
└───────────────┬──────────────────────┘
                │
┌───────────────▼──────────────────────┐
│      Internal Components              │
│  (Blob, Scene Setup, Skins)          │
└───────────────┬──────────────────────┘
                │
┌───────────────▼──────────────────────┐
│      THREE.js & Web APIs              │
│  (WebGL, Web Audio API)              │
└───────────────────────────────────────┘
```

---

This architecture provides a solid foundation for a maintainable, extensible, and professional library! 🚀

