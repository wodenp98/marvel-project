"use client";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { CardDescription } from "../ui/card";
import Image from "next/image";

export default function UserInput() {
  const { data: session, update } = useSession();
  const [newName, setNewName] = useState(session?.user?.name || "");

  // loading sur l'update

  return (
    <>
      <div className="flex justify-center mb-6">
        {session?.user?.image ? (
          <Image
            src={session?.user?.image}
            alt="avatar"
            width={50}
            height={50}
            className="rounded-full"
          />
        ) : (
          <Image
            src="/assets/avatar.jpg"
            alt="avatar"
            width={50}
            height={50}
            className="rounded-full"
          />
        )}
      </div>

      {session?.user?.name ? (
        <CardDescription>{session.user.name}</CardDescription>
      ) : (
        <div className="space-y-2">
          <Label>Nom</Label>
          <Input
            placeholder="Nom"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <Button onClick={() => update({ name: newName })}>Update</Button>
        </div>
      )}

      <p className="mt-6">Email: {session?.user?.email}</p>
    </>
  );
}
