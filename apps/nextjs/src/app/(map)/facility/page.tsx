"use client";

import { useRef, useState } from "react";
import {
  Button,
  Chip,
  cn,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import {
  CigaretteIcon,
  CoffeeIcon,
  CupSodaIcon,
  Printer,
  PrinterIcon,
  SoupIcon,
  StoreIcon,
} from "lucide-react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";

export default function FacilityPage() {
  const [partnershipCategoryStatus, setPartnershipCategoryStatus] = useState({
    restaurant: true,
    cafe: true,
    bar: true,
    etc: false,
  });

  return (
    <>
      <div className="absolute top-0 z-10 mt-8 flex max-w-full justify-center px-2">
        <div className="bg-default-100 flex w-full flex-row gap-2 overflow-x-scroll rounded-xl p-2">
          <Chip
            variant="shadow"
            classNames={{
              base: "bg-gradient-to-br from-purple-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
              content:
                "drop-shadow shadow-black text-white flex flex-row items-center gap-2",
            }}
          >
            <PrinterIcon size={16} />
            프린터
          </Chip>

          <Chip
            variant="shadow"
            classNames={{
              base: "bg-gradient-to-br from-yellow-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
              content:
                "drop-shadow shadow-black text-white flex flex-row items-center gap-2",
            }}
          >
            <CoffeeIcon size={16} />
            카페
          </Chip>

          <Chip
            variant="shadow"
            classNames={{
              base: "bg-gradient-to-br from-green-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
              content:
                "drop-shadow shadow-black text-white flex flex-row items-center gap-2",
            }}
          >
            <SoupIcon size={16} />
            식당
          </Chip>

          <Chip
            variant="shadow"
            classNames={{
              base: "bg-gradient-to-br from-cyan-500 to-purple-500 border-small border-white/50 shadow-pink-500/30",
              content:
                "drop-shadow shadow-black text-white flex flex-row items-center gap-2",
            }}
          >
            <CupSodaIcon size={16} />
            자판기
          </Chip>

          <Chip
            variant="shadow"
            classNames={{
              base: "bg-gradient-to-br from-pink-500 to-red-500 border-small border-white/50 shadow-red-500/30",
              content:
                "drop-shadow shadow-black text-white flex flex-row items-center gap-2",
            }}
          >
            <CigaretteIcon size={16} />
            흡연구역
          </Chip>

          <Chip
            variant="shadow"
            classNames={{
              base: "bg-gradient-to-br from-indigo-500 to-blue-500 border-small border-white/50 shadow-blue-500/30",
              content:
                "drop-shadow shadow-black text-white flex flex-row items-center gap-2",
            }}
          >
            <StoreIcon size={16} />
            편의점
          </Chip>
        </div>
      </div>
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
