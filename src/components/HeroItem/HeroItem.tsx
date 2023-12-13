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

type HeroItemProps = {
  name: string;
  image: string;
  classHero: string;
  stars: number;
  id: string;
};

const heroSchema = z.object({
  classhero: z.string().nonempty("Field is required").min(2, {
    message: "Classhero must be at least 2 characters.",
  }),
  name: z.string().nonempty("Field is required").min(2, {
    message: "Name must be at least 2 characters.",
  }),
  imageUrl: z.string().nonempty("Field is required").url({
    message: "Please enter a valid URL for the image.",
  }),
  indice: z
    .number()
    .int()
    .min(1000, {
      message: "Indice must be at least 1000.",
    })
    .max(60000, {
      message: "Indice must not be greater than 60000.",
    }),
  stars: z.enum(["5", "6", "7"]).refine(
    (value) => {
      if (!["5", "6", "7"].includes(value)) {
        throw new Error("Invalid value for stars.");
      }
      return true;
    },
    {
      message: "Stars must be one of '5', '6', or '7'.",
    }
  ),
  rank: z.enum(["1", "2", "3", "4", "5"]).refine(
    (value) => {
      if (!["1", "2", "3", "4", "5"].includes(value)) {
        throw new Error("Invalid value for rank.");
      }
      return true;
    },
    {
      message: "Rank must be one of '1', '2', '3', '4', or '5'.",
    }
  ),
  cs: z
    .number()
    .int()
    .min(0, {
      message: "CS must be at least 0.",
    })
    .max(200, {
      message: "CS must not be greater than 200.",
    }),
  id: z.string(),
});

type ProfileFormValues = z.infer<typeof heroSchema>;

export default function HeroItem({
  name,
  image,
  classHero,
  stars,
  id,
}: HeroItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const getHero = useStore((state) => state.items);
  const addHero = useStore((state) => state.addItem);
  const { toast } = useToast();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(heroSchema),
    defaultValues: {
      indice: 0,
      name: name,
      imageUrl: image,
      classhero: classHero,
      id: id,
      cs: 0,
    },
    mode: "onChange",
  });

  const onSubmit = (data: ProfileFormValues) => {
    console.log("data", data);
    if (
      getHero.some(
        (hero) => hero.name === data.name && hero.stars === data.stars
      )
    ) {
      toast({
        title: "Hero already added",
        description: "Hero already added to your dashboard",
      });
    } else {
      addHero(data);
      toast({
        title: "Hero added",
        description: "Hero added to your dashboard",
      });

      setIsOpen(false);
    }
  };

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
        <div className="relative cursor-pointer">
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
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-[70vh] overflow-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-100">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center">
            <p>{name}</p>
            <Image src={heroImage} alt={name} width={30} height={30} />
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-center">
          <Image src={image} alt={name} width={120} height={120} />
        </div>

        {/* form avec toutes les données, plus les données non modifiable comme nom et classes si le hero est max 5 peut pas sélectionner 6 */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="indice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Indice</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Nombre entre 1000 et 60000"
                      {...field}
                      onChange={(e) => {
                        field.onChange(Number(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {stars === 7 ? (
              <FormField
                control={form.control}
                name="stars"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Etoiles</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="-- Choisissez une option --" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="6">6</SelectItem>
                        <SelectItem value="7">7</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name="stars"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Etoiles</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="-- Choisissez une option --" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="6">6</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="rank"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rank</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="-- Choisissez un rank --" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>C.Spéciale</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Nombre entre 0 et 200"
                      {...field}
                      onChange={(e) => {
                        field.onChange(Number(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Enregistrer</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
