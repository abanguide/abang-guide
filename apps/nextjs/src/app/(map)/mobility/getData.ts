import { cache } from "react";

import { fetchElecleMobility } from "./_vendors/elecle";
import { fetchGcooMobility } from "./_vendors/gcoo";
import { fetchKickgoingMobility } from "./_vendors/kickgoing";

export const revalidate = 60;

export const getMobilityDatas = cache(async () => {
  const [gcooData, kickgoingData, elecleData] = await Promise.all([
    fetchGcooMobility(
      127.00884740799665,
      37.20969779581773,
      127.07768093794584,
      37.335696201433336,
    ),
    fetchKickgoingMobility(37.279818612768096, 127.04670837331315),
    fetchElecleMobility(127.04670837331315, 37.279818612768096),
  ]);

  return {
    gcooData,
    kickgoingData,
    elecleData,
  };
});
