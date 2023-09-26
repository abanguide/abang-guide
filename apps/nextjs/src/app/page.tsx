"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Button,
  Card,
  CardBody,
  Chip,
  cn,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tab,
  Tabs,
  Tooltip,
} from "@nextui-org/react";
import { Bus, HeartHandshake, Phone, Star } from "lucide-react";
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  useKakaoLoader,
} from "react-kakao-maps-sdk";

export default function Home() {
  const [loading, error] = useKakaoLoader({
    appkey: "78db97fad296256c4498faa49d235692",
    // ...options,
  });
  const [partnershipCategoryStatus, setPartnershipCategoryStatus] = useState({
    restaurant: true,
    cafe: true,
    bar: true,
    etc: false,
  });

  if (error) return <div>Error</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="absolute top-0 z-10 mt-8">
        <div className="bg-default-100 flex flex-row gap-2 rounded-xl p-2">
          <Chip
            variant="dot"
            classNames={{
              base: cn(
                "border-red-500",
                !partnershipCategoryStatus.restaurant ? "opacity-disabled" : "",
              ),
              dot: "bg-red-500",
            }}
            onClick={() => {
              setPartnershipCategoryStatus((prev) => ({
                ...prev,
                restaurant: !prev.restaurant,
              }));
            }}
          >
            식당
          </Chip>
          <Chip
            variant="dot"
            classNames={{
              base: cn(
                "border-blue-500",
                !partnershipCategoryStatus.cafe ? "opacity-disabled" : "",
              ),
              dot: "bg-blue-500",
            }}
            onClick={() => {
              setPartnershipCategoryStatus((prev) => ({
                ...prev,
                cafe: !prev.cafe,
              }));
            }}
          >
            카페
          </Chip>
          <Chip
            variant="dot"
            classNames={{
              base: cn(
                "border-green-500",
                !partnershipCategoryStatus.bar ? "opacity-disabled" : "",
              ),
              dot: "bg-green-500",
            }}
            onClick={() => {
              setPartnershipCategoryStatus((prev) => ({
                ...prev,
                bar: !prev.bar,
              }));
            }}
          >
            주점
          </Chip>
          <Chip
            variant="dot"
            classNames={{
              base: cn(
                "border-yellow-500",
                !partnershipCategoryStatus.etc ? "opacity-disabled" : "",
              ),
              dot: "bg-yellow-500",
            }}
            onClick={() => {
              setPartnershipCategoryStatus((prev) => ({
                ...prev,
                etc: !prev.etc,
              }));
            }}
          >
            기타
          </Chip>
        </div>
      </div>

      <div className="absolute h-screen w-screen">
        <Map
          center={{ lat: 33.5563, lng: 126.79581 }}
          style={{ width: "100%", height: "100%" }}
        >
          <CustomOverlayMap
            position={{ lat: 33.55635, lng: 126.795841 }}
            yAnchor={1}
          >
            <Popover placement="bottom" offset={20} showArrow>
              <PopoverTrigger onClick={(e) => e.stopPropagation()}>
                <Button>밀플랜비</Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="px-1 py-2">
                  <div className="text-small font-bold">Popover Content</div>
                  <div className="text-tiny">This is the popover content</div>
                </div>
              </PopoverContent>
            </Popover>
          </CustomOverlayMap>
        </Map>
      </div>

      <div className="scrollbar-hide absolute bottom-0 z-10 mb-16 w-screen snap-x overflow-x-scroll whitespace-nowrap">
        {new Array(50).fill(0).map((_, i) => (
          <div key={i} className="inline-block w-screen snap-center px-4">
            <Card className="" classNames={{ base: "" }} shadow="none">
              <CardBody>
                <div className="flex flex-row items-center">
                  <div className="flex-1">
                    <div className="flex flex-row items-center gap-2">
                      <h4 className="font-bold">밀플랜비 아주대점</h4>
                      <Star size={16} />
                    </div>
                    <p className="text-xs">
                      경기 수원시 팔달구 아주로47번길 12 1층 밀플랜비
                    </p>
                  </div>

                  <div>
                    <Button isIconOnly size="sm">
                      <Phone size={16} />
                    </Button>
                  </div>
                </div>
                <Divider className="my-2" />
                <div className="flex flex-col gap-2">
                  <Chip color="success" variant="flat" size="sm">
                    학생증 제시 시 3000원 할인
                  </Chip>
                  <Chip color="success" variant="flat" size="sm">
                    배고프면 밥이 서비스
                  </Chip>
                </div>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>

      <Tabs
        color={"primary"}
        aria-label="Tabs colors"
        radius="lg"
        size="lg"
        classNames={{
          base: "absolute bottom-0 mb-4 z-10",
        }}
      >
        <Tab
          key="photos"
          title={
            <div className="flex flex-col items-center py-1">
              <Bus size={20} />
              <span className="text-xs">셔틀버스</span>
            </div>
          }
        />
        <Tab
          key="music"
          title={
            <div className="flex flex-col items-center">
              <HeartHandshake size={20} />
              <span className="text-xs">제휴시설</span>
            </div>
          }
        />
      </Tabs>
    </main>
  );
}
