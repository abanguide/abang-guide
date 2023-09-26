"use client";

import { Card, CardBody, Navbar, NavbarBrand, User } from "@nextui-org/react";
import { UserIcon } from "lucide-react";

export default function MyInfoPage() {
  return (
    <>
      <Navbar>
        <NavbarBrand>
          <p className="font-bold text-inherit">AJOU LIFE</p>
        </NavbarBrand>
      </Navbar>
      <div className="w-full px-4">
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
      </div>
    </>
  );
}
