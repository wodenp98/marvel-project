/* eslint-disable react/no-unescaped-entities */
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Button } from "../ui/button";
import { DialogHeader, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
type HeroItemProps = {
  name: string;
  image: string;
  classHero: string;
  stars: number;
};

export default function HeroItem({
  name,
  image,
  classHero,
  stars,
}: HeroItemProps) {
  // if (stars === 5) {
  //   return (
  //     <Dialog>
  //       <DialogTrigger asChild>
  //         <div className="relative cursor-pointer">
  //           <Image
  //             src="/assets/border/border-5.png"
  //             alt="Border 5"
  //             width={100}
  //             height={100}
  //             className="relative"
  //           />
  //           <div className="absolute bottom-2 left-2 ">
  //             <Image src={image} alt={name} width={80} height={80} />
  //           </div>
  //         </div>
  //       </DialogTrigger>
  //       <DialogContent className="sm:max-w-[425px]">
  //         <DialogHeader>
  //           <DialogTitle>Edit profile</DialogTitle>
  //           <DialogDescription>
  //             Make changes to your profile here. Click save when you're done.
  //           </DialogDescription>
  //         </DialogHeader>
  //         <div className="grid gap-4 py-4">
  //           <div className="grid grid-cols-4 items-center gap-4">
  //             <Label htmlFor="name" className="text-right">
  //               Name
  //             </Label>
  //             <Input id="name" value="Pedro Duarte" className="col-span-3" />
  //           </div>
  //           <div className="grid grid-cols-4 items-center gap-4">
  //             <Label htmlFor="username" className="text-right">
  //               Username
  //             </Label>
  //             <Input id="username" value="@peduarte" className="col-span-3" />
  //           </div>
  //         </div>
  //         <DialogFooter>
  //           <Button type="submit">Save changes</Button>
  //         </DialogFooter>
  //       </DialogContent>
  //     </Dialog>
  //   );
  // }

  return (
    <div className="relative">
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
  );
}
