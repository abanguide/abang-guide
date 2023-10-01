"use client";

import { useEffect, useRef, useState } from "react";
import { Map } from "react-kakao-maps-sdk";

export default function MapLayout({ children }: React.PropsWithChildren) {
  const rootRef = useRef<HTMLDivElement>(null);

  const [mapCenter, setMapCenter] = useState({
    lat: 37.28022225696853,
    lng: 127.043874901048,
  });

  useEffect(() => {
    const f = () => {
      rootRef.current!.style.height = `${window.innerHeight}px`;
    };

    f();
    window.addEventListener("resize", f);

    return () => {
      window.removeEventListener("resize", f);
    };
  }, []);

  return (
    <div className="absolute w-screen" ref={rootRef}>
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
