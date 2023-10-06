"use client";

import prisma from "../../../prisma/clients";
import { Button } from "../ui/button";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { signOut } from "next-auth/react";

export default function DeleteUserButton({
  id,
  email,
}: {
  id: string;
  email: string;
}) {
  // loading
  const handleDeleteAccount = async () => {
    const res = await fetch("/api/auth/deleteUser", {
      method: "DELETE",
      body: JSON.stringify({ id, email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    if (res.ok) {
      await signOut({ callbackUrl: "/" });
    }
  };

  return (
    <Button
      variant="destructive"
      className="uppercase"
      onClick={handleDeleteAccount}
    >
      Supprimer Compte
    </Button>
  );
}
