import { getMobilityDatas } from "./getData";
import { MobilityMap } from "./map";

export const revalidate = 60;

export default async function Page() {
  // console.log((await fetchSwingMobility()).data);

  const { gcooData, kickgoingData, elecleData, now } = await getMobilityDatas();

  return (
    <MobilityMap
      kickgoingData={kickgoingData.data.kickscooters}
      gcooData={gcooData.data.response.list}
      elecleData={elecleData.data}
      now={now}
    />
  );
}
