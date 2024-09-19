import React from "react";
import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { meshBounds, OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";
const Computers = () => {
  const computer = useGLTF("./desktop_pc/scene.gltf");
  return (
    <mesh>
      {/* react 3js */}
      {/* adding light  foe model*/}
      <hemisphereLight intensity={0.15} groundColor="black" />
      <pointLight intensity={1} />
      <spotLight
        position={[-20, 50, -10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      {/* passs object to show */}
      <primitive
        object={computer.scene}
        scale={0.75}
        position={[0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  return (
    <Canvas
      frameloop="demand"
      shadows
      // camera position x,y,z .fov fieod of view
      camera={{ position: [20.3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      {/* suspense allow to have  loader while model is loading */}
      <Suspense fallback={<CanvasLoader />}>
        {/* orbitcontrol -move left right */}
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};
export default ComputersCanvas;
