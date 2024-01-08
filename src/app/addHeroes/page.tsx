/* eslint-disable react/no-unescaped-entities */

import { prisma } from "@/utils/prisma/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NoUserDashboard } from "@/components/HeroItem/Dashboards/NoUserDashboard";
import { AddHeroesDashboard } from "@/components/HeroItem/Dashboards/AddHeroesDashboard";

async function getHeroes() {
  const data = await prisma.heroes.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return data;
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

  return (
    <main>
      <AddHeroesDashboard heroes={heroes} />
    </main>
  );
}
