<template>
  <UPopover class="z-50" :ui="{ content: `bg-${ui.color[ui.isDark ? 'dark' : 'light'].background} dark:bg-${ui.color[ui.isDark ? 'dark' : 'light'].background}` }">
    <UButton 
      :key="ui.key"
      class="w-5 h-5 rounded-full border-2 z-50"
      :class="`bg-${ui.color[props.theme].secondary} hover:bg-${ui.color[props.theme].secondary}`"
    />
    <template #content>
      <div class="p-2 px-4">
        <div class="space-y-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-red-100 bg-red-100 dark:bg-red-100"
            @click="() => updateColor('red', '100')"
          />
          <div class="hidden border-red-100 shadow-red-100 text-red-100 dark:border-red-100" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-red-200 bg-red-200"
            @click="() => updateColor('red', '200')"
          />
          <div class="hidden border-red-200 shadow-red-200 text-red-200" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-red-300 bg-red-300"
            @click="() => updateColor('red', '300')"
          />
          <div class="hidden border-red-300 shadow-red-300 text-red-300" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-red-400 bg-red-400"
            @click="() => updateColor('red', '400')"
          />
          <div class="hidden border-red-400 shadow-red-400 text-red-400" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-red-500 bg-red-500"
            @click="() => updateColor('red', '500')"
          />
          <div class="hidden border-red-500 shadow-red-500 text-red-500" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-red-600 bg-red-600"
            @click="() => updateColor('red', '600')"
          />
          <div class="hidden border-red-600 shadow-red-600 text-red-600" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-red-700 bg-red-700"
            @click="() => updateColor('red', '700')"
          />
          <div class="hidden border-red-700 shadow-red-700 text-red-700" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-red-800 bg-red-800"
            @click="() => updateColor('red', '800')"
          />
          <div class="hidden border-red-800 shadow-red-800 text-red-800" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-red-900 bg-red-900"
            @click="() => updateColor('red', '900')"
          />
          <div class="hidden border-red-900 shadow-red-900 text-red-900" />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-orange-100 bg-orange-100"
            @click="() => updateColor('orange', '100')"
          />
          <div class="hidden border-orange-100 shadow-orange-100 text-orange-100" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-orange-200 bg-orange-200"
            @click="() => updateColor('orange', '200')"
          />
          <div class="hidden border-orange-200 shadow-orange-200 text-orange-200" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-orange-300 bg-orange-300"
            @click="() => updateColor('orange', '300')"
          />
          <div class="hidden border-orange-300 shadow-orange-300 text-orange-300" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-orange-400 bg-orange-400"
            @click="() => updateColor('orange', '400')"
          />
          <div class="hidden border-orange-400 shadow-orange-400 text-orange-400" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-orange-500 bg-orange-500"
            @click="() => updateColor('orange', '500')"
          />
          <div class="hidden border-orange-500 shadow-orange-500 text-orange-500" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-orange-600 bg-orange-600"
            @click="() => updateColor('orange', '600')"
          />
          <div class="hidden border-orange-600 shadow-orange-600 text-orange-600" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-orange-700 bg-orange-700"
            @click="() => updateColor('orange', '700')"
          />
          <div class="hidden border-orange-700 shadow-orange-700 text-orange-700" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-orange-800 bg-orange-800"
            @click="() => updateColor('orange', '800')"
          />
          <div class="hidden border-orange-800 shadow-orange-800 text-orange-800" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-orange-900 bg-orange-900"
            @click="() => updateColor('orange', '900')"
          />
          <div class="hidden border-orange-900 shadow-orange-900 text-orange-900" />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-amber-100 bg-amber-100"
            @click="() => updateColor('amber', '100')"
          />
          <div class="hidden border-amber-100 shadow-amber-100 text-amber-100" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-amber-200 bg-amber-200"
            @click="() => updateColor('amber', '200')"
          />
          <div class="hidden border-amber-200 shadow-amber-200 text-amber-200" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-amber-300 bg-amber-300"
            @click="() => updateColor('amber', '300')"
          />
          <div class="hidden border-amber-300 shadow-amber-300 text-amber-300" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-amber-400 bg-amber-400"
            @click="() => updateColor('amber', '400')"
          />
          <div class="hidden border-amber-400 shadow-amber-400 text-amber-400" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-amber-500 bg-amber-500"
            @click="() => updateColor('amber', '500')"
          />
          <div class="hidden border-amber-500 shadow-amber-500 text-amber-500" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-amber-600 bg-amber-600"
            @click="() => updateColor('amber', '600')"
          />
          <div class="hidden border-amber-600 shadow-amber-600 text-amber-600" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-amber-700 bg-amber-700"
            @click="() => updateColor('amber', '700')"
          />
          <div class="hidden border-amber-700 shadow-amber-700 text-amber-700" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-amber-800 bg-amber-800"
            @click="() => updateColor('amber', '800')"
          />
          <div class="hidden border-amber-800 shadow-amber-800 text-amber-800" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-amber-900 bg-amber-900"
            @click="() => updateColor('amber', '900')"
          />
          <div class="hidden border-amber-900 shadow-amber-900 text-amber-900" />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-yellow-100 bg-yellow-100"
            @click="() => updateColor('yellow', '100')"
          />
          <div class="hidden border-yellow-100 shadow-yellow-100 text-yellow-100" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-yellow-200 bg-yellow-200"
            @click="() => updateColor('yellow', '200')"
          />
          <div class="hidden border-yellow-200 shadow-yellow-200 text-yellow-200" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-yellow-300 bg-yellow-300"
            @click="() => updateColor('yellow', '300')"
          />
          <div class="hidden border-yellow-300 shadow-yellow-300 text-yellow-300" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-yellow-400 bg-yellow-400"
            @click="() => updateColor('yellow', '400')"
          />
          <div class="hidden border-yellow-400 shadow-yellow-400 text-yellow-400" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-yellow-500 bg-yellow-500"
            @click="() => updateColor('yellow', '500')"
          />
          <div class="hidden border-yellow-500 shadow-yellow-500 text-yellow-500" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-yellow-600 bg-yellow-600"
            @click="() => updateColor('yellow', '600')"
          />
          <div class="hidden border-yellow-600 shadow-yellow-600 text-yellow-600" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-yellow-700 bg-yellow-700"
            @click="() => updateColor('yellow', '700')"
          />
          <div class="hidden border-yellow-700 shadow-yellow-700 text-yellow-700" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-yellow-800 bg-yellow-800"
            @click="() => updateColor('yellow', '800')"
          />
          <div class="hidden border-yellow-800 shadow-yellow-800 text-yellow-800" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-yellow-900 bg-yellow-900"
            @click="() => updateColor('yellow', '900')"
          />
          <div class="hidden border-yellow-900 shadow-yellow-900 text-yellow-900" />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-lime-100 bg-lime-100"
            @click="() => updateColor('lime', '100')"
          />
          <div class="hidden border-lime-100 shadow-lime-100 text-lime-100" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-lime-200 bg-lime-200"
            @click="() => updateColor('lime', '200')"
          />
          <div class="hidden border-lime-200 shadow-lime-200 text-lime-200" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-lime-300 bg-lime-300"
            @click="() => updateColor('lime', '300')"
          />
          <div class="hidden border-lime-300 shadow-lime-300 text-lime-300" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-lime-400 bg-lime-400"
            @click="() => updateColor('lime', '400')"
          />
          <div class="hidden border-lime-400 shadow-lime-400 text-lime-400" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-lime-500 bg-lime-500"
            @click="() => updateColor('lime', '500')"
          />
          <div class="hidden border-lime-500 shadow-lime-500 text-lime-500" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-lime-600 bg-lime-600"
            @click="() => updateColor('lime', '600')"
          />
          <div class="hidden border-lime-600 shadow-lime-600 text-lime-600" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-lime-700 bg-lime-700"
            @click="() => updateColor('lime', '700')"
          />
          <div class="hidden border-lime-700 shadow-lime-700 text-lime-700" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-lime-800 bg-lime-800"
            @click="() => updateColor('lime', '800')"
          />
          <div class="hidden border-lime-800 shadow-lime-800 text-lime-800" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-lime-900 bg-lime-900"
            @click="() => updateColor('lime', '900')"
          />
          <div class="hidden border-lime-900 shadow-lime-900 text-lime-900" />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-green-100 bg-green-100"
            @click="() => updateColor('green', '100')"
          />
          <div class="hidden border-green-100 shadow-green-100 text-green-100" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-green-200 bg-green-200"
            @click="() => updateColor('green', '200')"
          />
          <div class="hidden border-green-200 shadow-green-200 text-green-200" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-green-300 bg-green-300"
            @click="() => updateColor('green', '300')"
          />
          <div class="hidden border-green-300 shadow-green-300 text-green-300" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-green-400 bg-green-400"
            @click="() => updateColor('green', '400')"
          />
          <div class="hidden border-green-400 shadow-green-400 text-green-400" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-green-500 bg-green-500"
            @click="() => updateColor('green', '500')"
          />
          <div class="hidden border-green-500 shadow-green-500 text-green-500" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-green-600 bg-green-600"
            @click="() => updateColor('green', '600')"
          />
          <div class="hidden border-green-600 shadow-green-600 text-green-600" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-green-700 bg-green-700"
            @click="() => updateColor('green', '700')"
          />
          <div class="hidden border-green-700 shadow-green-700 text-green-700" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-green-800 bg-green-800"
            @click="() => updateColor('green', '800')"
          />
          <div class="hidden border-green-800 shadow-green-800 text-green-800" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-green-900 bg-green-900"
            @click="() => updateColor('green', '900')"
          />
          <div class="hidden border-green-900 shadow-green-900 text-green-900" />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-emerald-100 bg-emerald-100"
            @click="() => updateColor('emerald', '100')"
          />
          <div class="hidden border-emerald-100 shadow-emerald-100 text-emerald-100" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-emerald-200 bg-emerald-200"
            @click="() => updateColor('emerald', '200')"
          />
          <div class="hidden border-emerald-200 shadow-emerald-200 text-emerald-200" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-emerald-300 bg-emerald-300"
            @click="() => updateColor('emerald', '300')"
          />
          <div class="hidden border-emerald-300 shadow-emerald-300 text-emerald-300" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-emerald-400 bg-emerald-400"
            @click="() => updateColor('emerald', '400')"
          />
          <div class="hidden border-emerald-400 shadow-emerald-400 text-emerald-400" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-emerald-500 bg-emerald-500"
            @click="() => updateColor('emerald', '500')"
          />
          <div class="hidden border-emerald-500 shadow-emerald-500 text-emerald-500" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-emerald-600 bg-emerald-600"
            @click="() => updateColor('emerald', '600')"
          />
          <div class="hidden border-emerald-600 shadow-emerald-600 text-emerald-600" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-emerald-700 bg-emerald-700"
            @click="() => updateColor('emerald', '700')"
          />
          <div class="hidden border-emerald-700 shadow-emerald-700 text-emerald-700" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-emerald-800 bg-emerald-800"
            @click="() => updateColor('emerald', '800')"
          />
          <div class="hidden border-emerald-800 shadow-emerald-800 text-emerald-800" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-emerald-900 bg-emerald-900"
            @click="() => updateColor('emerald', '900')"
          />
          <div class="hidden border-emerald-900 shadow-emerald-900 text-emerald-900" />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-teal-100 bg-teal-100"
            @click="() => updateColor('teal', '100')"
          />
          <div class="hidden border-teal-100 shadow-teal-100 text-teal-100" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-teal-200 bg-teal-200"
            @click="() => updateColor('teal', '200')"
          />
          <div class="hidden border-teal-200 shadow-teal-200 text-teal-200" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-teal-300 bg-teal-300"
            @click="() => updateColor('teal', '300')"
          />
          <div class="hidden border-teal-300 shadow-teal-300 text-teal-300" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-teal-400 bg-teal-400"
            @click="() => updateColor('teal', '400')"
          />
          <div class="hidden border-teal-400 shadow-teal-400 text-teal-400" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-teal-500 bg-teal-500"
            @click="() => updateColor('teal', '500')"
          />
          <div class="hidden border-teal-500 shadow-teal-500 text-teal-500" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-teal-600 bg-teal-600"
            @click="() => updateColor('teal', '600')"
          />
          <div class="hidden border-teal-600 shadow-teal-600 text-teal-600" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-teal-700 bg-teal-700"
            @click="() => updateColor('teal', '700')"
          />
          <div class="hidden border-teal-700 shadow-teal-700 text-teal-700" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-teal-800 bg-teal-800"
            @click="() => updateColor('teal', '800')"
          />
          <div class="hidden border-teal-800 shadow-teal-800 text-teal-800" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-teal-900 bg-teal-900"
            @click="() => updateColor('teal', '900')"
          />
          <div class="hidden border-teal-900 shadow-teal-900 text-teal-900" />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-cyan-100 bg-cyan-100"
            @click="() => updateColor('cyan', '100')"
          />
          <div class="hidden border-cyan-100 shadow-cyan-100 text-cyan-100" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-cyan-200 bg-cyan-200"
            @click="() => updateColor('cyan', '200')"
          />
          <div class="hidden border-cyan-200 shadow-cyan-200 text-cyan-200" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-cyan-300 bg-cyan-300"
            @click="() => updateColor('cyan', '300')"
          />
          <div class="hidden border-cyan-300 shadow-cyan-300 text-cyan-300" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-cyan-400 bg-cyan-400"
            @click="() => updateColor('cyan', '400')"
          />
          <div class="hidden border-cyan-400 shadow-cyan-400 text-cyan-400" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-cyan-500 bg-cyan-500"
            @click="() => updateColor('cyan', '500')"
          />
          <div class="hidden border-cyan-500 shadow-cyan-500 text-cyan-500" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-cyan-600 bg-cyan-600"
            @click="() => updateColor('cyan', '600')"
          />
          <div class="hidden border-cyan-600 shadow-cyan-600 text-cyan-600" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-cyan-700 bg-cyan-700"
            @click="() => updateColor('cyan', '700')"
          />
          <div class="hidden border-cyan-700 shadow-cyan-700 text-cyan-700" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-cyan-800 bg-cyan-800"
            @click="() => updateColor('cyan', '800')"
          />
          <div class="hidden border-cyan-800 shadow-cyan-800 text-cyan-800" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-cyan-900 bg-cyan-900"
            @click="() => updateColor('cyan', '900')"
          />
          <div class="hidden border-cyan-900 shadow-cyan-900 text-cyan-900" />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-sky-100 bg-sky-100"
            @click="() => updateColor('sky', '100')"
          />
          <div class="hidden border-sky-100 shadow-sky-100 text-sky-100" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-sky-200 bg-sky-200"
            @click="() => updateColor('sky', '200')"
          />
          <div class="hidden border-sky-200 shadow-sky-200 text-sky-200" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-sky-300 bg-sky-300"
            @click="() => updateColor('sky', '300')"
          />
          <div class="hidden border-sky-300 shadow-sky-300 text-sky-300" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-sky-400 bg-sky-400"
            @click="() => updateColor('sky', '400')"
          />
          <div class="hidden border-sky-400 shadow-sky-400 text-sky-400" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-sky-500 bg-sky-500"
            @click="() => updateColor('sky', '500')"
          />
          <div class="hidden border-sky-500 shadow-sky-500 text-sky-500" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-sky-600 bg-sky-600"
            @click="() => updateColor('sky', '600')"
          />
          <div class="hidden border-sky-600 shadow-sky-600 text-sky-600" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-sky-700 bg-sky-700"
            @click="() => updateColor('sky', '700')"
          />
          <div class="hidden border-sky-700 shadow-sky-700 text-sky-700" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-sky-800 bg-sky-800"
            @click="() => updateColor('sky', '800')"
          />
          <div class="hidden border-sky-800 shadow-sky-800 text-sky-800" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-sky-900 bg-sky-900"
            @click="() => updateColor('sky', '900')"
          />
          <div class="hidden border-sky-900 shadow-sky-900 text-sky-900" />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-blue-100 bg-blue-100"
            @click="() => updateColor('blue', '100')"
          />
          <div class="hidden border-blue-100 shadow-blue-100 text-blue-100" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-blue-200 bg-blue-200"
            @click="() => updateColor('blue', '200')"
          />
          <div class="hidden border-blue-200 shadow-blue-200 text-blue-200" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-blue-300 bg-blue-300"
            @click="() => updateColor('blue', '300')"
          />
          <div class="hidden border-blue-300 shadow-blue-300 text-blue-300" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-blue-400 bg-blue-400"
            @click="() => updateColor('blue', '400')"
          />
          <div class="hidden border-blue-400 shadow-blue-400 text-blue-400" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-blue-500 bg-blue-500"
            @click="() => updateColor('blue', '500')"
          />
          <div class="hidden border-blue-500 shadow-blue-500 text-blue-500" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-blue-600 bg-blue-600"
            @click="() => updateColor('blue', '600')"
          />
          <div class="hidden border-blue-600 shadow-blue-600 text-blue-600" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-blue-700 bg-blue-700"
            @click="() => updateColor('blue', '700')"
          />
          <div class="hidden border-blue-700 shadow-blue-700 text-blue-700" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-blue-800 bg-blue-800"
            @click="() => updateColor('blue', '800')"
          />
          <div class="hidden border-blue-800 shadow-blue-800 text-blue-800" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-blue-900 bg-blue-900"
            @click="() => updateColor('blue', '900')"
          />
          <div class="hidden border-blue-900 shadow-blue-900 text-blue-900" />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-indigo-100 bg-indigo-100"
            @click="() => updateColor('indigo', '100')"
          />
          <div class="hidden border-indigo-100 shadow-indigo-100 text-indigo-100" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-indigo-200 bg-indigo-200"
            @click="() => updateColor('indigo', '200')"
          />
          <div class="hidden border-indigo-200 shadow-indigo-200 text-indigo-200" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-indigo-300 bg-indigo-300"
            @click="() => updateColor('indigo', '300')"
          />
          <div class="hidden border-indigo-300 shadow-indigo-300 text-indigo-300" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-indigo-400 bg-indigo-400"
            @click="() => updateColor('indigo', '400')"
          />
          <div class="hidden border-indigo-400 shadow-indigo-400 text-indigo-400" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-indigo-500 bg-indigo-500"
            @click="() => updateColor('indigo', '500')"
          />
          <div class="hidden border-indigo-500 shadow-indigo-500 text-indigo-500" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-indigo-600 bg-indigo-600"
            @click="() => updateColor('indigo', '600')"
          />
          <div class="hidden border-indigo-600 shadow-indigo-600 text-indigo-600" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-indigo-700 bg-indigo-700"
            @click="() => updateColor('indigo', '700')"
          />
          <div class="hidden border-indigo-700 shadow-indigo-700 text-indigo-700" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-indigo-800 bg-indigo-800"
            @click="() => updateColor('indigo', '800')"
          />
          <div class="hidden border-indigo-800 shadow-indigo-800 text-indigo-800" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-indigo-900 bg-indigo-900"
            @click="() => updateColor('indigo', '900')"
          />
          <div class="hidden border-indigo-900 shadow-indigo-900 text-indigo-900" />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-violet-100 bg-violet-100"
            @click="() => updateColor('violet', '100')"
          />
          <div class="hidden border-violet-100 shadow-violet-100 text-violet-100" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-violet-200 bg-violet-200"
            @click="() => updateColor('violet', '200')"
          />
          <div class="hidden border-violet-200 shadow-violet-200 text-violet-200" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-violet-300 bg-violet-300"
            @click="() => updateColor('violet', '300')"
          />
          <div class="hidden border-violet-300 shadow-violet-300 text-violet-300" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-violet-400 bg-violet-400"
            @click="() => updateColor('violet', '400')"
          />
          <div class="hidden border-violet-400 shadow-violet-400 text-violet-400" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-violet-500 bg-violet-500"
            @click="() => updateColor('violet', '500')"
          />
          <div class="hidden border-violet-500 shadow-violet-500 text-violet-500" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-violet-600 bg-violet-600"
            @click="() => updateColor('violet', '600')"
          />
          <div class="hidden border-violet-600 shadow-violet-600 text-violet-600" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-violet-700 bg-violet-700"
            @click="() => updateColor('violet', '700')"
          />
          <div class="hidden border-violet-700 shadow-violet-700 text-violet-700" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-violet-800 bg-violet-800"
            @click="() => updateColor('violet', '800')"
          />
          <div class="hidden border-violet-800 shadow-violet-800 text-violet-800" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-violet-900 bg-violet-900"
            @click="() => updateColor('violet', '900')"
          />
          <div class="hidden border-violet-900 shadow-violet-900 text-violet-900" />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-purple-100 bg-purple-100"
            @click="() => updateColor('purple', '100')"
          />
          <div class="hidden border-purple-100 shadow-purple-100 text-purple-100" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-purple-200 bg-purple-200"
            @click="() => updateColor('purple', '200')"
          />
          <div class="hidden border-purple-200 shadow-purple-200 text-purple-200" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-purple-300 bg-purple-300"
            @click="() => updateColor('purple', '300')"
          />
          <div class="hidden border-purple-300 shadow-purple-300 text-purple-300" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-purple-400 bg-purple-400"
            @click="() => updateColor('purple', '400')"
          />
          <div class="hidden border-purple-400 shadow-purple-400 text-purple-400" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-purple-500 bg-purple-500"
            @click="() => updateColor('purple', '500')"
          />
          <div class="hidden border-purple-500 shadow-purple-500 text-purple-500" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-purple-600 bg-purple-600"
            @click="() => updateColor('purple', '600')"
          />
          <div class="hidden border-purple-600 shadow-purple-600 text-purple-600" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-purple-700 bg-purple-700"
            @click="() => updateColor('purple', '700')"
          />
          <div class="hidden border-purple-700 shadow-purple-700 text-purple-700" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-purple-800 bg-purple-800"
            @click="() => updateColor('purple', '800')"
          />
          <div class="hidden border-purple-800 shadow-purple-800 text-purple-800" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-purple-900 bg-purple-900"
            @click="() => updateColor('purple', '900')"
          />
          <div class="hidden border-purple-900 shadow-purple-900 text-purple-900" />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-fuchsia-100 bg-fuchsia-100"
            @click="() => updateColor('fuchsia', '100')"
          />
          <div class="hidden border-fuchsia-100 shadow-fuchsia-100 text-fuchsia-100" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-fuchsia-200 bg-fuchsia-200"
            @click="() => updateColor('fuchsia', '200')"
          />
          <div class="hidden border-fuchsia-200 shadow-fuchsia-200 text-fuchsia-200" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-fuchsia-300 bg-fuchsia-300"
            @click="() => updateColor('fuchsia', '300')"
          />
          <div class="hidden border-fuchsia-300 shadow-fuchsia-300 text-fuchsia-300" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-fuchsia-400 bg-fuchsia-400"
            @click="() => updateColor('fuchsia', '400')"
          />
          <div class="hidden border-fuchsia-400 shadow-fuchsia-400 text-fuchsia-400" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-fuchsia-500 bg-fuchsia-500"
            @click="() => updateColor('fuchsia', '500')"
          />
          <div class="hidden border-fuchsia-500 shadow-fuchsia-500 text-fuchsia-500" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-fuchsia-600 bg-fuchsia-600"
            @click="() => updateColor('fuchsia', '600')"
          />
          <div class="hidden border-fuchsia-600 shadow-fuchsia-600 text-fuchsia-600" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-fuchsia-700 bg-fuchsia-700"
            @click="() => updateColor('fuchsia', '700')"
          />
          <div class="hidden border-fuchsia-700 shadow-fuchsia-700 text-fuchsia-700" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-fuchsia-800 bg-fuchsia-800"
            @click="() => updateColor('fuchsia', '800')"
          />
          <div class="hidden border-fuchsia-800 shadow-fuchsia-800 text-fuchsia-800" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-fuchsia-900 bg-fuchsia-900"
            @click="() => updateColor('fuchsia', '900')"
          />
          <div class="hidden border-fuchsia-900 shadow-fuchsia-900 text-fuchsia-900" />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-pink-100 bg-pink-100"
            @click="() => updateColor('pink', '100')"
          />
          <div class="hidden border-pink-100 shadow-pink-100 text-pink-100" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-pink-200 bg-pink-200"
            @click="() => updateColor('pink', '200')"
          />
          <div class="hidden border-pink-200 shadow-pink-200 text-pink-200" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-pink-300 bg-pink-300"
            @click="() => updateColor('pink', '300')"
          />
          <div class="hidden border-pink-300 shadow-pink-300 text-pink-300" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-pink-400 bg-pink-400"
            @click="() => updateColor('pink', '400')"
          />
          <div class="hidden border-pink-400 shadow-pink-400 text-pink-400" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-pink-500 bg-pink-500"
            @click="() => updateColor('pink', '500')"
          />
          <div class="hidden border-pink-500 shadow-pink-500 text-pink-500" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-pink-600 bg-pink-600"
            @click="() => updateColor('pink', '600')"
          />
          <div class="hidden border-pink-600 shadow-pink-600 text-pink-600" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-pink-700 bg-pink-700"
            @click="() => updateColor('pink', '700')"
          />
          <div class="hidden border-pink-700 shadow-pink-700 text-pink-700" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-pink-800 bg-pink-800"
            @click="() => updateColor('pink', '800')"
          />
          <div class="hidden border-pink-800 shadow-pink-800 text-pink-800" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-pink-900 bg-pink-900"
            @click="() => updateColor('pink', '900')"
          />
          <div class="hidden border-pink-900 shadow-pink-900 text-pink-900" />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-rose-100 bg-rose-100"
            @click="() => updateColor('rose', '100')"
          />
          <div class="hidden border-rose-100 shadow-rose-100 text-rose-100" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-rose-200 bg-rose-200"
            @click="() => updateColor('rose', '200')"
          />
          <div class="hidden border-rose-200 shadow-rose-200 text-rose-200" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-rose-300 bg-rose-300"
            @click="() => updateColor('rose', '300')"
          />
          <div class="hidden border-rose-300 shadow-rose-300 text-rose-300" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-rose-400 bg-rose-400"
            @click="() => updateColor('rose', '400')"
          />
          <div class="hidden border-rose-400 shadow-rose-400 text-rose-400" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-rose-500 bg-rose-500"
            @click="() => updateColor('rose', '500')"
          />
          <div class="hidden border-rose-500 shadow-rose-500 text-rose-500" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-rose-600 bg-rose-600"
            @click="() => updateColor('rose', '600')"
          />
          <div class="hidden border-rose-600 shadow-rose-600 text-rose-600" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-rose-700 bg-rose-700"
            @click="() => updateColor('rose', '700')"
          />
          <div class="hidden border-rose-700 shadow-rose-700 text-rose-700" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-rose-800 bg-rose-800"
            @click="() => updateColor('rose', '800')"
          />
          <div class="hidden border-rose-800 shadow-rose-800 text-rose-800" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-rose-900 bg-rose-900"
            @click="() => updateColor('rose', '900')"
          />
          <div class="hidden border-rose-900 shadow-rose-900 text-rose-900" />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-slate-100 bg-slate-100"
            @click="() => updateColor('slate', '100')"
          />
          <div class="hidden border-slate-100 shadow-slate-100 text-slate-100" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-slate-200 bg-slate-200"
            @click="() => updateColor('slate', '200')"
          />
          <div class="hidden border-slate-200 shadow-slate-200 text-slate-200" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-slate-300 bg-slate-300"
            @click="() => updateColor('slate', '300')"
          />
          <div class="hidden border-slate-300 shadow-slate-300 text-slate-300" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-slate-400 bg-slate-400"
            @click="() => updateColor('slate', '400')"
          />
          <div class="hidden border-slate-400 shadow-slate-400 text-slate-400" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-slate-500 bg-slate-500"
            @click="() => updateColor('slate', '500')"
          />
          <div class="hidden border-slate-500 shadow-slate-500 text-slate-500" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-slate-600 bg-slate-600"
            @click="() => updateColor('slate', '600')"
          />
          <div class="hidden border-slate-600 shadow-slate-600 text-slate-600" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-slate-700 bg-slate-700"
            @click="() => updateColor('slate', '700')"
          />
          <div class="hidden border-slate-700 shadow-slate-700 text-slate-700" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-slate-800 bg-slate-800"
            @click="() => updateColor('slate', '800')"
          />
          <div class="hidden border-slate-800 shadow-slate-800 text-slate-800" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-slate-900 bg-slate-900"
            @click="() => updateColor('slate', '900')"
          />
          <div class="hidden border-slate-900 shadow-slate-900 text-slate-900" />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-gray-100 bg-gray-100"
            @click="() => updateColor('gray', '100')"
          />
          <div class="hidden border-gray-100 shadow-gray-100 text-gray-100" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-gray-200 bg-gray-200"
            @click="() => updateColor('gray', '200')"
          />
          <div class="hidden border-gray-200 shadow-gray-200 text-gray-200" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-gray-300 bg-gray-300"
            @click="() => updateColor('gray', '300')"
          />
          <div class="hidden border-gray-300 shadow-gray-300 text-gray-300" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-gray-400 bg-gray-400"
            @click="() => updateColor('gray', '400')"
          />
          <div class="hidden border-gray-400 shadow-gray-400 text-gray-400" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-gray-500 bg-gray-500"
            @click="() => updateColor('gray', '500')"
          />
          <div class="hidden border-gray-500 shadow-gray-500 text-gray-500" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-gray-600 bg-gray-600"
            @click="() => updateColor('gray', '600')"
          />
          <div class="hidden border-gray-600 shadow-gray-600 text-gray-600" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-gray-700 bg-gray-700"
            @click="() => updateColor('gray', '700')"
          />
          <div class="hidden border-gray-700 shadow-gray-700 text-gray-700" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-gray-800 bg-gray-800"
            @click="() => updateColor('gray', '800')"
          />
          <div class="hidden border-gray-800 shadow-gray-800 text-gray-800" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-gray-900 bg-gray-900"
            @click="() => updateColor('gray', '900')"
          />
          <div class="hidden border-gray-900 shadow-gray-900 text-gray-900" />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-zinc-100 bg-zinc-100"
            @click="() => updateColor('zinc', '100')"
          />
          <div class="hidden border-zinc-100 shadow-zinc-100 text-zinc-100" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-zinc-200 bg-zinc-200"
            @click="() => updateColor('zinc', '200')"
          />
          <div class="hidden border-zinc-200 shadow-zinc-200 text-zinc-200" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-zinc-300 bg-zinc-300"
            @click="() => updateColor('zinc', '300')"
          />
          <div class="hidden border-zinc-300 shadow-zinc-300 text-zinc-300" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-zinc-400 bg-zinc-400"
            @click="() => updateColor('zinc', '400')"
          />
          <div class="hidden border-zinc-400 shadow-zinc-400 text-zinc-400" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-zinc-500 bg-zinc-500"
            @click="() => updateColor('zinc', '500')"
          />
          <div class="hidden border-zinc-500 shadow-zinc-500 text-zinc-500" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-zinc-600 bg-zinc-600"
            @click="() => updateColor('zinc', '600')"
          />
          <div class="hidden border-zinc-600 shadow-zinc-600 text-zinc-600" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-zinc-700 bg-zinc-700"
            @click="() => updateColor('zinc', '700')"
          />
          <div class="hidden border-zinc-700 shadow-zinc-700 text-zinc-700" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-zinc-800 bg-zinc-800"
            @click="() => updateColor('zinc', '800')"
          />
          <div class="hidden border-zinc-800 shadow-zinc-800 text-zinc-800" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-zinc-900 bg-zinc-900"
            @click="() => updateColor('zinc', '900')"
          />
          <div class="hidden border-zinc-900 shadow-zinc-900 text-zinc-900" />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-neutral-100 bg-neutral-100"
            @click="() => updateColor('neutral', '100')"
          />
          <div class="hidden border-neutral-100 shadow-neutral-100 text-neutral-100" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-neutral-200 bg-neutral-200"
            @click="() => updateColor('neutral', '200')"
          />
          <div class="hidden border-neutral-200 shadow-neutral-200 text-neutral-200" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-neutral-300 bg-neutral-300"
            @click="() => updateColor('neutral', '300')"
          />
          <div class="hidden border-neutral-300 shadow-neutral-300 text-neutral-300" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-neutral-400 bg-neutral-400"
            @click="() => updateColor('neutral', '400')"
          />
          <div class="hidden border-neutral-400 shadow-neutral-400 text-neutral-400" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-neutral-500 bg-neutral-500"
            @click="() => updateColor('neutral', '500')"
          />
          <div class="hidden border-neutral-500 shadow-neutral-500 text-neutral-500" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-neutral-600 bg-neutral-600"
            @click="() => updateColor('neutral', '600')"
          />
          <div class="hidden border-neutral-600 shadow-neutral-600 text-neutral-600" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-neutral-700 bg-neutral-700"
            @click="() => updateColor('neutral', '700')"
          />
          <div class="hidden border-neutral-700 shadow-neutral-700 text-neutral-700" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-neutral-800 bg-neutral-800"
            @click="() => updateColor('neutral', '800')"
          />
          <div class="hidden border-neutral-800 shadow-neutral-800 text-neutral-800" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-neutral-900 bg-neutral-900"
            @click="() => updateColor('neutral', '900')"
          />
          <div class="hidden border-neutral-900 shadow-neutral-900 text-neutral-900" />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-stone-100 bg-stone-100"
            @click="() => updateColor('stone', '100')"
          />
          <div class="hidden border-stone-100 shadow-stone-100 text-stone-100" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-stone-200 bg-stone-200"
            @click="() => updateColor('stone', '200')"
          />
          <div class="hidden border-stone-200 shadow-stone-200 text-stone-200" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-stone-300 bg-stone-300"
            @click="() => updateColor('stone', '300')"
          />
          <div class="hidden border-stone-300 shadow-stone-300 text-stone-300" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-stone-400 bg-stone-400"
            @click="() => updateColor('stone', '400')"
          />
          <div class="hidden border-stone-400 shadow-stone-400 text-stone-400" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-stone-500 bg-stone-500"
            @click="() => updateColor('stone', '500')"
          />
          <div class="hidden border-stone-500 shadow-stone-500 text-stone-500" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-stone-600 bg-stone-600"
            @click="() => updateColor('stone', '600')"
          />
          <div class="hidden border-stone-600 shadow-stone-600 text-stone-600" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-stone-700 bg-stone-700"
            @click="() => updateColor('stone', '700')"
          />
          <div class="hidden border-stone-700 shadow-stone-700 text-stone-700" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-stone-800 bg-stone-800"
            @click="() => updateColor('stone', '800')"
          />
          <div class="hidden border-stone-800 shadow-stone-800 text-stone-800" />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-stone-900 bg-stone-900"
            @click="() => updateColor('stone', '900')"
          />
          <div class="hidden border-stone-900 shadow-stone-900 text-stone-900" />
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
const appConfig = useAppConfig();

function updateColor(color: string, shade: string) {
  if (props.theme === 'dark') {
    appConfig.ui.colors.secondary = color;
    ui.color.dark.secondary = `${color}-${shade}`;
    ui.key++;
    return;
  } else if (props.theme === 'light') {
    appConfig.ui.colors.secondary = color;
    ui.color.light.secondary = `${color}-${shade}`;
    ui.key++;
    return;
  }
}
</script>