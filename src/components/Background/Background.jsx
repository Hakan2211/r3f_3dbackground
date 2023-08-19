import { Plane, useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function Background() {
  const viewport = useThree((state) => state.viewport);

  const displace = useTexture("../displacementMap.jpg");
  const normal = useTexture("../normalmap.png");

  normal.anisotropy = 16;

  normal.wrapS = normal.wrapT = THREE.RepeatWrapping;
  normal.repeat = new THREE.Vector2(1, 1);

  displace.wrapS = displace.wrapT = THREE.RepeatWrapping;
  displace.repeat = new THREE.Vector2(1, 1);
  displace.anisotropy = 16;
  return (
    <>
      <group>
        <Plane
          args={[2, 1, 2, 2]}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          scale={[viewport.width / 2, viewport.height / 0.95, 1]}
        >
          <meshPhysicalMaterial
            color="#063058"
            metalness={0.9}
            roughness={0.3}
            normalMap={normal}
            displacementMap={displace}
            displacementScale={0.1}
            normalScale={0.25}
          />
        </Plane>
      </group>
    </>
  );
}
