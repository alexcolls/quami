import { createNoise3D } from 'simplex-noise';
import { type Mesh, Vector3 } from 'three';

const noise3D = createNoise3D();

/**
 * Animate the blob mesh based on audio frequency data
 * Uses simplex noise for smooth, organic movement
 */
export function animateBlob(
  mesh: Mesh,
  frequencyData: Uint8Array<ArrayBuffer>,
  analyser: AnalyserNode,
  spikeX: number,
  spikeY: number,
  spikeZ: number,
  timeX: number,
  timeY: number,
  timeZ: number,
): void {
  // Time calculation with reduction factor for smooth animation
  const reduction = 0.00001;
  const perf = performance.now() * reduction;
  const tX = perf * timeX;
  const tY = perf * timeY;
  const tZ = perf * timeZ;

  const positions = mesh.geometry.attributes.position;
  if (!positions) return;

  const vertex = new Vector3();

  // Get frequency data
  analyser.getByteFrequencyData(frequencyData);

  const averageFrequency
    = frequencyData.reduce((sum, val) => sum + val, 0) / frequencyData.length;

  // Scale the entire mesh based on audio amplitude
  const scaleFactor = 1 + (averageFrequency * 2) / 900;
  mesh.scale.set(scaleFactor, scaleFactor, scaleFactor);

  // Calculate noise frequencies for smooth, organic movement
  const baseFreqX = Math.max(0.025, spikeX);
  const baseFreqY = Math.max(0.025, spikeY);
  const baseFreqZ = Math.max(0.025, spikeZ);

  // Amplitude modulated by audio
  const amp = 0.18 + 0.18 * (averageFrequency / 255);

  // Apply noise to each vertex
  for (let i = 0; i < positions.count; i++) {
    vertex.fromBufferAttribute(positions, i);
    vertex
      .normalize()
      .multiplyScalar(
        1
        + amp
        * noise3D(
          vertex.x * baseFreqX + tX,
          vertex.y * baseFreqY + tY,
          vertex.z * baseFreqZ + tZ,
        ),
      );

    positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }

  positions.needsUpdate = true;
  mesh.geometry.computeVertexNormals();
}
