import Logged from "@/app/auth/Logged";

import { AvatarComponent } from "./AvatarComponent";
import { ToggleDarkMode } from "./ModeToggle";

import { Session, getServerSession } from "next-auth";

export default async function Navbar() {
  const session = await getServerSession();
  return (
    <div className="flex justify-between m-4">
      <AvatarComponent />

      <div className="flex items-center space-x-4">
        <ToggleDarkMode />
        {session?.user && <Logged image={session.user.image || ""} />}
      </div>
    </div>
  );
}
