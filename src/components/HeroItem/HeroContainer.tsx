import React from "react";
import HeroItem from "./HeroItem";

type HeroesProps = {
  heroes: {
    name: string;
    imageUrl: string;
    classhero: string;
    stars: number;
    id: string;
  }[];
};

export const HeroContainer = ({ heroes }: HeroesProps) => {
  // console.log("heroes", heroes);
  return (
    <>
      {heroes.map((hero) => (
        <HeroItem
          key={hero.id}
          id={hero.id}
          name={hero.name}
          image={hero.imageUrl}
          classHero={hero.classhero}
          stars={hero.stars}
        />
      ))}
    </>
  );
};
