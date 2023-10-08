import { fetchGcooMobility } from "./gcoo";
import { fetchKickgoingMobility } from "./kickgoing";
import { MobilityMap } from "./map";
import { fetchSwingMobility } from "./swing";

export default async function Page() {
  // console.log((await fetchSwingMobility()).data);

  const gcooData = await fetchGcooMobility(
    127.00884740799665,
    37.20969779581773,
    127.07768093794584,
    37.335696201433336,
  );

  const kickgoingData = await fetchKickgoingMobility(
    37.279818612768096,
    127.04670837331315,
  );

  return (
    <MobilityMap
      kickgoingData={kickgoingData.data.kickscooters}
      gcooData={gcooData.data.response.list}
    />
  );
}
