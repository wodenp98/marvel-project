"use client";
/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import React, { useState } from "react";
import { FilterClassWrapper } from "../FilterClass/FilterClass";
import { Button } from "../ui/button";
import HeroItem from "./HeroItem";
import { Input } from "../ui/input";

type HeroesProps = {
  heroes: {
    name: string;
    imageUrl: string;
    classhero: string;
    stars: number;
    id: string;
  }[];
};

// https://github.com/HamedBahram/next-pagination/blob/search/app/movies/page.tsx

export const AddHeroesDashboard = ({ heroes }: HeroesProps) => {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [filteredHeroes, setFilteredHeroes] = useState(heroes);

  const handleSearch = (event: any) => {
    const searchQuery = event.target.value.toLowerCase();
    const filtered = heroes.filter((hero) =>
      hero.name.toLowerCase().includes(searchQuery)
    );
    setQuery(searchQuery);
    setFilteredHeroes(filtered);
  };

  const handleFilter = async (event: any) => {
    const classQuery = event.target.value.toLowerCase();
    const filtered = heroes.filter((hero) =>
      hero.classhero.toLowerCase().includes(classQuery)
    );
    setFilteredHeroes(filtered);
  };
  return (
    <>
      <div className="flex justify-between m-8">
        <div>
          <FilterClassWrapper
            title="cosmic"
            onClick={handleFilter}
            isSelected={selectedClass === "Cosmic"}
          />
          <FilterClassWrapper
            title="skill"
            onClick={handleFilter}
            isSelected={selectedClass === "Skill"}
          />
          <FilterClassWrapper
            title="mystic"
            onClick={handleFilter}
            isSelected={selectedClass === "Mystic"}
          />
          <FilterClassWrapper
            title="tech"
            onClick={handleFilter}
            isSelected={selectedClass === "Tech"}
          />
          <FilterClassWrapper
            title="mutant"
            onClick={handleFilter}
            isSelected={selectedClass === "Mutant"}
          />
          <FilterClassWrapper
            title="science"
            onClick={handleFilter}
            isSelected={selectedClass === "Science"}
          />
          <Button onClick={() => setFilteredHeroes(heroes)}>Reset</Button>
        </div>
        <form onSubmit={handleSearch}>
          <Input
            className="w-2/3"
            type="text"
            placeholder="Search hero"
            value={query}
            onChange={handleSearch}
          />
          <button type="submit">Search</button>
        </form>
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
        <div className="flex justify-center items-center flex-wrap gap-6 mb-4">
          {filteredHeroes.map((hero) => (
            <HeroItem
              key={hero.id}
              id={hero.id}
              name={hero.name}
              image={hero.imageUrl}
              classHero={hero.classhero}
              stars={hero.stars}
            />
          ))}
        </div>
      </section>
    </>
  );
};
