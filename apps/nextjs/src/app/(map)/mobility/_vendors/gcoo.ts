import axios from "axios";

export interface GcooResponse {
  result_code: number;
  message: string;
  response: {
    list: GcooData[];
  };
}

export type GcooData =
  | {
      lat: number;
      lng: number;
      id: number;
      bicycle_id: number;
      scooter_number: "384056";
      region_id: 88;
      region_name: "\ubcf8\uc0ac\uc9c1\uc601_\uacbd\uae30 \ub3d9\ud0c4";
      is_activated: true;
      battery: number;
      parking_image: "";
      gcooter_status: GcooterStatus;
      is_discount_scooter: false;
      model_info: {
        id: number;
        name: EModelName;
      };
    }
  | {
      lat: number;
      lng: number;
      id: "charging_stations_357349";
      station_id: 357349;
      title: "\ubb38\uc548\uacfc\ube4c\ub529 \uc55e";
      charging_slot_info: ChargingSlotInfo;
      station_image: "https://gbike.io/wireless-charging-stations/lg/450061239245099.png";
      zone_info: {
        id: 10;
        name: "charging_station";
      };
      region_name: "\ubb38\uc548\uacfc\ube4c\ub529 \uc55e";
      description: "\uc218\uc6d0 \ud2b9\ub840\uc2dc \ud314\ub2ec\uad6c \ud314\ub2ec\ub85c 3\uac00 29-4\n\u26a1 \ufe0f[@C=#00A843@W=bold~4 slots] are available";
      parking_image: "https://gbike.io/wireless-charging-stations/lg/450061239245099.png";
    };

export interface ChargingSlotInfo {
  total: number;
  available: number;
  display_value: string;
}

export enum GcooterStatus {
  Idle = "IDLE",
  Riding = "RIDING",
}

export enum EModelName {
  GcooB2 = "GCOO-B2",
  MaxPlus = "Max Plus",
  MaxPro = "Max Pro",
}

// https://live.api.gbike-api.com/api/v1/locations/markers?min_lng=127.00884740799665&min_lat=37.20969779581773&max_lng=127.07768093794584&max_lat=37.335696201433336&filter_type=all&cluster_distance=25000&cluster_number=50
export const fetchGcooMobility = async (
  minLng: number,
  minLat: number,
  maxLng: number,
  maxLat: number,
) => {
  return await axios.get<GcooResponse>(
    `https://live.api.gbike-api.com/api/v1/locations/markers?min_lng=${minLng}&min_lat=${minLat}&max_lng=${maxLng}&max_lat=${maxLat}&filter_type=all&cluster_distance=25000&cluster_number=50`,
  );
};
