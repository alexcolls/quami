<template>
  <CommonAccordion
    title="VOICE"
    :is-open="true"
    icon="i-heroicons-user"
  >
    <CommonText>
      Text-to-speech (TTS or voice generation) system is a technology that
      enables the generation of high-quality audio from a written text while
      offering the flexibility to choose the desired voice, including male or
      female voices, and more.
    </CommonText>
    <div
      class="text-center relative h-full sm:m-4
    my-8 flex flex-wrap justify-center align-center"
    >
      <button
        class="m-2 sm:m-4 rounded-xl border border-gray-800/30
        bg-primary-400/50
        dark:bg-gray-900
        dark:hover:bg-slate-500/10 hover:bg-primary-400
        sm:px-4 opacity-80 hover:opacity-100"
        @click="() => {}"
      >
        <div class="m-2">
          Male
        </div>
        <img
          src="~/assets/icons/male.svg"
          alt="Male"
          width="40"
          class="mb-2 hover:scale-105"
        >
      </button>
      <button
        class="m-2 sm:m-4 rounded-xl border border-gray-800/30 bg-primary-400/50
        dark:bg-gray-900
        dark:hover:bg-slate-500/10 hover:bg-primary-400
        sm:px-4 opacity-80 hover:opacity-100"
        @click="() => {}"
      >
        <div class="m-2">
          Female
        </div>
        <img
          src="~/assets/icons/female.svg"
          alt="Female"
          width="140"
          class="mb-2 hover:scale-105"
        >
      </button>
    </div>
  </CommonAccordion>
</template>
