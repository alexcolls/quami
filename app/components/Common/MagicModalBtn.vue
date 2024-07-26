<template>
  <div class="flex justify-center items-center relative w-screen">
    <div
      ref="modalRef"
      class="fixed inset-5 overflow-visible inline-block
    align-middle rounded-lg text-left shadow-lg transform
    transition-all sm:align-middle sm:max-w-lg sm:w-fit bg-opacity-60
    backdrop-blur-md border z-50 lg:-mt-5 lg:-ml-5 h-fit
    hover:border-primary-500 dark:hover:border-primary-400 select-none
    hover:shadow-primary-500 hover:dark:shadow-primary-400 border-gray-500/20"
    >
      <div
        class="flex justify-between w-full cursor-move draggable-handle p-2
    border-b border-gray-800/20 text-white
    hover:border-primary-500 dark:hover:border-primary-400
    bg-slate-500/10 select-none"
        @mousedown="startDrag"
        @dblclick="resetPosition"
      >
        <div v-if="isOpen" class="text-sm flex">
          <UIcon
            :name="icon"
            class="w-4 h-4 ml-1 mt-1 opacity-80"
          />
          <h1 class="ml-2 mt-1">
            {{ title }}
          </h1>
        </div>
        <div class="flex">
          <CommonBtnClose
            :icon="!isOpen ? icon : 'i-heroicons-x-mark-20-solid'"
            class="m-0"
            @click="isOpen = !isOpen"
          />
        </div>
      </div>
      <div class="h-full mt-auto flex flex-col-reverse">
        <div
          v-if="isBlocked"
          class="!bottom-0 inset-0 bg-opacity-50
          cursor-not-allowed h-1/2 "
        />
      </div>
      <div
        v-if="isOpen"
        class="shadow-inner hover:shadow-primary-500 p-2 overflow-visible"
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
}>();

const isOpen = ref(false);
const isBlocked = ref(true);

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

// const startResize = (dir: string) => () => {
//   isResizing = true;
//   resizeDirection = dir;
//   window.addEventListener('mousemove', doResize);
//   window.addEventListener('mouseup', endResize);
// };

// const doResize = (e: MouseEvent) => {
//   if (!isResizing) { return; }
//   requestAnimationFrame(() => {
//     const modalRect = modalRef.value!.getBoundingClientRect();

//     if (resizeDirection.includes('right')) {
//       modalRef.value!.style.width = `${e.clientX - modalRect.left}px`;
//     }
//     if (resizeDirection.includes('left')) {
//       modalRef.value!.style.width = `${modalRect.right - e.clientX}px`;
//       modalRef.value!.style.left = `${e.clientX}px`;
//     }
//     if (resizeDirection.includes('bottom')) {
//       modalRef.value!.style.height = `${e.clientY - modalRect.top}px`;
//     }
//     if (resizeDirection.includes('top')) {
//       modalRef.value!.style.height = `${modalRect.bottom - e.clientY}px`;
//       modalRef.value!.style.top = `${e.clientY}px`;
//     }
//   });
// };

// const endResize = () => {
//   isResizing = false;
//   window.removeEventListener('mousemove', doResize);
//   window.removeEventListener('mouseup', endResize);
// };

onMounted(() => {
  window.addEventListener('mousemove', doDrag);
  window.addEventListener('mouseup', endDrag);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', doDrag);
  window.removeEventListener('mouseup', endDrag);
});
</script>
