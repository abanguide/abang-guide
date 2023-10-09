"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
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
import { useTheme } from "next-themes";

import ThemeSwitch from "./_components/ThemeSwitch";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  return (
    <>
      <Navbar>
        <NavbarBrand>
          <div className="flex flex-col justify-center">
            <p className="text-lg font-bold leading-none">AJOU LIFE</p>
            <p className="text-xs leading-none">장우성아직도여친구함</p>
          </div>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <ThemeSwitch
              isSelected={theme == "dark"}
              onValueChange={(v) => {
                if (v) {
                  setTheme("dark");
                } else {
                  setTheme("light");
                }
              }}
            />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
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
              <InstagramIcon size={32} />
              <div className="text-sm">인스타그램</div>
            </CardBody>
          </Card>
          <Card
            classNames={{
              base: "flex-1 bg-gradient-to-br from-blue-500 to-indigo-500 border-small border-white/50 shadow-indigo-500/30",
              body: "flex flex-col items-center gap-2 text-white",
            }}
          >
            <CardBody>
              <FacebookIcon size={32} />
              <div className="text-sm">페이스북</div>
            </CardBody>
          </Card>
          <Card
            classNames={{
              base: "flex-1 bg-gradient-to-br from-green-500 to-emerald-500 border-small border-white/50 shadow-emerald-500/30",
              body: "flex flex-col items-center gap-2 text-white",
            }}
          >
            <CardBody>
              <StickerIcon size={32} />
              <div className="text-sm">피드백</div>
            </CardBody>
          </Card>
        </div>
        <Card className=" bg-gradient-to-br from-slate-600 to-slate-400">
          <CardBody>
            <Link
              href="http://forms.gle/yWoQfF33XpdFTpS6A"
              passHref
              target="_blank"
            >
              <div className="flex justify-center text-2xl">
                문의사항 & 피드백 남기기
              </div>
            </Link>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
