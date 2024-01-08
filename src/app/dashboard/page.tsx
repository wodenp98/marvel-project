/* eslint-disable react/no-unescaped-entities */
import HeroItem from "@/components/HeroItem/HeroItem";
import { prisma } from "@/utils/prisma/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { HeroContainer } from "@/components/HeroItem/HeroContainer";
import { NoUserDashboard } from "@/components/HeroItem/NoUserDashboard";
import { UserDashboard } from "@/components/HeroItem/UserDashboard";

async function getHeroes() {
  const data = await prisma.heroes.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return data;
}

async function getUserDatabase(userId: string) {
  const data = await prisma.userDatabase.findFirst({
    where: {
      userId: userId,
    },
    include: {
      userDashboard: {
        orderBy: {
          indice: "desc",
        },
      },
    },
  });

  return data?.userDashboard || [];
}

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const heroes = await getHeroes();

  if (!session) {
    return null;
  }

  if (!heroes) {
    return <div>no data</div>;
  }

  const userDatabase = await getUserDatabase(session.user.id);

  if (userDatabase.length !== 0) {
    return (
      <main>
        <UserDashboard heroes={userDatabase} />
      </main>
    );
  }

  return (
    <main>
      <NoUserDashboard heroes={heroes} />
    </main>
  );
}
