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

  const handleClassClick = (className: string) => {
    if (selectedClass === className) {
      setSelectedClass(null);
    } else {
      setSelectedClass(className);
    }
  };

  const handleStarsClick = (stars: number) => {
    if (selectedStars === stars) {
      setSelectedStars(null);
    } else {
      setSelectedStars(stars);
    }
  };

  const handleRankClick = (rank: string) => {
    if (selectedRank === rank) {
      setSelectedRank(null);
    } else {
      setSelectedRank(rank);
    }
  };

  const starsSix = Array.from({ length: 6 }, (_, index) => (
    <div key={index}>
      <Image
        src="/assets/stars/starsnodup.png"
        alt="Stars No Dup"
        width={24}
        height={24}
      />
    </div>
  ));

  const starsSeven = Array.from({ length: 7 }, (_, index) => (
    <div key={index}>
      <Image
        src="/assets/stars/starsnodup.png"
        alt="Stars No Dup"
        width={24}
        height={24}
      />
    </div>
  ));

  const resetFilters = () => {
    setSelectedClass(null);
    setSelectedStars(null);
    setSelectedRank(null);
    setSearchQuery("");
  };

  const filteredHeroes = heroes
    .filter((hero) => {
      if (selectedClass !== null) {
        return hero.classhero === selectedClass;
      }
      return true;
    })
    .filter((hero) => {
      if (selectedStars !== null) {
        return hero.stars === selectedStars.toString();
      }
      return true;
    })
    .filter((hero) => {
      if (selectedRank !== null) {
        return hero.rank === selectedRank.toString();
      }
      return true;
    })
    .filter((hero) => {
      // Filtre par recherche
      if (searchQuery !== "") {
        return hero.name.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return true;
    });

  return (
    <div>
      <div className="flex justify-between items-center m-6">
        <div>
          <FilterClassWrapper
            title="Cosmic"
            onClick={(e) => handleClassClick(e.target.value)}
            isSelected={selectedClass === "Cosmic"}
          />
          <FilterClassWrapper
            title="Skill"
            onClick={(e) => handleClassClick(e.target.value)}
            isSelected={selectedClass === "Skill"}
          />
          <FilterClassWrapper
            title="Mystic"
            onClick={(e) => handleClassClick(e.target.value)}
            isSelected={selectedClass === "Mystic"}
          />
          <FilterClassWrapper
            title="Tech"
            onClick={(e) => handleClassClick(e.target.value)}
            isSelected={selectedClass === "Tech"}
          />
          <FilterClassWrapper
            title="Mutant"
            onClick={(e) => handleClassClick(e.target.value)}
            isSelected={selectedClass === "Mutant"}
          />

          <FilterClassWrapper
            title="Science"
            onClick={(e) => handleClassClick(e.target.value)}
            isSelected={selectedClass === "Science"}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Button variant="outline" onClick={() => handleStarsClick(6)}>
            <div className="flex items-center">{starsSix}</div>
          </Button>
          <Button variant="outline" onClick={() => handleStarsClick(7)}>
            <div className="flex items-center">{starsSeven}</div>
          </Button>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleRankClick("1")}>
            <div>1</div>
          </Button>
          <Button variant="outline" onClick={() => handleRankClick("2")}>
            <div>2</div>
          </Button>
          <Button variant="outline" onClick={() => handleRankClick("3")}>
            <div>3</div>
          </Button>
          <Button variant="outline" onClick={() => handleRankClick("4")}>
            <div>4</div>
          </Button>
          <Button variant="outline" onClick={() => handleRankClick("5")}>
            <div>5</div>
          </Button>
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
    </div>
  );
};
