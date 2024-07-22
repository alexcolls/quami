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

export default function normalState (args: NormalStateArgs) {
  const time =
    (performance.now() * 0.001 * args.speed * Math.pow(args.processing, 3)) /
    100;

  const positions = args.mesh.geometry.attributes.position;
  const vertex = new Vector3();

  // Assume frequencyData is an array that holds your audio data
  args.analyser.getByteFrequencyData(args.frequencyData);

  const lowFrequencyData = args.frequencyData.slice(
    0,
    args.frequencyData.length / 2
  );
  const highFrequencyData = args.frequencyData.slice(
    args.frequencyData.length / 2
  );

  const lowFrequencyAvg =
    lowFrequencyData.reduce((sum, val) => sum + val, 0) /
    lowFrequencyData.length;
  const highFrequencyAvg =
    highFrequencyData.reduce((sum, val) => sum + val, 0) /
    highFrequencyData.length;

  const averageFrequency =
    args.frequencyData.reduce((sum, val) => sum + val, 0) /
    args.frequencyData.length;

  const scaleFactor = 1 + averageFrequency / 900;

  args.mesh.scale.set(scaleFactor, scaleFactor, scaleFactor);

  for (let i = 0; i < positions.count; i++) {
    vertex.fromBufferAttribute(positions, i);
    // const audioFactor = scaleFactor * (10 - args.spikes);
    vertex.normalize().multiplyScalar(
      0.9 +
        0.25 *
          noise3D(
            vertex.x * 0 + lowFrequencyAvg / 100, // args.spikes + time,
            vertex.y * 0 + highFrequencyAvg / 100,
            vertex.z * -2 + time + averageFrequency / 100
            // args.spikes + lowFrequencyAvg
          )
    );

    positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }

  positions.needsUpdate = true;
  args.mesh.geometry.computeVertexNormals();
}

// export default function normalState(args: NormalStateArgs) {
//   let time =
//     (performance.now() * 0.001 * args.speed * Math.pow(args.processing, 3)) /
//     100;

//   let positions = args.mesh.geometry.attributes.position;
//   let vertex = new Vector3();

//   args.analyser.getByteFrequencyData(args.frequencyData);

//   for (let i = 0; i < positions.count; i++) {
//     vertex.fromBufferAttribute(positions, i);
//     const audioFactor =
//       1 + args.frequencyData[i % args.frequencyData.length] / 556;
//     vertex
//       .normalize()
//       .multiplyScalar(
//         (0.9 +
//           0.25 *
//             noise3D(
//               vertex.x * args.spikes + time,
//               vertex.y * args.spikes,
//               vertex.z * args.spikes
//             )) *
//           audioFactor
//       );

//     positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
//   }

//   positions.needsUpdate = true;
//   args.mesh.geometry.computeVertexNormals();
// }
