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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";

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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div>
          <div className="relative h-20 w-24 transform origin-top-left scale-50 select-none opacity-100">
            <div className="transform origin-top-left translate-x-[-1rem] translate-y-[-0.6rem] scale-x-[0.511719] scale-y-[0.511719]">
              <div className="absolute bg-gradient-to-br from-purple-700 to-black opacity-70 transform origin-bottom-right h-64 w-80 translate-x-[3.875rem] translate-y-[2.75rem]"></div>
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
                className="absolute max-w-none bg-cover w-80 h-72 transform origin-top-left translate-x-12"
              />
            </div>
          </div>
        </div>
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
