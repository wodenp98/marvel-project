import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { prisma } from "../../../prisma/clients";
import { TableNoDatabase } from "@/components/Tables/TableNoDatabase";
import { TableAddNewHeroes } from "@/components/Tables/TableAddNewHeroes";

async function getUserDatabase(userId: string) {
  const data = await prisma.userDatabase.findFirst({
    where: {
      userId: userId,
    },
    include: {
      userDashboard: true,
    },
  });

  return data?.userDashboard || [];
}

export default async function Page() {
  // if database = new table et pas table et new store?
  // meme procéder que pour le dashboard
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }
  const userDatabase = await getUserDatabase(session.user.id);

  if (userDatabase.length === 0) {
    return (
      <div>
        <TableNoDatabase />
      </div>
    );
  }

  return (
    <div>
      <TableAddNewHeroes />
    </div>
  );
}
