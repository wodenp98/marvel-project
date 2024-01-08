import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { prisma } from "../../../../prisma/clients";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(null, { status: 401 });
  }

  const data = await prisma.userDatabase.findFirst({
    where: {
      userId: session.user.id,
    },
    include: {
      userDashboard: {
        orderBy: {
          indice: "desc",
        },
      },
    },
  });

  return NextResponse.json(data?.userDashboard || [], { status: 200 });
}
