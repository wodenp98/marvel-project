import Image from "next/image";
import Link from "next/link";
import prisma from "../../prisma/clients";
import { ModeToggle } from "@/components/ModeToggle";

async function getHeroes() {
  const data = await prisma.heroes.findMany();
  return data;
}

export default async function Home() {
  const data = await getHeroes();
  console.log(data);

  return (
    <main>
      <div>
        <ModeToggle />
      </div>
      <div>
        {data.map((hero) => (
          <div key={hero.id}>
            <Image
              src={hero.imageUrl}
              alt={hero.name}
              width={128}
              height={128}
            />
            <h2>{hero.name}</h2>
          </div>
        ))}
      </div>
    </main>
  );
}
