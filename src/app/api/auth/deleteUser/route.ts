import { Session, getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../[...nextauth]/route";
import prisma from "../../../../../prisma/clients";

interface CustomSession extends Session {
  user: {
    id: string;
    name: string | null | undefined;
    email: string;
    image: string | null | undefined;
  };
}

export async function DELETE(request: Request) {
  const session: CustomSession | null = await getServerSession(authOptions);
  const body = await request.json();

  console.log(session?.user.email, body.email);

  if (!session) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  if (session.user.email !== body.email && session.user.id !== body.id) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  try {
    await prisma.user.delete({
      where: {
        id: session?.user?.id,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
