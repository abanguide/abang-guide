"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody, Chip, Divider } from "@nextui-org/react";
import { Star } from "lucide-react";
import { Virtual } from "swiper/modules";
import type { SwiperClass } from "swiper/react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/virtual";

import { CustomOverlayMap } from "react-kakao-maps-sdk";

import { BusStopOverlay } from "./BusStopOverlay";
import { notice } from "./notice";
import { routes } from "./stops";

function timeToStr(time: number) {
  const hour = Math.floor(time / 60);
  const min = time % 60;
  return `${hour}시 ${min}분`;
}

function currentTimer() {
  const date = new Date();
  const hours = date.getHours();
  const min = date.getMinutes();
  return hours * 60 + min;
}

export default function BusContentPage({
  busDatas,
}: {
  busDatas: { lat: number; lng: number }[];
}) {
  const [nowTime, setNow] = useState(currentTimer());

  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const c = setInterval(() => {
      setNow(currentTimer());
    }, 5000);

    return () => {
      clearInterval(c);
    };
  }, []);

  const [swiper, setSwiper] = useState<SwiperClass>();

  return (
    <>
      <div className="fixed top-16 z-10 mt-4 flex w-full select-none flex-col items-center gap-1 whitespace-nowrap">
        <Card className="w-4/5">
          <CardBody className="px-1 py-1">
            <div
              className="rounded-full px-3 py-1 text-xs"
              onClick={() => {
                setOpen(!open);
              }}
            >
              {open ? (
                <div>닫기</div>
              ) : (
                <div>
                  <span className="mr-2 font-bold">[공지]</span>
                  <span>{notice[0]?.title}</span>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
        {open &&
          notice.map((data, index) => (
            <Card key={index} className="w-4/5">
              <CardBody className="px-1 py-1">
                <div className="badge badge-error gap-2">
                  <div
                    className="rounded-full px-3 py-1 text-xs"
                    onClick={() => {
                      router.push(data.url);
                    }}
                  >
                    <span>{data.title}</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
      </div>

      <div className="fixed bottom-0 z-10 mb-16 w-screen">
        <Swiper
          virtual
          modules={[Virtual]}
          slidesPerView={1}
          spaceBetween={30}
          centeredSlides={true}
          grabCursor={true}
          onSwiper={setSwiper}
        >
          {routes.map((data, index) => (
            <SwiperSlide
              key={index}
              className="w-screen px-4"
              virtualIndex={index}
            >
              <Card shadow="none">
                <CardBody>
                  <div className="flex flex-row items-center">
                    <div className="flex-1">
                      <div className="flex flex-row items-center gap-2">
                        <h4 className="font-bold">{data.title}</h4>
                        <Star size={16} />
                      </div>
                    </div>
                  </div>
                  <Divider className="my-2" />
                  <div className="flex flex-row gap-2">
                    <div className="flex flex-1 flex-col gap-2">
                      <h4 className="text-sm font-bold">{data.upward.path}</h4>

                      <div className="flex h-16 w-full flex-col gap-2 overflow-y-scroll">
                        {data.upward.time?.map((time, index) => {
                          return (
                            <div
                              key={index}
                              className="flex flex-row items-center justify-between text-sm"
                            >
                              <span>{timeToStr(time)}</span>
                              <Chip color="success" variant="flat" size="sm">
                                {time > nowTime
                                  ? time - nowTime + "분 뒤"
                                  : "운행 종료"}
                              </Chip>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-2">
                      <h4 className="text-sm font-bold">
                        {data.downward.path}
                      </h4>

                      <div className="flex h-16 w-full flex-col gap-2 overflow-y-scroll">
                        {data.downward.time?.map((time, index) => (
                          <div
                            key={index}
                            className="flex flex-row items-center justify-between text-sm"
                          >
                            <span>{timeToStr(time)}</span>
                            <Chip color="success" variant="flat" size="sm">
                              {time > nowTime
                                ? time - nowTime + "분 뒤"
                                : "운행 종료"}
                            </Chip>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {busDatas.map((busData, index) => (
        <CustomOverlayMap
          key={index}
          position={{ lat: busData.lat, lng: busData.lng }}
          yAnchor={1}
        >
          <img
            src="/bus.png"
            className="max-w-none"
            style={{
              width: "2rem",
              height: "2rem",
              transform: `translate(0%, 50%) scaleX(-1)`,
            }}
          />
        </CustomOverlayMap>
      ))}
      <BusStopOverlay />
    </>
  );
}
