<template>
  <UPopover 
    :class="['z-50', popoverClass]"
    :popper="{ placement: 'bottom-start', strategy: 'absolute' }"
  >
    <slot name="trigger">
      <UButton
        :class="[
          'relative flex items-center justify-center', // Base styling
          triggerSizeClasses, // Applies w-X h-X based on triggerSize prop
          props.modelValue,   // Applies the background color e.g., bg-red-500
          props.modelValue === 'bg-transparent' ? 'transparent-checkerboard' : '', // Checkerboard for transparent
          'border', // Base border class
          // Dynamic border color for better contrast with the selected color and background
          (isLightColor(props.modelValue) || props.modelValue === 'bg-transparent')
            ? 'border-gray-400 dark:border-gray-500' // More visible border for light/transparent swatches
            : 'border-black/20 dark:border-white/20', // Subtle border for darker swatches
        ]"
        :ui="{
          rounded: 'rounded-full',
          padding: { '2xs': 'p-0', xs: 'p-0', sm: 'p-0', md: 'p-0', lg: 'p-0', xl: 'p-0' }, // Remove all padding
          color: { gray: { link: 'text-transparent hover:text-transparent focus:text-transparent' } } // Ensure link variant doesn't show text color
        }"
        variant="link" aria-label="Open color picker"
      />
    </slot>
    <template #content>
      <UCard
        :ui="{
          base: 'overflow-hidden w-80 sm:w-96',
          ring: 'ring-1 ring-gray-200 dark:ring-gray-700 shadow-lg',
          header: { padding: 'p-3 sm:p-3' },
          body: { padding: 'p-3 sm:p-3 pt-0' },
          footer: { padding: 'p-3 sm:p-3' }
        }"
        class="bg-white dark:bg-neutral-900"
      >
        <template #header>
          <div class="text-sm font-medium text-gray-700 dark:text-gray-300">Select Color</div>
        </template>

        <div class="max-h-64 sm:max-h-72 overflow-y-auto p-0.5 custom-scrollbar">
          <div :class="['grid', colorGridClass, 'gap-1']">
            <UButton
              v-for="color in allTailwindColors"
              :key="color.class"
              :title="color.name"
              :aria-label="color.name"
              :class="[
                'p-0 border transition-all duration-100 ease-in-out focus:outline-none relative',
                'w-full h-6',
                color.class,
                isSelected(color.class) ? selectedClassesToUse : (isLightColor(color.class) ? 'border-gray-300 dark:border-gray-600' : 'border-gray-400 dark:border-gray-500'),
                color.class === 'bg-transparent' ? 'transparent-checkerboard' : '',
                !isSelected(color.class) && 'hover:opacity-80 hover:ring-1 hover:ring-offset-0 hover:ring-gray-400 dark:hover:ring-gray-500',
                buttonRoundingClass
              ]"
              @click="selectColor(color.class)"
            />
          </div>
        </div>

        <template #footer>
          <div class="space-y-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <div class="flex justify-between items-center">
              <label :for="`rgb-switch-${instanceId}`" class="text-sm text-neutral-700 dark:text-neutral-300 cursor-pointer">
                <span class="text-red-500 font-semibold">R</span><span class="text-green-500 font-semibold">G</span><span class="text-blue-500 font-semibold">B</span> Mode
              </label>
              <div class="flex items-center">
                <span class="text-xs mr-2 w-7 text-right font-medium text-gray-500 dark:text-gray-400">{{ ui.trunOnRGB ? 'ON' : 'OFF' }}</span>
                <USwitch :id="`rgb-switch-${instanceId}`" v-model="ui.trunOnRGB" @update:model-value="emitUiChanges" />
              </div>
            </div>
            <div class="flex justify-between items-center">
              <label :for="`flashlight-switch-${instanceId}`" class="text-sm text-neutral-700 dark:text-neutral-300 mr-2 cursor-pointer">
                {{ $t('flashlight') }}
              </label>
              <div class="flex items-center">
                <span class="text-xs mr-2 w-7 text-right font-medium text-gray-500 dark:text-gray-400">{{ ui.flashlight ? 'ON' : 'OFF' }}</span>
                <USwitch :id="`flashlight-switch-${instanceId}`" v-model="ui.flashlight" @update:model-value="emitUiChanges" />
              </div>
            </div>
          </div>
        </template>
      </UCard>
    </template>
  </UPopover>
</template>

<script setup lang="ts">

const props = defineProps({
  modelValue: {
    type: String,
    default: 'bg-purple-500'
  },
  uiSettings: {
    type: Object,
    default: () => ({ trunOnRGB: false, flashlight: false })
  },
  colorGridClass: {
    type: String,
    default: 'grid-cols-10 sm:grid-cols-12'
  },
  buttonRoundingClass: {
    type: String,
    default: 'rounded'
  },
  popoverClass: {
    type: String,
    default: ''
  },
  triggerSize: { // Controls the size of the default color swatch trigger
    type: String,
    default: 'md' // e.g., 'xs', 'sm', 'md', 'lg', 'xl'
  }
})

// --- Emits ---
const emit = defineEmits(['update:modelValue', 'uiChange'])

// --- Unique ID for switch labels ---
const instanceId = ref('');
onMounted(() => {
  const vm = getCurrentInstance();
  if (vm) {
    instanceId.value = String(vm.uid);
  }
});

// --- Local UI state for switches ---
const ui = reactive({
  trunOnRGB: props.uiSettings.trunOnRGB,
  flashlight: props.uiSettings.flashlight
})

watch(() => props.uiSettings, (newSettings) => {
  ui.trunOnRGB = newSettings.trunOnRGB
  ui.flashlight = newSettings.flashlight
}, { deep: true })

/**
 * Generates CSS classes for the size of the default trigger button (color swatch).
 */
const triggerSizeClasses = computed(() => {
  switch (props.triggerSize) {
    case 'xs': return 'w-6 h-6';
    case 'sm': return 'w-7 h-7';
    case 'md': return 'w-8 h-8';
    case 'lg': return 'w-9 h-9';
    case 'xl': return 'w-10 h-10';
    default: return 'w-8 h-8';
  }
});

const selectedClassesToUse = computed(() => {
  const baseSelectedClasses = 'ring-2 ring-offset-2 dark:ring-offset-neutral-900 scale-105 z-10 opacity-100';
  const lightColorRegex = /bg-(white|slate-50|gray-50|zinc-50|neutral-50|stone-50|red-50|orange-50|amber-50|yellow-50|lime-50|green-50|emerald-50|teal-50|cyan-50|sky-50|blue-50|indigo-50|violet-50|purple-50|fuchsia-50|pink-50|rose-50)/;

  if (lightColorRegex.test(props.modelValue) || props.modelValue.includes('yellow') || props.modelValue.includes('lime')) {
    return `${baseSelectedClasses} ring-gray-600 dark:ring-gray-300`;
  }
  return `${baseSelectedClasses} ring-blue-500 dark:ring-blue-400`;
});

// --- Tailwind Color Definitions ---
const tailwindColorNames = [
  'slate', 'gray', 'zinc', 'neutral', 'stone',
  'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald',
  'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple',
  'fuchsia', 'pink', 'rose'
];
const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];

const allTailwindColors = computed(() => {
  const colors = [];
  tailwindColorNames.forEach(colorName => {
    shades.forEach(shadeValue => {
      colors.push({
        name: `${colorName.charAt(0).toUpperCase() + colorName.slice(1)} ${shadeValue}`,
        class: `bg-${colorName}-${shadeValue}`,
      });
    });
  });
  colors.push({ name: 'Black', class: 'bg-black' });
  colors.push({ name: 'White', class: 'bg-white' });
  colors.push({ name: 'Transparent', class: 'bg-transparent' });
  return colors;
});

// --- Methods ---
function selectColor(colorClass) {
  emit('update:modelValue', colorClass);
}

function isSelected(colorClass) {
  return props.modelValue === colorClass;
}

function isLightColor(colorClass) {
  if (!colorClass) return false; // Handle null or undefined colorClass
  if (colorClass === 'bg-white' || colorClass === 'bg-transparent') return true;
  const lightShadesSuffixes = ['-50', '-100', '-200'];
  return lightShadesSuffixes.some(s => colorClass.endsWith(s)) ||
         colorClass.includes('yellow') || // Yellows are often light
         colorClass.includes('lime');   // Limes are often light
}

function emitUiChanges() {
  emit('uiChange', { trunOnRGB: ui.trunOnRGB, flashlight: ui.flashlight });
}

const $t = (key) => {
  if (typeof key !== 'string' || key.length === 0) return '';
  return key.charAt(0).toUpperCase() + key.slice(1);
};

</script>

<style scoped>
/* Styles for the transparent checkerboard background */
.transparent-checkerboard {
  background-image:
    linear-gradient(45deg, #ccc 25%, transparent 25%),
    linear-gradient(-45deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%),
    linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 10px 10px;
  background-position: 0 0, 0 5px, 5px -5px, -5px 0px;
}

.dark .transparent-checkerboard {
   background-image:
    linear-gradient(45deg, #555 25%, transparent 25%),
    linear-gradient(-45deg, #555 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #555 75%),
    linear-gradient(-45deg, transparent 75%, #555 75%);
}

/* Custom scrollbar styles */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1; /* Tailwind gray-300 */
  border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8; /* Tailwind gray-400 */
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: #4b5563; /* Tailwind gray-600 */
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #6b7280; /* Tailwind gray-500 */
}
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}
.dark .custom-scrollbar {
  scrollbar-color: #4b5563 transparent;
}
</style>
