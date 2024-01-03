"use client";

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

// /* TODO
// MODIFICATION DE HEROS
// */
import React, { useState } from "react";
import HeroDashboard from "./HeroDashboard";
import { Button } from "../ui/button";
import { FilterClassWrapper } from "../FilterClass/FilterClass";
import Image from "next/image";
import { Input } from "../ui/input";

export const UserDashboard = ({ heroes }: HeroesProps) => {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedStars, setSelectedStars] = useState<number | null>(null);
  const [selectedRank, setSelectedRank] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleFilterClick = (
    filterValue: string | number,
    filterType: string
  ) => {
    if (filterType === "class") {
      setSelectedClass((prevClass) =>
        prevClass === filterValue ? null : (filterValue as string | null)
      );
    } else if (filterType === "stars") {
      setSelectedStars((prevStars) =>
        prevStars === filterValue ? null : (filterValue as number | null)
      );
    } else if (filterType === "rank") {
      setSelectedRank((prevRank) =>
        prevRank === filterValue ? null : (filterValue as string | null)
      );
    }
  };

  const resetFilters = () => {
    setSelectedClass(null);
    setSelectedStars(null);
    setSelectedRank(null);
    setSearchQuery("");
  };

  const filteredHeroes = heroes.filter((hero) => {
    const isClassFiltered =
      selectedClass !== null ? hero.classhero === selectedClass : true;
    const isStarsFiltered =
      selectedStars !== null ? hero.stars === selectedStars.toString() : true;
    const isRankFiltered =
      selectedRank !== null ? hero.rank === selectedRank.toString() : true;
    const isSearchFiltered =
      searchQuery !== ""
        ? hero.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

    return (
      isClassFiltered && isStarsFiltered && isRankFiltered && isSearchFiltered
    );
  });

  return (
    <div>
      <div className="flex justify-between items-center m-6">
        <div>
          {["Cosmic", "Skill", "Mystic", "Tech", "Mutant", "Science"].map(
            (className) => (
              <FilterClassWrapper
                key={className}
                title={className}
                onClick={(e) => handleFilterClick(className, "class")}
                isSelected={selectedClass === className}
              />
            )
          )}
        </div>

        <div className="flex flex-col gap-2">
          {[6, 7].map((stars) => (
            <Button
              variant="outline"
              key={stars}
              onClick={() => handleFilterClick(stars, "stars")}
            >
              <div className="flex items-center">
                {Array.from({ length: stars }, (_, index) => (
                  <Image
                    key={index}
                    src="/assets/stars/starsnodup.png"
                    alt="Stars No Dup"
                    width={24}
                    height={24}
                  />
                ))}
              </div>
            </Button>
          ))}
        </div>

        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((rank) => (
            <Button
              variant="outline"
              key={rank}
              onClick={() => handleFilterClick(rank, "rank")}
            >
              <div>{rank}</div>
            </Button>
          ))}
        </div>

        <Button onClick={resetFilters}>Reset Filters</Button>
        <Input
          type="text"
          placeholder="Rechercher un héros..."
          value={searchQuery}
          className="w-48"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex justify-center items-center flex-wrap gap-16 mx-20 mb-4">
        {filteredHeroes.map((hero) => (
          <HeroDashboard
            key={hero.id}
            id={hero.id}
            name={hero.name}
            image={hero.imageUrl}
            rank={hero.rank}
            classHero={hero.classhero}
            indice={Number(hero.indice)}
            cs={hero.cs}
            stars={Number(hero.stars)}
          />
        ))}
      </div>

      <div className="flex justify-center m-8">
        <Button>Add new heroes</Button>
      </div>
    </div>
  );
};
