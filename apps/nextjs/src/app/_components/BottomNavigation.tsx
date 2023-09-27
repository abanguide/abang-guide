"use client";

import { useRouter } from "next/navigation";
import { Tab, Tabs } from "@nextui-org/react";
import { Bus, HeartHandshake, Home, Sofa, User } from "lucide-react";

export const BottomNavigation: React.FC = () => {
  const router = useRouter();
  return (
    <Tabs
      color={"primary"}
      aria-label="Tabs colors"
      radius="lg"
      size="lg"
      classNames={{
        base: "absolute bottom-0 mb-4 z-10",
        tabList: "shadow-lg",
        tabContent: "w-10",
      }}
      onSelectionChange={(key) => {
        if (key === "home") {
          router.push("/");
        } else {
          router.push(`/${key}`);
        }
      }}
    >
      <Tab
        key="home"
        title={
          <div className="flex flex-col items-center">
            <Home size={20} />
            <span className="text-xs">메인</span>
          </div>
        }
      />
      <Tab
        key="bus"
        title={
          <div className="flex flex-col items-center">
            <Bus size={20} />
            <span className="text-xs">셔틀버스</span>
          </div>
        }
      />
      <Tab
        key="partnership"
        title={
          <div className="flex flex-col items-center">
            <HeartHandshake size={20} />
            <span className="text-xs">제휴시설</span>
          </div>
        }
      />
      <Tab
        key="facility"
        title={
          <div className="flex flex-col items-center">
            <Sofa size={20} />
            <span className="text-xs">편의시설</span>
          </div>
        }
      />
      <Tab
        key="myInfo"
        title={
          <div className="flex flex-col items-center">
            <User size={20} />
            <span className="text-xs">내 정보</span>
          </div>
        }
      />
    </Tabs>
  );
};
