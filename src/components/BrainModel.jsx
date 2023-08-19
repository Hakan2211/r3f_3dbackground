import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const collectNodePaths = (node, parentPath = "", paths = []) => {
  const nodePath = parentPath
    ? `${parentPath}/${node.name || node.uuid}`
    : node.name || node.uuid;
  paths.push(nodePath);

  if (node.children) {
    for (const child of node.children) {
      collectNodePaths(child, nodePath, paths);
    }
  }

  return paths;
};

export default function BrainModel() {
  const { nodes, scene } = useGLTF("../models/human_heart/scene.gltf");
  console.log(nodes.Sketchfab_Scene, "nodes sketchfab");
  console.log(nodes, "nodes");

  const nodePaths = collectNodePaths(nodes.Sketchfab_Scene);
  console.log(nodePaths);
  return (
    <>
      <group>
        {/* Add your scene components here */}
        <primitive object={nodes.Sketchfab_Scene} />
        {/* Render or display the collected node paths */}
      </group>
    </>
  );
}

useGLTF.preload("../models/human_heart/scene.gltf");
