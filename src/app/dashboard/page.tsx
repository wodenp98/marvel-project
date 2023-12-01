/* eslint-disable react/no-unescaped-entities */
import FilterClass from "@/components/FilterClass/FilterClass";
import SearchBar from "@/components/SearchBar/SearchBar";
import HeroItem from "@/components/HeroItem/HeroItem";
import { prisma } from "@/utils/prisma/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getHeroes() {
  const data = await prisma.heroes.findMany();

  return data;
}

export default async function Dashboard() {
  const heroes = await getHeroes();

  if (!heroes) {
    return <div>no data</div>;
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

      <section>
        <Link href="/table">
          <Button>Voir table</Button>
        </Link>

        <h1>Créer votre dashboard</h1>
        <span>
          Consignes: cliquez sur un héros pour l'ajouter et remplir les infos
          nécessaire, une fois que vous avez fini cliquer sur le bouton j'ai
          terminé pour accéder à votre dashboard
        </span>
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
