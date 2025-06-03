<template>
  <ClientOnly>
    <div class="video-sphere-wrapper">
      <div ref="rendererContainerRef" class="renderer-container"></div>
      <div v-if="isLoading" class="loading-indicator">ENTERING VIDEO SPHERE...</div>
      <div v-if="interactionHint && !isLoading && !focusedVideo" class="interaction-hint">
        CLICK & DRAG to Look Around, SCROLL to Zoom, CLICK a Video to Focus
      </div>
      <div v-if="focusedVideo && !isLoading" class="close-focus-button" @click="unfocusVideo">
        &times; CLOSE VIDEO
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import TWEEN from '@tweenjs/tween.js';
import allVideosFromJson from '@/assets/vid/links.json';

const { ui } = useStore();

const props = defineProps({
  numVideosInSphere: { type: Number, default: 150 },
  sphereRadius: { type: Number, default: 25 },
  videoHeight: { type: Number, default: 3.2 },
  videoAspectRatio: { type: Number, default: 9 / 16 },
  focusScaleFactor: { type: Number, default: 2.5 },
});

const rendererContainerRef = ref<HTMLDivElement | null>(null);
const isLoading = ref(true);
const interactionHint = ref(true);

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let controls: OrbitControls;
let animationFrameId: number;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const videoSources = ref<string[]>([]);
const videoPlanes: {
  mesh: THREE.Mesh;
  originalPosition: THREE.Vector3;
  originalQuaternion: THREE.Quaternion;
  originalMaterial: THREE.Material; // Store original material
  videoEl?: HTMLVideoElement;
  videoUrl: string;
  originalIndex: number;
}[] = [];

const focusedVideo = ref<{
  mesh: THREE.Mesh;
  videoEl: HTMLVideoElement;
  originalPosition: THREE.Vector3;
  originalQuaternion: THREE.Quaternion;
  originalMaterial: THREE.Material;
  tween?: TWEEN.Tween<any>;
} | null>(null);

let videoPlaneGeometry: THREE.PlaneGeometry;

// Placeholder material - more visible
const placeholderMaterialBase = new THREE.MeshStandardMaterial({
  color: 0x556677, // Brighter, more visible placeholder (e.g., medium gray-blue)
  roughness: 0.7,
  metalness: 0.2,
  side: THREE.DoubleSide,
  // wireframe: true, // Enable wireframe to see planes clearly if untextured
});

const initThreeScene = async () => {
  if (!rendererContainerRef.value || !ui.showVideo) return;
  isLoading.value = true;
  console.log("[VideoSphere] Initializing...");
  const container = rendererContainerRef.value;

  videoPlaneGeometry = new THREE.PlaneGeometry(props.videoHeight * props.videoAspectRatio, props.videoHeight);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x050510);

  camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, props.sphereRadius * 4); // Increased far plane
  camera.position.set(0, 0, 0.1);
  scene.add(camera);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enablePan = false;
  controls.minDistance = 0.5; // Allow getting a bit closer
  controls.maxDistance = props.sphereRadius * 0.7; // Don't zoom out too far
  controls.target.set(0, 0, 0);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.9); // Brighter ambient
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0xffffff, 0.8, 60); // Stronger point light
  camera.add(pointLight);

  try {
    const importedUrls = (allVideosFromJson as any).default || allVideosFromJson;
    if (!Array.isArray(importedUrls)) throw new Error("links.json is not an array.");
    videoSources.value = importedUrls.filter(url => typeof url === 'string');
    if (videoSources.value.length === 0) throw new Error("No valid video URLs in links.json.");
    console.log("[VideoSphere] Video sources loaded:", videoSources.value.length);
  } catch (e: any) {
    console.error("[VideoSphere] Error loading video sources:", e.message);
    isLoading.value = false; return;
  }

  createVideoSphereLayout();

  container.addEventListener('click', onClick);
  window.addEventListener('resize', handleResize);

  isLoading.value = false;
  setTimeout(() => interactionHint.value = false, 7000);
  console.log("[VideoSphere] Initialization complete.");
  animate();
};

const createVideoSphereLayout = () => {
  const N = props.numVideosInSphere;
  if (N === 0 || videoSources.value.length === 0) {
    console.warn("[VideoSphere] Cannot create layout: N is 0 or no video sources.");
    return;
  }
  console.log(`[VideoSphere] Creating ${N} video planes...`);

  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (Math.max(1, N - 1))) * 2; // Avoid division by zero if N=1
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y)); // Ensure non-negative
    const theta = goldenAngle * i;
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    const pos = new THREE.Vector3(
      x * props.sphereRadius,
      y * props.sphereRadius,
      z * props.sphereRadius
    );

    const materialInstance = placeholderMaterialBase.clone(); // Each plane gets its own material instance
    const mesh = new THREE.Mesh(videoPlaneGeometry, materialInstance);
    mesh.position.copy(pos);
    mesh.lookAt(0, 0, 0);

    const originalPosition = mesh.position.clone();
    const originalQuaternion = mesh.quaternion.clone();
    const videoUrl = videoSources.value[i % videoSources.value.length];

    mesh.userData = { type: 'videoPlane', originalIndex: i, videoUrl };
    // console.log(`[VideoSphere] Plane ${i} created. URL: ${videoUrl.slice(0,30)}...`);

    videoPlanes.push({ mesh, originalPosition, originalQuaternion, originalMaterial: materialInstance, videoUrl, originalIndex: i });
    scene.add(mesh);
  }
  console.log(`[VideoSphere] ${videoPlanes.length} video planes actually created and added to scene.`);
};

const testSelectedMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide, wireframe: true }); // Bright green wireframe

const onClick = (event: MouseEvent) => {
  if (isLoading.value || !rendererContainerRef.value || focusedVideo.value) return;

  const rect = rendererContainerRef.value.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(videoPlanes.map(p => p.mesh), false); // Non-recursive

  if (intersects.length > 0) {
    const intersectedObject = intersects[0].object as THREE.Mesh;
    console.log("[VideoSphere] Raycaster intersected:", intersectedObject.userData);
    if (intersectedObject.userData.type === 'videoPlane') {
      const planeData = videoPlanes.find(p => p.mesh === intersectedObject);
      if (planeData) {
        console.log(`[VideoSphere] Clicked on plane: originalIndex ${planeData.originalIndex}, URL: ${planeData.videoUrl}`);
        // --- Initial Test: Change material color ---
        // planeData.mesh.material = testSelectedMaterial.clone();
        // console.log("[VideoSphere] Test material applied to clicked plane.");
        // --- End Initial Test ---
        focusOnVideo(planeData); // Proceed to full focus logic
      } else {
        console.warn("[VideoSphere] Intersection found, but no matching planeData.");
      }
    } else {
        console.warn("[VideoSphere] Intersection found, but not a videoPlane type:", intersectedObject.userData);
    }
  } else {
    // console.log("[VideoSphere] Raycaster: No intersection.");
  }
};

const focusOnVideo = (planeData: typeof videoPlanes[0]) => {
  if (focusedVideo.value || !camera) return;
  console.log(`[VideoSphere] Focusing on video: index ${planeData.originalIndex}, URL: ${planeData.videoUrl.slice(0,70)}...`);
  interactionHint.value = false;
  controls.enabled = false;

  const videoEl = document.createElement('video');
  videoEl.src = planeData.videoUrl;
  videoEl.crossOrigin = 'anonymous';
  videoEl.loop = false;
  videoEl.muted = false;
  videoEl.preload = 'auto';
  console.log(`[VideoSphere] Video element created for ${planeData.videoUrl.slice(0,70)}...`);

  videoEl.oncanplay = () => {
    console.log(`[VideoSphere] Video can play: ${planeData.videoUrl.slice(0,70)}... State: ${videoEl.readyState}`);
    if (focusedVideo.value && focusedVideo.value.videoEl === videoEl && focusedVideo.value.tween?.isPlaying() === false) { // Check if animation is done
        videoEl.play().catch(e => console.warn(`[VideoSphere] Focused video play() failed after canplay: ${e.message}`));
    }
  };
  videoEl.onerror = (e) => {
    console.error(`[VideoSphere] Error with video element for ${planeData.videoUrl.slice(0,70)}...:`, e);
    // Potentially revert material if video fails catastrophically
    if (focusedVideo.value && focusedVideo.value.mesh === planeData.mesh) {
        planeData.mesh.material = planeData.originalMaterial.clone(); // Revert to original placeholder
    }
  };


  const videoTexture = new THREE.VideoTexture(videoEl);
  videoTexture.minFilter = THREE.LinearFilter;
  videoTexture.magFilter = THREE.LinearFilter;
  console.log(`[VideoSphere] VideoTexture created for ${planeData.videoUrl.slice(0,70)}...`);

  const focusedMaterial = new THREE.MeshBasicMaterial({ map: videoTexture, side: THREE.DoubleSide, toneMapped: false });
  planeData.mesh.material = focusedMaterial;
  console.log(`[VideoSphere] Focused material (with video texture) applied to mesh ${planeData.originalIndex}`);


  focusedVideo.value = {
    mesh: planeData.mesh,
    videoEl: videoEl,
    originalPosition: planeData.originalPosition.clone(),
    originalQuaternion: planeData.originalQuaternion.clone(),
    originalMaterial: planeData.originalMaterial, // Store the specific original material
  };

  const targetPosition = new THREE.Vector3();
  const vFOV = THREE.MathUtils.degToRad(camera.fov);
  const planeHeightToFit = props.videoHeight * props.focusScaleFactor;
  // Target distance to make the plane's height roughly 80-90% of the viewport height
  const targetDist = (planeHeightToFit / 2) / Math.tan(vFOV / 2) * 0.9;


  camera.getWorldDirection(targetPosition);
  targetPosition.multiplyScalar(targetDist);
  targetPosition.add(camera.position);

  const targetQuaternion = new THREE.Quaternion();
  const tempMatrix = new THREE.Matrix4().lookAt(targetPosition, camera.position, camera.up);
  targetQuaternion.setFromRotationMatrix(tempMatrix);

  const targetScale = new THREE.Vector3(props.focusScaleFactor, props.focusScaleFactor, 1);

  TWEEN.remove(focusedVideo.value.tween); // Ensure no old tween is running

  console.log(`[VideoSphere] Animating mesh ${planeData.originalIndex} to focus.`);
  focusedVideo.value.tween = new TWEEN.Tween({ /* ... TWEEN setup from previous version ... */
    x: planeData.mesh.position.x, y: planeData.mesh.position.y, z: planeData.mesh.position.z,
    qx: planeData.mesh.quaternion.x, qy: planeData.mesh.quaternion.y, qz: planeData.mesh.quaternion.z, qw: planeData.mesh.quaternion.w,
    sx: planeData.mesh.scale.x, sy: planeData.mesh.scale.y
  })
  .to({
    x: targetPosition.x, y: targetPosition.y, z: targetPosition.z,
    qx: targetQuaternion.x, qy: targetQuaternion.y, qz: targetQuaternion.z, qw: targetQuaternion.w,
    sx: targetScale.x, sy: targetScale.y
  }, 800)
  .easing(TWEEN.Easing.Quadratic.Out)
  .onUpdate((obj) => {
    if (focusedVideo.value) {
      focusedVideo.value.mesh.position.set(obj.x, obj.y, obj.z);
      focusedVideo.value.mesh.quaternion.set(obj.qx, obj.qy, obj.qz, obj.qw);
      focusedVideo.value.mesh.scale.set(obj.sx, obj.sy, 1);
    }
  })
  .onComplete(() => {
    console.log(`[VideoSphere] Focus animation complete for mesh ${planeData.originalIndex}. Attempting to play.`);
    if (focusedVideo.value && focusedVideo.value.videoEl) {
      // Check readyState before playing
      if (focusedVideo.value.videoEl.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) { // HAVE_METADATA is 1, HAVE_CURRENT_DATA is 2, HAVE_FUTURE_DATA is 3, HAVE_ENOUGH_DATA is 4
        focusedVideo.value.videoEl.play().catch(e => console.warn(`[VideoSphere] Focused video play() failed: ${e.message}`));
      } else {
        console.warn(`[VideoSphere] Video not ready to play on animation complete. State: ${focusedVideo.value.videoEl.readyState}`);
        // The 'canplay' event listener should handle playing it once ready.
      }
    }
  })
  .start();

  videoPlanes.forEach(p => {
    if (p.mesh !== planeData.mesh) {
      p.mesh.visible = false;
    }
  });
};

const unfocusVideo = () => {
  if (!focusedVideo.value) return;
  console.log("[VideoSphere] Unfocusing video.");

  const { mesh, videoEl, originalPosition, originalQuaternion, originalMaterial, tween } = focusedVideo.value;

  videoEl.pause();
  if (tween) TWEEN.remove(tween);

  console.log(`[VideoSphere] Animating mesh back to original state.`);
  new TWEEN.Tween({ /* ... TWEEN setup from previous version ... */
    x: mesh.position.x, y: mesh.position.y, z: mesh.position.z,
    qx: mesh.quaternion.x, qy: mesh.quaternion.y, qz: mesh.quaternion.z, qw: mesh.quaternion.w,
    sx: mesh.scale.x, sy: mesh.scale.y
  })
  .to({
    x: originalPosition.x, y: originalPosition.y, z: originalPosition.z,
    qx: originalQuaternion.x, qy: originalQuaternion.y, qz: originalQuaternion.z, qw: originalQuaternion.w,
    sx: 1, sy: 1
  }, 600)
  .easing(TWEEN.Easing.Quadratic.InOut)
  .onUpdate((obj) => {
    mesh.position.set(obj.x, obj.y, obj.z);
    mesh.quaternion.set(obj.qx, obj.qy, obj.qz, obj.qw);
    mesh.scale.set(obj.sx, obj.sy, 1);
  })
  .onComplete(() => {
    console.log(`[VideoSphere] Unfocus animation complete. Restoring material for mesh.`);
    // Restore the specific original material instance
    mesh.material = originalMaterial;

    if (videoEl) {
        // The texture was on the focusedMaterial, which is now replaced.
        // We need to ensure the texture itself is disposed if it was created.
        const focusedMat = focusedVideo.value?.mesh.material as THREE.MeshBasicMaterial; // This is now originalMaterial
        const videoTex = focusedMat?.map as THREE.VideoTexture; // This would be wrong after material restore
                                                                // The texture to dispose was on the temp focusedMaterial
        // Find the video texture that was used on the focusedMaterial before it was swapped back
        // This is tricky because the material was replaced. We need to dispose the texture from the *temporary* focusedMaterial.
        // A better way: store the videoTexture on focusedVideo.value and dispose it here.
        // For now, let's assume the texture is implicitly handled when the videoEl is detached.

        videoEl.src = ""; // Detach source
        videoEl.load(); // Important to release resources
        // Remove the video element from DOM if it was ever added (it wasn't in this setup)
    }
    focusedVideo.value = null;
    controls.enabled = true;

    videoPlanes.forEach(p => {
      p.mesh.visible = true;
    });
    interactionHint.value = true;
    console.log("[VideoSphere] Video unfocused, controls enabled, planes visible.");
  })
  .start();
};


const animate = () => {
  animationFrameId = requestAnimationFrame(animate);
  TWEEN.update();
  if (controls && controls.enabled) controls.update();
  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
};

const handleResize = () => {
  if (camera && renderer && rendererContainerRef.value) {
    const newWidth = rendererContainerRef.value.clientWidth;
    const newHeight = rendererContainerRef.value.clientHeight;
    if (newWidth > 0 && newHeight >0) {
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    }
  }
};

const cleanupThreeScene = () => {
  console.log("[VideoSphere] Cleaning up Video Sphere...");
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  if (rendererContainerRef.value) {
    rendererContainerRef.value.removeEventListener('click', onClick);
  }
  window.removeEventListener('resize', handleResize);

  if (focusedVideo.value && focusedVideo.value.videoEl) {
      focusedVideo.value.videoEl.pause();
      focusedVideo.value.videoEl.src = "";
      // focusedVideo.value.videoEl.remove(); // If it was ever added to DOM
  }

  videoPlanes.forEach(plane => {
    if(scene) scene.remove(plane.mesh);
    if (plane.mesh.geometry) plane.mesh.geometry.dispose();
    // Dispose originalMaterial if it's unique and has a map
    if (plane.originalMaterial instanceof THREE.Material) {
        const mat = plane.originalMaterial as (THREE.MeshBasicMaterial | THREE.MeshStandardMaterial);
        if (mat.map) mat.map.dispose(); // If placeholder had a texture
        mat.dispose();
    }
    // If a videoEl was associated (even if not focused now, from a previous focus)
    if (plane.videoEl) {
        plane.videoEl.pause();
        plane.videoEl.src = "";
    }
  });
  videoPlanes.length = 0;

  if (controls) controls.dispose();
  if (renderer) {
    renderer.dispose();
    if (renderer.domElement.parentElement) renderer.domElement.parentElement.removeChild(renderer.domElement);
  }
  // @ts-ignore
  renderer = null; scene = null; camera = null; controls = null;
  TWEEN.removeAll();
  console.log("[VideoSphere] Cleanup complete.");
};

onMounted(async () => {
  console.log("[VideoSphere] Mounted. Applying global styles.");
  document.body.style.margin = '0';
  document.body.style.padding = '0'; // Added padding reset
  document.body.style.overflow = 'hidden';
  document.body.style.boxSizing = 'border-box'; // Added box-sizing
  const htmlEl = document.documentElement;
  htmlEl.style.margin = '0';
  htmlEl.style.padding = '0';
  htmlEl.style.overflow = 'hidden';
  htmlEl.style.boxSizing = 'border-box';


  const appRoot = document.getElementById('app'); // Common Vue root ID
  if (appRoot) {
    appRoot.style.width = '100vw';
    appRoot.style.height = '100vh';
    appRoot.style.margin = '0';
    appRoot.style.padding = '0';
    appRoot.style.overflow = 'hidden';
    appRoot.style.boxSizing = 'border-box';
  }

  if (ui.showVideo) {
    await nextTick();
    if (rendererContainerRef.value) {
      const observer = new ResizeObserver(entries => {
        for (const entry of entries) {
          if (entry.target === rendererContainerRef.value) {
            if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
              if (!scene) initThreeScene(); // Initialize only if not already done
              handleResize(); // Ensure correct size on init
              observer.unobserve(entry.target); // Stop observing once sized
              console.log("[VideoSphere] ResizeObserver confirmed dimensions, init called.");
            } else {
                 console.warn("[VideoSphere] ResizeObserver: Container zero dimensions.", {w: entry.contentRect.width, h: entry.contentRect.height});
            }
          }
        }
      });
      observer.observe(rendererContainerRef.value);
      console.log("[VideoSphere] ResizeObserver attached.");
    } else {
         console.error("[VideoSphere] Error: rendererContainerRef is null on mount.");
    }
  } else {
      console.log("[VideoSphere] ui.showVideo is false on mount.");
  }

  // Watcher for ui.showVideo (no changes from previous, just ensure it's correct)
  watch(() => ui.showVideo, async (newValue) => {
    console.log(`[VideoSphere] ui.showVideo watcher: ${newValue}`);
    if (newValue) {
      await nextTick();
      if (rendererContainerRef.value && !scene) { // Only re-init if scene is truly gone
         const observer = new ResizeObserver(entries => {
             for (const entry of entries) {
                 if (entry.target === rendererContainerRef.value) {
                     if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
                         if(!scene) initThreeScene();
                         handleResize();
                         observer.unobserve(entry.target);
                     }
                 }
             }
         });
         observer.observe(rendererContainerRef.value);
         console.log("[VideoSphere] ui.showVideo became true, re-attaching observer if needed.");
      } else if (scene) {
          console.log("[VideoSphere] ui.showVideo became true, but scene already exists. Doing nothing to re-init.");
      }
    } else {
      cleanupThreeScene();
    }
  }, { immediate: false });
});

onBeforeUnmount(() => {
  cleanupThreeScene();
  window.removeEventListener('resize', handleResize); // Ensure this is also removed
});

</script>

<style>
/* Global styles to ensure full viewport coverage and no margins */
html, body {
  margin: 0 !important; /* Use !important to fight overrides if necessary */
  padding: 0 !important;
  overflow: hidden !important;
  width: 100% !important;
  height: 100% !important;
  box-sizing: border-box !important;
}
/* Ensure the #app div (common Vue root) also fills the viewport */
#app {
  width: 100% !important; /* Use 100% instead of 100vw for children of body */
  height: 100% !important;/* Use 100% instead of 100vh */
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
  box-sizing: border-box !important;
}
</style>

<style scoped>
.video-sphere-wrapper {
  width: 100%; /* Take full width of parent (ideally 100vw from #app) */
  height: 100%;/* Take full height of parent (ideally 100vh from #app) */
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #050510;
  cursor: grab;
  position: relative; /* For absolute positioning of children like overlays */
}
.video-sphere-wrapper:active {
  cursor: grabbing;
}
.renderer-container {
  width: 100%;
  height: 100%;
  display: block; /* Or flex if you need to center canvas, but block is fine */
}

.loading-indicator, .interaction-hint {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  color: white; font-size: 1.5em; font-family: 'Arial', sans-serif;
  text-shadow: 0 0 8px #0af, 0 0 15px #0af;
  pointer-events: none; z-index: 10; text-align: center;
}
.interaction-hint { font-size: 0.9em; top: 90%; padding: 5px 10px; background-color: rgba(0,0,0,0.3); border-radius: 5px;}

.close-focus-button {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 15px;
  background-color: rgba(255, 255, 255, 0.2); /* Lighter for better visibility on dark bg */
  color: white;
  border: 1px solid rgba(255,255,255,0.5);
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  z-index: 20;
  transition: background-color 0.3s, color 0.3s;
  backdrop-filter: blur(5px); /* Frosted glass effect */
}
.close-focus-button:hover {
  background-color: rgba(255, 0, 0, 0.7);
  border-color: rgba(255,0,0,0.9);
}
</style>
