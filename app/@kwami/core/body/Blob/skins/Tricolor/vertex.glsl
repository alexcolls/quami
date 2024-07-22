
varying vec3 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUV;// Add vUV varying variable

void main(){
  vUv=position;
  vNormal=normalize(normalMatrix*normal);
  vPosition=position;// Pass the position to the fragment shader
  vUV=uv;// Pass uv coordinate to fragment shader
  gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
}
