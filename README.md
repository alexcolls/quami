# Quami

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
- **Kwami** - 3D interactive AI companion library (integrated as git submodule)
  - Repository: [github.com/alexcolls/kwami](https://github.com/alexcolls/kwami)
  - Version: 2.0.0
- **Three.js** - 3D graphics rendering
- **Supabase** - Backend and authentication
- **Pinia** - State management

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

```bash
npm install
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
npm run dev
```

## Production

### Build

Build the application for production:

```bash
npm run build
```

### Preview

Locally preview production build:

```bash
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
│   ├── @kwami/              # Kwami library (git submodule)
│   ├── components/          # Vue components
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

MIT

## Links

- [Nuxt Documentation](https://nuxt.com/docs)
- [Kwami Repository](https://github.com/alexcolls/kwami)
- [Deployment Documentation](https://nuxt.com/docs/getting-started/deployment)
