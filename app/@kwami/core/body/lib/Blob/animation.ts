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

export default function blobAnimation (
  mesh: Mesh,
  frequencyData: Uint8Array,
  analyser: AnalyserNode,
  vectorX: number,
  vectorY: number,
  vectorZ: number,
  timeX: number,
  timeY: number,
  timeZ: number
  // splitFreq = true
) {
  /* TIME */
  const reduction = 0.00001;
  const perf = performance.now() * reduction;
  const tX = perf * timeX;
  const tY = perf * timeY;
  const tZ = perf * timeZ;
  const positions = mesh.geometry.attributes.position;
  const vertex = new Vector3();

  analyser.getByteFrequencyData(frequencyData);

  // if (splitFreq) {
  //  const frequencies = splitFrequencies(frequencyData);
  // }

  const lowFrequencyData = frequencyData.slice(0, frequencyData.length / 2);
  const highFrequencyData = frequencyData.slice(frequencyData.length / 2);

  const lowFrequencyAvg =
    lowFrequencyData.reduce((sum, val) => sum + val, 0) /
    lowFrequencyData.length;
  const highFrequencyAvg =
    highFrequencyData.reduce((sum, val) => sum + val, 0) /
    highFrequencyData.length;

  const averageFrequency =
    frequencyData.reduce((sum, val) => sum + val, 0) / frequencyData.length;

  const scaleFactor = 1 + averageFrequency / 900;

  mesh.scale.set(scaleFactor, scaleFactor, scaleFactor);

  for (let i = 0; i < positions.count; i++) {
    vertex.fromBufferAttribute(positions, i);
    vertex
      .normalize()
      .multiplyScalar(
        1 +
          0.3 *
            noise3D(
              vertex.x * vectorX + tX + lowFrequencyAvg / 100,
              vertex.y * vectorY + tY + highFrequencyAvg / 100,
              vertex.z * vectorZ + tZ + averageFrequency / 100
            )
      );

    positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }

  positions.needsUpdate = true;
  mesh.geometry.computeVertexNormals();
}

// const splitFrequencies = (frequencyData: Uint8Array) => {
//   const oneThird = Math.ceil(frequencyData.length / 3);
//   return {
//     low: frequencyData.slice(0, oneThird),
//     mid: frequencyData.slice(oneThird, oneThird * 2),
//     high: frequencyData.slice(oneThird * 2)
//   };
// };

// const avgFrequency = (frequencyData: Uint8Array) => {
//  return (
//    frequencyData.reduce((sum, val) => sum + val, 0) / frequencyData.length
// );
// };
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
