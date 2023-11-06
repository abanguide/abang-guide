"use client";

import { useRouter } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { AlignLeft } from "lucide-react";
import { useTheme } from "next-themes";

import ThemeSwitch from "./_components/ThemeSwitch";
import { useShowList } from "./hook";

export default function TopBar() {
  const { theme, setTheme } = useTheme();
  const { showList, setShowList } = useShowList();
  const router = useRouter();

  const updateShowList = (v: boolean) => {
    setShowList(v);
  };

  return (
    <Navbar maxWidth="full" position="sticky">
      <NavbarBrand>
        <div className="flex items-center justify-center gap-x-4">
          <span
            className="text-lg font-bold leading-none"
            onClick={() => router.replace("/")}
            style={{ cursor: "pointer" }}
          >
            Abang-Guide
          </span>
          <AlignLeft
            style={{ cursor: "pointer" }}
            onClick={() => updateShowList(!showList)}
          />
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
