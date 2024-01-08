import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/clients";

export async function POST(request: Request) {
  const { heros, userId } = await request.json();
  console.log("heros", heros);

  const userDatabase = await prisma.userDatabase.findFirst({
    where: {
      userId: userId,
    },
  });

  console.log("🔥", userDatabase);

  if (!userDatabase) {
    return NextResponse.json(null, { status: 401 });
  }

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

    console.log("🔥", test);
  }

  // for (const hero of heros) {
  //   const test = await prisma.userDashboard.create({
  //     data: {
  //       name: hero.name,
  //       imageUrl: hero.imageUrl,
  //       classhero: hero.classhero,
  //       indice: hero.indice,
  //       stars: hero.stars,
  //       rank: hero.rank,
  //       cs: hero.cs,
  //       userDatabaseId: userDatabase.id,
  //     },
  //   });
  // }

  return NextResponse.json(null, { status: 200 });
}
