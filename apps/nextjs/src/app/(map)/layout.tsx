"use client";

import { Map } from "react-kakao-maps-sdk";

export default function MapLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="absolute h-screen w-screen">
      <Map
        id="map"
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: "100%", height: "100%" }}
      >
        {children}
      </Map>
    </div>
  );
}
