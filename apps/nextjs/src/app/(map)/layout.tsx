"use client";

import { useState } from "react";
import { Map } from "react-kakao-maps-sdk";

export default function MapLayout({ children }: React.PropsWithChildren) {
  const [mapCenter, setMapCenter] = useState({
    lat: 37.28022225696853,
    lng: 127.043874901048,
  });

  const changeCenter = (lat: number, lng: number) => {
    setMapCenter({ lat, lng });
  };

  return (
    <div className="absolute h-screen w-screen">
      <Map
        id="map"
        center={mapCenter}
        style={{ width: "100%", height: "100%" }}
      >
        {children}
      </Map>
    </div>
  );
}
