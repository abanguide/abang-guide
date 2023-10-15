"use client";
export const stops = [
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

export const routes = [
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
