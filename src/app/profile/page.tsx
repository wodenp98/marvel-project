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
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";

// server components pour session puis client components pour la card

export default async function Page() {
  const session = await getServerSession(authOptions);
  console.log(session);

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
          <div className="flex justify-center mb-6">
            {session.user?.image ? (
              <Image
                src={session.user?.image}
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
          {session.user?.name ? (
            <CardDescription>{session.user?.name}</CardDescription>
          ) : (
            <div className="space-y-2">
              <Label>Nom</Label> <Input placeholder="Nom" />
            </div>
          )}
          <p className="mt-6">Email: {session.user?.email}</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="destructive" className="uppercase ">
            Supprimer Compte
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
