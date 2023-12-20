"use client";
import React, { useState } from "react";
import HeroDashboard from "./HeroDashboard";
import FilterClass from "../FilterClass/FilterClass";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type HeroesProps = {
  heroes: {
    name: string;
    rank: string;
    imageUrl: string;
    classhero: string;
    stars: string;
    indice: number;
    cs: number;
    id: string;
  }[];
};

export const UserDashboard = ({ heroes }: HeroesProps) => {
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
        <div className="flex">
          <FilterClass title="cosmic" onClick={handleFilter} />
          <FilterClass title="skill" onClick={handleFilter} />
          <FilterClass title="mystic" onClick={handleFilter} />
          <FilterClass title="tech" onClick={handleFilter} />
          <FilterClass title="mutant" onClick={handleFilter} />
          <FilterClass title="science" onClick={handleFilter} />
          <Button className="ml-8" onClick={() => setFilteredHeroes(heroes)}>
            Reset
          </Button>
        </div>
        <form onSubmit={handleSearch}>
          <Input
            className="w-full"
            type="text"
            placeholder="Search hero"
            value={query}
            onChange={handleSearch}
          />
          <button type="submit"></button>
        </form>
      </div>
      <div className="flex justify-center items-center flex-wrap gap-16 mx-20 mb-4">
        {filteredHeroes.map((hero) => (
          <HeroDashboard
            key={hero.id + String(hero.indice)}
            uniqueKey={hero.id + String(hero.indice)}
            id={hero.id}
            name={hero.name}
            image={hero.imageUrl}
            classHero={hero.classhero}
            indice={Number(hero.indice)}
            cs={hero.cs}
            stars={Number(hero.stars)}
          />
        ))}
      </div>
    </>
  );
};
