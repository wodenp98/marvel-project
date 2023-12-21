/* eslint-disable react/no-unescaped-entities */
"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { DialogHeader } from "../ui/dialog";
import { useMemo, useState } from "react";
import { getHeroImage, getHeroBackground } from "@/utils/helpers";
import { unique } from "next/dist/build/utils";

type HeroItemProps = {
  name: string;
  image: string;
  classHero: string;
  stars: number;
  indice: number;
  cs: number;
  id: string;
  rank: string;
};

export default function HeroDashboard({
  name,
  image,
  classHero,
  stars,
  indice,
  rank,
  cs,
  id,
}: HeroItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const heroBackground = useMemo(
    () => getHeroBackground(classHero),
    [classHero]
  );

  const starsDisplay = Array.from({ length: stars }, (_, index) => (
    <div key={index}>
      {cs === 0 ? (
        <Image
          src="/assets/stars/starsnodup.png"
          alt="Stars No Dup"
          width={24}
          height={24}
        />
      ) : (
        <Image
          src="/assets/stars/starsdup.png"
          alt="Stars Dup"
          width={24}
          height={24}
        />
      )}
    </div>
  ));

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div
          className={`relative flex flex-col items-center bg-gradient-to-b ${heroBackground} to-black p-4 rounded-lg w-52 max-w-sm mx-auto`}
        >
          <Image
            alt={name}
            className="w-3/4 h-auto mt-2 rounded-t-lg"
            height="200"
            src={image}
            style={{
              aspectRatio: "200/200",
              objectFit: "cover",
            }}
            width="200"
          />
          <div className="absolute top-0 left-0 m-2">
            <p className="text-white font-bold">{cs}</p>
          </div>
          <div className="absolute top-0 right-0 m-2">
            <div className="bg-white px-1 py-1 rounded-full flex items-center">
              <p className="text-black text-xl font-bold">R{rank}</p>
            </div>
          </div>

          <div className="flex justify-center items-center px-2 mt-6">
            <div className="flex items-center">{starsDisplay}</div>
          </div>
          <div className="text-center mt-2">
            <h3 className="text-white text-lg font-bold">
              {name.replace(/\([^)]*\)/g, "")}
            </h3>
            <p className="text-white font-bold">{indice}</p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-[90vh]">
        {/* <DialogHeader>
          <DialogTitle className="flex items-center justify-center space-x-4">
            <p>{name}</p>
            <Image src={heroImage} alt={name} width={30} height={30} />
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-center">
          <Image src={image} alt={name} width={120} height={120} />
        </div> */}
      </DialogContent>
    </Dialog>
  );
}
