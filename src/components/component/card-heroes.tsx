"use client";

import Image from "next/image";
import { useMemo } from "react";

export function CardHeroes({
  image,
  classHero,
  name,
  indice,
}: {
  image: string;
  classHero: string;
  name: string;
  indice: number;
}) {
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
  const heroBackground = useMemo(() => {
    switch (classHero) {
      case "Science":
        return "from-green-700 via-green-700";
      case "Cosmic":
        return "from-teal-700 via-teal-700";
      case "Skill":
        return "from-red-700 via-red-700";
      case "Mutant":
        return "from-yellow-500 via-yellow-500";
      case "Tech":
        return "from-blue-700 via-blue-900";
      case "Mystic":
        return "from-purple-700 via-purple-900";
      default:
        return classHero;
    }
  }, [classHero]);
  return (
    <div
      className={`relative bg-gradient-to-b ${heroBackground} to-black p-4 rounded-lg w-52 max-w-sm mx-auto`}
    >
      <Image
        alt="Silver Surfer"
        className="w-full h-auto mt-2 rounded-t-lg"
        height="200"
        src={image}
        style={{
          aspectRatio: "200/200",
          objectFit: "cover",
        }}
        width="200"
      />
      <div className="absolute top-0 left-0 m-2">
        <HexagonIcon className="h-6 w-6 text-white" />
      </div>
      <div className="absolute top-0 right-0 m-2">
        <div className="bg-white px-1 py-1 rounded-full flex items-center">
          <Image src={heroImage} alt={name} width={30} height={30} />
        </div>
      </div>

      <div className="flex justify-center items-center px-2 mt-6">
        <div className="flex items-center">
          <StarIcon className="h-4 w-4 text-yellow-400" />
          <StarIcon className="h-4 w-4 text-yellow-400" />
          <StarIcon className="h-4 w-4 text-yellow-400" />
          <StarIcon className="h-4 w-4 text-yellow-400" />
          <StarIcon className="h-4 w-4 text-yellow-400" />
        </div>
      </div>
      <div className="text-center mt-2">
        <h3 className="text-white text-lg font-bold">
          {name.replace(/\([^)]*\)/g, "")}
        </h3>
        <p className="text-white ">{indice}</p>
      </div>
    </div>
  );
}

function HexagonIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
  );
}

function ArrowUpIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
}

function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function FeatherIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
      <line x1="16" x2="2" y1="8" y2="22" />
      <line x1="17.5" x2="9" y1="15" y2="15" />
    </svg>
  );
}
