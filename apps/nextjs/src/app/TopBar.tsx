"use client";

import { useRouter } from "next/navigation";
import {
  Avatar,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { useTheme } from "next-themes";

import ThemeSwitch from "./_components/ThemeSwitch";

export default function TopBar() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  return (
    <Navbar maxWidth="full" position="sticky">
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
        <NavbarItem>
          <Avatar
            showFallback
            src="https://images.unsplash.com/broken"
            onClick={() => {
              router.push("/myInfo");
            }}
          />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
