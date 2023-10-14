import axios from "axios";

export interface IElecleMobilityData {
  id: number;
  vendor: number;
  discound_rate_eit: number;
  leftover: number;
  sn: string;
  region: string;
  pricing_group: string;
  available_mileage: number;
  control_key: string;
  area: string;
  discount_stream_id: null;
  location: [number, number];
  status: string;
  is_chargeable: boolean;
  legacy_color: boolean;
  organization: null;
}

export const fetchElecleMobility = async (lat: number, lng: number) => {
  return await axios.get<IElecleMobilityData[]>(
    `https://vehicle.elecle.bike/v3/bike?bike_type=UNIVERSAL&position=${lat}%2C${lng}&radius=2`,
    {
      headers: {
        "User-Agent": "elecle/30810 CFNetwork/1399 Darwin/22.1.0",
        Authorization: "Bearer DWIZrDROKQE61QWOaclzzN3ZNTsKPZ",
      },
    },
  );
};
