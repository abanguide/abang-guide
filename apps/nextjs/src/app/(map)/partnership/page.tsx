"use client";

import { useState } from "react";
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
} from "@nextui-org/react";
import { Phone, Star } from "lucide-react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";

import MapPortal from "~/app/_components/MapPortal";

export default function PartnershipPage() {
  const [partnershipCategoryStatus, setPartnershipCategoryStatus] = useState({
    restaurant: true,
    cafe: true,
    bar: true,
    etc: false,
  });

  return (
    <>
      <div className="absolute top-0 z-10 mt-8 flex w-full justify-center">
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
    </>
  );
}
