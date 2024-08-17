<template>
  <CommonAccordion title="LANGUAGE" :is-open="true" icon="i-heroicons-user">
    <div>
      <CommonText class="ml-2 opacity-80">
        Kwamis can speak over 120 languages. Choose the default language for
        your Kwami, other languages will be translate automatically.
      </CommonText>
      <div class="spaxe-y-4">
        <CommonSelector :options="optionsLang" :selected="selectedLang" />
        <CommonSelector
          :options="optionsLLM"
          :selected="selectedLLM"
          class="w-[250px]"
        />
      </div>
    </div>
  </CommonAccordion>
</template>

<script setup lang="ts">

const optionsLang = [
  {
    icon: 'i-flagpack-us',
    label: 'English (US)'
  },
  {
    icon: 'i-flagpack-uk',
    label: 'English (UK)'
  },
  {
    icon: 'i-flagpack-es',
    label: 'Español (ES)'
  }
];
const selectedLang = ref(optionsLang[0]);

const optionsLLM = [
  {
    icon: 'i-ri-openai-fill',
    label: 'openai/gpt-4o'
  },
  {
    icon: 'i-ri-openai-fill',
    label: 'openai/gpt-4o-mini'
  },
  {
    icon: 'i-ri-openai-fill',
    label: 'openai/gpt-4-vision-preview'
  },
  {
    icon: 'i-ri-openai-fill',
    label: 'openai/gpt-4'
  },
  {
    icon: 'i-ri-openai-fill',
    label: 'openai/gpt-4-32k-0314'
  },
  {
    icon: 'i-ri-openai-fill',
    label: 'openai/gpt-3.5-turbo'
  },
  {
    icon: 'i-ri-openai-fill',
    label: 'openai/gpt-3.5-turbo-16k'
  },
  {
    icon: 'i-ri-facebook-fill',
    label: 'meta/meta.llama3-1-8b-instruct-v1:0'
  },
  {
    icon: 'i-ri-facebook-fill',
    label: 'meta/llama3-8b-instruct-v1:0'
  },
  {
    icon: 'i-ri-facebook-fill',
    label: 'replicate/llama-2-70b-chat'
  },
  {
    icon: 'i-ri-facebook-fill',
    label: 'replicate/llama-2-70b-chat'
  },
  {
    icon: 'i-ri-facebook-fill',
    label: 'perplexityai/llama-3-8b-instruct'
  },
  {
    icon: 'i-ri-facebook-fill',
    label: 'perplexityai/llama-3-sonar-small-32k-chat'
  },
  {
    icon: 'i-ri-facebook-fill',
    label: 'perplexityai/llama-3-sonar-small-128k-chat'
  },
  {
    icon: 'i-ri-facebook-fill',
    label: 'perplexityai/llama-3.1-8b-instruct'
  },
  {
    icon: 'i-ri-facebook-fill',
    label: 'replicate/llama-2-70b-chat'
  },
  {
    icon: 'i-ri-google-fill',
    label: 'openai/gpt-3.5-turbo-0301'
  },
  {
    icon: 'i-ri-google-fill',
    label: 'openai/gpt-3.5-turbo-0301'
  },
  {
    icon: 'i-ri-google-fill',
    label: 'openai/gpt-3.5-turbo-0301'
  },
  {
    icon: 'i-ri-google-fill',
    label: 'openai/gpt-3.5-turbo-0301'
  },
  {
    icon: 'i-ri-amazon-fill',
    label: ''
  },
  {
    icon: 'i-ri-microsoft-fill',
    label: ''
  },
  {
    icon: 'i-ri-ibm-fill',
    label: ''
  }
];
const selectedLLM = ref(optionsLLM[0]);

</script>
