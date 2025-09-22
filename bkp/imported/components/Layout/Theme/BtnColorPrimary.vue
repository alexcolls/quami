<template>
  <UPopover class="z-50" :ui="{ content: `bg-${ui.color[ui.isDark ? 'dark' : 'light'].background} dark:bg-${ui.color[ui.isDark ? 'dark' : 'light'].background}` }">
    <UButton
      :key="ui.key"
      class="w-5 h-5 rounded-full border-2 z-50"
      :class="`bg-${ui.color[props.theme].primary} hover:bg-${ui.color[props.theme].primary}`"
    />
    <template #content>
      <div class="p-2 px-4">
        <div class="space-y-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-red-100 bg-red-100"
            @click="() => updateColor('red', '100')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-red-200 bg-red-200"
            @click="() => updateColor('red', '200')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-red-300 bg-red-300"
            @click="() => updateColor('red', '300')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-red-400 bg-red-400"
            @click="() => updateColor('red', '400')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-red-500 bg-red-500"
            @click="() => updateColor('red', '500')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-red-600 bg-red-600"
            @click="() => updateColor('red', '600')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-red-700 bg-red-700"
            @click="() => updateColor('red', '700')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-red-800 bg-red-800"
            @click="() => updateColor('red', '800')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-red-900 bg-red-900"
            @click="() => updateColor('red', '900')"
          />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-orange-100 bg-orange-100"
            @click="() => updateColor('orange', '100')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-orange-200 bg-orange-200"
            @click="() => updateColor('orange', '200')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-orange-300 bg-orange-300"
            @click="() => updateColor('orange', '300')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-orange-400 bg-orange-400"
            @click="() => updateColor('orange', '400')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-orange-500 bg-orange-500"
            @click="() => updateColor('orange', '500')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-orange-600 bg-orange-600"
            @click="() => updateColor('orange', '600')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-orange-700 bg-orange-700"
            @click="() => updateColor('orange', '700')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-orange-800 bg-orange-800"
            @click="() => updateColor('orange', '800')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-orange-900 bg-orange-900"
            @click="() => updateColor('orange', '900')"
          />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-amber-100 bg-amber-100"
            @click="() => updateColor('amber', '100')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-amber-200 bg-amber-200"
            @click="() => updateColor('amber', '200')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-amber-300 bg-amber-300"
            @click="() => updateColor('amber', '300')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-amber-400 bg-amber-400"
            @click="() => updateColor('amber', '400')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-amber-500 bg-amber-500"
            @click="() => updateColor('amber', '500')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-amber-600 bg-amber-600"
            @click="() => updateColor('amber', '600')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-amber-700 bg-amber-700"
            @click="() => updateColor('amber', '700')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-amber-800 bg-amber-800"
            @click="() => updateColor('amber', '800')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-amber-900 bg-amber-900"
            @click="() => updateColor('amber', '900')"
          />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-yellow-100 bg-yellow-100"
            @click="() => updateColor('yellow', '100')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-yellow-200 bg-yellow-200"
            @click="() => updateColor('yellow', '200')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-yellow-300 bg-yellow-300"
            @click="() => updateColor('yellow', '300')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-yellow-400 bg-yellow-400"
            @click="() => updateColor('yellow', '400')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-yellow-500 bg-yellow-500"
            @click="() => updateColor('yellow', '500')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-yellow-600 bg-yellow-600"
            @click="() => updateColor('yellow', '600')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-yellow-700 bg-yellow-700"
            @click="() => updateColor('yellow', '700')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-yellow-800 bg-yellow-800"
            @click="() => updateColor('yellow', '800')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-yellow-900 bg-yellow-900"
            @click="() => updateColor('yellow', '900')"
          />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-lime-100 bg-lime-100"
            @click="() => updateColor('lime', '100')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-lime-200 bg-lime-200"
            @click="() => updateColor('lime', '200')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-lime-300 bg-lime-300"
            @click="() => updateColor('lime', '300')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-lime-400 bg-lime-400"
            @click="() => updateColor('lime', '400')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-lime-500 bg-lime-500"
            @click="() => updateColor('lime', '500')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-lime-600 bg-lime-600"
            @click="() => updateColor('lime', '600')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-lime-700 bg-lime-700"
            @click="() => updateColor('lime', '700')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-lime-800 bg-lime-800"
            @click="() => updateColor('lime', '800')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-lime-900 bg-lime-900"
            @click="() => updateColor('lime', '900')"
          />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-green-100 bg-green-100"
            @click="() => updateColor('green', '100')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-green-200 bg-green-200"
            @click="() => updateColor('green', '200')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-green-300 bg-green-300"
            @click="() => updateColor('green', '300')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-green-400 bg-green-400"
            @click="() => updateColor('green', '400')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-green-500 bg-green-500"
            @click="() => updateColor('green', '500')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-green-600 bg-green-600"
            @click="() => updateColor('green', '600')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-green-700 bg-green-700"
            @click="() => updateColor('green', '700')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-green-800 bg-green-800"
            @click="() => updateColor('green', '800')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-green-900 bg-green-900"
            @click="() => updateColor('green', '900')"
          />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-emerald-100 bg-emerald-100"
            @click="() => updateColor('emerald', '100')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-emerald-200 bg-emerald-200"
            @click="() => updateColor('emerald', '200')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-emerald-300 bg-emerald-300"
            @click="() => updateColor('emerald', '300')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-emerald-400 bg-emerald-400"
            @click="() => updateColor('emerald', '400')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-emerald-500 bg-emerald-500"
            @click="() => updateColor('emerald', '500')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-emerald-600 bg-emerald-600"
            @click="() => updateColor('emerald', '600')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-emerald-700 bg-emerald-700"
            @click="() => updateColor('emerald', '700')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-emerald-800 bg-emerald-800"
            @click="() => updateColor('emerald', '800')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-emerald-900 bg-emerald-900"
            @click="() => updateColor('emerald', '900')"
          />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-teal-100 bg-teal-100"
            @click="() => updateColor('teal', '100')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-teal-200 bg-teal-200"
            @click="() => updateColor('teal', '200')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-teal-300 bg-teal-300"
            @click="() => updateColor('teal', '300')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-teal-400 bg-teal-400"
            @click="() => updateColor('teal', '400')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-teal-500 bg-teal-500"
            @click="() => updateColor('teal', '500')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-teal-600 bg-teal-600"
            @click="() => updateColor('teal', '600')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-teal-700 bg-teal-700"
            @click="() => updateColor('teal', '700')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-teal-800 bg-teal-800"
            @click="() => updateColor('teal', '800')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-teal-900 bg-teal-900"
            @click="() => updateColor('teal', '900')"
          />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-cyan-100 bg-cyan-100"
            @click="() => updateColor('cyan', '100')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-cyan-200 bg-cyan-200"
            @click="() => updateColor('cyan', '200')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-cyan-300 bg-cyan-300"
            @click="() => updateColor('cyan', '300')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-cyan-400 bg-cyan-400"
            @click="() => updateColor('cyan', '400')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-cyan-500 bg-cyan-500"
            @click="() => updateColor('cyan', '500')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-cyan-600 bg-cyan-600"
            @click="() => updateColor('cyan', '600')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-cyan-700 bg-cyan-700"
            @click="() => updateColor('cyan', '700')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-cyan-800 bg-cyan-800"
            @click="() => updateColor('cyan', '800')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-cyan-900 bg-cyan-900"
            @click="() => updateColor('cyan', '900')"
          />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-sky-100 bg-sky-100"
            @click="() => updateColor('sky', '100')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-sky-200 bg-sky-200"
            @click="() => updateColor('sky', '200')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-sky-300 bg-sky-300"
            @click="() => updateColor('sky', '300')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-sky-400 bg-sky-400"
            @click="() => updateColor('sky', '400')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-sky-500 bg-sky-500"
            @click="() => updateColor('sky', '500')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-sky-600 bg-sky-600"
            @click="() => updateColor('sky', '600')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-sky-700 bg-sky-700"
            @click="() => updateColor('sky', '700')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-sky-800 bg-sky-800"
            @click="() => updateColor('sky', '800')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-sky-900 bg-sky-900"
            @click="() => updateColor('sky', '900')"
          />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-blue-100 bg-blue-100"
            @click="() => updateColor('blue', '100')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-blue-200 bg-blue-200"
            @click="() => updateColor('blue', '200')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-blue-300 bg-blue-300"
            @click="() => updateColor('blue', '300')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-blue-400 bg-blue-400"
            @click="() => updateColor('blue', '400')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-blue-500 bg-blue-500"
            @click="() => updateColor('blue', '500')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-blue-600 bg-blue-600"
            @click="() => updateColor('blue', '600')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-blue-700 bg-blue-700"
            @click="() => updateColor('blue', '700')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-blue-800 bg-blue-800"
            @click="() => updateColor('blue', '800')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-blue-900 bg-blue-900"
            @click="() => updateColor('blue', '900')"
          />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-indigo-100 bg-indigo-100"
            @click="() => updateColor('indigo', '100')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-indigo-200 bg-indigo-200"
            @click="() => updateColor('indigo', '200')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-indigo-300 bg-indigo-300"
            @click="() => updateColor('indigo', '300')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-indigo-400 bg-indigo-400"
            @click="() => updateColor('indigo', '400')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-indigo-500 bg-indigo-500"
            @click="() => updateColor('indigo', '500')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-indigo-600 bg-indigo-600"
            @click="() => updateColor('indigo', '600')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-indigo-700 bg-indigo-700"
            @click="() => updateColor('indigo', '700')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-indigo-800 bg-indigo-800"
            @click="() => updateColor('indigo', '800')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-indigo-900 bg-indigo-900"
            @click="() => updateColor('indigo', '900')"
          />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-violet-100 bg-violet-100"
            @click="() => updateColor('violet', '100')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-violet-200 bg-violet-200"
            @click="() => updateColor('violet', '200')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-violet-300 bg-violet-300"
            @click="() => updateColor('violet', '300')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-violet-400 bg-violet-400"
            @click="() => updateColor('violet', '400')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-violet-500 bg-violet-500"
            @click="() => updateColor('violet', '500')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-violet-600 bg-violet-600"
            @click="() => updateColor('violet', '600')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-violet-700 bg-violet-700"
            @click="() => updateColor('violet', '700')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-violet-800 bg-violet-800"
            @click="() => updateColor('violet', '800')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-violet-900 bg-violet-900"
            @click="() => updateColor('violet', '900')"
          />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-purple-100 bg-purple-100"
            @click="() => updateColor('purple', '100')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-purple-200 bg-purple-200"
            @click="() => updateColor('purple', '200')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-purple-300 bg-purple-300"
            @click="() => updateColor('purple', '300')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-purple-400 bg-purple-400"
            @click="() => updateColor('purple', '400')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-purple-500 bg-purple-500"
            @click="() => updateColor('purple', '500')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-purple-600 bg-purple-600"
            @click="() => updateColor('purple', '600')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-purple-700 bg-purple-700"
            @click="() => updateColor('purple', '700')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-purple-800 bg-purple-800"
            @click="() => updateColor('purple', '800')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-purple-900 bg-purple-900"
            @click="() => updateColor('purple', '900')"
          />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-fuchsia-100 bg-fuchsia-100"
            @click="() => updateColor('fuchsia', '100')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-fuchsia-200 bg-fuchsia-200"
            @click="() => updateColor('fuchsia', '200')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-fuchsia-300 bg-fuchsia-300"
            @click="() => updateColor('fuchsia', '300')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-fuchsia-400 bg-fuchsia-400"
            @click="() => updateColor('fuchsia', '400')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-fuchsia-500 bg-fuchsia-500"
            @click="() => updateColor('fuchsia', '500')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-fuchsia-600 bg-fuchsia-600"
            @click="() => updateColor('fuchsia', '600')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-fuchsia-700 bg-fuchsia-700"
            @click="() => updateColor('fuchsia', '700')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-fuchsia-800 bg-fuchsia-800"
            @click="() => updateColor('fuchsia', '800')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-fuchsia-900 bg-fuchsia-900"
            @click="() => updateColor('fuchsia', '900')"
          />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-pink-100 bg-pink-100"
            @click="() => updateColor('pink', '100')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-pink-200 bg-pink-200"
            @click="() => updateColor('pink', '200')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-pink-300 bg-pink-300"
            @click="() => updateColor('pink', '300')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-pink-400 bg-pink-400"
            @click="() => updateColor('pink', '400')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-pink-500 bg-pink-500"
            @click="() => updateColor('pink', '500')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-pink-600 bg-pink-600"
            @click="() => updateColor('pink', '600')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-pink-700 bg-pink-700"
            @click="() => updateColor('pink', '700')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-pink-800 bg-pink-800"
            @click="() => updateColor('pink', '800')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-pink-900 bg-pink-900"
            @click="() => updateColor('pink', '900')"
          />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-rose-100 bg-rose-100"
            @click="() => updateColor('rose', '100')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-rose-200 bg-rose-200"
            @click="() => updateColor('rose', '200')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-rose-300 bg-rose-300"
            @click="() => updateColor('rose', '300')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-rose-400 bg-rose-400"
            @click="() => updateColor('rose', '400')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-rose-500 bg-rose-500"
            @click="() => updateColor('rose', '500')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-rose-600 bg-rose-600"
            @click="() => updateColor('rose', '600')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-rose-700 bg-rose-700"
            @click="() => updateColor('rose', '700')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-rose-800 bg-rose-800"
            @click="() => updateColor('rose', '800')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-rose-900 bg-rose-900"
            @click="() => updateColor('rose', '900')"
          />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-slate-100 bg-slate-100"
            @click="() => updateColor('slate', '100')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-slate-200 bg-slate-200"
            @click="() => updateColor('slate', '200')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-slate-300 bg-slate-300"
            @click="() => updateColor('slate', '300')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-slate-400 bg-slate-400"
            @click="() => updateColor('slate', '400')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-slate-500 bg-slate-500"
            @click="() => updateColor('slate', '500')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-slate-600 bg-slate-600"
            @click="() => updateColor('slate', '600')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-slate-700 bg-slate-700"
            @click="() => updateColor('slate', '700')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-slate-800 bg-slate-800"
            @click="() => updateColor('slate', '800')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-slate-900 bg-slate-900"
            @click="() => updateColor('slate', '900')"
          />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-gray-100 bg-gray-100"
            @click="() => updateColor('gray', '100')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-gray-200 bg-gray-200"
            @click="() => updateColor('gray', '200')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-gray-300 bg-gray-300"
            @click="() => updateColor('gray', '300')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-gray-400 bg-gray-400"
            @click="() => updateColor('gray', '400')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-gray-500 bg-gray-500"
            @click="() => updateColor('gray', '500')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-gray-600 bg-gray-600"
            @click="() => updateColor('gray', '600')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-gray-700 bg-gray-700"
            @click="() => updateColor('gray', '700')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-gray-800 bg-gray-800"
            @click="() => updateColor('gray', '800')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-gray-900 bg-gray-900"
            @click="() => updateColor('gray', '900')"
          />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-zinc-100 bg-zinc-100"
            @click="() => updateColor('zinc', '100')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-zinc-200 bg-zinc-200"
            @click="() => updateColor('zinc', '200')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-zinc-300 bg-zinc-300"
            @click="() => updateColor('zinc', '300')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-zinc-400 bg-zinc-400"
            @click="() => updateColor('zinc', '400')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-zinc-500 bg-zinc-500"
            @click="() => updateColor('zinc', '500')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-zinc-600 bg-zinc-600"
            @click="() => updateColor('zinc', '600')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-zinc-700 bg-zinc-700"
            @click="() => updateColor('zinc', '700')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-zinc-800 bg-zinc-800"
            @click="() => updateColor('zinc', '800')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-zinc-900 bg-zinc-900"
            @click="() => updateColor('zinc', '900')"
          />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-neutral-100 bg-neutral-100"
            @click="() => updateColor('neutral', '100')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-neutral-200 bg-neutral-200"
            @click="() => updateColor('neutral', '200')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-neutral-300 bg-neutral-300"
            @click="() => updateColor('neutral', '300')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-neutral-400 bg-neutral-400"
            @click="() => updateColor('neutral', '400')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-neutral-500 bg-neutral-500"
            @click="() => updateColor('neutral', '500')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-neutral-600 bg-neutral-600"
            @click="() => updateColor('neutral', '600')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-neutral-700 bg-neutral-700"
            @click="() => updateColor('neutral', '700')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-neutral-800 bg-neutral-800"
            @click="() => updateColor('neutral', '800')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-neutral-900 bg-neutral-900"
            @click="() => updateColor('neutral', '900')"
          />
        </div>
        <div class="space-y-2 -mt-2">
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-stone-100 bg-stone-100"
            @click="() => updateColor('stone', '100')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-stone-200 bg-stone-200"
            @click="() => updateColor('stone', '200')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-stone-300 bg-stone-300"
            @click="() => updateColor('stone', '300')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-stone-400 bg-stone-400"
            @click="() => updateColor('stone', '400')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-stone-500 bg-stone-500"
            @click="() => updateColor('stone', '500')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-stone-600 bg-stone-600"
            @click="() => updateColor('stone', '600')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-stone-700 bg-stone-700"
            @click="() => updateColor('stone', '700')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-stone-800 bg-stone-800"
            @click="() => updateColor('stone', '800')"
          />
          <UButton
            class="h-5 w-5 rounded-full scale-110 hover:scale-125 border-2 hover:bg-stone-900 bg-stone-900"
            @click="() => updateColor('stone', '900')"
          />
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
    appConfig.ui.colors.primary = color;
    ui.color.dark.primary = `${color}-${shade}`;
    ui.key++;
    return;
  } else if (props.theme === 'light') {
    appConfig.ui.colors.primary = color;
    ui.color.light.primary = `${color}-${shade}`;
    ui.key++;
    return;
  }
}

</script> 