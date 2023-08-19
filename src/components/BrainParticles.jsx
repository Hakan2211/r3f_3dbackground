import { data } from "../data";
import { heartPoints } from "../heart_data";
import * as THREE from "three";
import { extend, useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";

//const PATHS = data.icons[0].paths;
const PATHS = data.economics[0].paths;
const randomRange = (min, max) => Math.random() * (max - min) + min;

let brainCurves = [];

PATHS.forEach((path) => {
  let points = [];
  for (let i = 0; i < path.length; i += 3) {
    points.push(new THREE.Vector3(path[i], path[i + 1], path[i + 2]));
  }
  let tempCurve = new THREE.CatmullRomCurve3(points);
  brainCurves.push(tempCurve);
});

export default function BrainParticles() {
  let density = 10;
  let numberOfPoints = 10 * brainCurves.length;
  const myPoints = useRef([]);
  const brainGeo = useRef();
  const brainParticles = useRef();
  let positions = useMemo(() => {
    let positions = [];
    for (let i = 0; i < numberOfPoints; i++) {
      positions.push(
        randomRange(-1, 1),
        randomRange(-1, 1),
        randomRange(-1, 1)
      );
    }
    return new Float32Array(positions);
  }, []);

  let randomSize = useMemo(() => {
    let randomSize = [];
    for (let i = 0; i < numberOfPoints; i++) {
      randomSize.push(randomRange(0.3, 1));
    }
    return new Float32Array(randomSize);
  }, []);

  useEffect(() => {
    for (let i = 0; i < brainCurves.length; i++) {
      for (let j = 0; j < density; j++) {
        myPoints.current.push({
          currentOffset: Math.random(),
          speed: Math.random() * 0.01,
          curve: brainCurves[i],
          curPosition: Math.random(),
        });
      }
    }
  }, []);

  useFrame(({ clock }) => {
    let curPositions = brainGeo.current.attributes.position.array;

    for (let i = 0; i < myPoints.current.length; i++) {
      myPoints.current[i].curPosition += myPoints.current[i].speed;
      myPoints.current[i].curPosition = myPoints.current[i].curPosition % 1;

      let curPoint = myPoints.current[i].curve.getPointAt(
        myPoints.current[i].curPosition
      );

      curPositions[i * 3] = curPoint.x;
      curPositions[i * 3 + 1] = curPoint.y;
      curPositions[i * 3 + 2] = curPoint.z;
    }

    brainGeo.current.attributes.position.needsUpdate = true;
    //brainParticles.current.rotation.y = clock.getElapsedTime() / 30;
  });

  const BrainParticleMaterial = shaderMaterial(
    { time: 0, color: new THREE.Color(0.6, 0.2, 0.1) },
    // vertex shader
    /*glsl*/ `
          varying vec2 vUv;
          varying float vProgress;
          uniform float time;
          attribute float random;
          void main() {
            vUv = uv;
            vProgress = smoothstep(-1.,1.,sin(vUv.x * 8. + time*3.));
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize= random*2. * (1. / -mvPosition.z) * 3. ;
            //gl_PointSize=50.0;
          }
        `,
    // fragment shader
    /*glsl*/ `
          uniform float time;
          
    
          void main() {

            float distance = length(gl_PointCoord.xy - vec2(0.5)) ;
            float opacity = 0.4*smoothstep(.5,0.4,distance);
    
            gl_FragColor = vec4(vec3(opacity),1.);
          }
        `
  );

  // declaratively
  extend({ BrainParticleMaterial });

  return (
    <>
      <points
        ref={brainParticles}
        position={[0, 0, 4]}
        //rotation={[-Math.PI / 2, 0, 0]}
        scale={3}
      >
        <bufferGeometry attach={"geometry"} ref={brainGeo}>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-random"
            count={randomSize.length}
            array={randomSize}
            itemSize={1}
          />
        </bufferGeometry>
        <brainParticleMaterial
          attach="material"
          depthTest={false}
          transparent={true}
          depthWrite={false}
          //blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
}
