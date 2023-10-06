import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import prisma from "../../../prisma/clients";
import { signOut } from "next-auth/react";
import DeleteUserButton from "@/components/DeleteUser/DeleteUserButton";
import UserInput from "@/components/UserInput/UserInput";

interface CustomSession extends Session {
  user: {
    id: string;
    name: string | null | undefined;
    email: string;
    image: string | null | undefined;
  };
}

export default async function Page() {
  const session: CustomSession | null = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <main className="h-[80vh] flex flex-col items-center justify-center">
      <Card className="w-[350px] space-y-4">
        <CardHeader>
          <CardTitle>Profil</CardTitle>
        </CardHeader>
        <CardContent>
          <UserInput />
        </CardContent>
        <CardFooter className="flex justify-center">
          <DeleteUserButton
            id={session?.user?.id}
            email={session?.user?.email}
          />
        </CardFooter>
      </Card>
    </main>
  );
}
