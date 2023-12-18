import React from "react";
import HeroDashboard from "./HeroDashboard";

type HeroesProps = {
  heroes: {
    name: string;
    imageUrl: string;
    classhero: string;
    stars: string;
    indice: number;
    cs: number;
    id: string;
  }[];
};

export const UserDashboard = ({ heroes }: HeroesProps) => {
  return (
    <div className="flex justify-center items-center flex-wrap gap-4 mx-20 mb-4">
      {heroes.map((hero) => (
        <HeroDashboard
          key={hero.id}
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
  );
};
