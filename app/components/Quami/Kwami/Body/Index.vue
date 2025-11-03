<template>
  <div class="p-3 w-[500px] max-h-[80vh] overflow-y-auto space-y-3">
    <!-- Header Actions -->
    <div class="flex justify-between items-center gap-2">
      <UButton
        icon="i-mdi-dice-multiple"
        size="sm"
        label="Random"
        @click="randomizeBlob"
      />
      <UButton
        icon="i-heroicons-arrow-down-tray"
        size="sm"
        label="Export"
        @click="exportGLTF"
      />
      <UButton
        icon="i-mdi-refresh"
        size="sm"
        label="Reset"
        @click="resetToDefaults"
      />
    </div>

    <!-- Current DNA -->
    <div v-if="q.body?.blob?.dna" class="p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs">
      <span class="font-semibold">DNA:</span> {{ q.body.blob.dna }}
    </div>

    <!-- Blob Component -->
    <QuamiKwamiBodyBlob />

    <!-- Geometry & Motion -->
    <UAccordion :items="[{ label: '🧬 Geometry & Motion', slot: 'geometry' }]">
      <template #geometry>
        <div class="space-y-4 p-3">
          <!-- Noise Frequency (Spikes) -->
          <div>
            <h4 class="text-sm font-semibold mb-2">Noise Frequency</h4>
            <p class="text-xs text-gray-500 mb-2">Control how much the blob stretches along each axis</p>
            <div class="space-y-2">
              <div>
                <label class="text-xs">X: {{ spikes.x.toFixed(1) }}</label>
                <input v-model.number="spikes.x" type="range" min="0" max="20" step="0.1" class="w-full">
              </div>
              <div>
                <label class="text-xs">Y: {{ spikes.y.toFixed(1) }}</label>
                <input v-model.number="spikes.y" type="range" min="0" max="20" step="0.1" class="w-full">
              </div>
              <div>
                <label class="text-xs">Z: {{ spikes.z.toFixed(1) }}</label>
                <input v-model.number="spikes.z" type="range" min="0" max="20" step="0.1" class="w-full">
              </div>
            </div>
          </div>

          <!-- Animation Speed (Time) -->
          <div>
            <h4 class="text-sm font-semibold mb-2">Animation Speed</h4>
            <p class="text-xs text-gray-500 mb-2">Change how quickly the blob cycles through its movement</p>
            <div class="space-y-2">
              <div>
                <label class="text-xs">X: {{ time.x.toFixed(1) }}</label>
                <input v-model.number="time.x" type="range" min="0" max="5" step="0.1" class="w-full">
              </div>
              <div>
                <label class="text-xs">Y: {{ time.y.toFixed(1) }}</label>
                <input v-model.number="time.y" type="range" min="0" max="5" step="0.1" class="w-full">
              </div>
              <div>
                <label class="text-xs">Z: {{ time.z.toFixed(1) }}</label>
                <input v-model.number="time.z" type="range" min="0" max="5" step="0.1" class="w-full">
              </div>
            </div>
          </div>

          <!-- Auto Rotation -->
          <div>
            <h4 class="text-sm font-semibold mb-2">Auto Rotation</h4>
            <div class="space-y-2">
              <div>
                <label class="text-xs">X: {{ rotation.x.toFixed(3) }}</label>
                <input v-model.number="rotation.x" type="range" min="0" max="0.01" step="0.001" class="w-full">
              </div>
              <div>
                <label class="text-xs">Y: {{ rotation.y.toFixed(3) }}</label>
                <input v-model.number="rotation.y" type="range" min="0" max="0.01" step="0.001" class="w-full">
              </div>
              <div>
                <label class="text-xs">Z: {{ rotation.z.toFixed(3) }}</label>
                <input v-model.number="rotation.z" type="range" min="0" max="0.01" step="0.001" class="w-full">
              </div>
            </div>
          </div>

          <!-- Resolution -->
          <div>
            <h4 class="text-sm font-semibold mb-2">Mesh Detail</h4>
            <div>
              <label class="text-xs">Resolution: {{ resolution }}</label>
              <input v-model.number="resolution" type="range" min="120" max="220" step="1" class="w-full">
            </div>
          </div>
        </div>
      </template>
    </UAccordion>

    <!-- Scale & Camera -->
    <UAccordion :items="[{ label: '📐 Scale & Camera', slot: 'camera' }]">
      <template #camera>
        <div class="space-y-4 p-3">
          <!-- Global Scale -->
          <div>
            <h4 class="text-sm font-semibold mb-2">Global Scale</h4>
            <div>
              <label class="text-xs">Scale: {{ scale.toFixed(1) }}</label>
              <input v-model.number="scale" type="range" min="3" max="8" step="0.1" class="w-full">
            </div>
          </div>

          <!-- Camera Position -->
          <div>
            <h4 class="text-sm font-semibold mb-2">Camera Orbit</h4>
            <p class="text-xs text-gray-500 mb-2">Fine-tune the default camera orbit around the blob</p>
            <div class="space-y-2">
              <div>
                <label class="text-xs">X: {{ camera.x.toFixed(1) }}</label>
                <input v-model.number="camera.x" type="range" min="-20" max="20" step="0.5" class="w-full">
              </div>
              <div>
                <label class="text-xs">Y: {{ camera.y.toFixed(1) }}</label>
                <input v-model.number="camera.y" type="range" min="-20" max="20" step="0.5" class="w-full">
              </div>
              <div>
                <label class="text-xs">Z: {{ camera.z.toFixed(1) }}</label>
                <input v-model.number="camera.z" type="range" min="-20" max="30" step="0.5" class="w-full">
              </div>
            </div>
          </div>
        </div>
      </template>
    </UAccordion>

    <!-- Material Properties -->
    <UAccordion :items="[{ label: '🖌️ Material', slot: 'material' }]">
      <template #material>
        <div class="space-y-4 p-3">
          <div>
            <label class="text-xs">Shininess: {{ shininess }}</label>
            <input v-model.number="shininess" type="range" min="1" max="200" step="1" class="w-full">
          </div>
          <div>
            <label class="text-xs">Light Intensity: {{ lightIntensity.toFixed(1) }}</label>
            <input v-model.number="lightIntensity" type="range" min="0" max="5" step="0.1" class="w-full">
          </div>
          <div class="flex items-center gap-2">
            <UCheckbox v-model="wireframe" label="Wireframe Mode" />
          </div>
        </div>
      </template>
    </UAccordion>

    <!-- Background -->
    <UAccordion :items="[{ label: '🖼️ Background', slot: 'background' }]">
      <template #background>
        <div class="space-y-4 p-3">
          <div class="grid grid-cols-3 gap-2 items-center">
            <label class="text-xs">Gradient Color 1</label>
            <input v-model="bg.color1" type="color" class="col-span-2">
            <label class="text-xs">Gradient Color 2</label>
            <input v-model="bg.color2" type="color" class="col-span-2">
            <label class="text-xs">Gradient Color 3</label>
            <input v-model="bg.color3" type="color" class="col-span-2">
          </div>
          <div>
            <label class="text-xs">Gradient Style</label>
            <select v-model="bg.style" class="w-full text-xs p-1 rounded border">
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
            </select>
          </div>
          <div class="grid grid-cols-3 gap-2 items-center" v-if="bg.style === 'linear'">
            <label class="text-xs">Angle: {{ bg.angle }}</label>
            <input v-model.number="bg.angle" type="range" min="0" max="360" step="1" class="col-span-2">
            <label class="text-xs">Stop 1: {{ bg.stop1 }}</label>
            <input v-model.number="bg.stop1" type="range" min="0" max="100" step="1" class="col-span-2">
            <label class="text-xs">Stop 2: {{ bg.stop2 }}</label>
            <input v-model.number="bg.stop2" type="range" min="0" max="100" step="1" class="col-span-2">
          </div>
          <div>
            <label class="text-xs">Background Opacity: {{ bg.opacity.toFixed(2) }}</label>
            <input v-model.number="bg.opacity" type="range" min="0" max="1" step="0.01" class="w-full">
          </div>
          <div>
            <label class="text-xs">Blob Opacity: {{ blobOpacity.toFixed(2) }}</label>
            <input v-model.number="blobOpacity" type="range" min="0" max="1" step="0.01" class="w-full">
          </div>
          </div>
          <div class="flex gap-2">
            <UButton size="xs" label="Apply Gradient" @click="applyGradient" />
            <UButton size="xs" label="Transparent" @click="setTransparent" />
            <UButton size="xs" label="Clear Media" @click="clearMedia" />
          </div>
          <div class="grid grid-cols-3 gap-2 items-center">
            <label class="text-xs">Image URL</label>
            <input v-model="bg.imageUrl" type="text" placeholder="https://..." class="col-span-2 p-1 rounded border text-xs">
            <label class="text-xs">Video URL</label>
            <input v-model="bg.videoUrl" type="text" placeholder="https://..." class="col-span-2 p-1 rounded border text-xs">
          </div>
          <div class="flex gap-2">
            <UButton size="xs" label="Apply Image" @click="applyImage" />
            <UButton size="xs" label="Apply Video" @click="applyVideo" />
          </div>
        </div>
      </template>
    </UAccordion>

    <!-- Audio Effects -->
    <UAccordion :items="[{ label: '🎵 Audio Effects', slot: 'audio' }]">
      <template #audio>
        <div class="space-y-4 p-3">
          <div class="flex items-center gap-2 mb-3">
            <UCheckbox v-model="audioReactive" label="Enable Audio Reactivity" />
          </div>
          
          <!-- Frequency Modulation -->
          <div>
            <h4 class="text-sm font-semibold mb-2">Frequency Modulation</h4>
            <p class="text-xs text-gray-500 mb-2">Boost how strongly each frequency band pushes the blob</p>
            <div class="space-y-2">
              <div>
                <label class="text-xs">Bass Movement: {{ audioEffects.bass.toFixed(2) }}</label>
                <input v-model.number="audioEffects.bass" type="range" min="0" max="1" step="0.05" class="w-full">
              </div>
              <div>
                <label class="text-xs">Mid Flow: {{ audioEffects.mid.toFixed(2) }}</label>
                <input v-model.number="audioEffects.mid" type="range" min="0" max="1" step="0.05" class="w-full">
              </div>
              <div>
                <label class="text-xs">High Detail: {{ audioEffects.high.toFixed(2) }}</label>
                <input v-model.number="audioEffects.high" type="range" min="0" max="1" step="0.05" class="w-full">
              </div>
            </div>
          </div>

          <!-- Time Modulation -->
          <div>
            <h4 class="text-sm font-semibold mb-2">Time Modulation</h4>
            <p class="text-xs text-gray-500 mb-2">Control how audio affects animation speed</p>
            <div class="flex items-center gap-2 mb-2">
              <UCheckbox v-model="audioEffects.timeEnabled" label="Enable (Can be chaotic)" />
            </div>
            <div class="space-y-2">
              <div>
                <label class="text-xs">Mid → Speed: {{ audioEffects.midTime.toFixed(1) }}</label>
                <input v-model.number="audioEffects.midTime" type="range" min="0" max="2" step="0.1" class="w-full">
              </div>
              <div>
                <label class="text-xs">High → Speed: {{ audioEffects.highTime.toFixed(1) }}</label>
                <input v-model.number="audioEffects.highTime" type="range" min="0" max="2" step="0.1" class="w-full">
              </div>
              <div>
                <label class="text-xs">Ultra → Speed: {{ audioEffects.ultraTime.toFixed(2) }}</label>
                <input v-model.number="audioEffects.ultraTime" type="range" min="0" max="2" step="0.1" class="w-full">
              </div>
            </div>
          </div>

          <!-- Audio Analyzer -->
          <div>
            <h4 class="text-sm font-semibold mb-2">Audio Analyzer</h4>
            <div class="space-y-2">
              <div>
                <label class="text-xs">FFT Size: {{ fftSize }}</label>
                <select v-model.number="fftSize" class="w-full text-xs p-1 rounded border">
                  <option :value="512">512 (Fast, Low Res)</option>
                  <option :value="1024">1024 (Balanced)</option>
                  <option :value="2048">2048 (Default)</option>
                  <option :value="4096">4096 (High Res)</option>
                </select>
              </div>
              <div>
                <label class="text-xs">Smoothing: {{ audioEffects.smoothing.toFixed(2) }}</label>
                <input v-model.number="audioEffects.smoothing" type="range" min="0" max="1" step="0.05" class="w-full">
              </div>
            </div>
          </div>
        </div>
      </template>
    </UAccordion>

    <!-- Interaction -->
    <UAccordion :items="[{ label: '👆 Interaction', slot: 'interaction' }]">
      <template #interaction>
        <div class="space-y-4 p-3">
          <!-- Touch/Click Effects -->
          <div>
            <h4 class="text-sm font-semibold mb-2">Touch/Click Effects</h4>
            <div class="flex items-center gap-2 mb-2">
              <UCheckbox v-model="clickInteraction" label="Enable Click Interaction" />
            </div>
            <div class="space-y-2">
              <div>
                <label class="text-xs">Touch Strength: {{ touchStrength.toFixed(1) }}</label>
                <input v-model.number="touchStrength" type="range" min="0.1" max="2" step="0.1" class="w-full">
              </div>
              <div>
                <label class="text-xs">Touch Duration: {{ touchDuration }}ms</label>
                <input v-model.number="touchDuration" type="range" min="500" max="3000" step="100" class="w-full">
              </div>
              <div>
                <label class="text-xs">Max Touch Points: {{ maxTouches }}</label>
                <input v-model.number="maxTouches" type="range" min="1" max="10" step="1" class="w-full">
              </div>
            </div>
          </div>

          <!-- State Transitions -->
          <div>
            <h4 class="text-sm font-semibold mb-2">State Transitions</h4>
            <div class="space-y-2">
              <div>
                <label class="text-xs">Transition Speed: {{ transitionSpeed.toFixed(2) }}</label>
                <input v-model.number="transitionSpeed" type="range" min="0.01" max="0.2" step="0.01" class="w-full">
              </div>
              <div>
                <label class="text-xs">Thinking Duration: {{ thinkingDuration }}s</label>
                <input v-model.number="thinkingDuration" type="range" min="3" max="30" step="1" class="w-full">
              </div>
            </div>
          </div>
        </div>
      </template>
    </UAccordion>

    <!-- Save Button -->
    <div class="mt-4">
      <CommonBtnGradient
        :label="$t('save')"
        icon="i-mdi-content-save"
        class="w-full"
        @click="saveConfig"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { q } = useStore();

// Default values
const DEFAULT_VALUES = {
  spikes: { x: 0.2, y: 0.2, z: 0.2 },
  time: { x: 1, y: 1, z: 1 },
  rotation: { x: 0, y: 0, z: 0 },
  scale: 4.0,
  resolution: 180,
  shininess: 50,
  wireframe: false,
  opacity: 1,
  camera: { x: -0.9, y: 7.3, z: -1.8 },
};

// Geometry & Motion
const spikes = ref({ x: 0.2, y: 0.2, z: 0.2 });
const time = ref({ x: 1.0, y: 1.0, z: 1.0 });
const rotation = ref({ x: 0, y: 0, z: 0 });
const resolution = ref(180);
const colors = ref({ x: '#ff0066', y: '#00ff66', z: '#6600ff' });

// Scale & Camera
const scale = ref(4.0);
const camera = ref({ x: -0.9, y: 7.3, z: -1.8 });

// Material
const blobOpacity = ref(1.0);
const shininess = ref(50);
const lightIntensity = ref(0);
const wireframe = ref(false);

// Background
const bg = reactive({
  color1: '#667eea',
  color2: '#764ba2',
  color3: '#f093fb',
  style: 'linear' as 'linear' | 'radial',
  angle: 90,
  stop1: 50,
  stop2: 100,
  opacity: 1,
  imageUrl: '',
  videoUrl: '',
});

// Audio Effects
const audioReactive = ref(true);
const fftSize = ref(2048);
const audioEffects = ref({
  bass: 0.45,
  mid: 0.35,
  high: 0.30,
  smoothing: 0.7,
  timeEnabled: false,
  midTime: 0.2,
  highTime: 0.3,
  ultraTime: 0.15,
});

// Interaction
const clickInteraction = ref(true);
const touchStrength = ref(1.0);
const touchDuration = ref(1100);
const maxTouches = ref(5);
const transitionSpeed = ref(0.05);
const thinkingDuration = ref(10);

// Actions
const randomizeBlob = () => {
  if (!q.body?.body?.blob) return;
  
  // Save current skin and scale
  const currentSkin = q.body.body.blob.getCurrentSkin();
  const currentScale = scale.value;
  
  // Randomize the blob
  q.body.body.blob.setRandomBlob();
  
  // Restore scale
  const mesh = q.body.body.blob.getMesh();
  mesh.scale.setScalar(currentScale);
  
  // Restore the skin
  q.body.body.blob.setSkin(currentSkin);
  
  // Update UI from blob
  updateAllControlsFromBlob();
};

const exportGLTF = () => {
  if (!q.body?.body?.blob) return;
  q.body.body.blob.exportGLTF();
};

const resetToDefaults = () => {
  if (!q.body?.body?.blob) return;
  
  const blob = q.body.body.blob;
  const mesh = blob.getMesh();
  
  // Apply defaults
  blob.setSpikes(DEFAULT_VALUES.spikes.x, DEFAULT_VALUES.spikes.y, DEFAULT_VALUES.spikes.z);
  blob.setTime(DEFAULT_VALUES.time.x, DEFAULT_VALUES.time.y, DEFAULT_VALUES.time.z);
  blob.setRotation(DEFAULT_VALUES.rotation.x, DEFAULT_VALUES.rotation.y, DEFAULT_VALUES.rotation.z);
  mesh.scale.setScalar(DEFAULT_VALUES.scale);
  blob.setResolution(DEFAULT_VALUES.resolution);
  blob.setShininess(DEFAULT_VALUES.shininess);
  blob.setWireframe(DEFAULT_VALUES.wireframe);
  
  // Reset camera position
  if (q.body.body) {
    const cam = q.body.body.getCamera();
    cam.position.set(DEFAULT_VALUES.camera.x, DEFAULT_VALUES.camera.y, DEFAULT_VALUES.camera.z);
    cam.lookAt(0, 0, 0);
  }
  
  // Update UI
  updateAllControlsFromBlob();
};

const saveConfig = () => {
  if (q.body) {
    q.save(q.body);
  }
};

// Background actions
const applyGradient = () => {
  if (!q.body?.body) return;
  const colors = [bg.color1, bg.color2, bg.color3];
  const stops = [0, bg.stop1 / 100, Math.max(bg.stop1 / 100, bg.stop2 / 100)];
  if (bg.style === 'radial') {
    q.body.body.setBackgroundGradient(colors, { direction: 'radial', stops, opacity: bg.opacity });
  } else {
    q.body.body.setBackgroundGradient(colors, { angle: bg.angle, stops, opacity: bg.opacity });
  }
};
const setTransparent = () => {
  q.body?.body.setBackgroundTransparent();
};
const clearMedia = () => {
  q.body?.body.clearBackgroundMedia();
};
const applyImage = () => {
  if (bg.imageUrl) q.body?.body.setBackgroundImage(bg.imageUrl, { opacity: bg.opacity });
};
const applyVideo = () => {
  if (bg.videoUrl) q.body?.body.setBackgroundVideo(bg.videoUrl, { opacity: bg.opacity, autoplay: true, loop: true, muted: true });
};

const updateAllControlsFromBlob = () => {
  if (!q.body?.body?.blob) return;
  
  const blob = q.body.body.blob;
  const mesh = blob.getMesh();
  
  // Update from blob (direct property access)
  spikes.value = { ...blob.spikes };
  time.value = { ...blob.time };
  rotation.value = { ...blob.rotation };
  colors.value = { ...blob.colors };
  
  // Get scale from mesh
  scale.value = mesh.scale.x;
  
  // Get material & opacity
  const material = mesh.material as any;
  wireframe.value = material.wireframe || false;
  blobOpacity.value = typeof material.opacity === 'number' ? material.opacity : (q.body.body.blob.getOpacity?.() ?? 1.0);
  shininess.value = material.uniforms?.shininess?.value || 50;
  lightIntensity.value = 0;
  
  // Update camera
  if (q.body.body) {
    const cam = q.body.body.getCamera();
    camera.value = {
      x: cam.position.x,
      y: cam.position.y,
      z: cam.position.z,
    };
  }
};

onMounted(() => {
  // Initialize values from blob if available
  if (q.body?.body?.blob) {
    updateAllControlsFromBlob();
    // Initialize background as transparent
    q.body?.body.setBackgroundTransparent();
  }

  // Watch spikes
  watch(spikes, (v) => {
    if (!q.body?.body?.blob) return;
    q.body.body.blob.setSpikes(v.x, v.y, v.z);
  }, { deep: true });

  // Watch time
  watch(time, (v) => {
    if (!q.body?.body?.blob) return;
    q.body.body.blob.setTime(v.x, v.y, v.z);
  }, { deep: true });

  // Watch rotation
  watch(rotation, (v) => {
    if (!q.body?.body?.blob) return;
    q.body.body.blob.setRotation(v.x, v.y, v.z);
  }, { deep: true });

  // Watch resolution
  watch(resolution, (v) => {
    if (!q.body?.body?.blob) return;
    q.body.body.blob.setResolution(v);
  });

  // Watch scale
  watch(scale, (v) => {
    if (!q.body?.body?.blob) return;
    const mesh = q.body.body.blob.getMesh();
    mesh.scale.setScalar(v);
  });

  // Watch camera
  watch(camera, (v) => {
    if (!q.body?.body) return;
    const cam = q.body.body.getCamera();
    cam.position.set(v.x, v.y, v.z);
    cam.lookAt(0, 0, 0);
  }, { deep: true });

  // Interaction-related watchers
  watch(touchStrength, (v) => {
    if (!q.body?.body?.blob) return;
    q.body.body.blob.touchStrength = v;
  });
  watch(touchDuration, (v) => {
    if (!q.body?.body?.blob) return;
    q.body.body.blob.touchDuration = v;
  });
  watch(maxTouches, (v) => {
    if (!q.body?.body?.blob) return;
    q.body.body.blob.maxTouchPoints = v;
  });
  watch(transitionSpeed, (v) => {
    if (!q.body?.body?.blob) return;
    q.body.body.blob.transitionSpeed = v;
  });
  watch(thinkingDuration, (v) => {
    if (!q.body?.body?.blob) return;
    // store seconds to ms internally for parity
    q.body.body.blob.thinkingDuration = v * 1000;
  });

  // Watch wireframe
  watch(wireframe, (v) => {
    if (!q.body?.body?.blob) return;
    q.body.body.blob.setWireframe(v);
  });

  // Watch blob opacity
  watch(blobOpacity, (v) => {
    if (!q.body?.body?.blob) return;
    q.body.body.blob.setOpacity(v);
  });

  // Watch shininess
  watch(shininess, (v) => {
    if (!q.body?.body?.blob) return;
    q.body.body.blob.setShininess(v);
  });

  // Watch light intensity
  watch(lightIntensity, (v) => {
    if (!q.body?.body?.blob) return;
    q.body.body.blob.setLightIntensity?.(v);
  });

  // Audio effects and interaction features are not yet implemented in core
  // These watchers can be added when the core supports them
});
</script>
