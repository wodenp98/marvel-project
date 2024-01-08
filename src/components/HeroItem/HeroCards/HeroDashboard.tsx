/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import { DialogHeader } from "../../ui/dialog";
import { useMemo, useState } from "react";
import { getHeroImage, getHeroBackground } from "@/utils/helpers";
import useStore from "@/lib/store/tableHeroes";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
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
import { ScrollArea } from "../../ui/scroll-area";
import { prisma } from "../../../../prisma/clients";
import { useSession } from "next-auth/react";

type HeroItemProps = {
  name: string;
  image: string;
  classHero: string;
  stars: number;
  indiceHero: number;
  csHero: number;
  id: string;
  rankHero: string;
};

const heroSchema = z.object({
  indice: z.coerce
    .number()
    .min(0, { message: "Indice must be at least 0." })
    .max(60000, {
      message: "Indice must not be greater than 60000.",
    }),
  rank: z.string({ required_error: "Field is required" }),
  cs: z.coerce.number().min(0, { message: "CS must be at least 0." }).max(200, {
    message: "CS must not be greater than 200.",
  }),
  id: z.string(),
});

type ProfileFormValues = z.infer<typeof heroSchema>;

export default function HeroDashboard({
  name,
  image,
  classHero,
  stars,
  indiceHero,
  rankHero,
  csHero,
  id,
}: HeroItemProps) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const getHero = useStore((state) => state.items);
  const { toast } = useToast();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(heroSchema),
    defaultValues: {
      indice: 0 || indiceHero,
      cs: 0 || csHero,
      rank: "" || rankHero,
      id: id,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: ProfileFormValues) => {
    if (!session) {
      return;
    }

    const res = await fetch("/api/updateHeroes", {
      method: "POST",
      body: JSON.stringify({
        heros: { cs: data.cs, indice: data.indice, rank: data.rank, id: id },
        userId: session.user.id,
      }),
    });

    if (res.ok) {
      toast({
        title: "Hero updated",
        description: "Hero updated successfully",
      });
    }
  };

  const heroImage = useMemo(() => getHeroImage(classHero), [classHero]);

  const heroBackground = useMemo(
    () => getHeroBackground(classHero),
    [classHero]
  );

  const starsDisplay = Array.from({ length: stars }, (_, index) => (
    <div key={index}>
      {csHero === 0 ? (
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
            <p className="text-white font-bold">{csHero}</p>
          </div>
          <div className="absolute top-0 right-0 m-2">
            <div className="bg-white px-1 py-1 rounded-full flex items-center">
              <p className="text-black text-xl font-bold">R{rankHero}</p>
            </div>
          </div>

          <div className="flex justify-center items-center px-2 mt-6">
            <div className="flex items-center">{starsDisplay}</div>
          </div>
          <div className="text-center mt-2">
            <h3 className="text-white text-lg font-bold">
              {name.replace(/\([^)]*\)/g, "")}
            </h3>
            <p className="text-white font-bold">{indiceHero}</p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-[70vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center space-x-4">
            <p>{name}</p>
            <Image src={heroImage} alt={name} width={30} height={30} />
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-center">
          <Image
            src={image}
            alt={name}
            width={140}
            height={140}
            className="object-cover"
          />
        </div>

        {/* form avec toutes les données, plus les données non modifiable comme nom et classes si le hero est max 5 peut pas sélectionner 6 */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="indice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Indice</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={String(indiceHero)}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                        <SelectValue placeholder={rankHero} />
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
                      type="number"
                      placeholder={String(csHero)}
                      {...field}
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
