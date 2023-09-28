/* eslint-disable react/no-unescaped-entities */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";

export default function Page() {
  return (
    <main className="h-[80vh] flex flex-col items-center justify-center">
      <Card className=" flex flex-col items-center space-y-4">
        <CardHeader>
          <CardTitle className="uppercase text-2xl text-center">
            Merci pour votre demande de Magic Link
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-xl">
            Un lien de connexion vous a été envoyé dans votre boîte mail
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="secondary" asChild>
            <Link href="/">Accueil</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
