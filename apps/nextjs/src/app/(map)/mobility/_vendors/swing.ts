import axios from "axios";

export const fetchSwingMobility = async () => {
  return await axios.get(
    `https://sfr.swingmobility.dev/map/marker/vehicles?center=37.28133777921552%2C127.03442044647952&clusterVehicleType=BIKE&east=127.0365286628323&mapType=NAVER&mapZoomLevel=16&north=37.28497438008847&south=37.27770117834257&west=127.0323122301268`,
    {
      headers: {
        "X-SW-APP-BUILD-NUMBER": 2309251537009,
        "X-SW-OS-LANGUAGE": "ko",
        "X-SW-DEVICE-LOCATION": "37.27880058952145,127.03715513512627",
        "X-SW-OS-VERSION": "16.1.1",
        "X-SW-OS-FSAN": "362813",
        "X-SW-APP-VERSION": "3.17.4",
        "X-SW-DEVICE-MODEL": "iPhone",
        "X-SW-APP-LANGUAGE": "ko",
        "X-SW-OS-PLATFORM": "IOS",
        "User-Agent": "SWING/2309251537009 CFNetwork/1399 Darwin/22.1.0",
        "X-SW-APP-TS": Date.now(),
      },
    },
  );
};
