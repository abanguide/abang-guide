import { kv } from "@vercel/kv";

import BusContentPage from "./content";

export default async function BusPage() {
  const busDatas = await Promise.all([
    kv.get<{ lat: number; lng: number }>("bus01"),
    kv.get<{ lat: number; lng: number }>("bus02"),
    kv.get<{ lat: number; lng: number }>("bus03"),
  ]);

  console.log(busDatas);

  return <BusContentPage busDatas={busDatas}/>;
}
