<template>
  <div class="coming-soon-container">
    <!-- Background -->
    <div class="bg-gradient" />
    
    <!-- Kwami Blob Canvas -->
    <div class="blob-container">
      <canvas id="kwami-canvas" />
    </div>
    
    <!-- Content -->
    <div class="content">
      <div class="logo">
        <h1 class="title">🔮 QUAMI</h1>
      </div>
      
      <div class="message">
        <h2 class="subtitle">Coming Soon</h2>
        <p class="description">
          The Web2 revolution is on its way
        </p>
        
        <div class="timeline">
          <div class="timeline-item">
            <span class="emoji">🚀</span>
            <div>
              <div class="date">July 2026</div>
              <div class="version">Public Alpha</div>
            </div>
          </div>
          
          <div class="timeline-item">
            <span class="emoji">🎯</span>
            <div>
              <div class="date">September 2026</div>
              <div class="version">Beta Release</div>
            </div>
          </div>
          
          <div class="timeline-item">
            <span class="emoji">✨</span>
            <div>
              <div class="date">January 2027</div>
              <div class="version">v1.0 Stable</div>
            </div>
          </div>
        </div>
        
        <div class="cta">
          <p class="meanwhile">Meanwhile, explore our Web3 app</p>
          <a href="https://kwami.io" target="_blank" class="kwami-link">
            <span class="link-emoji">👻</span>
            <span>kwami.io</span>
            <span class="link-subtitle">Launching mainnet January 2025</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';

let kwami: any = null;

onMounted(async () => {
  try {
    // Dynamically import Kwami
    const { Kwami } = await import('kwami');
    
    const canvas = document.getElementById('kwami-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    
    // Initialize Kwami with similar config to kwami.io
    kwami = new Kwami(canvas, {
      body: {
        initialSkin: 'Poles',
        blob: {
          resolution: 180,
          colors: {
            x: '#667eea',
            y: '#764ba2',
            z: '#f093fb'
          },
          scale: 4.0
        },
        scene: {
          cameraPosition: { x: -0.9, y: 7.3, z: -1.8 }
        }
      }
    });
    
    // Set transparent background
    kwami.body.setBackgroundTransparent();
    kwami.body.clearBackgroundMedia?.();
    
    // Randomize blob appearance
    kwami.body.blob.setRandomBlob();
    kwami.body.blob.setScale(4.0);
    
    // Set to idle state with gentle animation
    kwami.setState('idle');
    
  } catch (error) {
    console.error('Failed to initialize Kwami:', error);
  }
});

onBeforeUnmount(() => {
  // Clean up Kwami instance
  if (kwami?.dispose) {
    kwami.dispose();
  }
});
</script>

<style scoped>
.coming-soon-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  z-index: 0;
}

.blob-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

#kwami-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  padding: 2rem;
  max-width: 600px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.logo {
  margin-bottom: 2rem;
}

.title {
  font-size: 4rem;
  font-weight: 800;
  margin: 0;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.05em;
}

.subtitle {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.description {
  font-size: 1.25rem;
  margin: 0 0 2.5rem 0;
  opacity: 0.95;
  font-weight: 300;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  text-align: left;
}

.timeline-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  backdrop-filter: blur(5px);
  transition: transform 0.2s, background 0.2s;
}

.timeline-item:hover {
  transform: translateX(8px);
  background: rgba(255, 255, 255, 0.2);
}

.timeline-item .emoji {
  font-size: 2rem;
  min-width: 2rem;
}

.timeline-item .date {
  font-size: 0.875rem;
  opacity: 0.9;
  font-weight: 500;
}

.timeline-item .version {
  font-size: 1.125rem;
  font-weight: 600;
}

.cta {
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.meanwhile {
  font-size: 1rem;
  margin: 0 0 1.5rem 0;
  opacity: 0.9;
  font-weight: 400;
}

.kwami-link {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.25rem 2.5rem;
  background: rgba(255, 255, 255, 0.25);
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 16px;
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 700;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.kwami-link:hover {
  transform: translateY(-4px) scale(1.05);
  background: rgba(255, 255, 255, 0.35);
  border-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
}

.link-emoji {
  font-size: 2.5rem;
  animation: float 3s ease-in-out infinite;
}

.link-subtitle {
  font-size: 0.875rem;
  font-weight: 400;
  opacity: 0.9;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Mobile responsive */
@media (max-width: 768px) {
  .content {
    padding: 1.5rem;
    max-width: 90%;
  }
  
  .title {
    font-size: 3rem;
  }
  
  .subtitle {
    font-size: 2rem;
  }
  
  .description {
    font-size: 1rem;
  }
  
  .timeline-item .emoji {
    font-size: 1.5rem;
  }
  
  .timeline-item .date {
    font-size: 0.75rem;
  }
  
  .timeline-item .version {
    font-size: 1rem;
  }
  
  .kwami-link {
    font-size: 1.25rem;
    padding: 1rem 2rem;
  }
  
  .link-emoji {
    font-size: 2rem;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .content {
    background: rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.15);
  }
  
  .timeline-item {
    background: rgba(0, 0, 0, 0.2);
  }
  
  .timeline-item:hover {
    background: rgba(0, 0, 0, 0.3);
  }
  
  .kwami-link {
    background: rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.3);
  }
  
  .kwami-link:hover {
    background: rgba(0, 0, 0, 0.4);
    border-color: rgba(255, 255, 255, 0.5);
  }
}
</style>
