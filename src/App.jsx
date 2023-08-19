import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import BrainParticles from "./components/BrainParticles";
import * as THREE from "three";

import Tubes from "./components/Tubes";
import BrainModel from "./components/BrainModel";
import Background from "./components/Background/Background";
import Lightsource from "./components/Background/Lightsource";
import { Suspense } from "react";
import Effects from "./components/Background/Effects";
import OverlayNew from "./components/Overlay/Overlay";
import "./app.css";
import Overlay from "./components/OverlayTest/OverlayTest";

function App() {
  return (
    <>
      <Canvas
        id="canvas"
        // onCreated={({ gl }) => {
        //   gl.setClearColor(0xff0000, 1);
        //   gl.autoClear = false;
        //   gl.clearDepth();
        // }}
        gl={{
          antialias: false,
          //alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputEncoding: THREE.LinearToneMapping,
          toneMappingExposure: 3,
        }}
      >
        {/* <color attach="background" args={["black"]} /> */}
        {/* <ambientLight />
      <pointLight position={[0.5, 0.5, 1.5]} /> */}

        {/* <BrainModel /> */}

        <Tubes />
        <BrainParticles />
        <Suspense fallback={null}>
          <Background />
          <Lightsource />
          <Effects />
        </Suspense>

        <OrbitControls />
      </Canvas>
      {/* <Overlay /> */}
      <OverlayNew />
    </>
  );
}

export default App;

//camera={{ position: [0, 0, 0.3], near: 0.001, far: 5 }}
