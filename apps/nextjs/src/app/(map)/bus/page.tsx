"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, CardBody, Chip, Divider } from "@nextui-org/react";
import { Phone, Star } from "lucide-react";
import { CustomOverlayMap, MapMarker, useMap } from "react-kakao-maps-sdk";
import { Virtual } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/virtual";

import "swiper/css";
import "swiper/css/virtual";

function currentTimer() {
  const date = new Date();
  const hours = date.getHours();
  const min = date.getMinutes();
  return hours * 60 + min;
}
const stop = [
  {
    locationId: 1,
    lat: "37.29",
    lng: "127.05",
    name: "광교중앙역 1번 출구",
  },
  {
    locationId: 2,
    lat: "37.27",
    lng: "127.00",
    name: "수원역 9번/10번 출구",
  },
  {
    locationId: 3,
    lat: "37.28",
    lng: "127.04",
    name: "도서관 도로변",
  },
  {
    locationId: 4,
    lat: "37.28",
    lng: "127.04",
    name: "원천관 입구",
  },
  {
    locationId: 5,
    lat: "37.28",
    lng: "127.05",
    name: "율곡관 도로변",
  },
];

const route = [
  {
    path: "아주대~광교중앙역",
    FromTime: [510, 530, 570, 605, 615, 705, 800, 885, 975, 1050],
    ToTime: [500, 520, 560, 595, 605, 695, 790, 875, 965, 1040, 1090],
  },
  {
    path: "아주대~수원역",
    FromTime: [510, 590, 680],
    ToTime: [910, 1000, 1085],
  },
];

function TimeToString(now: number, remain: number) {
  const hours = Math.floor((now + remain) / 60);
  const min = (now + remain) % 60;
  console.log("hours", hours, "min", min);
  return (
    hours.toString().padStart(2, "0") +
    "시 " +
    min.toString().padStart(2, "0") +
    "분"
  );
}

export default function BusPage() {
  const [nowTime, setNow] = useState(currentTimer());
  const [remain, setRemain] = useState([-1, -1, -1, -1, -1, -1, -1, -1]);
  const [stopToast, setStopToast] = useState<number | null>(null);

  const [open, setOpen] = useState(false);
  const router = useRouter();

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

  setInterval(() => {
    setNow(currentTimer());
  }, 5000);

  const [swiper, setSwiper] = useState<SwiperClass>();
  const map = useMap();

  useEffect(() => {
    const temp = [];
    for (let i = 0; i < route.length; i++) {
      const routeTime = route[i]?.FromTime;
      if (routeTime) {
        for (let j = 0; j < routeTime.length; j++) {
          if ((routeTime[j] ?? 0) > nowTime) {
            temp.push((routeTime[j] ?? 0) - nowTime);
            if (j + 1 < routeTime.length) {
              temp.push((routeTime[j + 1] ?? 0) - nowTime);
            } else {
              temp.push(-1);
            }
            break;
          }
        }
        if (temp.length === i) {
          temp.push(-1, -1);
          console.log("push");
        }
      }
      console.log("from ", i);
    }
    console.log("From: ", temp);
    for (let i = 0; i < route.length; i++) {
      const routeTime = route[i]?.ToTime;
      if (routeTime) {
        for (let j = 0; j < routeTime.length; j++) {
          if ((routeTime[j] ?? 0) > nowTime) {
            temp.push((routeTime[j] ?? 0) - nowTime);
            if (j + 1 < routeTime.length) {
              temp.push((routeTime[j + 1] ?? 0) - nowTime);
            } else {
              temp.push(-1);
            }
            break;
          }
        }
        if (temp.length === i) {
          temp.push(-1, -1);
        }
      }
    }
    if (temp.length >= 8) {
      setRemain(temp);
    }
  }, [nowTime]);

  useEffect(() => {
    console.log("remain: ", remain);
  }, [remain]);

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
          {route.map((data, index) => (
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
                        <h4 className="font-bold">{data.path}</h4>
                        <Star size={16} />
                      </div>
                    </div>
                  </div>
                  <Divider className="my-2" />
                  <div className="flex flex-row gap-2">
                    <div className="flex flex-1 flex-col gap-2">
                      <h4 className="text-sm font-bold">
                        {data.path.split("~")[0] + " 행"}
                      </h4>
                      <div className="flex flex-row items-center justify-between text-sm">
                        <span>
                          {remain[0 + 2 * index] !== -1
                            ? TimeToString(nowTime, remain[0 + 2 * index]!)
                            : "운행종료"}
                        </span>
                        <Chip color="success" variant="flat" size="sm">
                          {remain[0 + 2 * index] !== -1
                            ? remain[0 + 2 * index] + "분 뒤"
                            : "운행 종료"}
                        </Chip>
                      </div>
                      <div className="flex flex-row items-center justify-between text-sm">
                        <span>
                          {remain[1 + 2 * index] !== -1
                            ? TimeToString(nowTime, remain[1 + 2 * index]!)
                            : "운행종료"}
                        </span>
                        <Chip color="success" variant="flat" size="sm">
                          {remain[1 + 2 * index] !== -1
                            ? remain[1 + 2 * index] + "분 뒤"
                            : "운행 종료"}
                        </Chip>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-2">
                      {/* FIXME: 목적지 이름 */}
                      <h4 className="text-sm font-bold">
                        {data.path.split("~")[1] + " 행"}
                      </h4>
                      <div className="flex flex-row items-center justify-between text-sm">
                        <span>
                          {remain[4 + 2 * index] !== -1
                            ? TimeToString(nowTime, remain[4 + 2 * index]!)
                            : "운행종료"}
                        </span>
                        <Chip color="success" variant="flat" size="sm">
                          {remain[4 + 2 * index] !== -1
                            ? remain[4 + 2 * index] + "분 뒤"
                            : "운행 종료"}
                        </Chip>
                      </div>

                      <div className="flex flex-row items-center justify-between text-sm">
                        <span>
                          {remain[5 + 2 * index] !== -1
                            ? TimeToString(nowTime, remain[5 + 2 * index]!)
                            : "운행종료"}
                        </span>
                        <Chip color="success" variant="flat" size="sm">
                          {remain[5 + 2 * index] !== -1
                            ? remain[5 + 2 * index] + "분 뒤"
                            : "운행 종료"}
                        </Chip>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <CustomOverlayMap
        position={{ lat: 37.28148, lng: 127.04353 }}
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
      {stop.map((stop) => (
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
}
