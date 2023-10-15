"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, CardBody, Chip, Divider } from "@nextui-org/react";
import { Phone, Star } from "lucide-react";
import { CustomOverlayMap, MapMarker, useMap } from "react-kakao-maps-sdk";
import { Virtual } from "swiper/modules";
import type { SwiperClass } from "swiper/react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/virtual";

import { notice } from "./notice";
import { routes, stops } from "./stops";

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

const BusOverlay = () => {
  return (
    <CustomOverlayMap position={{ lat: 37.28148, lng: 127.04353 }} yAnchor={1}>
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
  );
};

const BusStopOverlay = () => {
  const [stopToast, setStopToast] = useState<number | null>(null);

  return (
    <>
      {stops.map((stop) => (
        <MapMarker
          key={stop.locationId} // Use a unique key for each marker to trigger re-rendering
          position={{ lat: Number(stop.lat), lng: Number(stop.lng) }}
          image={{
            src: "/bus_stop.png",
            size: {
              width: 30,
              height: 30,
            },
          }}
          onClick={() => {
            if (stopToast === stop.locationId) {
              setStopToast(null);
            } else {
              setStopToast(stop.locationId);
            }
          }}
        >
          {stopToast === stop.locationId && (
            <div
              className="bg-content1 text-content1-foreground flex h-fit w-fit flex-1 flex-col items-center justify-center space-y-6 rounded-lg  px-4 py-2"
              onClick={() => {
                setStopToast(null);
              }}
              key={stop.locationId}
            >
              <div className="flex w-full items-center justify-between">
                <p className="h-fit w-fit text-base">{stop.name}</p>
                <button
                  type="button"
                  className="leading-1 text-xl"
                  onClick={() => {
                    setStopToast(() => {
                      return null;
                    });
                  }}
                >
                  X
                </button>
              </div>
              <img
                src={""}
                className="h-[10rem] w-[10rem] border-2"
                alt="정류장 이미지"
              />
            </div>
          )}
        </MapMarker>
      ))}
    </>
  );
};

export default function BusPage() {
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
  const map = useMap();

  // (data.time.filter((time) => time > nowTime)[0] !== undefined ?  (data.time.filter((time) => time > nowTime)[0] - nowTime + "분 뒤") : "운행종료")

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

      <BusOverlay />
      <BusStopOverlay />
    </>
  );
}
