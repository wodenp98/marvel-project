import { prisma } from "@/utils/prisma/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { heros, userId } = await request.json();

  if (!userId) {
    return NextResponse.json(null, { status: 401 });
  }

  const updateHero = await prisma.userDashboard.update({
    where: {
      id: heros.id,
    },
    data: {
      indice: heros.indice,
      rank: heros.rank,
      cs: heros.cs,
    },
  });

  return NextResponse.json(null, { status: 200 });
}
