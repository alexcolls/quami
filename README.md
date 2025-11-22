# 🔮 quami

> **Note:** Quami is currently under development. A "Coming Soon" landing page is deployed at [quami.io](https://quami.io) with the following roadmap:
> - **July 2026**: Public Alpha release
> - **September 2026**: Beta release
> - **January 2027**: v1.0 Stable release
>
> Meanwhile, you can explore our Web3 app at [kwami.io](https://kwami.io), which launches mainnet in January 2025.

Quami is a Web OS that integrates Kwami—a fully customizable 3D AI (blob) with conversational AI and an MCP app connector—across your mainstream apps. It enables private and anonymous data access and interaction through a beautiful, fully customizable glass UI with Kwami at the center.
## Overview

Quami integrates Kwami with your mainstream apps to deliver a private, OS-like experience:

- **Quami (this repo):** The Web OS layer providing privacy-first app connectors and a glassmorphic system UI with Kwami at the center.
- **Kwami ([github.com/alexcolls/kwami](https://github.com/alexcolls/kwami)):** An independent 3D AI engine—fully customizable morphing blob with conversational AI and an MCP app connector; even the canvas background is configurable.

Quami provides an immersive 3D experience featuring an AI companion with:

- **Interactive 3D Visualization** - Real-time morphing blob with audio reactivity
- **Voice Interaction** - Natural conversation capabilities with text-to-speech and speech-to-text
- **Dynamic Appearance** - Customizable skins and visual effects
- **App Connectors** - Integrations with mainstream apps via privacy-first connectors (including MCP)
- **Privacy & Anonymity** - Permissioned, privacy-by-design data access and interaction
- **Multi-language Support** - i18n support for English, French, and Spanish

## Architecture

Quami is built on:

- **Nuxt.js 4** - Modern Vue.js framework
- **Kwami** (`@kwami`) - 3D interactive AI companion library (independent module, integrated as git submodule)
  - Repository: [github.com/alexcolls/kwami](https://github.com/alexcolls/kwami)
  - Version: 2.0.0
  - **Independent, reusable module** that can be used in other projects
- **@alexcolls/nuxt-ux** - Layout and Common UI components library (npm package)
  - Repository: [github.com/alexcolls/nuxt-ux](https://github.com/alexcolls/nuxt-ux)
  - NPM: [@alexcolls/nuxt-ux](https://www.npmjs.com/package/@alexcolls/nuxt-ux)
  - Version: 0.6.0
  - 67+ reusable UI components with Common prefix
  - **Independent, reusable Nuxt module** for rapid UI development
- **Three.js** - 3D graphics rendering
- **Supabase** - Backend and authentication
- **Pinia** - State management

## Runtime & Package Manager

This project supports multiple JavaScript runtimes and package managers:

- **Bun** (recommended - default used by alexcolls) - Fast all-in-one JavaScript runtime
- **Deno** - Secure TypeScript/JavaScript runtime
- **Node.js** - Traditional JavaScript runtime

You can use any of these runtimes with their respective package managers:

```bash
# Using Bun (recommended)
bun install
bun run dev

# Using Deno
deno install
deno task dev

# Using Node.js/npm
npm install
npm run dev
```

**Note:** Throughout this README, commands are shown with all three options. Use whichever runtime you prefer, though Bun is recommended for optimal performance.

## Setup

### Clone with Submodules

To clone Quami with all submodules:

```bash
git clone --recurse-submodules git@github.com:alexcolls/quami.git
cd quami
```

### Initialize Submodules (if already cloned)

If you've already cloned the repository, initialize the submodules:

```bash
git submodule update --init --recursive
```

### Install Dependencies

Choose your preferred package manager:

```bash
# Using Bun (recommended - default for alexcolls)
bun install
# or
bun i

# Using Deno
deno install
# or
deno i

# Using npm (Node.js)
npm install
# or
npm i
```

### Environment Configuration

Create a `.env` file based on `.env.sample`:

```bash
cp .env.sample .env
```

Configure your environment variables:

- `NUXT_SB_URL` - Supabase project URL
- `NUXT_SB_PUBLIC` - Supabase anon/public key
- `NUXT_SB_KEY` - Supabase service role key
- `NUXT_ELEVEN_LABS_KEY` - ElevenLabs API key for TTS

## Development

Start the development server on `http://localhost:3000`:

```bash
# Using Bun (recommended)
bun run dev

# Using Deno
deno task dev

# Using npm (Node.js)
npm run dev
```

## Production

### Build

Build the application for production:

```bash
# Using Bun (recommended)
bun run build

# Using Deno
deno task build

# Using npm (Node.js)
npm run build
```

### Preview

Locally preview production build:

```bash
# Using Bun
bun run preview

# Using Deno
deno task preview

# Using npm
npm run preview
```

## Submodules

### Kwami Submodule

The Kwami library is integrated as a git submodule at `app/modules/@kwami/`.

#### Update Kwami

To update to the latest version of Kwami:

```bash
cd app/modules/@kwami
git pull origin main
cd ../../..
git add app/modules/@kwami
git commit -m "⬆️ Update kwami submodule"
```

#### Working with Kwami

The application imports Kwami using the `@kwami` alias:

```typescript
import { Kwami } from '@kwami';
import audioFiles from '@kwami/assets/audio';
```

For Kwami documentation, see [app/modules/@kwami/README.md](app/modules/@kwami/README.md).

## UI Components

### @alexcolls/nuxt-ux

All Common UI components are provided by the `@alexcolls/nuxt-ux` npm package:

- 67+ reusable components (buttons, modals, loaders, etc.)
- Auto-imported with `Common` prefix (e.g., `<CommonBtn>`, `<CommonMagicWindow>`)
- Includes i18n support (en, es, fr)
- Dark mode support
- Fully typed with TypeScript

Components are automatically available in your templates:

```vue
<template>
  <CommonMagicWindow title="Hello">
    <CommonBtn label="Click me" @click="handleClick" />
  </CommonMagicWindow>
</template>
```

## Project Structure

```
quami/
├── app/
│   ├── components/          # Vue components
│   ├── modules/             # Git submodules
│   │   └── @kwami/          # Kwami library (git submodule)
│   ├── stores/              # Pinia stores
│   ├── locales/             # i18n translations
│   └── types/               # TypeScript definitions
├── server/                  # Nuxt server API routes
├── public/                  # Static assets
└── nuxt.config.ts          # Nuxt configuration
```

## Features

### 🎨 3D Companion (Kwami)

- Real-time morphing blob visualization with Three.js
- Audio-reactive animations
- Multiple skin options (tricolor, tricolor2, zebra)
- Customizable appearance:
  - Geometry & Motion (spikes, time, rotation, resolution)
  - Scale & Camera controls
  - Material properties (opacity, shininess, wireframe)
  - Audio effects (frequency modulation)
  - Interaction settings
- Export as GLB/GLTF
- DNA-based randomization

### 🤖 AI Interaction (Coming Soon)

- Voice input via speech recognition
- Text-to-speech responses via ElevenLabs
- Natural language processing
- Conversation history

### 👤 User Management

- Email authentication via Supabase
- Profile management
- Session persistence with Pinia

### 🎨 UI Components

- 67+ reusable components from @alexcolls/nuxt-ux
- Responsive design with Tailwind CSS
- Dark mode support
- Multi-language (en, es, fr)

## License

**Dual License** - This project is available under two licenses:

### Non-Commercial / Personal Use
For personal, educational, and non-commercial use, this software is licensed under the **Apache License 2.0**.

You are free to:
- Use, copy, and modify the software
- Distribute the software
- Use it for personal projects and learning

### Commercial / Business Use
For commercial use, including:
- Use in commercial products or services
- Use by for-profit organizations  
- Use that generates revenue or commercial advantage

You **MUST obtain a separate commercial license**.

**To obtain a commercial license, contact:**
- Alex Colls: [github.com/alexcolls](https://github.com/alexcolls)

### Disclaimer
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. See the [LICENSE](./LICENSE) file for full terms.

---

**Copyright (c) 2025 Alex Colls**

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## Links

- [Nuxt 4 Documentation](https://nuxt.com/docs)
- [Kwami Repository](https://github.com/alexcolls/kwami)
- [@alexcolls/nuxt-ux](https://www.npmjs.com/package/@alexcolls/nuxt-ux)
- [Supabase Documentation](https://supabase.com/docs)
- [Deployment Documentation](https://nuxt.com/docs/getting-started/deployment)
