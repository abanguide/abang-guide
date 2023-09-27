"use client";

import React, { useEffect, useState } from "react";
import type { SwitchProps } from "@nextui-org/react";
import { useSwitch, VisuallyHidden } from "@nextui-org/react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeSwitch = (props: SwitchProps) => {
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch(props);

  useEffect(() => {
    if (isSelected) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [isSelected, setTheme]);

  if (!mounted) return null;

  return (
    <Component {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: [
            "h-8 w-8",
            "flex items-center justify-center",
            "bg-default-100 hover:bg-default-200 rounded-lg",
          ],
        })}
      >
        {isSelected ? <SunIcon /> : <MoonIcon />}
      </div>
    </Component>
  );
};

export default ThemeSwitch;
