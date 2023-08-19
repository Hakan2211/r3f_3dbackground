import * as THREE from "three";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { shaderMaterial } from "@react-three/drei";
import { data } from "../data";
import { heartPoints } from "../heart_data";

//const PATHS = data.icons[0].paths;
const PATHS = data.economics[0].paths;

const randomRange = (min, max) => Math.random() * (max - min) + min;
let curves = [];
for (let i = 0; i < 100; i++) {
  let points = [];
  let length = randomRange(0.1, 1);
  for (let j = 0; j < 100; j++) {
    points.push(
      new THREE.Vector3().setFromSphericalCoords(
        1,
        Math.PI - (j / 100) * Math.PI * length,

        (i / 100) * Math.PI * 2
      )
    );
  }
  let tempcurve = new THREE.CatmullRomCurve3(points);
  curves.push(tempcurve);
}

let brainCurves = [];

PATHS.forEach((path) => {
  let points = [];
  for (let i = 0; i < path.length; i += 3) {
    points.push(new THREE.Vector3(path[i], path[i + 1], path[i + 2]));
  }
  let tempCurve = new THREE.CatmullRomCurve3(points);
  brainCurves.push(tempCurve);
});

function Tube({ curve }) {
  //   let points = [];

  //   for (let i = 0; i < 10; i++) {
  //     points.push(new THREE.Vector3((i - 5) * 0.5, Math.sin(i * 2) * 10 + 5, 0));
  //   }

  //   let curve = new THREE.CatmullRomCurve3(points);
  const brainMat = useRef();
  const brainMesh = useRef();

  let { viewport } = useThree();

  useFrame(({ clock, mouse }) => {
    brainMat.current.uniforms.time.value = clock.getElapsedTime();

    //brainMesh.current.rotation.y = clock.getElapsedTime() / 30;

    brainMat.current.uniforms.mouse.value = new THREE.Vector3(
      (mouse.x * viewport.width) / 2,
      (mouse.y * viewport.height) / 2,
      0
    );
  });

  const BrainMaterial = shaderMaterial(
    {
      time: 0,
      color: new THREE.Color(0.6, 0.2, 0.1),
      mouse: new THREE.Vector3(0, 0, 0),
    },
    // vertex shader
    /*glsl*/ `
      varying vec2 vUv;
      varying float vProgress;
      uniform float time;
      uniform vec3 mouse;
      void main() {
        vUv = uv;
        vProgress = smoothstep(-1.,1.,sin(vUv.x * 8. + time*3.));

        vec3 p = position;
        float maxDist = 0.1;
        float dist = length(mouse.xy - vUv);
        if(dist<maxDist){
          vec3 dir = 0.05*normalize(mouse - p);
          dir*=(1.- dist/maxDist);
          p-= dir;
        }

        gl_Position = projectionMatrix * modelViewMatrix  * vec4(p, 1.0);
      }
    `,
    // fragment shader
    /*glsl*/ `
      uniform float time;
      varying float vProgress;
      uniform vec3 color;
      varying vec2 vUv;

      void main() {
        vec3 color1= vec3(0.1,0.3,0.6);
        vec3 color2= vec3(0.8,0.4,0.3);
        vec3 finalColor= mix(color1 * 0.45,color2,vProgress);

        float hideCorners= smoothstep(1.,.9,vUv.x);
        float hideCorners1= smoothstep(0.,.1,vUv.x);


        gl_FragColor.rgba = vec4(finalColor,hideCorners*hideCorners1);
      }
    `
  );

  // declaratively
  extend({ BrainMaterial });

  return (
    <>
      <mesh
        ref={brainMesh}
        position={[0, 0, 4]}
        //rotation={[-Math.PI / 2, 0, 0]}
        scale={3}
      >
        <tubeGeometry args={[curve, 128, 0.001, 3, false]} />
        <brainMaterial
          ref={brainMat}
          side={THREE.DoubleSide}
          transparent={true}
          depthTest={false}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          //wireframe={true}
        />
      </mesh>
    </>
  );
}

export default function Tubes() {
  return (
    <>
      {brainCurves.map((curve, index) => (
        <Tube curve={curve} key={index} />
      ))}
    </>
  );
}
