"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn, Tab, Tabs } from "@nextui-org/react";
import { BikeIcon, Bus, HeartHandshake, Home, Sofa } from "lucide-react";

export const BottomNavigation: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div>
      <div className="bg-content2 flex flex-row items-center justify-center gap-2 rounded-lg p-1 shadow-md">
        <Link
          className={cn(
            `link w-16 rounded-lg`,
            `${pathname === "/" ? "bg-primary-500 text-white" : ""}`,
          )}
          href="/"
        >
          <div className="flex flex-col items-center">
            <Home size={20} />
            <span className="text-xs">메인</span>
          </div>
        </Link>
        <Link
          className={cn(
            `link w-16 rounded-lg`,
            `${pathname === "/bus" ? "bg-primary-500 text-white" : ""}`,
          )}
          href="/bus"
        >
          <div className="flex flex-col items-center">
            <Bus size={20} />
            <span className="text-xs">셔틀버스</span>
          </div>
        </Link>
        <Link
          className={cn(
            `link w-16 rounded-lg`,
            `${pathname === "/partnership" ? "bg-primary-500 text-white" : ""}`,
          )}
          href="/partnership"
        >
          <div className="flex flex-col items-center">
            <HeartHandshake size={20} />
            <span className="text-xs">제휴시설</span>
          </div>
        </Link>
        <Link
          className={cn(
            `link w-16 rounded-lg`,
            `${pathname === "/facility" ? "bg-primary-500 text-white" : ""}`,
          )}
          href="/facility"
        >
          <div className="flex flex-col items-center">
            <Sofa size={20} />
            <span className="text-xs">편의시설</span>
          </div>
        </Link>
        <Link
          className={cn(
            `link w-16 rounded-lg`,
            `${pathname === "/mobility" ? "bg-primary-500 text-white" : ""}`,
          )}
          href="/mobility"
        >
          <div className="flex flex-col items-center">
            <BikeIcon size={20} />
            <span className="text-xs">모빌리티</span>
          </div>
        </Link>
      </div>
    </div>
  );
};
