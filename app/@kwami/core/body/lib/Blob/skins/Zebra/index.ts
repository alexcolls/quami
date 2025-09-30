import { ShaderMaterial, Color } from 'three';
import vertexShader from './vertex.glsl?raw';
import fragmentShader from './shader.glsl?raw';

export interface ZebraSkinArgs {
  wireframe: boolean;
  lightPosition: string | {};
  shininess: number;
}

export default function zebraSkin (args: ZebraSkinArgs) {
  return new ShaderMaterial({
    vertexShader,
    fragmentShader,
    wireframe: args.wireframe,
    uniforms: {
      lightPosition: {
        value: args.lightPosition
      },
      shininess: {
        value: args.shininess
      },
      specular_color: {
        value: new Color(0xFFFFFF)
      }
    }
  });
}
