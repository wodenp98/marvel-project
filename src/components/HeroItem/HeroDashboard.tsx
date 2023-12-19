/* eslint-disable react/no-unescaped-entities */
"use client";
import useStore from "@/lib/store/tableHeroes";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { DialogHeader, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { useMemo, useState } from "react";
import { CardHeroes } from "../component/card-heroes";
import { Car } from "lucide-react";

type HeroItemProps = {
  name: string;
  image: string;
  classHero: string;
  stars: number;
  indice: number;
  cs: number;
  id: string;
};

export default function HeroDashboard({
  name,
  image,
  classHero,
  stars,
  indice,
  id,
}: HeroItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const heroImage = useMemo(() => {
    switch (classHero) {
      case "Science":
        return "/assets/science-colored.svg";
      case "Cosmic":
        return "/assets/cosmic-colored.svg";
      case "Skill":
        return "/assets/skill-colored.svg";
      case "Mutant":
        return "/assets/mutant-colored.svg";
      case "Tech":
        return "/assets/tech-colored.svg";
      case "Mystic":
        return "/assets/mystic-colored.svg";
      default:
        return classHero;
    }
  }, [classHero]);

  // const heroBackground = useMemo(() => {
  //   switch (classHero) {
  //     case "Science":
  //       return "from-green-700 via-green-700";
  //     case "Cosmic":
  //       return "from-teal-700 via-teal-700";
  //     case "Skill":
  //       return "from-red-700 via-red-700";
  //     case "Mutant":
  //       return "from-yellow-500 via-yellow-500";
  //     case "Tech":
  //       return "from-blue-700 via-blue-900";
  //     case "Mystic":
  //       return "from-purple-700 via-purple-900";
  //     default:
  //       return classHero;
  //   }
  // }, [classHero]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {/* <div className="relative cursor-pointer">
          <Image
            src={`/assets/border/border-${stars}.png`}
            alt={`Border ${stars}`}
            width={100}
            height={100}
            priority
          />
          <div className="absolute bottom-2 left-2 ">
            <Image src={image} alt={name} width={80} height={80} />
          </div>
          <div className="absolute bottom-0 w-full h-4 bg-black rounded-sm">
            <span>{stars}</span>
            <span>{name}</span>
            <span>{indice}</span>
          </div>
        </div> */}
        <CardHeroes
          image={image}
          classHero={classHero}
          name={name}
          indice={indice}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center space-x-4">
            <p>{name}</p>
            <Image src={heroImage} alt={name} width={30} height={30} />
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-center">
          <Image src={image} alt={name} width={120} height={120} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

{
  /* <div className="relative h-20 w-24 transform origin-top-left scale-50 select-none opacity-100">
            <div className="transform origin-top-left translate-x-[-1rem] translate-y-[-0.6rem] scale-x-[0.511719] scale-y-[0.511719]">
              <div
                className={`absolute bg-gradient-to-b ${heroBackground} to-black bg-opacity-70 transform origin-bottom-right h-64 w-80 translate-x-[3.875rem] translate-y-[2.75rem]`}
              ></div>
              <Image
                src={`/assets/border/border-${stars}.png`}
                alt="Frame"
                width={100}
                height={100}
                className="absolute max-w-none w-96 h-80 transform origin-top-left translate-x-6"
              />
              <Image
                src={image}
                alt="hero"
                width={80}
                height={70}
                className="absolute max-w-none bg-cover w-80 h-64 transform origin-top-left translate-x-12 translate-y-6"
              />
            </div>
          </div> */
}
