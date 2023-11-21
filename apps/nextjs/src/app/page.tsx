"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import {
  Box3,
  DirectionalLight,
  HemisphereLight,
  Mesh,
  MeshMatcapMaterial,
  Object3D,
  Scene,
  Vector3,
} from "three";
import FreeformControls from "three-freeform-controls";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

import NoSSRWrapper from "./_components/noSSRWrapper";
import { useShowList } from "./hook";

interface Funiture {
  key: string;
  label: string;
}

interface FurnitureLoaderProps {
  item: Funiture;
}

function Model({ mtlurl, objurl }: { mtlurl: string; objurl: string }) {
  const materials = useLoader(MTLLoader, mtlurl);
  const obj = useLoader(OBJLoader, objurl, (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  const boundingBox = new Box3().setFromObject(obj);
  const size = new Vector3();
  boundingBox.getSize(size);

  return (
    <primitive
      object={obj}
      position={[-size.x / 2, -size.y / 2, -size.z / 2]}
    />
  );
}

function FurnitureObject({ item }: FurnitureLoaderProps) {
  const mtlurl = `/funiture/${item.key}.mtl`;
  const objurl = `/funiture/${item.key}.obj`;

  const materials = useLoader(MTLLoader, mtlurl);
  const obj = useLoader(OBJLoader, objurl, (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  const { gl, camera } = useThree();

  const controlsManager = useMemo(() => {
    return new FreeformControls.ControlsManager(camera, gl.domElement);
  }, [camera, gl]);

  useEffect(() => {
    controlsManager.anchor(obj);
  }, [controlsManager, obj]);

  return (
    <>
      <primitive object={obj} />
      <primitive object={controlsManager} />
    </>
  );
}

function PlaceFuniture(obj: Object3D) {
  const { gl, camera } = useThree();

  const controlsManager = useMemo(() => {
    return new FreeformControls.ControlsManager(camera, gl.domElement);
  }, [camera, gl]);

  useEffect(() => {
    console.log("Anchoring Object:", obj);
    controlsManager.anchor(obj);
  }, [controlsManager, obj]);
  return (
    <>
      <primitive object={obj} position={[0, 0, 0]} />
      <primitive object={controlsManager} />
    </>
  );
}

const Test = () => {
  const { gl, camera } = useThree();

  const controlsManager = useMemo(() => {
    return new FreeformControls.ControlsManager(camera, gl.domElement);
  }, [camera, gl]);

  return <primitive object={controlsManager} />;
};

const items = [
  {
    key: "bench",
    label: "벤치",
  },
  {
    key: "bookcase_1",
    label: "책장1",
  },
  {
    key: "bookcase_2",
    label: "책장2",
  },
  {
    key: "bookcase_3",
    label: "책장3",
  },
  {
    key: "bookcase_glass_door",
    label: "bookcase_glass_door",
  },
  {
    key: "cabinet_1",
    label: "캐비넷1",
  },
];

export default function Web() {
  const directionalLight = new DirectionalLight(0xffffff, 1);
  directionalLight.position.set(0, 0, 100);

  const ambientLight = new HemisphereLight(0xffffbb, 0x080820, 1);
  ambientLight.position.set(0, 0, 50);

  const [objects, setObjects] = useState<React.ReactNode[]>([]);

  const { showList, setShowList } = useShowList();

  const handleListItemClick = (item: Funiture) => {
    return setObjects((prev) => [
      ...prev,
      <FurnitureObject key={Math.random()} item={item} />,
    ]);
  };

  return (
    <div className="h-[calc(100vh-4rem)]">
      {showList && (
        <Listbox
          items={items}
          aria-label="Room list"
          className="border-small absolute left-4 top-20 z-10 h-96 w-32 flex-auto overflow-y-scroll rounded-lg bg-black"
        >
          {(item: Funiture) => (
            <ListboxItem
              key={item.key}
              color={item.key === "delete" ? "danger" : "default"}
              className={"h-24 " + (item.key === "delete" ? "text-danger" : "")}
              onPress={() => handleListItemClick(item)}
            >
              {item.label}
            </ListboxItem>
          )}
        </Listbox>
      )}
      <Canvas style={{ background: "white" }}>
        <OrbitControls />
        <NoSSRWrapper>
          <directionalLight />
          <ambientLight />
          <Model mtlurl="/room/2.mtl" objurl="/room/2.obj" />
          {objects}
        </NoSSRWrapper>
      </Canvas>
    </div>
  );
}
