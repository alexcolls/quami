<template>
  <CommonAccordion
    title="AI CORE"
    :is-open="true"
  >
    <div class="w-[350]">
      <CommonText class="opacity-80">
        Kwamis can speak over 120 languages. Choose the default language for
        your Kwami, other languages will be translate automatically.
      </CommonText>
      <div class="space-y-4">
        <UFormField
          label="Language"
          class=""
        >
          <CommonSelector
            :options="optionsLang"
            :selected="selectedLang"
          />
        </UFormField>
        <UFormField
          label="Model Workflows"
          class=""
        >
          <CommonSelector
            :options="optionsModel"
            :selected="selectedModel"
            class="w-[220px]"
          />
        </UFormField>
        <div class="flex justify-between">
          <UFormField
            label="Large Language Model (LLM)"
            class=""
          >
            <CommonSelector
              :options="optionsLLM"
              :selected="selectedLLM"
              :search="true"
              class="w-[340px]"
            />
          </UFormField>
          <UFormField
            label="Price"
            class=""
          >
            <div
              class="w-[100px] mx-2 p-1.5 pl-4 ml-3 border-1
              rounded-lg bg-gray-100 dark:bg-gray-900
              dark:!border-gray-200 border-gray-200"
              placeholder="Price"
            >
              {{ selectedPrice }}
            </div>
          </UFormField>
        </div>
        <UFormField
          label="Speech To Text Model (STTM)"
          class=""
        >
          <CommonSelector
            :options="optionsTTS"
            :selected="selectedTTS"
            class="w-[250px]"
          />
        </UFormField>
        <UFormField
          label="Text To Speech Model (TTSM)"
          class=""
        >
          <CommonSelector
            :options="optionsTTS"
            :selected="selectedTTS"
            class="w-[250px]"
          />
        </UFormField>
      </div>
    </div>
  </CommonAccordion>
</template>

<script setup lang="ts">
const optionsModel = [
  {
    icon: 'i-fluent-brain-circuit-20-filled',
    label: 'STTM->LLM->TTSM',
  },
];
const selectedModel = ref(optionsModel[0]);

const optionsLang = [
  {
    icon: 'i-flagpack-us',
    label: 'English (US)',
  },
  {
    icon: 'i-flagpack-gb-ukm',
    label: 'English (UK)',
  },
  {
    icon: 'i-flagpack-es',
    label: 'Español (ES)',
  },
];
const selectedLang = ref(optionsLang[0]);

const optionsLLM = [
  {
    icon: 'i-ri-openai-fill',
    label: 'openai/gpt-4o',
    price: 0.0001,
  },
  {
    icon: 'i-ri-openai-fill',
    label: 'openai/gpt-4o-mini',
    price: 0.02,
  },
  {
    icon: 'i-ri-openai-fill',
    label: 'openai/gpt-4-vision-preview',
  },
  {
    icon: 'i-ri-openai-fill',
    label: 'openai/gpt-4',
  },
  {
    icon: 'i-ri-openai-fill',
    label: 'openai/gpt-4-32k-0314',
  },
  {
    icon: 'i-ri-openai-fill',
    label: 'openai/gpt-3.5-turbo',
  },
  {
    icon: 'i-ri-openai-fill',
    label: 'openai/gpt-3.5-turbo-16k',
  },
  {
    icon: 'i-ri-meta-fill',
    label: 'meta/meta.llama3-1-8b-instruct-v1:0',
  },
  {
    icon: 'i-ri-meta-fill',
    label: 'meta/llama3-8b-instruct-v1:0',
  },
  {
    icon: 'i-ri-meta-fill',
    label: 'replicate/llama-2-70b-chat',
  },
  {
    icon: 'i-ri-meta-fill',
    label: 'replicate/llama-2-70b-chat',
  },
  {
    icon: 'i-ri-facebook-fill',
    label: 'perplexityai/llama-3-8b-instruct',
  },
  {
    icon: 'i-ri-facebook-fill',
    label: 'perplexityai/llama-3-sonar-small-32k-chat',
  },
  {
    icon: 'i-ri-facebook-fill',
    label: 'perplexityai/llama-3-sonar-small-128k-chat',
  },
  {
    icon: 'i-ri-facebook-fill',
    label: 'perplexityai/llama-3.1-8b-instruct',
  },
  {
    icon: 'i-ri-facebook-fill',
    label: 'replicate/llama-2-70b-chat',
  },
  {
    icon: 'i-ri-google-fill',
    label: 'openai/gpt-3.5-turbo-0301',
  },
  {
    icon: 'i-ri-google-fill',
    label: 'openai/gpt-3.5-turbo-0301',
  },
  {
    icon: 'i-ri-google-fill',
    label: 'openai/gpt-3.5-turbo-0301',
  },
  {
    icon: 'i-ri-google-fill',
    label: 'openai/gpt-3.5-turbo-0301',
  },
  {
    icon: 'i-ri-amazon-fill',
    label: '',
  },
  {
    icon: 'i-ri-microsoft-fill',
    label: '',
  },
  {
    icon: 'i-ri-ibm-fill',
    label: '',
  },
];
const selectedLLM = ref(optionsLLM[0]);
const selectedPrice = ref(0);

watch(selectedLLM, (value) => {
  console.log(value);
  selectedPrice.value = 100;
});

const optionsTTS = [
  {
    icon: 'i-ri-openai-fill',
    label: 'openai',
  },
  {
    icon: 'i-ri-openai-fill',
    label: 'openai/gpt-4o-mini',
  },
  {
    icon: 'i-ri-openai-fill',
    label: 'openai/gpt-4-vision-preview',
  },
  {
    icon: 'i-ri-openai-fill',
    label: 'openai/gpt-4',
  },
  {
    icon: 'i-ri-openai-fill',
    label: 'openai/gpt-4-32k-0314',
  },
  {
    icon: 'i-ri-openai-fill',
    label: 'openai/gpt-3.5-turbo',
  },
  {
    icon: 'i-ri-openai-fill',
    label: 'openai/gpt-3.5-turbo-16k',
  },
  {
    icon: 'i-ri-meta-fill',
    label: 'meta/meta.llama3-1-8b-instruct-v1:0',
  },
];
const selectedTTS = ref(optionsTTS[0]);
</script>
