"use client";
// import React, { useState } from "react";
// import HeroDashboard from "./HeroDashboard";
// import FilterClass from "../FilterClass/FilterClass";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";

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
// BOUTON DE TRI A REFAIRE + RESET
// TRI RANK ET STARS
// MODIFICATION DE HEROS
// */

// export const UserDashboard = ({ heroes }: HeroesProps) => {
//   // const [query, setQuery] = useState("");
//   // const [filteredHeroes, setFilteredHeroes] = useState(heroes);
//   // console.log("heroes", heroes);

//   // const handleSearch = (event: any) => {
//   //   const searchQuery = event.target.value.toLowerCase();
//   //   const filtered = heroes.filter((hero) =>
//   //     hero.name.toLowerCase().includes(searchQuery)
//   //   );
//   //   setQuery(searchQuery);
//   //   setFilteredHeroes(filtered);
//   // };

//   // const handleFilter = async (event: any) => {
//   //   const classQuery = event.target.value.toLowerCase();
//   //   const filtered = heroes.filter((hero) =>
//   //     hero.classhero.toLowerCase().includes(classQuery)
//   //   );
//   //   setFilteredHeroes(filtered);
//   };
//   return (
//     <>
//       <div className="flex justify-between m-8">
//         <div className="flex">
//           <FilterClass title="cosmic" onClick={handleFilter} />
//           <FilterClass title="skill" onClick={handleFilter} />
//           <FilterClass title="mystic" onClick={handleFilter} />
//           <FilterClass title="tech" onClick={handleFilter} />
//           <FilterClass title="mutant" onClick={handleFilter} />
//           <FilterClass title="science" onClick={handleFilter} />
//           <Button className="ml-8" onClick={() => setFilteredHeroes(heroes)}>
//             Reset
//           </Button>
//         </div>
//         <form onSubmit={handleSearch}>
//           <Input
//             className="w-full"
//             type="text"
//             placeholder="Search hero"
//             value={query}
//             onChange={handleSearch}
//           />
//           <button type="submit"></button>
//         </form>
//       </div>
//       <div className="flex justify-center items-center flex-wrap gap-16 mx-20 mb-4">
//         {filteredHeroes.map((hero) => (
//           <HeroDashboard
//             key={hero.id}
//             id={hero.id}
//             name={hero.name}
//             image={hero.imageUrl}
//             rank={hero.rank}
//             classHero={hero.classhero}
//             indice={Number(hero.indice)}
//             cs={hero.cs}
//             stars={Number(hero.stars)}
//           />
//         ))}
//       </div>
//     </>
//   );
// };

import React, { useEffect, useState } from "react";
import HeroDashboard from "./HeroDashboard";
import { Button } from "../ui/button";
import FilterClass from "../FilterClass/FilterClass";
import { Toggle } from "@/components/ui/toggle";
import Image from "next/image";

export const UserDashboard = ({ heroes }: HeroesProps) => {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedStars, setSelectedStars] = useState<number | null>(null);

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

  const FilterClassWrapper = ({
    title,
    onClick,
    isSelected,
  }: {
    title: string;
    onClick: (event: any) => void;
    isSelected: boolean;
  }) => {
    const [pressedButton, setPressedButton] = useState(isSelected);

    useEffect(() => {
      setPressedButton(isSelected);
    }, [isSelected]);

    const toggleButton = () => {
      setPressedButton(!pressedButton);
      onClick({ target: { value: title } });
    };

    return (
      <Toggle
        aria-label="Toggle"
        pressed={pressedButton}
        onPressedChange={toggleButton}
      >
        {pressedButton ? (
          <Image
            src={`/assets/${title}-colored.svg`}
            alt={title}
            width={30}
            height={30}
          />
        ) : (
          <Image
            src={`/assets/${title}.svg`}
            alt={title}
            width={30}
            height={30}
          />
        )}
      </Toggle>
    );
  };

  const resetFilters = () => {
    setSelectedClass(null);
    setSelectedStars(null);
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
    });

  return (
    <div>
      <div>
        <FilterClassWrapper
          title="Skill"
          onClick={(e) => handleClassClick(e.target.value)}
          isSelected={selectedClass === "Skill"}
        />
        <FilterClassWrapper
          title="Cosmic"
          onClick={(e) => handleClassClick(e.target.value)}
          isSelected={selectedClass === "Cosmic"}
        />
        <FilterClassWrapper
          title="Tech"
          onClick={(e) => handleClassClick(e.target.value)}
          isSelected={selectedClass === "Tech"}
        />

        {/* Add similar FilterClassWrapper components for other classes */}

        <button onClick={() => handleStarsClick(6)}>Filter by 6 Stars</button>
        <button onClick={() => handleStarsClick(7)}>Filter by 7 Stars</button>
        {/* Add similar buttons for other star values */}

        <button onClick={resetFilters}>Reset Filters</button>
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
