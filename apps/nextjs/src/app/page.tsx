"use client";

import { useState } from "react";
import Image from "next/image";
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
  Tooltip,
} from "@nextui-org/react";
import { Phone, Star } from "lucide-react";
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  useKakaoLoader,
} from "react-kakao-maps-sdk";

import { BottomNavigation } from "./_components/BottomNavigation";

export default function Home() {
  const [loading, error] = useKakaoLoader({
    appkey: "78db97fad296256c4498faa49d235692",
    // ...options,
  });
  if (error) return <div>Error</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <BottomNavigation />
    </main>
  );
}
