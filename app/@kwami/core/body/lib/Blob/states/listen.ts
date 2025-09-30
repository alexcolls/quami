// import { createNoise3D } from 'simplex-noise';
import { type Vector3, SphereGeometry } from 'three';

// const noise3D = createNoise3D();

export default function listenState (
  originalVertices: Array<Vector3>,
  model: SphereGeometry,
  frequencyData: Uint8Array,
  analyser: AnalyserNode
) {
  // const time = performance.now();

  // let audioEffect = 0;
  // if (analyser) {
  //   analyser.getByteFrequencyData(frequencyData);
  //   let average = 0;
  //   for (let i = 0; i < frequencyData.length; i++) {
  //     average += frequencyData[i];
  //   }
  //   average /= frequencyData.length;
  //   audioEffect = (average / 128.0) * audioEffectFactor;
  // }
  analyser.getByteFrequencyData(frequencyData);
  console.log('clean', frequencyData);

  // let sum = 0;
  // for (let i = 0; i < frequencyData.length; i++) {
  // sum += frequencyData[i];
  // }
  // const average = sum / frequencyData.length;

  // Scale the sphere based on the average amplitude
  // const scale = average / 128.0 + 1;
  // normalize average amplitude value to range [1, 2]

  const multiplier = 0.05;
  // Alter the vertices based on the frequency data
  // Preprocess the frequency data with a simple averaging
  // filter to smooth it out
  const smoothedFrequencyData = new Uint8Array(frequencyData.length);
  for (let i = 1; i < frequencyData.length - 1; i++) {
    smoothedFrequencyData[i] =
      (frequencyData[i - 1] + frequencyData[i] + frequencyData[i + 1]) / 3;
  }
  smoothedFrequencyData[0] = (frequencyData[0] + frequencyData[1]) / 2;
  smoothedFrequencyData[frequencyData.length - 1] =
    (frequencyData[frequencyData.length - 2] +
      frequencyData[frequencyData.length - 1]) /
    2;

  // Alter the vertices based on the smoothed frequency data
  for (let i = 0; i < originalVertices.length; i++) {
    const offset = originalVertices[i]
      .clone()
      .normalize()
      .multiplyScalar(
        (smoothedFrequencyData[i % smoothedFrequencyData.length] / 128) *
          multiplier
      );
    model.attributes.position.setXYZ(
      i,
      originalVertices[i].x + offset.x,
      originalVertices[i].y + offset.y,
      originalVertices[i].z + offset.z
    );
  }

  // Need to flag vertices as needing an update
  model.attributes.position.needsUpdate = true;
  // mesh.scale.set(scale, scale, scale);
  // const audioEffect = frequencyData.
  // let positions = mesh.geometry.attributes.position;
  // let vertex = new Vector3();

  // for (let i = 0; i < positions.count; i++) {
  //   vertex.fromBufferAttribute(positions, i);
  //   vertex
  //     .normalize()
  //     .multiplyScalar(
  //       0.9 + 0.3 * noise3D(vertex.x + 1, vertex.y + 1, vertex.z + 1)
  //     );
  //   // vertex
  //   //   .normalize()
  //   //   .multiplyScalar(
  //   //     texture2 +
  //   //       0.3 *
  //   //         noise3D(
  //   //           vertex.x * _spikes2 + audioEffect,
  //   //           vertex.y * _spikes2 + audioEffect + time,
  //   //           vertex.z * _spikes2 + audioEffect
  //   //         )
  //   //   );
  //   // vertex
  //   //   .normalize()
  //   //   .multiplyScalar(
  //   //     texture3 +
  //   //       0.3 *
  //   //         noise3D(
  //   //           vertex.x * _spikes3 + audioEffect,
  //   //           vertex.y * _spikes3 + audioEffect,
  //   //           vertex.z * _spikes3 + audioEffect + time
  //   //         )
  //   //   );

  //   positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
  // }

  // positions.needsUpdate = true;
  // mesh.geometry.computeVertexNormals();
  // mesh.geometry.normalsNeedUpdate = true;
  // mesh.geometry.verticesNeedUpdate = true;

  // CONTROLS.update();
}
