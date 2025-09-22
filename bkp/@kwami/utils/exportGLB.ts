// @ts-ignore
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import { Scene } from 'three';

export function exportGLB (scene: Scene): void {
  if (!scene) {
    console.error('Scene is not initialized.');
    return;
  }

  const exportOptions = {
    binary: true
  };

  const exporter = new GLTFExporter();

  exporter.parse(
    scene,
    function (gltf: ArrayBuffer) {
      const blob = new Blob([gltf], { type: 'model/gltf-binary' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'model.glb';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    exportOptions
  );
}
