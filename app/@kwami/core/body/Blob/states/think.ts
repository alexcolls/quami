import { createNoise3D } from 'simplex-noise';
import { type Mesh, Vector3 } from 'three';

const noise3D = createNoise3D();

export default function thinkState (
  frequencyData: Uint8Array,
  analyser: AnalyserNode,
  mesh: Mesh,
  speed: number,
  intensity1: number,
  intensity2: number,
  intensity3: number,
  spikes1: number,
  spikes2: number,
  spikes3: number,
  texture1: number,
  texture2: number,
  texture3: number,
  audioEffectFactor: number
) {
  const time =
    (performance.now() * 0.001 * speed * Math.pow(intensity1, 3)) / 100;

  let audioEffect = 0;
  if (analyser) {
    analyser.getByteFrequencyData(frequencyData);
    let average = 0;
    for (let i = 0; i < frequencyData.length; i++) {
      average += frequencyData[i] * spikes2;
    }
    average /= frequencyData.length;
    audioEffect = (average / 128.0) * audioEffectFactor;
  }

  const _spikes1 = spikes1 * intensity1;
  const _spikes2 = spikes2 * intensity2;
  const _spikes3 = spikes3 * intensity3;

  const positions = mesh.geometry.attributes.position;
  const vertex = new Vector3();

  for (let i = 0; i < positions.count; i++) {
    vertex.fromBufferAttribute(positions, i);
    vertex
      .normalize()
      .multiplyScalar(
        texture1 +
          0.3 *
            noise3D(
              vertex.x * _spikes1 + audioEffect + time,
              vertex.y * _spikes1 + audioEffect,
              vertex.z * _spikes1 + audioEffect
            )
      );
    vertex
      .normalize()
      .multiplyScalar(
        texture2 +
          0.3 *
            noise3D(
              vertex.x * _spikes2 + audioEffect,
              vertex.y * _spikes2 + audioEffect + time,
              vertex.z * _spikes2 + audioEffect
            )
      );
    vertex
      .normalize()
      .multiplyScalar(
        texture3 +
          0.3 *
            noise3D(
              vertex.x * _spikes3 + audioEffect,
              vertex.y * _spikes3 + audioEffect,
              vertex.z * _spikes3 + audioEffect + time
            )
      );

    positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }

  positions.needsUpdate = true;
  mesh.geometry.computeVertexNormals();
  // mesh.geometry.normalsNeedUpdate = true;
  // mesh.geometry.verticesNeedUpdate = true;

  // CONTROLS.update();
}
