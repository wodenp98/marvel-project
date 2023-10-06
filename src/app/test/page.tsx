import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const images = [
  {
    id: 1,
    name: "image1",
    imageUrl: "https://i.imgur.com/2Xhrc8D.jpg",
    aspectRatio: "paysage",
  },
  {
    id: 2,
    name: "image2",
    imageUrl: "https://i.imgur.com/xTVLVwb.jpg",
    aspectRatio: "portrait",
  },
];

export default function Page() {
  return (
    // <div className="overflow-hidden rounded-md">
    //   {images.map((image) => (
    //     <Image
    //       key={image.name}
    //       src={image.imageUrl}
    //       alt={image.name}
    //       width={300}
    //       height={300}
    //       className={cn(
    //         "h-auto w-auto object-cover transition-all hover:scale-105",
    //         image.aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-[16/9]"
    //       )}
    //     />
    //   ))}
    // </div>
    <div>
      {images.map((image) => (
        <Link href={`/test/${image.id}`} key={image.id}>
          <Image
            src={image.imageUrl}
            alt={image.name}
            width={300}
            height={300}
          />
        </Link>
      ))}
    </div>
  );
}
