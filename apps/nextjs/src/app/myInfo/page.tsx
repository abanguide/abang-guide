"use client";

import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Navbar,
  NavbarBrand,
  User,
} from "@nextui-org/react";
import { UserIcon } from "lucide-react";

export default function MyInfoPage() {
  return (
    <>
      <Navbar>
        <NavbarBrand>
          <p className="font-bold text-inherit">AJOU LIFE</p>
        </NavbarBrand>
      </Navbar>
      <div className="flex w-full flex-col gap-4 px-4">
        <Card>
          <CardBody>
            <User
              classNames={{
                base: "justify-start",
              }}
              name="손진혁"
              description="cuzz@ajou.ac.kr"
              avatarProps={{
                fallback: <UserIcon />,
              }}
            />
          </CardBody>
        </Card>
        <Card
          classNames={{
            base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
            body: "items-center",
          }}
        >
          <CardBody>⭐ 장우성의 여자친구 지원하기 ⭐</CardBody>
          <Divider />
          <CardFooter>
            <p className="text-content3-foreground text-xs opacity-50">
              본 지원 내용은 장우성의 여자친구 지원을 위한 내용으로,
              Ajou-Life와는 무관합니다.
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
