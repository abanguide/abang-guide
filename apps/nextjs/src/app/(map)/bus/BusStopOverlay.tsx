"use client";

import { useState } from "react";
import { MapMarker } from "react-kakao-maps-sdk";

import { stops } from "./stops";

export const BusStopOverlay = () => {
  const [stopToast, setStopToast] = useState<number | null>(null);

  return (
    <>
      {stops.map((stop) => (
        <MapMarker
          key={stop.locationId} // Use a unique key for each marker to trigger re-rendering
          position={{ lat: Number(stop.lat), lng: Number(stop.lng) }}
          image={{
            src: "/bus_stop.png",
            size: {
              width: 30,
              height: 30,
            },
          }}
          onClick={() => {
            if (stopToast === stop.locationId) {
              setStopToast(null);
            } else {
              setStopToast(stop.locationId);
            }
          }}
        >
          {stopToast === stop.locationId && (
            <div
              className="bg-content1 text-content1-foreground flex h-fit w-fit flex-1 flex-col items-center justify-center space-y-6 rounded-lg  px-4 py-2"
              onClick={() => {
                setStopToast(null);
              }}
              key={stop.locationId}
            >
              <div className="flex w-full items-center justify-between">
                <p className="h-fit w-fit text-base">{stop.name}</p>
                <button
                  type="button"
                  className="leading-1 text-xl"
                  onClick={() => {
                    setStopToast(() => {
                      return null;
                    });
                  }}
                >
                  X
                </button>
              </div>
              <img
                src={""}
                className="h-[10rem] w-[10rem] border-2"
                alt="정류장 이미지"
              />
            </div>
          )}
        </MapMarker>
      ))}
    </>
  );
};
