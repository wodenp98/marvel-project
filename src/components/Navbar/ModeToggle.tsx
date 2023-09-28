"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "../ui/button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  console.log(theme);

  const toggle = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  return (
    <div className="flex items-center space-x-2">
      <Button variant="ghost" size="icon" onClick={toggle}>
        {theme === "light" ? (
          <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <SunIcon className="h-[1.2rem] w-[1.2rem] " />
        )}
      </Button>
    </div>
  );
}
