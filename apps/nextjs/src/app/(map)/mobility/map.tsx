"use client";

import { useEffect, useState } from "react";
import { CustomOverlayMap, useMap } from "react-kakao-maps-sdk";

import { IElecleMobilityData } from "./_vendors/elecle";
import type { GcooData } from "./_vendors/gcoo";
import type { IKickgoingScooterData } from "./_vendors/kickgoing";

export const MobilityMap: React.FC<{
  gcooData: GcooData[];
  kickgoingData: IKickgoingScooterData[];
  elecleData: IElecleMobilityData[];
  now: number;
}> = ({ gcooData, kickgoingData, elecleData, now }) => {
  const map = useMap();

  const [bounds, setBounds] = useState<kakao.maps.LatLngBounds>(
    map.getBounds(),
  );

  useEffect(() => {
    const f = () => {
      setBounds(map.getBounds());
    };

    kakao.maps.event.addListener(map, "bounds_changed", f);

    map.setLevel(5);
    map.setMaxLevel(5);

    return () => {
      kakao.maps.event.removeListener(map, "bounds_changed", f);

      map.setMaxLevel(14);
    };
  }, [map]);

  return (
    <div>
      <div>{now}</div>
      {gcooData.map((data, index) => (
        <CustomOverlayMap
          position={{ lat: data.lat, lng: data.lng }}
          key={index}
        >
          <div
            className={`flex translate-x-1/2 translate-y-1/2 select-none items-center justify-center rounded-full border-2 border-black bg-green-500`}
            style={{
              width: "1.5rem",
              height: "1.5rem",
            }}
            key={index}
          >
            G
          </div>
        </CustomOverlayMap>
      ))}
      {kickgoingData.map((data, index) => (
        <CustomOverlayMap
          position={{ lat: data.lat, lng: data.lng }}
          key={index}
        >
          <div
            className={`flex translate-x-1/2 translate-y-1/2 select-none items-center justify-center rounded-full border-2 border-black bg-emerald-500`}
            style={{
              width: "1.5rem",
              height: "1.5rem",
            }}
            key={index}
          >
            K
          </div>
        </CustomOverlayMap>
      ))}
      {elecleData.map((data, index) => (
        <CustomOverlayMap
          position={{ lat: data.location[1], lng: data.location[0] }}
          key={index}
        >
          <div
            className={`flex translate-x-1/2 translate-y-1/2 select-none items-center justify-center rounded-full border-2 border-black bg-blue-500`}
            style={{
              width: "1.5rem",
              height: "1.5rem",
            }}
            key={index}
          >
            E
          </div>
        </CustomOverlayMap>
      ))}
    </div>
  );
};
