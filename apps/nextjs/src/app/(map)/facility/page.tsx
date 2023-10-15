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
  ChefHatIcon,
  CigaretteIcon,
  CoffeeIcon,
  CupSodaIcon,
  GlassWaterIcon,
  PrinterIcon,
  SoupIcon,
  StoreIcon,
} from "lucide-react";
import { CustomOverlayMap, Polygon, useMap } from "react-kakao-maps-sdk";

type TCategoryKey =
  | "printer"
  | "cafe"
  | "restaurant"
  | "vending"
  | "smoking"
  | "convenience";

const librarySmokeArea = [
  { lat: 37.281742542025846, lng: 127.04446214710808 },
  { lat: 37.28174921808935, lng: 127.04467921833458 },
  { lat: 37.28168614428172, lng: 127.0446820001031 },
  { lat: 37.28168622601714, lng: 127.04446493303307 },
];

const facilityList = [
  {
    amenityId: 79,
    name: "교직원식당",
    image: null,
    category: "CAFETERIA",
    detail: "기숙사 식당 2층",
    lat: "37.284639",
    lng: "127.045721",
  },
  {
    amenityId: 80,
    name: "감탄떡볶이 아주대학교점",
    image: null,
    category: "CAFETERIA",
    detail: "제 1학생회관(구학생회관) 1층 아슐랭",
    lat: "37.283623",
    lng: "127.045365",
  },
  {
    amenityId: 81,
    name: "바겟버거 아주대점",
    image: null,
    category: "CAFETERIA",
    detail: "제 1학생회관(구학생회관) 1층 아슐랭",
    lat: "37.283623",
    lng: "127.045365",
  },
  {
    amenityId: 82,
    name: "만권화밥 아주대점",
    image: null,
    category: "CAFETERIA",
    detail: "제 1학생회관(구학생회관) 1층 아슐랭",
    lat: "37.283623",
    lng: "127.045365",
  },
  {
    amenityId: 83,
    name: "삼삼돈까스 아주대점",
    image: null,
    category: "CAFETERIA",
    detail: "제 1학생회관(구학생회관) 1층 아슐랭",
    lat: "37.283623",
    lng: "127.045365",
  },
  {
    amenityId: 84,
    name: "밀양국밥냉면",
    image: null,
    category: "CAFETERIA",
    detail: "제 1학생회관(구학생회관) 1층 아슐랭",
    lat: "37.283623",
    lng: "127.045365",
  },
  {
    amenityId: 85,
    name: "기숙사식당",
    image: null,
    category: "CAFETERIA",
    detail: "기숙사 식당1층",
    lat: "37.284639",
    lng: "127.045721",
  },
  {
    amenityId: 86,
    name: "팔달관매점",
    image: null,
    category: "CAFETERIA",
    detail: "팔달관 1층",
    lat: "37.284374",
    lng: "127.044438",
  },
  {
    amenityId: 87,
    name: "다산관매점",
    image: null,
    category: "CAFETERIA",
    detail: "",
    lat: "37.283046",
    lng: "127.047736",
  },
  {
    amenityId: 88,
    name: "코너스톤",
    image: null,
    category: "CAFETERIA",
    detail: "연암관 12층",
    lat: "37.282250",
    lng: "127.047679",
  },
  {
    amenityId: 89,
    name: "선인재식당",
    image: null,
    category: "CAFETERIA",
    detail: "송재관 지하 1층",
    lat: "37.280926",
    lng: "127.047258",
  },
  {
    amenityId: 90,
    name: "팬도로시 아주대 학생회관점",
    image: null,
    category: "CAFE",
    detail: "제 1학생회관(구학생회관) 1층",
    lat: "37.283515",
    lng: "127.045030",
  },
  {
    amenityId: 91,
    name: "팬도로시 아주대도서관점",
    image: null,
    category: "CAFE",
    detail: "도서관 카페",
    lat: "37.281999",
    lng: "127.044172",
  },
  {
    amenityId: 92,
    name: "다산관 카페",
    image: null,
    category: "CAFE",
    detail: "다산관 1층",
    lat: "37.283046",
    lng: "127.047736",
  },
  {
    amenityId: 93,
    name: "무인카페",
    image: null,
    category: "CAFE",
    detail: "기숙사 식당 1층",
    lat: "37.284639",
    lng: "127.045721",
  },
  {
    amenityId: 94,
    name: "아이엔지 아주대학교 일신관점",
    image: null,
    category: "CAFE",
    detail: "일신관 지하 1층 CU 옆",
    lat: "37.284305",
    lng: "127.047012",
  },
  {
    amenityId: 95,
    name: "CU 아주대성호관점",
    image: null,
    category: "STORE",
    detail: "성호관 1층",
    lat: "37.283013",
    lng: "127.044827",
  },
  {
    amenityId: 96,
    name: "CU 아주대일신관점",
    image: null,
    category: "STORE",
    detail: "일신관 지하 1층",
    lat: "37.284305",
    lng: "127.047012",
  },
  {
    amenityId: 97,
    name: "CU 아주대팔달관점",
    image: null,
    category: "STORE",
    detail: "1층 팔달관매점 내",
    lat: "37.284374",
    lng: "127.044438",
  },
  {
    amenityId: 98,
    name: "신학생회관 프린터",
    image: null,
    category: "PRINTER",
    detail: "1층 웹PC 검색대",
    lat: "37.283139",
    lng: "127.045904",
  },
  {
    amenityId: 99,
    name: "신학생회관 팩스",
    image: null,
    category: "PRINTER",
    detail: "제 2학생회관(신학생회관) 116호 종합지원센터",
    lat: "37.283139",
    lng: "127.045904",
  },
  {
    amenityId: 100,
    name: "팔달관 프린터",
    image: null,
    category: "PRINTER",
    detail: "1층 계단실",
    lat: "37.284383",
    lng: "127.044593",
  },
  {
    amenityId: 101,
    name: "인문대 프린터실",
    image: null,
    category: "PRINTER",
    detail: "성호관 103-1호, 무료",
    lat: "37.282984",
    lng: "127.044841",
  },
  {
    amenityId: 102,
    name: "다산관 로비",
    image: null,
    category: "FACILITIES",
    detail: "다산관 1층",
    lat: "37.283041",
    lng: "127.047685",
  },
  {
    amenityId: 103,
    name: "더테라스",
    image: null,
    category: "FACILITIES",
    detail: "도서관 테라스",
    lat: "37.282664",
    lng: "127.044246",
  },
  {
    amenityId: 104,
    name: "테니스장",
    image: null,
    category: "FACILITIES",
    detail: " ",
    lat: "37.282121",
    lng: "127.049424",
  },
  {
    amenityId: 105,
    name: "체육관",
    image: null,
    category: "FACILITIES",
    detail: " ",
    lat: "37.279960",
    lng: "127.045459",
  },
  {
    amenityId: 106,
    name: "아주문고",
    image: null,
    category: "STORE",
    detail: "제1학생회관(구학생회관) 1층 서점",
    lat: "37.283569",
    lng: "127.045636",
  },
  {
    amenityId: 107,
    name: "안경점",
    image: null,
    category: "STORE",
    detail: "성호관 1층",
    lat: "37.283006",
    lng: "127.044869",
  },
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

  const categoryInfo = {
    printer: {
      name: "프린터",
      mapIcon: (
        <div>
          <PrinterIcon size={16} />
        </div>
      ),
    },
    restaurant: {
      name: "식당",
      mapIcon: (
        <div>
          <ChefHatIcon size={16} />
        </div>
      ),
    },
    cafe: {
      name: "카페",
      mapIcon: (
        <div>
          <CoffeeIcon size={16} />
        </div>
      ),
    },
    vending: {
      name: "자판기",
      mapIcon: (
        <div>
          <GlassWaterIcon size={16} />
        </div>
      ),
    },
    smoking: {
      name: "흡연구역",
      mapIcon: (
        <div>
          <CigaretteIcon size={16} />
        </div>
      ),
    },
    convenience: {
      name: "편의점",
      mapIcon: (
        <div>
          <StoreIcon size={16} />
        </div>
      ),
    },
  };

  return (
    <>
      <div className="fixed top-16 z-10 mt-4 flex max-w-full justify-center px-2">
        <div className="bg-default-100 flex w-full flex-row gap-2 overflow-x-scroll rounded-xl p-2">
          {Categories.map((category) => (
            <Chip
              key={category.key}
              variant="shadow"
              classNames={{
                base: cn(
                  category.className?.base,
                  !partnershipCategoryStatus[category.key as TCategoryKey]
                    ? "opacity-disabled"
                    : "",
                ),
                content:
                  "drop-shadow shadow-black text-white flex flex-row items-center gap-2",
              }}
              onClick={() => {
                setPartnershipCategoryStatus((prev) => ({
                  ...prev,
                  [category.key]: !prev[category.key as TCategoryKey],
                }));
              }}
            >
              {categoryInfo[category.key as TCategoryKey]?.mapIcon}
              {category.name}
            </Chip>
          ))}
        </div>
      </div>

      {facilityList.map((data, index) => (
        <CustomOverlayMap
          position={{ lat: Number(data.lat), lng: Number(data.lng) }}
          key={index}
        >
          <div
            className={`flex translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full border-2 border-black bg-red-500`}
            style={{
              width: "1.5rem",
              height: "1.5rem",
            }}
            key={index}
          >
            {categoryInfo[data.category as TCategoryKey]?.mapIcon}
          </div>
          <div>{data.name}</div>
        </CustomOverlayMap>
      ))}
    </>
  );
}
