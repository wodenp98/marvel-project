/* eslint-disable react/no-unescaped-entities */
import FilterClass from "@/components/FilterClass/FilterClass";
import HeroItem from "@/components/HeroItem/HeroItem";
import { prisma } from "@/utils/prisma/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { HeroContainer } from "@/components/HeroItem/HeroContainer";
import { NoUserDashboard } from "@/components/HeroItem/NoUserDashboard";
import { UserDashboard } from "@/components/HeroItem/UserDashboard";

async function getHeroes() {
  const data = await prisma.heroes.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return data;
}

async function getUserDatabase(userId: string) {
  const data = await prisma.userDatabase.findFirst({
    where: {
      userId: userId,
    },
    include: {
      userDashboard: true,
    },
  });

  return data?.userDashboard || [];
}

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const heroes = await getHeroes();

  if (!session) {
    return null;
  }

  if (!heroes) {
    return <div>no data</div>;
  }

  const userDatabase = await getUserDatabase(session.user.id);

  if (userDatabase.length !== 0) {
    return (
      <main className="h-screen">
        <UserDashboard heroes={userDatabase} />
      </main>
    );
  }

  return (
    <main>
      <NoUserDashboard heroes={heroes} />
    </main>
  );
}

// import { useState } from 'react';
// import { Input } from 'your-component-library';

// export default function Dashboard({ heroes }) {
//   const [query, setQuery] = useState('');
//   const [filteredHeroes, setFilteredHeroes] = useState(heroes);

//   const handleSearch = (event) => {
//     const searchQuery = event.target.value.toLowerCase();
//     const filtered = heroes.filter((hero) =>
//       hero.name.toLowerCase().includes(searchQuery)
//     );
//     setQuery(searchQuery);
//     setFilteredHeroes(filtered);
//   };

//   const handleFilter = (event) => {
//     const classQuery = event.target.value.toLowerCase();
//     const filtered = heroes.filter((hero) =>
//       hero.classhero.toLowerCase().includes(classQuery)
//     );
//     setFilteredHeroes(filtered);
//   };

//   return (
//     <main>
//       <div className="flex justify-between m-8">
//         <div>
//           <FilterClass title="cosmic" onClick={handleFilter} />
//           <FilterClass title="skill" onClick={handleFilter} />
//           <FilterClass title="mystic" onClick={handleFilter} />
//           <FilterClass title="tech" onClick={handleFilter} />
//           <FilterClass title="mutant" onClick={handleFilter} />
//           <FilterClass title="science" onClick={handleFilter} />
//         </div>
//         <form onSubmit={handleSubmit}>
//           <Input
//             className="w-1/3"
//             type="text"
//             placeholder="Search hero"
//             value={query}
//             onChange={handleSearch}
//           />
//           <button type="submit">Search</button>
//         </form>
//       </div>

//       <section>
//         <Link href="/table">
//           <Button>Voir table</Button>
//         </Link>

//         <h1>Créer votre dashboard</h1>
//         <span>
//           Consignes: cliquez sur un héros pour l'ajouter et remplir les infos
//           nécessaire, une fois que vous avez fini cliquer sur le bouton j'ai
//           terminé pour accéder à votre dashboard
//         </span>
//         <div className="flex justify-center items-center flex-wrap gap-6 mb-4">
//           {filteredHeroes.map((hero) => (
//             <HeroItem
//               key={hero.id}
//               id={hero.id}
//               name={hero.name}
//               image={hero.imageUrl}
//               classHero={hero.classhero}
//               stars={hero.stars}
//             />
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// }
