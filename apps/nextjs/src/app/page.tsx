"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { EyeOff, View } from "lucide-react";
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

import { FurnitureObject } from "./_components/Funiture";
import { Funiture, FurnitureLoaderProps } from "./_components/interface";
import NoSSRWrapper from "./_components/noSSRWrapper";
import { items } from "./_components/testData";
import { useFurnitureFreeformControls, useShowList } from "./hook";

function RoomModel({ mtlurl, objurl }: { mtlurl: string; objurl: string }) {
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

export default function Web() {
  const directionalLight = new DirectionalLight(0xffffff, 1);
  directionalLight.position.set(0, 0, 100);

  const ambientLight = new HemisphereLight(0xffffbb, 0x080820, 1);
  ambientLight.position.set(0, 0, 50);

  const [objects, setObjects] = useState<React.ReactNode[]>([]);

  const { showList, setShowList } = useShowList();
  const { enable: funiturecontrol, setEnable: setFunitureControl } =
    useFurnitureFreeformControls();
  const [orbitControl, setOrbitControl] = useState(true);
  const handleListItemClick = (item: Funiture) => {
    setFunitureControl((prev) => [...prev, true]);
    return setObjects((prev) => [
      ...prev,
      <FurnitureObject
        key={Math.random()}
        item={item}
        index={objects.length}
      />,
    ]);
  };

  const handleControl = (index: number) => {
    setFunitureControl((prev) => {
      const updatedControls = [...prev];
      updatedControls[index] = !prev[index];
      return updatedControls;
    });
  };

  const deleteObject = (index: number) => {
    setObjects((prev) => {
      const updatedObjects = [...prev];
      updatedObjects.splice(index, 1);
      return updatedObjects;
    });
    setFunitureControl((prev) => {
      const updatedControls = [...prev];
      updatedControls.splice(index, 1);
      return updatedControls;
    });
  };

  useEffect(() => {
    objects.map((obj, index) => {
      console.log(index, ", funiture : ", obj?.props?.item.label);
    });
  }, [objects]);

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
        {orbitControl && !funiturecontrol.includes(true) && <OrbitControls />}
        <NoSSRWrapper>
          <directionalLight />
          <ambientLight />
          <RoomModel mtlurl="/room/2.mtl" objurl="/room/2.obj" />
          {objects}
        </NoSSRWrapper>
      </Canvas>
      <div
        className="orbit-control absolute right-4 top-20 text-black"
        onClick={() => setOrbitControl(!orbitControl)}
      >
        {orbitControl ? <View size={36} /> : <EyeOff size={36} />}
      </div>
      <div className="funiture-List absolute bottom-1 right-4 h-52 w-48 rounded-lg bg-black">
        <div className="List-Head rounded-t-lg border-b border-b-white bg-slate-700 text-center">
          배치된 가구들
        </div>
        {objects.map((funiture, index) => (
          <div className="funiture-item flex justify-between px-2" key={index}>
            <div className="index">{index}</div>
            <div className="label">{funiture?.props?.item.label}</div>
            <div
              className="control-button"
              onClick={() => handleControl(index)}
            >
              {funiturecontrol[index] ? "ON" : "OFF"}
            </div>
            <div className="delete-button" onClick={() => deleteObject(index)}>
              X
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
