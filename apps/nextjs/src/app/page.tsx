"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  cn,
  Divider,
  Listbox,
  ListboxItem,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { FacebookIcon, InstagramIcon, StickerIcon } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col gap-2 px-4 py-2">
        <Card
          classNames={{
            body: "p-1",
          }}
        >
          <CardHeader>공지사항</CardHeader>
          <Divider />
          <CardBody>
            <Listbox
              variant="flat"
              aria-label="Listbox menu with descriptions"
              className="p-0"
            >
              <ListboxItem
                key="new"
                showDivider
                description="2023-09-27 08:09:12"
              >
                광교 중앙역 등교 버스 도착 장소 변경 안내
              </ListboxItem>
              <ListboxItem
                key="copy"
                showDivider
                description="2023-09-27 08:09:12"
              >
                광교 중앙역 등교 버스 출발 시간 변경 안내
              </ListboxItem>
              <ListboxItem
                key="edit"
                showDivider
                description="2023-09-27 08:09:12"
              >
                아주대학교 셔틀버스 운행 시각 조정 안내
              </ListboxItem>
            </Listbox>
          </CardBody>
        </Card>
        <div className="flex w-full flex-1 flex-row gap-2">
          <Card
            classNames={{
              base: "flex-1 bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
              body: "flex flex-col items-center gap-2 text-white",
            }}
          >
            <CardBody>
            <Link
                href="https://www.instagram.com/ajou.life_/"
                className="flex flex-col items-center"
                passHref
                target="_blank"
              >
              <InstagramIcon size={32} />
              <div className="text-sm">인스타그램</div>
              </Link>
            </CardBody>
          </Card>
          <Card
            classNames={{
              base: "flex-1 bg-gradient-to-br from-blue-500 to-indigo-500 border-small border-white/50 shadow-indigo-500/30",
              body: "flex flex-col items-center gap-2 text-white",
            }}
          >
            <CardBody>
            <Link
                href="https://www.facebook.com/ajou.life.2023?mibextid=LQQJ4d"
                className="flex flex-col items-center"
                passHref
                target="_blank"
              >
              <FacebookIcon size={32} />
              <div className="text-sm">페이스북</div>
              </Link>
            </CardBody>
          </Card>
          <Card
            classNames={{
              base: "flex-1 bg-gradient-to-br from-green-500 to-emerald-500 border-small border-white/50 shadow-emerald-500/30",
              body: "flex flex-col items-center gap-2 text-white",
            }}
          >
            <CardBody>
              <Link
                href="http://forms.gle/yWoQfF33XpdFTpS6A"
                className="flex flex-col items-center"
                passHref
                target="_blank"
              >
                <StickerIcon size={32} />
                <div className="text-sm">피드백</div>
                <div className="text-sm">문의사항</div>
              </Link>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
