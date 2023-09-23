"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const toggle = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  return (
    <div className="flex items-center  space-x-2">
      <Label htmlFor="airplane-mode">
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />{" "}
      </Label>
      <Switch id="airplane-mode" onCheckedChange={toggle} />
      <Label htmlFor="airplane-mode">
        <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Label>
    </div>
  );
}
