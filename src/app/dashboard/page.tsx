import FilterClass from "@/components/FilterClass/FilterClass";
import SearchBar from "@/components/SearchBar/SearchBar";
import HeroItem from "@/components/HeroItem/HeroItem";
import prisma from "../../../prisma/clients";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

async function getHeroes() {
  const data = await prisma.heroes.findMany();
  return data;
}

async function getUserHeroes() {
  const data = await prisma.userDatabase.findMany();
  return data;
}

export default async function Page() {
  const heroes = await getHeroes();
  const userHeroes = await getUserHeroes();
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <main>
      <div className="flex justify-between m-8">
        <div>
          <FilterClass title="cosmic" />
          <FilterClass title="skill" />
          <FilterClass title="mystic" />
          <FilterClass title="tech" />
          <FilterClass title="mutant" />
          <FilterClass title="science" />
        </div>
        <SearchBar />
      </div>

      {/* create your dashboard, + ajout de consignes */}

      <section>
        <div className="flex justify-center items-center flex-wrap gap-6">
          {heroes.map((hero) => (
            <HeroItem
              key={hero.id}
              name={hero.name}
              image={hero.imageUrl}
              classHero={hero.classhero}
              stars={hero.stars}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
