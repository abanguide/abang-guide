"use client";

import { useRef, useState } from "react";
import type { ChipSlots, SlotsToClasses } from "@nextui-org/react";
import {
  Button,
  Chip,
  cn,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import type { LucideProps } from "lucide-react";
import {
  CigaretteIcon,
  CoffeeIcon,
  CupSodaIcon,
  Printer,
  PrinterIcon,
  SoupIcon,
  StoreIcon,
} from "lucide-react";
import { CustomOverlayMap, Polygon } from "react-kakao-maps-sdk";

const librarySmokeArea = [
  { lat: 37.281742542025846, lng: 127.04446214710808 },
  { lat: 37.28174921808935, lng: 127.04467921833458 },
  { lat: 37.28168614428172, lng: 127.0446820001031 },
  { lat: 37.28168622601714, lng: 127.04446493303307 },
];

const Categories = [
  {
    key: "printer",
    icon: (props: LucideProps) => <PrinterIcon {...props} />,
    name: "프린터",
    className: {
      base: "bg-gradient-to-br from-purple-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
    } as SlotsToClasses<ChipSlots>,
  },
  {
    key: "cafe",
    icon: (props: LucideProps) => <CoffeeIcon {...props} />,
    name: "카페",
    className: {
      base: "bg-gradient-to-br from-yellow-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
    } as SlotsToClasses<ChipSlots>,
  },
  {
    key: "restaurant",
    icon: (props: LucideProps) => <SoupIcon {...props} />,
    name: "식당",
    className: {
      base: "bg-gradient-to-br from-green-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
    } as SlotsToClasses<ChipSlots>,
  },
  {
    key: "vending",
    icon: (props: LucideProps) => <CupSodaIcon {...props} />,
    name: "자판기",
    className: {
      base: "bg-gradient-to-br from-cyan-500 to-purple-500 border-small border-white/50 shadow-pink-500/30",
    } as SlotsToClasses<ChipSlots>,
  },
  {
    key: "smoking",
    icon: (props: LucideProps) => <CigaretteIcon {...props} />,
    name: "흡연구역",
    className: {
      base: "bg-gradient-to-br from-pink-500 to-red-500 border-small border-white/50 shadow-red-500/30",
    } as SlotsToClasses<ChipSlots>,
  },
  {
    key: "convenience",
    icon: (props: LucideProps) => <StoreIcon {...props} />,
    name: "편의점",
    className: {
      base: "bg-gradient-to-br from-indigo-500 to-blue-500 border-small border-white/50 shadow-blue-500/30",
    } as SlotsToClasses<ChipSlots>,
  },
];

export default function FacilityPage() {
  const [partnershipCategoryStatus, setPartnershipCategoryStatus] = useState({
    printer: true,
    cafe: true,
    restaurant: true,
    vending: false,
    smoking: false,
    convenience: true,
  });

  return (
    <>
      <div className="fixed top-0 z-10 mt-4 flex max-w-full justify-center px-2">
        <div className="bg-default-100 flex w-full flex-row gap-2 overflow-x-scroll rounded-xl p-2">
          {Categories.map((category) => (
            <Chip
              key={category.key}
              variant="shadow"
              classNames={{
                base: cn(
                  category.className?.base,
                  !partnershipCategoryStatus[category.key]
                    ? "opacity-disabled"
                    : "",
                ),
                content:
                  "drop-shadow shadow-black text-white flex flex-row items-center gap-2",
              }}
              onClick={() => {
                setPartnershipCategoryStatus((prev) => ({
                  ...prev,
                  [category.key]: !prev[category.key],
                }));
              }}
            >
              <PrinterIcon size={16} />
              {category.name}
            </Chip>
          ))}
        </div>
      </div>
      <Polygon
        path={librarySmokeArea}
        strokeWeight={3} // 선의 두께입니다
        strokeColor={"#FF0000"} // 선의 색깔입니다
        strokeOpacity={0.8} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle={"solid"} // 선의 스타일입니다
        fillColor={"#FF3333"} // 채우기 색깔입니다
        fillOpacity={0.7} // 채우기 불투명도 입니다
      />
      <CustomOverlayMap
        position={{ lat: 33.55635, lng: 126.795841 }}
        yAnchor={1}
      ></CustomOverlayMap>
    </>
  );
}
