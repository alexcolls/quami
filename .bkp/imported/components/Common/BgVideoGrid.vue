<template>
  <ClientOnly>
    <div class="fullscreen-video-scroller fixed inset-0 overflow-hidden bg-transparent">
      <div
        v-if="ui.showVideo && allVideoUrls.length === 0"
        class="absolute inset-0 z-20 flex flex-col items-center justify-center bg-red-900/80 text-white p-4 text-center"
      >
        <p class="text-xl font-semibold mb-2">Video Configuration Error!</p>
        <p>The video list is empty. Please check:</p>
        <ul class="list-disc list-inside text-left mt-1">
          <li>The file <code class="bg-black/10 px-1 rounded">src/assets/vid/links.json</code> exists.</li>
          <li>It contains a valid JSON array of video URL strings.</li>
          <li>The array is not empty.</li>
        </ul>
      </div>
      <div
        ref="columnsWrapperRef"
        class="columns-wrapper flex h-full w-full"
        :style="{ opacity: ui.videoOpacity }"
      >
        <div
          v-for="(column, colIndex) in columnsData"
          :key="`col-${colIndex}`"
          class="video-column relative h-full flex-1 overflow-hidden"
        >
          <div
            class="scrolling-content flex flex-col"
            :class="auth.isAuth ? '' : column.animationClass"
            :style="{
              animationDuration: auth.isAuth ? '0s' : `${column.animationDuration}s`,
              transform: auth.isAuth ? `translateY(${columnPositions[colIndex] ?? 0}px)` : `translateY(${columnPositions[colIndex] ?? 0}px)`
            }"
          >
            <div
              v-for="videoItem in column.videos"
              :key="videoItem.uniqueId"
              class="phone-video-item w-full shrink-0 p-1"
              :style="{ height: `${phoneVideoItemHeightPx}px` }"
              @mouseenter="handleVideoMouseEnter"
              @mouseleave="handleVideoMouseLeave"
            >
              <video
                :src="videoItem.src"
                muted loop playsinline
                class="h-full w-full rounded-md object-cover"
                :class="videoLoadedStates[videoItem.uniqueId] ? 'no-blur-custom' : 'blur-custom'"
                @loadedmetadata="onVideoLoaded(videoItem.uniqueId)"
              >
                <source :src="videoItem.src" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!ui.showVideo" class="absolute inset-0 z-[-1] flex items-center justify-center bg-black/10">
        <p class="text-white/70">{{ $t('info.no_videos_available_check_console') }}</p>
      </div>

      <div
        v-if="$slots.default"
        class="content-overlay pointer-events-none absolute inset-0 z-10 flex h-full w-full items-center justify-center"
      >
        <slot />
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import allVideosFromJson from '@/assets/vid/links.json';


const { ui, auth } = useStore();

interface VideoItem {
  id: string;
  uniqueId: string;
  src: string;
}

interface ColumnData {
  videos: VideoItem[];
  animationClass: string;
  animationDuration: number;
}

const props = defineProps({
  numColumns: {
    type: Number,
    default: 6,
  },
  scrollDurationSec: {
    type: Number,
    default: 60,
  },
  phoneAspectWidth: {
    type: Number,
    default: 9,
  },
  phoneAspectHeight: {
    type: Number,
    default: 16,
  },
  screensPerColumn: {
    type: Number,
    default: 1.5,
  }
});

const allVideoUrls: string[] = Array.isArray(allVideosFromJson) ? allVideosFromJson : [];

const columnsWrapperRef = ref<HTMLDivElement | null>(null);
const phoneVideoItemHeightPx = ref(250);
const videoLoadedStates = ref<Record<string, boolean>>({});
const columnPositions = ref<Record<number, number>>({});
let videoUIDCounter = 0;

const onVideoLoaded = (uniqueId: string) => {
  setTimeout(() => {
    if (Object.prototype.hasOwnProperty.call(videoLoadedStates.value, uniqueId)) {
        videoLoadedStates.value[uniqueId] = true;
    }
  }, 300);
};

const columnsData = ref<ColumnData[]>([]);

const calculateLayoutAndVideos = async () => {
  if (!ui.showVideo) {
    columnsData.value = [];
    return;
  }

  await nextTick();

  if (!columnsWrapperRef.value) {
    columnsData.value = [];
    return;
  }

  if (props.numColumns <= 0 || allVideoUrls.length === 0) {
    columnsData.value = [];
    return;
  }

  const wrapperWidth = columnsWrapperRef.value.offsetWidth;
  const wrapperHeight = columnsWrapperRef.value.offsetHeight;

  if (wrapperWidth === 0 || wrapperHeight === 0) {
    columnsData.value = [];
    return;
  }

  const columnWidth = wrapperWidth / props.numColumns;

  if (props.phoneAspectWidth <= 0 || props.phoneAspectHeight <= 0 || columnWidth <= 0) {
      columnsData.value = [];
      return;
  }

  const calculatedPhoneVideoItemHeightPx = (columnWidth / props.phoneAspectWidth) * props.phoneAspectHeight;

  if (calculatedPhoneVideoItemHeightPx <= 0) {
    columnsData.value = [];
    return;
  }
  phoneVideoItemHeightPx.value = calculatedPhoneVideoItemHeightPx;

  const videosNeededPerScreenHeight = Math.ceil(wrapperHeight / phoneVideoItemHeightPx.value);
  const videosToDisplayPerColumnSet = Math.max(1, Math.ceil(videosNeededPerScreenHeight * props.screensPerColumn));

  const newColumnsData: ColumnData[] = [];
  let globalVideoIndex = 0;
  videoUIDCounter = 0;
  const newVideoLoadedStates: Record<string, boolean> = {};

  const minDuration = 60;
  const maxDuration = 120;

  for (let i = 0; i < props.numColumns; i++) {
    const columnVideoSet: VideoItem[] = [];
    for (let j = 0; j < videosToDisplayPerColumnSet; j++) {
      const src = allVideoUrls[globalVideoIndex % allVideoUrls.length];
      const uniqueId = `vid-col${i}-item${j}-uid${videoUIDCounter++}`;
      columnVideoSet.push({
        id: `col${i}-item${j}-${src.length > 10 ? src.slice(-10) : src}`,
        uniqueId: uniqueId,
        src: src,
      });
      newVideoLoadedStates[uniqueId] = false;
      globalVideoIndex++;
    }

    if (columnVideoSet.length > 0) {
        const duplicatedSet = columnVideoSet.map(v => ({
            ...v,
            uniqueId: `vid-col${i}-dup${v.id.split('-').pop()}-uid${videoUIDCounter++}`
        }));

        const randomAnimationDuration = Math.random() * (maxDuration - minDuration) + minDuration;

        newColumnsData.push({
          videos: [...columnVideoSet, ...duplicatedSet],
          animationClass: i % 2 === 0 ? 'animate-scroll-up' : 'animate-scroll-down',
          animationDuration: randomAnimationDuration,
        });

        duplicatedSet.forEach(v_dup => {
            newVideoLoadedStates[v_dup.uniqueId] = false;
        });
    }
  }
  videoLoadedStates.value = newVideoLoadedStates;
  columnsData.value = newColumnsData;
};

const handleVideoMouseEnter = (event: MouseEvent) => {
  const videoItemElement = event.currentTarget as HTMLElement;
  const scrollingContentElement = videoItemElement.parentElement as HTMLElement | null;

  // Pause column animation
  if (scrollingContentElement) {
    scrollingContentElement.style.animationPlayState = 'paused';
  }

  // Play video
  const videoElement = videoItemElement.querySelector('video');
  if (videoElement) {
    const playPromise = videoElement.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.warn("Video play failed or was interrupted:", error);
      });
    }
  }
};

const handleVideoMouseLeave = (event: MouseEvent) => {
  const videoItemElement = event.currentTarget as HTMLElement;
  const scrollingContentElement = videoItemElement.parentElement as HTMLElement | null;

  // Resume column animation
  if (scrollingContentElement) {
    scrollingContentElement.style.animationPlayState = 'running';
  }

  // Pause video
  const videoElement = videoItemElement.querySelector('video');
  if (videoElement) {
    videoElement.pause();
  }
};

// Function to capture current column positions
const captureColumnPositions = () => {
  const columns = document.querySelectorAll('.scrolling-content');
  columns.forEach((col, index) => {
    const transform = window.getComputedStyle(col).transform;
    const matrix = new DOMMatrix(transform);
    columnPositions.value[index] = matrix.m42; // Get the Y translation value
    // Set the current position for the animation
    (col as HTMLElement).style.setProperty('--current-position', `${(matrix.m42 / col.clientHeight) * 100}%`);
  });
};

// Watch for auth changes
watch(() => auth.isAuth, (newVal) => {
  if (newVal) {
    captureColumnPositions();
  }
});

onMounted(() => {
  calculateLayoutAndVideos();
  window.addEventListener('resize', calculateLayoutAndVideos);

  watch(() => ui.showVideo, (newVal) => {
      if (newVal) {
          calculateLayoutAndVideos();
      } else {
          columnsData.value = [];
      }
  }, { immediate: false });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', calculateLayoutAndVideos);
});

watch(() => [props.numColumns, props.phoneAspectWidth, props.phoneAspectHeight, props.screensPerColumn], () => {
  if (ui.showVideo) {
      calculateLayoutAndVideos();
  }
}, { deep: true });

const $t = (key: string) => key;

</script>

<style scoped>

.video-column .scrolling-content {
  will-change: transform; /* Performance hint for animations */
}

.animate-scroll-up {
  animation-name: scrollUp;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.animate-scroll-down {
  animation-name: scrollDown;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes scrollUp {
  0% {
    transform: translateY(var(--current-position, 0%));
  }
  100% {
    transform: translateY(calc(var(--current-position, 0%) - 50%));
  }
}

@keyframes scrollDown {
  0% {
    transform: translateY(var(--current-position, -50%));
  }
  100% {
    transform: translateY(calc(var(--current-position, -50%) + 50%));
  }
}

.phone-video-item video {
  transition: opacity 0.7s ease-in-out, filter 0.7s ease-in-out;
}

.blur-custom {
  filter: blur(8px);
}
.no-blur-custom {
  filter: blur(0px);
}

.content-overlay > * {
  pointer-events: auto;
}
</style>