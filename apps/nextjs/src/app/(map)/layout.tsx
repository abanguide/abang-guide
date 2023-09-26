"use client";

import { Map, useKakaoLoader } from "react-kakao-maps-sdk";

export default function MapLayout({ children }: React.PropsWithChildren) {
  const [loading, error] = useKakaoLoader({
    appkey: "78db97fad296256c4498faa49d235692",
    // ...options,
  });

  if (error) return <div>Error</div>;

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
