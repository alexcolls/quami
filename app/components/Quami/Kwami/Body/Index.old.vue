<template>
  <div class="p-2 w-[500px] max-h-[80vh] overflow-y-auto">
    <!-- Header Actions -->
    <div class="flex justify-between items-center mb-4 gap-2">
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

    <!-- Blob Component -->
    <div class="mb-4">
      <QuamiKwamiBodyBlob />
    </div>

    <!-- Geometry & Motion -->
    <UAccordion :items="[{ label: '🧬 Geometry & Motion', slot: 'geometry' }]" class="mb-3">
      <template #geometry>
        <div class="space-y-4 p-3">
          <!-- Noise Frequency (Spikes) -->
          <div>
            <h4 class="text-sm font-semibold mb-2">Noise Frequency</h4>
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
    <UAccordion :items="[{ label: '📐 Scale & Camera', slot: 'camera' }]" class="mb-3">
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
    <UAccordion :items="[{ label: '🖌️ Material', slot: 'material' }]" class="mb-3">
      <template #material>
        <div class="space-y-4 p-3">
          <div>
            <label class="text-xs">Opacity: {{ opacity.toFixed(2) }}</label>
            <input v-model.number="opacity" type="range" min="0" max="1" step="0.01" class="w-full">
          </div>
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

    <!-- Audio Effects -->
    <UAccordion :items="[{ label: '🎵 Audio Effects', slot: 'audio' }]" class="mb-3">
      <template #audio>
        <div class="space-y-4 p-3">
          <div class="flex items-center gap-2 mb-3">
            <UCheckbox v-model="audioReactive" label="Enable Audio Reactivity" />
          </div>
          
          <div>
            <h4 class="text-sm font-semibold mb-2">Frequency Modulation</h4>
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

          <div>
            <h4 class="text-sm font-semibold mb-2">Audio Analyzer</h4>
            <div class="space-y-2">
              <div>
                <label class="text-xs">Smoothing: {{ audioEffects.smoothing.toFixed(2) }}</label>
                <input v-model.number="audioEffects.smoothing" type="range" min="0" max="1" step="0.05" class="w-full">
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

// Geometry & Motion
const spikes = ref({ x: 0.2, y: 0.2, z: 0.2 });
const time = ref({ x: 1.0, y: 1.0, z: 1.0 });
const rotation = ref({ x: 0, y: 0, z: 0 });
const resolution = ref(180);

// Scale & Camera
const scale = ref(4.0);
const camera = ref({ x: -0.9, y: 7.3, z: -1.8 });

// Material
const opacity = ref(1.0);
const shininess = ref(50);
const lightIntensity = ref(0);
const wireframe = ref(false);

// Audio Effects
const audioReactive = ref(true);
const audioEffects = ref({
  bass: 0.45,
  mid: 0.35,
  high: 0.30,
  smoothing: 0.7,
});

// Actions
const randomizeBlob = () => {
  q.body?.body.blob.setRandomBlob();
};

const exportGLTF = () => {
  q.body?.body.blob.exportGLTF();
};

const saveConfig = () => {
  if (q.body) {
    q.save(q.body);
  }
};

onMounted(() => {
  // Initialize values from blob if available
  if (q.body?.body.blob) {
    spikes.value = { ...q.body.body.blob.spikes };
    time.value = { ...q.body.body.blob.time };
    rotation.value = { ...q.body.body.blob.rotation };
    resolution.value = q.body.body.blob._resolution || 180;
  }

  // Watch spikes
  watch(spikes, (v) => {
    if (!q.body) return;
    q.body.body.blob.spikes.x = v.x;
    q.body.body.blob.spikes.y = v.y;
    q.body.body.blob.spikes.z = v.z;
  }, { deep: true });

  // Watch time
  watch(time, (v) => {
    if (!q.body) return;
    q.body.body.blob.time.x = v.x;
    q.body.body.blob.time.y = v.y;
    q.body.body.blob.time.z = v.z;
  }, { deep: true });

  // Watch rotation
  watch(rotation, (v) => {
    if (!q.body) return;
    q.body.body.blob.rotation.x = v.x;
    q.body.body.blob.rotation.y = v.y;
    q.body.body.blob.rotation.z = v.z;
  }, { deep: true });

  // Watch resolution
  watch(resolution, (v) => {
    if (!q.body) return;
    q.body.body.blob.setResolution(v);
  });

  // Watch scale
  watch(scale, (v) => {
    if (!q.body?.body.blob) return;
    q.body.body.blob.getMesh().scale.setScalar(v);
  });

  // Watch camera
  watch(camera, (v) => {
    if (!q.body?.body.camera) return;
    q.body.body.camera.position.set(v.x, v.y, v.z);
  }, { deep: true });

  // Watch wireframe
  watch(wireframe, (v) => {
    if (!q.body) return;
    q.body.body.blob.setWireframe(v);
  });

  // Watch opacity
  watch(opacity, (v) => {
    if (!q.body?.body.blob) return;
    const mesh = q.body.body.blob.getMesh();
    if (mesh.material) {
      mesh.material.opacity = v;
      mesh.material.transparent = v < 1;
    }
  });

  // Watch shininess
  watch(shininess, (v) => {
    if (!q.body?.body.blob) return;
    const mesh = q.body.body.blob.getMesh();
    if (mesh.material && 'shininess' in mesh.material) {
      mesh.material.shininess = v;
    }
  });
});
</script>
