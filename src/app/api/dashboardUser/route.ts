import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { heros, userId } = await request.json();

  return;
}
