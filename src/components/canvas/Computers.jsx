import React from "react";
import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";
const Computers = ({isMobile}) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      {/* react 3js */}
      {/* adding light  foe model*/}
      <hemisphereLight intensity={0.15} groundColor="black" />
      <pointLight intensity={1} />
      <ambientLight intensity={0.5} />

      <spotLight
        position={[-20, 50, -10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <directionalLight
  position={[10, 10, 10]}
  intensity={1.5}
  castShadow
/>
      {/* passs object to show */}
      {/* show object */}
      <primitive
        object={computer.scene}
        scale={ isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3.25, -2.2] : [0, -4.25, -1.5]}

        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile,setIsMobile]=useState(false)
  useEffect(()=>{
    //add a listner for changes to the scree size
    const mediaQuery=window.matchMedia('(max-width:500px)');
//set initial value of the 'ismobile state variablee
    setIsMobile(mediaQuery.matches);
        
    // Define a callback function to handle changes to the media query

    const handleMediaQueryChange=(event)=>{
      setIsMobile(event.matches)
    }

        // Add the callback function as a listener for changes to the media query

    mediaQuery.addEventListener('change',handleMediaQueryChange);

        // Remove the listener when the component is unmounted

    return()=>{
      mediaQuery.removeEventListener('change',handleMediaQueryChange)
    }

  
  },[])

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1,2]}
      // camera position x,y,z .fov fieod of view
      camera={{ position: [20,3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      {/* suspense allow to have  loader while model is loading */}
      <Suspense fallback={<CanvasLoader/>}>
        {/* orbitcontrol -move left right */}
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};
export default ComputersCanvas;
