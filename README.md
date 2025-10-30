# 🌕 quami

A 3D interactive AI companion application powered by Nuxt.js and the Kwami library.

## Overview

Quami provides an immersive 3D experience featuring an AI companion with:

- **Interactive 3D Visualization** - Real-time morphing blob with audio reactivity
- **Voice Interaction** - Natural conversation capabilities with text-to-speech and speech-to-text
- **Dynamic Appearance** - Customizable skins and visual effects
- **Wallet Integration** - Blockchain connectivity for digital asset management
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
  - Version: 0.5.1
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

## Kwami Submodule

The Kwami library is integrated as a git submodule at `app/@kwami/`. 

### Update Kwami

To update to the latest version of Kwami:

```bash
cd app/@kwami
git pull origin main
cd ../..
git add app/@kwami
git commit -m "⬆️ Update kwami submodule"
```

### Working with Kwami

The application imports Kwami components using the `~/@kwami` alias:

```typescript
import { Kwami } from '~/@kwami';
import audioFiles from '~/@kwami/assets/audio';
```

For Kwami documentation, see [app/@kwami/README.md](app/@kwami/README.md).

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

### 3D Companion

- Real-time morphing blob visualization
- Audio-reactive animations
- Multiple skin options (tricolor, zebra)
- Customizable colors and effects

### AI Interaction

- Voice input via speech recognition
- Text-to-speech responses
- Natural language processing
- Conversation history

### User Management

- Email authentication via Supabase
- Wallet connection (Solana)
- Profile management
- Session persistence

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

## Links

- [Nuxt Documentation](https://nuxt.com/docs)
- [Kwami Repository](https://github.com/alexcolls/kwami)
- [Deployment Documentation](https://nuxt.com/docs/getting-started/deployment)
