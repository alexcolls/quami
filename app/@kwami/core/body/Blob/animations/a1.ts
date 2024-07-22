import { createNoise3D } from 'simplex-noise';
import { type Mesh, Vector3 } from 'three';

const noise3D = createNoise3D();

export type NormalStateArgs = {
  mesh: Mesh;
  speed: number;
  processing: number;
  spikes: number;
  frequencyData: Uint8Array;
  analyser: AnalyserNode;
  // audioEffectFactor: number;
};

export default function animation1 (args: NormalStateArgs) {
  const time =
    (performance.now() * 0.001 * args.speed * Math.pow(args.processing, 3)) /
    100;

  const positions = args.mesh.geometry.attributes.position;
  const vertex = new Vector3();

  args.analyser.getByteFrequencyData(args.frequencyData);

  for (let i = 0; i < positions.count; i++) {
    vertex.fromBufferAttribute(positions, i);
    const audioFactor =
      1 + args.frequencyData[i % args.frequencyData.length] / 556;
    vertex
      .normalize()
      .multiplyScalar(
        (0.9 +
          0.25 *
            noise3D(
              vertex.x * args.spikes + time,
              vertex.y * args.spikes,
              vertex.z * args.spikes
            )) *
          audioFactor
      );

    positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }

  positions.needsUpdate = true;
  args.mesh.geometry.computeVertexNormals();
}
