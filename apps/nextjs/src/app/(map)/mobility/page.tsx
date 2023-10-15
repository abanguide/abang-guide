import { getMobilityDatas } from "./getData";
import { MobilityMap } from "./map";
import { fetchSwingMobility } from "./_vendors/swing";

export const revalidate = 60;

export default async function Page() {
  // console.log((await fetchSwingMobility()).data);

  const { gcooData, kickgoingData, elecleData } = await getMobilityDatas();

  return (
    <MobilityMap
      kickgoingData={kickgoingData.data.kickscooters}
      gcooData={gcooData.data.response.list}
      elecleData={elecleData.data}
    />
  );
}
