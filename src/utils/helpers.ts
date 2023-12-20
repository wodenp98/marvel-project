// heroUtils.ts
export const getHeroImage = (classHero: string): string => {
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
};

export const getHeroBackground = (classHero: string): string => {
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
};
