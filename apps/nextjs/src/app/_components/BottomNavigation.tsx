"use client";

import { useRouter } from "next/navigation";
import { Tab, Tabs } from "@nextui-org/react";
import { Bus, HeartHandshake, Sofa } from "lucide-react";

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
      }}
      onSelectionChange={(key) => {
        router.push(`/${key}`);
      }}
    >
      <Tab
        key="bus"
        title={
          <div className="flex flex-col items-center py-1">
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
    </Tabs>
  );
};
