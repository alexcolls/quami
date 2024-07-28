<template>
  <div
    class="flex justify-center items-center relative w-screen
      bg-transparent border-none rounded-xl"
  >
    <div
      ref="modalRef"
      class="fixed inset-5 overflow-visible inline-block
        align-middle rounded-xl rounded-b-xl text-left shadow-lg transform
        transition-all sm:align-middle sm:max-w-lg sm:w-fit bg-opacity-60
        backdrop-blur-md border z-50 lg:-mt-5 lg:-ml-5 h-fit
        hover:border-primary-500/80 dark:hover:border-primary-400 select-none
        hover:shadow-primary-500/50 hover:dark:shadow-primary-400
        border-gray-500/20"
    >
      <div
        class="flex justify-between w-full cursor-move draggable-handle
          border-b border-gray-800/20 rounded-t-xl pt-[10px] pb-[6px]
          hover:border-primary-500/50 dark:hover:border-primary-400/50 px-[10px]
          bg-slate-500/10 select-none"
        :class="isOpen ? 'rounded-t-xl' : 'rounded-xl'"
        @mousedown="startDrag"
        @dblclick="resetPosition"
      >
        <div v-if="isOpen" class="text-sm flex">
          <UIcon
            :name="icon"
            class="w-4 h-4 ml-1 mt-1.5 opacity-80"
          />
          <h1 class="ml-2 mt-1">
            {{ title }}
          </h1>
        </div>
        <div
          v-if="isOpen && tabs && tabs.length > 1"
          class="flex -ml-8"
        >
          <div
            v-for="tab in tabs"
            :key="tab.title + tab.icon"
            class="flex"
          >
            <div
              class="h-6 border-r border-gray-600/30
                dark:border-gray-400/30 mx-1"
            />
            <UButton
              variant="ghost"
              color="gray"
              :label="tab.title"
              :icon="tab.icon"
              class="h-7 -mt-0.5"
            />
          </div>
          <div
            class="h-6 border-r border-gray-600/30
                dark:border-gray-400/30 mx-1"
          />
        </div>
        <div
          class="flex rounded-b-xl mb-1"
          :class="isOpen ? ' ml-2' : ''"
        >
          <CommonBtnModal
            :is-open="isOpen"
            :title="title"
            :icon="icon"
            :on-click="() => isOpen = !isOpen"
            :is-tooltip="true"
          />
        </div>
      </div>
      <div
        v-if="isOpen"
        class="shadow-inner hover:shadow-primary-500 p-2 overflow-visible
          rounded-b-xl flex justify-center"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  title: string;
  icon: string;
  tabs?: Tab[];
}>();

const isOpen = ref(false);

const modalRef = ref<HTMLElement>();
let isDragging = false;
// const isResizing = false;
// const resizeDirection = '';
let offsetX: number, offsetY: number;
const originalX = 0;
const originalY = 0;

const startDrag = (e: any) => {
  isDragging = true;
  offsetX = e.clientX - modalRef.value!.getBoundingClientRect().left;
  offsetY = e.clientY - modalRef.value!.getBoundingClientRect().top;
};

const doDrag = (e: any) => {
  if (!isDragging) { return; }
  requestAnimationFrame(() => {
    const modalRect = modalRef.value!.getBoundingClientRect();

    let top = e.clientY - offsetY;
    let left = e.clientX - offsetX;

    if (top < 0) {
      top = 0;
    } else if (top + modalRect.height > window.innerHeight) {
      top = window.innerHeight - modalRect.height;
    }

    if (left < 0) {
      left = 0;
    } else if (left + modalRect.width > window.innerWidth) {
      left = window.innerWidth - modalRect.width;
    }

    modalRef.value!.style.transform = `translate(${left}px, ${top}px)`;
  });
};

const endDrag = () => {
  isDragging = false;
};

const resetPosition = () => {
  modalRef.value!.style.transform = `translate(${originalX}px, ${originalY}px)`;
};

onMounted(() => {
  window.addEventListener('mousemove', doDrag);
  window.addEventListener('mouseup', endDrag);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', doDrag);
  window.removeEventListener('mouseup', endDrag);
});
</script>
