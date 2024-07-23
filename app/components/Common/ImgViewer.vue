<template>
  <div class="relative flex items-center justify-start">
    <transition name="fade">
      <CommonImgLoader
        v-if="isLoading || isError"
        :is-error="isError"
        :is-loading="isLoading"
        :height="props.height"
      />
    </transition>
    <transition name="fade">
      <div v-if="!isLoading && !isError && isImage">
        <NuxtImg
          :src="imageSrc!"
          :alt="alt ?? 'Image'"
          class="max-w-full max-h-full rounded shadow-md transition-all
            duration-500 opacity-100 dark:shadow-gray-700"
          :class="metadata ? 'cursor-pointer' : ''"
          @load="onLoad"
          @error="onError"
          @click="isModalOpen = true"
        />
        <div
          v-if="metadata"
          class="text-sm mt-2 text-center text-gray-600 dark:text-gray-300
            transition-colors"
        >
          <div v-if="showName && metadata.name">
            {{ metadata.name }}
          </div>
          <div v-if="showDate && metadata.createdAt" class="opacity-80">
            {{ convertUTCToLocal(metadata.createdAt) }}
          </div>
        </div>
      </div>
    </transition>
    <UModal v-if="metadata" v-model="isModalOpen">
      <UCard
        :ui="{
          body: {
            base: 'flex justify-center',
            padding: 'px-4 py-5 sm:p-2'
          }
        }"
      >
        <template #header>
          <div class="flex justify-between -my-2 w-full text-center">
            <div class="text-sm mt-2 opacity-80 w-full">
              {{ metadata.name }}
            </div>
            <CommonBtnClose
              class="-mr-2"
              @click="isModalOpen = false"
            />
          </div>
        </template>
        <div class="w-fit h-fit flex justify-center">
          <NuxtImg :src="imageSrc!" :alt="alt ?? 'Image'" />
        </div>
        <template #footer>
          <div class="flex justify-between text-center w-full">
            <div class="text-sm mt-2 opacity-60 w-full">
              {{ metadata.id }}
            </div>
            <UButton
              v-if="props.downloadUrl"
              variant="ghost"
              color="gray"
              class="hover:shadow-sm !shadow-gray-400/80
                dark:hover:bg-gray-800/80 active:shadow-inner
                transition-all duration-300 ease-in-out border
                active:duration-500 active:!opacity-80 !ring-0
                focus-visible:!ring-0 border-transparent hover:border-gray-200
                hover:dark:border-gray-600 active:bg-white
                dark:active:bg-gray-900 dark:shadow-gray-800"
              icon="i-heroicons-document-arrow-down-20-solid"
              @click="onDownloadFile"
            />
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  url: string;
  alt?: string;
  metadata?: DocUploadRes;
  height?: string;
  showName?: boolean;
  showDate?: boolean;
  downloadUrl?: string;
}>();

const { auth } = useStore();
const { downloadFile } = useAlerts();

const imageSrc = ref<string | null>(null);
const isImage = ref(true);
const isError = ref(false);
const isLoading = ref(true);
const isModalOpen = ref(false);
const fileData = ref<Blob | null>(null);

const fetchUploadedFiles = async (url: string) => {
  const res = await $fetch<Blob>(url, {
    headers: {
      Authorization: `${auth.type} ${auth.token}`
    },
    responseType: 'blob'
  });
  let fileType = res.type;
  if (fileType === 'application/octet-stream') {
    fileType = 'image/png';
  }
  const fileBlob = new Blob([res], { type: fileType });
  const file = {
    type: fileType,
    data: fileBlob,
    size: fileBlob.size
  };
  return file;
};

const loadImage = async () => {
  isLoading.value = true;
  isError.value = false;
  try {
    const file = await fetchUploadedFiles(props.url);
    fileData.value = file.data;
    isImage.value = file.type.startsWith('image/');
    if (isImage.value) {
      imageSrc.value = URL.createObjectURL(file.data);
    } else {
      imageSrc.value = null;
    }
    isLoading.value = false;
  } catch (e) {
    isError.value = true;
    isLoading.value = false;
  }
};

const onLoad = () => {
  isLoading.value = false;
  isError.value = false;
};

const onError = () => {
  isLoading.value = false;
  isError.value = true;
};

const onDownloadFile = async () => {
  if (props.downloadUrl) {
    try {
      const res = await $fetch<Blob>(props.downloadUrl, {
        headers: {
          Authorization: `${auth.type} ${auth.token}`
        },
        responseType: 'blob'
      });
      const url = URL.createObjectURL(res);
      const a = document.createElement('a');
      a.href = url;
      a.download = props.metadata?.name || 'download';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      downloadFile.success();
    } catch (err) {
      downloadFile.error();
    }
  }
};

watch(() => props.url, loadImage);

onMounted(loadImage);

</script>
