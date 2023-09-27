"use client";

import { Map } from "react-kakao-maps-sdk";

export default function MapLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="absolute h-screen w-screen">
      <Map
        id="map"
        center={{ lat: 37.28022225696853, lng: 127.043874901048 }}
        style={{ width: "100%", height: "100%" }}
      >
        {children}
      </Map>
    </div>
  );
}
