import { ShaderMaterial, Color } from 'three';
import vertexShader from './vertex.glsl?raw';
import fragmentShader from './shader.glsl?raw';

export const shaders = {
  vertexShader,
  fragmentShader
};
export interface TricolorSkinArgs {
  wireframe: boolean;
  lightPosition: string | {};
  shininess: number;
  color1: string;
  color2: string;
  color3: string;
}

export default function tricolorSkin (args: TricolorSkinArgs) {
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
      },
      _color1: {
        value: new Color(args.color1)
      },
      _color2: {
        value: new Color(args.color2)
      },
      _color3: {
        value: new Color(args.color3)
      }
    }
  });
}
