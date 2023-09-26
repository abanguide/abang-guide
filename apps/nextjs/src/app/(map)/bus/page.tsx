"use client";

import {
  Button,
  Card,
  CardBody,
  Chip,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { Phone, Star } from "lucide-react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";

export default function BusPage() {
  return (
    <>
      <div className="scrollbar-hide absolute bottom-0 z-10 mb-16 w-screen snap-x overflow-x-scroll whitespace-nowrap">
        {new Array(50).fill(0).map((_, i) => (
          <div key={i} className="inline-block w-screen snap-center px-4">
            <Card className="" classNames={{ base: "" }} shadow="none">
              <CardBody>
                <div className="flex flex-row items-center">
                  <div className="flex-1">
                    <div className="flex flex-row items-center gap-2">
                      <h4 className="font-bold">13가1234</h4>
                      <Star size={16} />
                    </div>
                    <p className="text-xs">슝슝~</p>
                  </div>
                </div>
                <Divider className="my-2" />
                <div className="flex flex-col gap-2">
                  <Chip color="success" variant="flat" size="sm">
                    30분 뒤?
                  </Chip>
                  <Chip color="success" variant="flat" size="sm">
                    1시간 뒤??
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
            <Button>버스버스</Button>
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
