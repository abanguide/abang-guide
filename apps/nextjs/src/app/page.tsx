"use client";

import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

import { useShowList } from "./hook";

export default function Web() {
  const router = useRouter();
  const Scene = () => {
    const materials = useLoader(MTLLoader, "/tt.mtl");
    const obj = useLoader(OBJLoader, "/tt.obj", (loader) => {
      materials.preload();

      loader.setMaterials(materials);
    });

    console.log("materials: ", materials);

    console.log("object: ", obj);
    return <primitive object={obj} scale={1} />;
  };

  const items = [
    {
      key: "new",
      label: "New file",
    },
    {
      key: "copy",
      label: "Copy link",
    },
    {
      key: "edit",
      label: "Edit file",
    },
    {
      key: "delete",
      label: "Delete file",
    },
  ];

  const { showList, setShowList } = useShowList();

  useEffect(() => {
    // console.log("page, showList: ", showList);
  }, [showList]);

  return (
    <div className="h-[calc(100vh-4rem)]">
      {showList && (
        <Listbox
          items={items}
          aria-label="Room list"
          onAction={() => router.push("/room")}
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
    </div>
  );
}
