<template>
  <UPopover class="z-50" :ui="{ content: `bg-${ui.color[ui.isDark ? 'dark' : 'light'].background} dark:bg-${ui.color[ui.isDark ? 'dark' : 'light'].background} rounded-lg` }">
    <UButton 
      class="w-5 h-5 rounded-full border z-50"
      :class="`bg-${ui.color[props.theme].background} hover:bg-${ui.color[props.theme].background} dark:bg-${ui.color[props.theme].background} dark:hover:bg-${ui.color[props.theme].background}`"
    />
    <template #content>
      <div class="p-2 px-4">
        <div class="gap-x-2">
          <div :class="ui.isDark ? 'hidden' : ''">
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-white bg-white"
              @click="() => updateColor('white', '')"
            />
            <div class="hidden border-white shadow-white text-white" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-gray-50 bg-gray-50"
              @click="() => updateColor('gray', '50')"
            />
            <div class="hidden border-gray-50 shadow-gray-50 text-gray-50" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-gray-100 bg-gray-100"
              @click="() => updateColor('gray', '100')"
            />
            <div class="hidden border-gray-100 shadow-gray-100 text-gray-100" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-gray-200 bg-gray-200"
              @click="() => updateColor('gray', '200')"
            />
            <div class="hidden border-gray-200 shadow-gray-200 text-gray-200" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-gray-300 bg-gray-300"
              @click="() => updateColor('gray', '300')"
            />
            <div class="hidden border-gray-300 shadow-gray-300 text-gray-300" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-gray-400 bg-gray-400"
              @click="() => updateColor('gray', '400')"
            />
            <div class="hidden border-gray-400 shadow-gray-400 text-gray-400" />
          </div>
          <UButton
            class="hidden h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-gray-500 bg-gray-500"
            @click="() => updateColor('gray', '500')"
          />
          <div class="hidden border-gray-500 shadow-gray-500 text-gray-500" />
          <div :class="ui.isDark ? '' : 'hidden'">
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-gray-600 bg-gray-600"
              @click="() => updateColor('gray', '600')"
            />
            <div class="hidden border-gray-600 shadow-gray-600 text-gray-600" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-gray-700 bg-gray-700"
              @click="() => updateColor('gray', '700')"
            />
            <div class="hidden border-gray-700 shadow-gray-700 text-gray-700" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-gray-800 bg-gray-800"
              @click="() => updateColor('gray', '800')"
            />
            <div class="hidden border-gray-800 shadow-gray-800 text-gray-800" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-gray-900 bg-gray-900"
              @click="() => updateColor('gray', '900')"
            />
            <div class="hidden border-gray-900 shadow-gray-900 text-gray-900" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-gray-950 bg-gray-950"
              @click="() => updateColor('gray', '950')"
            />
            <div class="hidden border-gray-950 shadow-gray-950 text-gray-950" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-black bg-black"
              @click="() => updateColor('black', '')"
            />
            <div class="hidden border-black shadow-black text-black" />
          </div>
        </div>
        <div class="space-x-2 mt-1">
          <div :class="ui.isDark ? 'hidden' : ''">
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-white bg-white"
              @click="() => updateColor('white', '')"
            />
            <div class="hidden border-white shadow-white text-white" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-zinc-50 bg-zinc-50"
              @click="() => updateColor('zinc', '50')"
            />
            <div class="hidden border-zinc-50 shadow-zinc-50 text-zinc-50" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-zinc-100 bg-zinc-100"
              @click="() => updateColor('zinc', '100')"
            />
            <div class="hidden border-zinc-100 shadow-zinc-100 text-zinc-100" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-zinc-200 bg-zinc-200"
              @click="() => updateColor('zinc', '200')"
            />
            <div class="hidden border-zinc-200 shadow-zinc-200 text-zinc-200" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-zinc-300 bg-zinc-300"
              @click="() => updateColor('zinc', '300')"
            />
            <div class="hidden border-zinc-300 shadow-zinc-300 text-zinc-300" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-zinc-400 bg-zinc-400"
              @click="() => updateColor('zinc', '400')"
            />
            <div class="hidden border-zinc-400 shadow-zinc-400 text-zinc-400" />
          </div>
          <UButton
            class="hidden h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-zinc-500 bg-zinc-500"
            @click="() => updateColor('zinc', '500')"
          />
          <div class="hidden border-zinc-500 shadow-zinc-500 text-zinc-500" />
          <div :class="ui.isDark ? '' : 'hidden'">
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-zinc-600 bg-zinc-600"
              @click="() => updateColor('zinc', '600')"
            />
            <div class="hidden border-zinc-600 shadow-zinc-600 text-zinc-600" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-zinc-700 bg-zinc-700"
              @click="() => updateColor('zinc', '700')"
            />
            <div class="hidden border-zinc-700 shadow-zinc-700 text-zinc-700" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-zinc-800 bg-zinc-800"
              @click="() => updateColor('zinc', '800')"
            />
            <div class="hidden border-zinc-800 shadow-zinc-800 text-zinc-800" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-zinc-900 bg-zinc-900"
              @click="() => updateColor('zinc', '900')"
            />
            <div class="hidden border-zinc-900 shadow-zinc-900 text-zinc-900" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-zinc-950 bg-zinc-950"
              @click="() => updateColor('zinc', '950')"
            />
            <div class="hidden border-zinc-950 shadow-zinc-950 text-zinc-950" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-black bg-black"
              @click="() => updateColor('black', '')"
            />
            <div class="hidden border-black shadow-black text-black" />
          </div>
        </div>
        <div class="space-x-2 mt-1">
          <div :class="ui.isDark ? 'hidden' : ''">
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-white bg-white"
              @click="() => updateColor('white', '')"
            />
            <div class="hidden border-white shadow-white text-white" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-neutral-50 bg-neutral-50"
              @click="() => updateColor('neutral', '50')"
            />
            <div class="hidden border-neutral-50 shadow-neutral-50 text-neutral-50" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-neutral-100 bg-neutral-100"
              @click="() => updateColor('neutral', '100')"
            />
            <div class="hidden border-neutral-100 shadow-neutral-100 text-neutral-100" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-neutral-200 bg-neutral-200"
              @click="() => updateColor('neutral', '200')"
            />
            <div class="hidden border-neutral-200 shadow-neutral-200 text-neutral-200" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-neutral-300 bg-neutral-300"
              @click="() => updateColor('neutral', '300')"
            />
            <div class="hidden border-neutral-300 shadow-neutral-300 text-neutral-300" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-neutral-400 bg-neutral-400"
              @click="() => updateColor('neutral', '400')"
            />
            <div class="hidden border-neutral-400 shadow-neutral-400 text-neutral-400" />
          </div>
          <UButton
            class="hidden h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-neutral-500 bg-neutral-500"
            @click="() => updateColor('neutral', '500')"
          />
          <div class="hidden border-neutral-500 shadow-neutral-500 text-neutral-500" />
          <div :class="ui.isDark ? '' : 'hidden'">
            <UButton
              class="hidden h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-neutral-600 bg-neutral-600"
              @click="() => updateColor('neutral', '600')"
            />
            <div class="hidden border-neutral-600 shadow-neutral-600 text-neutral-600" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-neutral-700 bg-neutral-700"
              @click="() => updateColor('neutral', '700')"
            />
            <div class="hidden border-neutral-700 shadow-neutral-700 text-neutral-700" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-neutral-800 bg-neutral-800"
              @click="() => updateColor('neutral', '800')"
            />
            <div class="hidden border-neutral-800 shadow-neutral-800 text-neutral-800" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-neutral-850 bg-neutral-850"
              @click="() => updateColor('neutral', '900')"
            />
            <div class="hidden border-neutral-850 shadow-neutral-850 text-neutral-850" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-neutral-900 bg-neutral-900"
              @click="() => updateColor('neutral', '900')"
            />
            <div class="hidden border-neutral-900 shadow-neutral-900 text-neutral-900" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-neutral-950 bg-neutral-950"
              @click="() => updateColor('neutral', '950')"
            />
            <div class="hidden border-neutral-950 shadow-neutral-950 text-neutral-950" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-black bg-black"
              @click="() => updateColor('black', '')"
            />
            <div class="hidden border-black shadow-black text-black" />
          </div>
        </div>
        <div class="space-x-2 mt-1">
          <div :class="ui.isDark ? 'hidden' : ''">
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-white bg-white"
              @click="() => updateColor('white', '')"
            />
            <div class="hidden border-white shadow-white text-white" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-stone-50 bg-stone-50"
              @click="() => updateColor('stone', '50')"
            />
            <div class="hidden border-stone-50 shadow-stone-50 text-stone-50" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-stone-100 bg-stone-100"
              @click="() => updateColor('stone', '100')"
            />
            <div class="hidden border-stone-100 shadow-stone-100 text-stone-100" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-stone-200 bg-stone-200"
              @click="() => updateColor('stone', '200')"
            />
            <div class="hidden border-stone-200 shadow-stone-200 text-stone-200" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-stone-300 bg-stone-300"
              @click="() => updateColor('stone', '300')"
            />
            <div class="hidden border-stone-300 shadow-stone-300 text-stone-300" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-stone-400 bg-stone-400"
              @click="() => updateColor('stone', '400')"
            />
            <div class="hidden border-stone-400 shadow-stone-400 text-stone-400" />
          </div>
          <UButton
            class="hidden h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-stone-500 bg-stone-500"
            @click="() => updateColor('stone', '500')"
          />
          <div class="hidden border-stone-500 shadow-stone-500 text-stone-500" />
          <div :class="ui.isDark ? '' : 'hidden'">
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-stone-600 bg-stone-600"
              @click="() => updateColor('stone', '600')"
            />
            <div class="hidden border-stone-600 shadow-stone-600 text-stone-600" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-stone-700 bg-stone-700"
              @click="() => updateColor('stone', '700')"
            />
            <div class="hidden border-stone-700 shadow-stone-700 text-stone-700" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-stone-800 bg-stone-800"
              @click="() => updateColor('stone', '800')"
            />
            <div class="hidden border-stone-800 shadow-stone-800 text-stone-800" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-stone-900 bg-stone-900"
              @click="() => updateColor('stone', '900')"
            />
            <div class="hidden border-stone-900 shadow-stone-900 text-stone-900" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-stone-950 bg-stone-950"
              @click="() => updateColor('stone', '950')"
            />
            <div class="hidden border-stone-950 shadow-stone-950 text-stone-950" />
            <UButton
              class="h-5 w-5 rounded-full scale-110 hover:scale-125 border hover:bg-black bg-black"
              @click="() => updateColor('black', '')"
            />
            <div class="hidden border-black shadow-black text-black" />
          </div>
        </div>
      </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts">

const props = defineProps<{
  theme: 'light' | 'dark';
}>();

const { ui } = useStore();

function updateColor(color: string, shade: string) {
  if (props.theme === 'dark') {
    ui.color.dark.background = shade ? `${color}-${shade}` : `${color}-500`;
  } else if (props.theme === 'light') {
    ui.color.light.background = shade ? `${color}-${shade}` : `${color}-500`;
  }
}

</script>