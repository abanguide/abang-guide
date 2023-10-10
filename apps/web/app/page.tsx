"use client";
import * as THREE from "three";
import { Canvas, useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";

import styles from "../styles/index.module.css";
import { ReactNode, Suspense, useEffect } from "react";

const _width = 1920;
const _height = 1080;

const FontSizeController: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  useEffect(() => {
    const resizeFontSize = () => {
      const screenWidth = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      );
      const screenHeight = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      );

      // uniform scale for our game
      const scale = Math.min(screenWidth / _width, screenHeight / _height);

      // the "uniformly enlarged" size for our game
      const enlargedWidth = Math.floor(scale * _width);
      const enlargedHeight = Math.floor(scale * _height);

      // margins for centering our game
      const horizontalMargin = (screenWidth - enlargedWidth) / 2;
      // const verticalMargin = (screenHeight - enlargedHeight) / 2;

      // now we use css trickery to set the sizes and margins
      const documentStyle = document.documentElement.style;

      documentStyle.fontSize = `${enlargedWidth / 80}px`;
    };

    resizeFontSize();
    window.addEventListener("resize", resizeFontSize);

    return () => {
      window.removeEventListener("resize", resizeFontSize);
      const documentStyle = document.documentElement.style;
      documentStyle.fontSize = "";
    };
  }, []);

  return <>{children}</>;
};

export default function Web() {
  const Scene = () => {
    const materials = useLoader(MTLLoader, "/Poimandres.mtl");
    const obj = useLoader(OBJLoader, "/Poimandres.obj", (loader) => {
      materials.preload();
      loader.setMaterials(materials);
    });

    console.log(obj);
    return <primitive object={obj} scale={1} />;
  };

  return (
    <div style={{ height: "100vh" }}>
      <FontSizeController>
        <Canvas>
          <OrbitControls />
          <Suspense fallback={null}>
            <Scene />
            <OrbitControls />
            {/* <color attach="background" args={["#000000"]} /> */}
            <Environment preset="sunset" background />
          </Suspense>
        </Canvas>
      </FontSizeController>
    </div>
  );
}
