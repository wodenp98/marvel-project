import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Image from "next/image";

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

interface Props {
  params: {
    id: string;
  };
}

export default function Page({ params: { id } }: Props) {
  const filteredImage = images.find((image) => String(image.id) === id);
  console.dir(filteredImage);
  return (
    <section className="w-11/12 mt-6 mx-auto">
      <div className="flex flex-col lg:flex-row md:items-center">
        <div className="lg:w-1/2  flex md:justify-center">
          <Image
            key={filteredImage?.name}
            src={filteredImage?.imageUrl!}
            alt={filteredImage?.name!}
            width={800}
            height={800}
            className={cn(
              "object-contain h-full w-full md:max-h-[90vh]",
              filteredImage?.aspectRatio === "portrait"
                ? "aspect-[3/4]"
                : "aspect-[16/9]"
            )}
          />
        </div>

        <div className="lg:w-1/2 mt-3 lg:ml-6 h-full">
          <Skeleton
            className="text-3xl bg-zinc-500"
            style={{ height: "30px", width: "200px" }}
          />
          <Skeleton className="text-sm bg-zinc-500 mt-6 text-gray-500" />
          <Skeleton
            className="mt-6 bg-zinc-500"
            style={{ width: "200px", height: "40px" }}
          />
          <Skeleton
            className="object-cover mt-6 bg-zinc-500 h-full w-full"
            style={{ width: "300px", height: "200px" }}
          />
        </div>
      </div>

      <div className="flex items-center justify-center mt-6">
        <Skeleton
          className="object-cover mt-6 bg-zinc-500 h-full w-full"
          style={{ width: "300px", height: "200px" }}
        />
      </div>
    </section>
  );
}
