"use client";

import { Suspense, useEffect } from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { Eye, Fullscreen, Goal } from "lucide-react";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

import { useShowList } from "../hook";

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

  const items = [
    {
      key: "chair",
      label: "chair",
    },
    {
      key: "Desk",
      label: "Desk",
    },
    {
      key: "Box",
      label: "Box",
    },
    {
      key: "Amp",
      label: "Amp",
    },
  ];

  const { showList, setShowList } = useShowList();

  useEffect(() => {
    console.log("page, showList: ", showList);
  }, [showList]);

  return (
    <div className="h-[calc(100vh-4rem)]">
      {showList && (
        <Listbox
          items={items}
          aria-label="Room list"
          onAction={(key) => console.log(key)}
          className="border-small absolute left-4 top-20 z-10 h-96 w-32 flex-auto overflow-y-scroll rounded-lg bg-black"
        >
          {(item) => (
            <ListboxItem
              key={item.key}
              color={item.key === "delete" ? "danger" : "default"}
              className={"h-24 " + (item.key === "delete" ? "text-danger" : "")}
            >
              {item.label}
            </ListboxItem>
          )}
        </Listbox>
      )}
      <Canvas style={{ background: "white" }}>
        <OrbitControls />
        <Suspense fallback={null}>
          <Scene />
          <OrbitControls />
          {/* <color attach="background" args={["#000000"]} /> */}
          {/* <Environment preset="sunset" background /> */}
        </Suspense>
      </Canvas>
      <div className="mode-Overlay absolute right-8 top-20 z-10 flex flex-col items-center gap-y-4 text-black">
        <Eye />
        <Goal />
        <Fullscreen />
      </div>
    </div>
  );
}
