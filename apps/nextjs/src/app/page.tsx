"use client";

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

export default function Home() {
  return (
    <>
      <Navbar>
        <NavbarBrand>
          <p className="font-bold text-inherit">AJOU LIFE</p>
        </NavbarBrand>
      </Navbar>
      <div className="flex w-full flex-col gap-2 px-4">
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
              base: "flex-1",
              body: "flex flex-col items-center gap-2",
            }}
          >
            <CardBody>
              <InstagramIcon size={32} />
              인스타그램
            </CardBody>
          </Card>
          <Card
            classNames={{
              base: "flex-1",
              body: "flex flex-col items-center gap-2",
            }}
          >
            <CardBody>
              <FacebookIcon size={32} />
              페이스북
            </CardBody>
          </Card>
          <Card
            classNames={{
              base: "flex-1",
              body: "flex flex-col items-center gap-2",
            }}
          >
            <CardBody>
              <StickerIcon size={32} />
              피드백
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
