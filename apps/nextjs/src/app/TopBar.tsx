"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { AlignLeft } from "lucide-react";
import { useTheme } from "next-themes";

import ThemeSwitch from "./_components/ThemeSwitch";

export default function TopBar() {
  const { theme, setTheme } = useTheme();

  return (
    <Navbar maxWidth="full" position="sticky">
      <NavbarBrand>
        <div className="flex items-center justify-center gap-x-4">
          <span className="text-lg font-bold leading-none">Abang-Guide</span>
          <AlignLeft style={{ cursor: "pointer" }} />
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
  );
}
