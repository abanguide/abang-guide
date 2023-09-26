"use client";

import { useRef } from "react";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";

export default function FacilityPage() {
  return (
    <>
      <CustomOverlayMap
        position={{ lat: 33.55635, lng: 126.795841 }}
        yAnchor={1}
      >
        <Popover placement="bottom" offset={20} showArrow>
          <PopoverTrigger onClick={(e) => e.stopPropagation()}>
            <Button>편의편의</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2">
              <div className="text-small font-bold">Popover Content</div>
              <div className="text-tiny">This is the popover content</div>
            </div>
          </PopoverContent>
        </Popover>
      </CustomOverlayMap>
    </>
  );
}
