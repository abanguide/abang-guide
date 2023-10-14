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
const stops = [
  {
    locationId: 1,
    lat: "37.287893",
    lng: "127.052024",
    name: "광교중앙역 1번 출구",
  },
  {
    locationId: 2,
    lat: "37.266509",
    lng: "127.001494",
    name: "수원역 9번/10번 출구",
  },
  {
    locationId: 3,
    lat: "37.281279",
    lng: "127.044202",
    name: "도서관 도로변",
  },
  {
    locationId: 4,
    lat: "37.282736",
    lng: "127.043487",
    name: "원천관 입구",
  },
  {
    locationId: 5,
    lat: "37.281762",
    lng: "127.046335",
    name: "율곡관 도로변",
  },
];

const routes = [
  {
    title: "아주대~광교중앙역",
    upward: {
      path: "광교중앙역 행",
      stopIds: [1, 3, 4, 5],
      time: [500, 520, 560, 595, 605, 695, 790, 875, 965, 1040, 1090],
    },
    downward: {
      path: "아주대 행",
      stopId: [1, 3, 4, 5],
      time: [510, 530, 570, 605, 615, 705, 800, 885, 975, 1050],
    },
  },
  {
    title: "아주대~수원역",
    upward: {
      path: "수원역 행",
      stopId: [2, 3, 4, 5],
      time: [910, 1000, 1085],
    },
    downward: {
      path: "아주대 행",
      stopId: [2, 3, 4, 5],
      time: [510, 590, 680],
    },
  },
];

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
              width: 20,
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
              className="flex h-fit w-fit flex-1 flex-col items-center justify-center space-y-6 rounded-lg bg-black px-4 py-2"
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
                alt="정류장 이미지 들어갈 곳"
              />
            </div>
          )}
        </MapMarker>
      ))}
    </>
  );
};

const notice = [
  {
    busNoticeId: 1,
    title: "광교중앙역 등교 버스 도착 장소 변경 안내",
    url: "https://www.ajou.ac.kr/kr/ajou/notice.do?mode=view&articleNo=214712",
  },
  {
    busNoticeId: 2,
    title: "5.12(금) 당일 광교중앙역 본교 버스 운행 시각 조정 안내",
    url: "https://www.ajou.ac.kr/kr/ajou/notice.do?mode=view&articleNo=214334&article.offset=0",
  },
  {
    busNoticeId: 3,
    title: "아주대학교 셔틀버스 운행 시각 조정 안내",
    url: "https://www.ajou.ac.kr/kr/ajou/notice.do?mode=view&articleNo=211901&article.offset=10&articleLimit=10&srSearchVal=%EB%B2%84%EC%8A%A4",
  },
];

export default function BusPage() {
  const [nowTime, setNow] = useState(currentTimer());
  const [remain, setRemain] = useState([-1, -1, -1, -1, -1, -1, -1, -1]);

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
      <div className="fixed left-1/2 top-4 z-10 h-[5vh] w-[80vw] -translate-x-1/2 whitespace-nowrap">
        <Card className="h-full">
          <CardBody className="justify-center overflow-y-hidden">
            <div className="badge badge-error gap-2">
              <div
                className="rounded-full px-3 py-1 text-xs"
                onClick={() => {
                  setOpen(!open);
                }}
              >
                {open ? (
                  <span>닫기</span>
                ) : (
                  <div>
                    <span className="mr-2 font-bold">[공지]</span>
                    <span>{notice[0]?.title}</span>
                  </div>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      {open && (
        <div className="fixed left-1/2 top-[4.5rem] z-10 flex h-fit w-[80vw] -translate-x-1/2 flex-col gap-y-3 whitespace-nowrap">
          {notice.map((data, index) => (
            <div key={index} className={"h-[5vh]"}>
              <Card className="h-full">
                <CardBody className="justify-center overflow-y-hidden">
                  <div className="badge badge-error gap-2">
                    <div
                      className="rounded-full px-3 py-1 text-xs"
                      onClick={() => {
                        router.push(data.url);
                      }}
                    >
                      <div>
                        <span>{data?.title}</span>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      )}

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
