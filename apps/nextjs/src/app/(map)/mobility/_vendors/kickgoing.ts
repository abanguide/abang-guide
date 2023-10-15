// https://api.kickgoing.io/v4/kickscooters?version=2.9.1&lat=37.279818612768096&lng=127.04670837331315&zoom=15

import axios from "axios";

export interface IKickgoingMobilityResponse {
  kickscooters: IKickgoingScooterData[];
  clustered_kickscooters: any[];
  service_area_centers: any[];
  nodes: any[];
  map_radius: number;
}

export interface IKickgoingScooterData {
  id: number;
  serial_number: "AA6VE3";
  battery_rate: 93;
  lat: number;
  lng: number;
  img_url: "https://cdn.kickgoing.io/images/kickscooter/img_max_pro.png?timestamp=1595246028";
  rental_fee_description: "\uc7a0\uae08\ud574\uc81c 1,000\uc6d0 / \ubd84\ub2f9 130\uc6d0";
  badges: any[];
  battery_available_minutes: number;
  mobility_type: "kickboard" | "bike";
}

export const fetchKickgoingMobility = async (
  lat: number,
  lng: number,
  zoom: number = 15,
) => {
  return await axios.get<IKickgoingMobilityResponse>(
    `https://api.kickgoing.io/v4/kickscooters?version=2.9.1&lat=${lat}&lng=${lng}&zoom=${zoom}`,
  );
};
