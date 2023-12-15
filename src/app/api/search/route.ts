import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/utils/prisma/prisma";
import { NextApiRequest } from "next";
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("q");

  console.log("query", query);

  if (typeof query !== "string") {
    throw new Error("Invalid request");
  }

  /**
   * Search posts
   */
  const heroes = await prisma.heroes.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
  });

  // res.status(200).json({ posts });
  return NextResponse.json(heroes, { status: 200 });
}
