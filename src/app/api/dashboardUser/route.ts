import { prisma } from "@/utils/prisma/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { heros, userId } = await request.json();

  const userDatabase = await prisma.userDatabase.create({
    data: {
      userId: userId,
    },
  });

  for (const hero of heros) {
    const test = await prisma.userDashboard.create({
      data: {
        name: hero.name,
        imageUrl: hero.imageUrl,
        classhero: hero.classhero,
        indice: hero.indice,
        stars: hero.stars,
        rank: hero.rank,
        cs: hero.cs,
        userDatabaseId: userDatabase.id,
      },
    });
  }

  return NextResponse.json(null, { status: 200 });
}
