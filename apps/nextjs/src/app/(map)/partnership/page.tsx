"use client";

import { useEffect, useRef, useState } from "react";
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
import {
  BeerIcon,
  ChefHatIcon,
  CoffeeIcon,
  LocateFixedIcon,
  MoreHorizontalIcon,
  Phone,
  Star,
} from "lucide-react";
import { CustomOverlayMap, useMap } from "react-kakao-maps-sdk";
import { Virtual } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/virtual";

export default function PartnershipPage() {
  type TPartnershipcategory = "restaurant" | "cafe" | "bar" | "etc";
  const [partnershipCategoryStatus, setPartnershipCategoryStatus] = useState({
    restaurant: true,
    cafe: true,
    bar: true,
    etc: true,
  });

  const categorycolor = {
    restaurant: "bg-red-500",
    cafe: "bg-blue-500",
    bar: "bg-green-500",
    etc: "bg-yellow-500",
  };

  const partnershipList = [
    {
      partnershipId: 1,
      name: "이스케이프탑 수원점",
      image:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTExMDFfMTM1%2FMDAxNTcyNTg3MzU2MjI5.40PU5m6gOMiQ7GTPjPuKXQ5Ti1qlIBtsDKTXHqrVjYEg.pTbCTOF0F0HFmJy7ubjEtMfOVkcODtrE0oSzT4XgwKgg.JPEG.hd_dn%2F20190309_184026.jpg&type=sc960_832",
      category: "etc",
      details: [
        "네이버 예약 결제 후 매장 방문 시, 방탈출카페 20% 할인",
        "(매장에서 학생증 제시)",
      ],
      expired: "12/31",
      lat: "37.265233",
      lng: "127.030021",
    },
    {
      partnershipId: 2,
      name: "이담",
      image:
        "https://ajouchongmedia.s3.amazonaws.com/media/image/2022/04/25/%EC%9D%B4%EB%8B%B4.jpg",
      category: "etc",
      details: ["계좌이체 시 10% 할인"],
      expired: "12/31",
      lat: "37.276981",
      lng: "127.045387",
    },
    {
      partnershipId: 3,
      name: "벨르 뷰티헤어",
      image:
        "https://ajouchongmedia.s3.amazonaws.com/media/imag…%EB%A5%B4%EB%B7%B0%ED%8B%B0%ED%97%A4%EC%96%B4.jpg",
      category: "etc",
      details: ["각종 컷, 펌, 염색시 할인", "펌 염색 시술 시 크리닉 서비스"],
      expired: "12/31",
      lat: "37.274940",
      lng: "127.044528",
    },
    {
      partnershipId: 4,
      name: "1001안경콘택트 아주대점",
      image:
        "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20210303_282%2F1614757222891OUdnF_JPEG%2FgBSGxcqZoOzXqb7acsNEoXkz.jpeg.jpg",
      category: "etc",
      details: ["할인 금액에서 추가 10% 할인 (오렌즈 제외)"],
      expired: "12/31",
      lat: "37.276365",
      lng: "127.044082",
    },
    {
      partnershipId: 5,
      name: "카우보이 버거",
      image:
        "https://search.pstatic.net/common/?src=https%3A%2F%2Fmyplace-phinf.pstatic.net%2F20220127_156%2F16432255130810lHxb_JPEG%2Fupload_855e6581f5a54bb7dc3e43f485f6c8d3.jpeg",
      category: "restaurant",
      details: ["600원 할인(오늘의 스페셜 메뉴 제외)"],
      expired: "12/31",
      lat: "37.275887",
      lng: "127.045504",
    },
    {
      partnershipId: 6,
      name: "아주캠프",
      image: null,
      category: "bar",
      details: ["테이블 당 음료 1병 제공"],
      expired: "12/31",
      lat: "37.278030",
      lng: "127.044025",
    },
    {
      partnershipId: 7,
      name: "투썸플레이스 아주대점",
      image:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjAxMDVfMjU2%2FMDAxNjQxMzQ3MTI5MTk5.iyWYJhNX3zDzJuNXi4j6JNtntkur096SPSrvep993Sog.pOSWc4FjBO1aajx8CCQZc0GTAf7jtjpD5RHdfACoUr8g.JPEG.pinkmom0112%2F20220103%25A3%25DF184249.jpg",
      category: "cafe",
      details: ["제조음료에 한해 10% 할인"],
      expired: "12/31",
      lat: "37.279208",
      lng: "127.043985",
    },
    {
      partnershipId: 8,
      name: "포메인 아주대점",
      image:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAyMTZfMjQg%2FMDAxNjc2NTIxNzYyNTY4.kOqjWBobrnLVKrtGZNuDRS5S8D_bPqtfpAz0nVigm14g.qwOQrJP8jcTq2VPLyqljs6_iwTo-Mg-sIadh5R1Pud0g.JPEG.wjddusrkd%2FIMG_5054.jpg",
      category: "restaurant",
      details: ["결제 금액의 10% 할인"],
      expired: "12/31",
      lat: "37.275535",
      lng: "127.042103",
    },
    {
      partnershipId: 9,
      name: "더꼬치다 아주대점",
      image:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAxMTVfOTAg%2FMDAxNjczNzgwNTM4NDcy.eWMd1hqLW8cKXOhD_OzTo2lp8FQ3ElVuZxF6DtsFRiYg.5Xw-xCX37aZ-Uj_saj5xrFiCdenkIDVPeMSQoGomLaQg.JPEG.yyd1021%2FKakaoTalk_20230115_195205739_23.jpg",
      category: "bar",
      details: ["테이블 당 라면 1개, 음료 1병 서비스 제공"],
      expired: "12/31",
      lat: "37.278461",
      lng: "127.043170",
    },
    {
      partnershipId: 10,
      name: "스쿱스젤라또 팔달구2호점",
      image:
        "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220212_257%2F1644655233288egadv_JPEG%2FKakaoTalk_20220212_173807441_16.jpg",
      category: "cafe",
      details: [
        "도장 5개: 1가지 맛->2가지 맛으로 업그레이드",
        "도장 10개: 1가지 맛 컵 무료 제공",
      ],
      expired: "12/31",
      lat: "37.279192",
      lng: "127.042957",
    },
    {
      partnershipId: 11,
      name: "홍콩반점0410 아주대점",
      image:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAxMjdfMjk0%2FMDAxNjc0Nzg1ODIzODk1.MflmeneWSe2OIxVtVooItCb7_AvSxVw_A5hltsOM2Ngg.6K-9-bCMW9eFB0jkG0aAfBPWn7bMc6C7kXmoeijl_pUg.JPEG.wpfhwleoqkddur%2F20221117_110257.jpg",
      category: "restaurant",
      details: ["5만원 이상 결제 시, 군만두 제공"],
      expired: "12/31",
      lat: "37.278569",
      lng: "127.043478",
    },
    {
      partnershipId: 12,
      name: "남바완돈카츠",
      image: null,
      category: "restaurant",
      details: [
        "새우튀김/고로케/맛감자/소스 중 택 1",
        "(아주대학교에서 주문시, 요청사항에 작성하면 증정)",
      ],
      expired: "12/31",
      lat: "37.280031",
      lng: "127.042894",
    },
    {
      partnershipId: 13,
      name: "아마스빈",
      image: null,
      category: "cafe",
      details: ["펄 추가 무료"],
      expired: "12/31",
      lat: "37.279085",
      lng: "127.043325",
    },
    {
      partnershipId: 14,
      name: "우만주옥",
      image: null,
      category: "bar",
      details: ["6만원 이상 시, 계좌이체/현금결제 10% 할인"],
      expired: "12/31",
      lat: "37.279182",
      lng: "127.042327",
    },
    {
      partnershipId: 15,
      name: "밀크볼",
      image: null,
      category: "cafe",
      details: ["토핑 택 1 (콩포트/아몬드 슬라이스/카카오닙스/그래놀라)"],
      expired: "12/31",
      lat: "37.279056",
      lng: "127.042549",
    },
    {
      partnershipId: 16,
      name: "119양푼이",
      image: null,
      category: "restaurant",
      details: [
        "포장주문 시, 카드결제 10% 할인 or 현금결제 15% 할인",
        "아주대 내부로 전화배달 주문 : 15000원 이상 주문시 배달비 1500원, 35000원 이상 주문시 무료배달",
      ],
      expired: "12/31",
      lat: "37.279988",
      lng: "127.042832",
    },
    {
      partnershipId: 17,
      name: "제이스토리 케이크",
      image: null,
      category: "cafe",
      details: ["계좌이체/현금결제 5% 할인"],
      expired: "12/31",
      lat: "37.275420",
      lng: "127.042911",
    },
    {
      partnershipId: 18,
      name: "나우어스 피자",
      image: null,
      category: "restaurant",
      details: ["2조각 이상 주문 시, 테이블 당 감자튀김 M사이즈 제공"],
      expired: "12/31",
      lat: "37.277339",
      lng: "127.043081",
    },
    {
      partnershipId: 19,
      name: "홍희네 주뎅",
      image: null,
      category: "bar",
      details: [
        "계좌이체/현금결제 10% 할인",
        "SNS리뷰 작성 시, 택 1 제공(꿀토마토/소주 1병/맥주 1병 제공)",
      ],
      expired: "12/31",
      lat: "37.277072",
      lng: "127.041215",
    },
    {
      partnershipId: 20,
      name: "PG술집",
      image: null,
      category: "bar",
      details: ["계좌이체/현금결제 10% 할인(최대 할인 금액 3만원)"],
      expired: "12/31",
      lat: "37.278512",
      lng: "127.044105",
    },
    {
      partnershipId: 21,
      name: "설빙",
      image: null,
      category: "cafe",
      details: [
        "(1) 인절미 설빙+한입 쏙 붕어빵 : 10000원",
        "(2)애플망고치즈 설빙+한입 쏙 붕어빵 : 14000원",
      ],
      expired: "12/31",
      lat: "37.278523",
      lng: "127.044756",
    },
    {
      partnershipId: 22,
      name: "샹그리라",
      image: null,
      category: "restaurant",
      details: ["3인 이상 방문 시, 10% 할인 (런치세트 제외)"],
      expired: "12/31",
      lat: "37.278803",
      lng: "127.044049",
    },
    {
      partnershipId: 23,
      name: "포푸리리프",
      image: null,
      category: "cafe",
      details: [
        "(1) 음료 테이크 아웃 10% 할인",
        "(2) 테이블 당 1만원 이상 시, 음료 10% 할인 (쿠폰 적립 불가)",
      ],
      expired: "12/31",
      lat: "37.277192",
      lng: "127.045421",
    },
    {
      partnershipId: 24,
      name: "레드버튼",
      image: null,
      category: "etc",
      details: ["4인 이상 방문 시, 팝콘 M사이즈 제공"],
      expired: "12/31",
      lat: "37.278341",
      lng: "127.044077",
    },
    {
      partnershipId: 25,
      name: "요고트팜",
      image: null,
      category: "cafe",
      details: [
        "(1) 아주대학교 내 결제 시, 배달비 무료(선결제)",
        "(2) 1만원 이상 구매 시, 토핑 1개 무료",
      ],
      expired: "12/31",
      lat: "37.277843",
      lng: "127.044060",
    },
    {
      partnershipId: 26,
      name: "심야술집",
      image: null,
      category: "bar",
      details: ["계좌이체/현금결제 10% 할인"],
      expired: "12/31",
      lat: "37.275266",
      lng: "127.045329",
    },
    {
      partnershipId: 27,
      name: "삼거리 황소곱창",
      image: null,
      category: "restaurant",
      details: ["계좌이체/현금결제 10% 할인(최대 할인 금액 3만원)"],
      expired: "12/31",
      lat: "37.275462",
      lng: "127.044983",
    },
    {
      partnershipId: 28,
      name: "삼거리광장",
      image: null,
      category: "bar",
      details: ["계좌이체 10% 할인"],
      expired: "12/31",
      lat: "37.275404",
      lng: "127.044509",
    },
    {
      partnershipId: 29,
      name: "아주돈",
      image: null,
      category: "restaurant",
      details: ["3인 이상 테이블에 소주 1병 제공(최소 1명이 아주대 학생)"],
      expired: "12/31",
      lat: "37.277145",
      lng: "127.044865",
    },
    {
      partnershipId: 30,
      name: "옥집",
      image: null,
      category: "bar",
      details: ["계좌이체/현금결제 10% 할인"],
      expired: "12/31",
      lat: "37.275300",
      lng: "127.045225",
    },
    {
      partnershipId: 31,
      name: "할머니 부대찌개",
      image: null,
      category: "restaurant",
      details: ["3인 이상 방문 시, 음료 1개 무료 제공"],
      expired: "12/31",
      lat: "37.276627",
      lng: "127.044899",
    },
    {
      partnershipId: 32,
      name: "도야족발",
      image: null,
      category: "restaurant",
      details: ["계좌이체/현금결제 10% 할인"],
      expired: "12/31",
      lat: "37.275084",
      lng: "127.044932",
    },
    {
      partnershipId: 33,
      name: "로꼬미용실",
      image: null,
      category: "etc",
      details: ["예약 방문 시, 커트 제외 10% 할인(중복할인 불가)"],
      expired: "12/31",
      lat: "37.275645",
      lng: "127.044202",
    },
    {
      partnershipId: 34,
      name: "아대닭발",
      image: null,
      category: "bar",
      details: ["계좌이체/현금결제 10% 할인"],
      expired: "12/31",
      lat: "37.275097",
      lng: "127.044734",
    },
    {
      partnershipId: 35,
      name: "어풍당당",
      image: null,
      category: "bar",
      details: ["계좌이체/현금결제 10% 할인"],
      expired: "12/31",
      lat: "37.275370",
      lng: "127.044546",
    },
    {
      partnershipId: 36,
      name: "포차이즈",
      image: null,
      category: "bar",
      details: ["계좌이체/현금결제 10% 할인(최대 할인 금액 3만원)"],
      expired: "12/31",
      lat: "37.275011",
      lng: "127.045256",
    },
    {
      partnershipId: 37,
      name: "크로스핏 TSF",
      image: null,
      category: "etc",
      details: ["10% 할인"],
      expired: "12/31",
      lat: "37.276802",
      lng: "127.030906",
    },
    {
      partnershipId: 38,
      name: "태풍복싱 체육관",
      image: null,
      category: "etc",
      details: ["1개월 이용료 11만원"],
      expired: "12/31",
      lat: "37.303092",
      lng: "127.007983",
    },
    {
      partnershipId: 39,
      name: "다비치안경",
      image: null,
      category: "etc",
      details: ["10% 할인 + 에그타르트/크로아상 빵 제공"],
      expired: "12/31",
      lat: "37.275039",
      lng: "127.043821",
    },
  ];

  const [filteredList, setfilteredList] = useState(partnershipList);
  const [swiper, setSwiper] = useState<SwiperClass>();
  const map = useMap();

  useEffect(() => {
    const filtered = partnershipList.filter((data) => {
      if (partnershipCategoryStatus.etc && data.category === "etc") {
        return true;
      } else if (
        partnershipCategoryStatus.restaurant &&
        data.category === "restaurant"
      ) {
        return true;
      } else if (partnershipCategoryStatus.cafe && data.category === "cafe") {
        return true;
      } else if (partnershipCategoryStatus.bar && data.category === "bar") {
        return true;
      } else {
        return false;
      }
    });
    setfilteredList(filtered);
  }, [partnershipCategoryStatus]);

  const categoryInfo = {
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
    bar: {
      name: "주점",
      mapIcon: (
        <div>
          <BeerIcon size={16} />
        </div>
      ),
    },
    etc: {
      name: "기타",
      mapIcon: (
        <div>
          <MoreHorizontalIcon size={16} />
        </div>
      ),
    },
  };

  return (
    <>
      <div className="fixed top-0 z-10 mt-4 flex w-full justify-center">
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

      <div className="fixed bottom-0 z-10 mb-64 w-screen">
        <Button
          isIconOnly
          onPress={() => {
            if ("geolocation" in navigator) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  map.panTo(
                    new kakao.maps.LatLng(
                      position.coords.latitude,
                      position.coords.longitude,
                    ),
                  );
                },
                () => {},
              );
            } else {
              /* geolocation IS NOT available */
            }
          }}
        >
          <LocateFixedIcon size={16} />
        </Button>
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
          onSlideChangeTransitionStart={(swiper) => {
            map.panTo(
              new kakao.maps.LatLng(
                Number(filteredList[swiper.realIndex]?.lat),
                Number(filteredList[swiper.realIndex]?.lng),
              ),
            );
          }}
        >
          {filteredList.map((data, index) => (
            <SwiperSlide
              key={index}
              className="w-screen px-4"
              virtualIndex={index}
            >
              <Card classNames={{ base: "overflow-x-hidden" }} shadow="none">
                <CardBody>
                  <div className="flex flex-row items-center">
                    <div className="flex-1">
                      <div className="flex flex-row items-center gap-2">
                        <h4 className="font-bold">{data.name}</h4>
                        <Star size={16} />
                      </div>
                      <p className="text-xs">
                        {
                          categoryInfo[data.category as TPartnershipcategory]
                            .name
                        }
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
                    {data.details.map((detail, i) => (
                      <Chip key={i} color="success" variant="flat" size="sm">
                        {detail}
                      </Chip>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {filteredList.map((data, index) => (
        <CustomOverlayMap
          position={{ lat: Number(data.lat), lng: Number(data.lng) }}
          key={index}
        >
          <div
            className={cn(
              "flex translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full border-2 border-black",
              categorycolor[data.category],
            )}
            style={{
              width: "1.5rem",
              height: "1.5rem",
            }}
            key={index}
            onClick={() => {
              swiper?.slideTo(index);
            }}
          >
            {categoryInfo[data.category as TPartnershipcategory]?.mapIcon}
          </div>
          {map.getLevel() < 3 && <div>{data.name}</div>}
        </CustomOverlayMap>
      ))}
    </>
  );
}
