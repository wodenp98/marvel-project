"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";

export function ToggleDarkMode() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center space-x-2">
        <Button variant="ghost" disabled size="icon">
          <Loader className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        aria-label="Toggle Dark Mode"
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "light" ? (
          <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <SunIcon className="h-[1.2rem] w-[1.2rem] " />
        )}
      </Button>
    </div>
  );
}
