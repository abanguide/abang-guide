import { useEffect, useMemo } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import FreeformControls from "three-freeform-controls";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

import { useFurnitureFreeformControls } from "../hook";
import { FurnitureLoaderProps } from "./interface";

export function FurnitureObject({ item, index }: FurnitureLoaderProps) {
  const mtlurl = `/funiture/${item.key}.mtl`;
  const objurl = `/funiture/${item.key}.obj`;

  const materials = useLoader(MTLLoader, mtlurl);
  const obj = useLoader(OBJLoader, objurl, (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  const { enable, setEnable } = useFurnitureFreeformControls();

  const { gl, camera } = useThree();

  const controlsManager = useMemo(() => {
    return new FreeformControls.ControlsManager(camera, gl.domElement);
  }, [camera, gl]);

  useEffect(() => {
    controlsManager.anchor(obj);
  }, [controlsManager, obj]);

  useEffect(() => {
    console.log("control enable", enable);
  });

  return (
    <>
      <primitive object={obj} />
      {enable[index] && <primitive object={controlsManager} />}
    </>
  );
}
