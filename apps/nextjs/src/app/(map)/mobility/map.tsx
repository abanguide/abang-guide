"use client";

import { CustomOverlayMap } from "react-kakao-maps-sdk";

import type { GcooData } from "./gcoo";
import type { IKickgoingScooterData } from "./kickgoing";

export const MobilityMap: React.FC<{
  gcooData: GcooData[];
  kickgoingData: IKickgoingScooterData[];
}> = ({ gcooData, kickgoingData }) => {
  return (
    <div>
      {gcooData.map((data, index) => (
        <CustomOverlayMap
          position={{ lat: Number(data.lat), lng: Number(data.lng) }}
          key={index}
        >
          <div
            className={`flex translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full border-2 border-black bg-green-500`}
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
          position={{ lat: Number(data.lat), lng: Number(data.lng) }}
          key={index}
        >
          <div
            className={`flex translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full border-2 border-black bg-emerald-500`}
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
    </div>
  );
};
