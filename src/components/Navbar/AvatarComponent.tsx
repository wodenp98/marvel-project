"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export function AvatarComponent() {
  return (
    <Link href="/">
      <Avatar>
        <AvatarImage src="https://i.pinimg.com/564x/a4/20/d2/a420d22a33698be79067840d129c6b60.jpg" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </Link>
  );
}
