"use client";

import { HeroContainer } from "@/components/HeroItem/HeroContainer";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";

const fetchPosts = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
};

export default function Page() {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;
  const router = useRouter();

  const encodedSearchQuery = encodeURI(searchQuery || "");

  const { data, isLoading } = useSWR(
    `/api/search?q=${encodedSearchQuery}`,
    fetchPosts,
    { revalidateOnFocus: false }
  );

  console.log("data", data);

  if (!encodedSearchQuery) {
    router.push("/");
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <span className="text-xl">
        Showing results for:{" "}
        <span className="font-semibold">{searchQuery}</span>
      </span>
      {/* <Posts posts={data.posts} /> */}
      <HeroContainer heroes={data} />
    </>
  );
}
