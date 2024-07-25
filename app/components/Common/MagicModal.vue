<template>
  <div class="flex justify-center items-center relative w-screen h-screen">
    <div
      ref="modalRef"
      class="absolute inset-5 overflow-y-auto inline-block
      align-middle rounded-lg text-left overflow-hidden shadow-lg transform
      transition-all sm:align-middle sm:max-w-lg sm:w-full bg-opacity-60
      backdrop-blur-md border z-50 lg:-mt-5 lg:-ml-5
      hover:border-primary-500 dark:hover:border-primary-400 select-none
      hover:shadow-primary-500 hover:dark:shadow-primary-400 border-gray-500/20"
      @dblclick="resetPosition"
    >
      <div
        class="flex justify-between w-full cursor-move draggable-handle p-2
    border-b border-gray-800/20 text-white
    hover:border-primary-500 dark:hover:border-primary-400
    bg-slate-500/10 select-none"
        @mousedown="startDrag"
      >
        <div class="text-sm flex">
          <img
            src="~/assets/icons/kwami.png"
            alt="Icon 1"
            class="w-4 h-4 ml-1 opacity-80"
          >
          <h1 class="ml-2">
            {{ windowName }}
          </h1>
        </div>
      </div>
      <div class="shadow-inner hover:shadow-green-500 h-full w-full">
        <slot class="w-fit h-fit" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  windowName: string;
}>();

const modalRef = ref<HTMLElement>();
let isDragging = false;
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
