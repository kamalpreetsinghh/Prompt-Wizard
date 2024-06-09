import Image from "next/image";
import Link from "next/link";
import ToggleSwitch from "./ToggleSwitch";
import { getCurrentUser } from "@/lib/session";
import SignInAndCreate from "./SignInAndCreate";

const Navbar = async () => {
  const session = await getCurrentUser();

  return (
    <nav className="flex-between w-full py-4 gap-4 px-6 sm:px-24">
      <Link href="/prompts">
        <Image
          src="/icons/logo.svg"
          alt="logo"
          priority={true}
          width={150}
          height={40}
        />
      </Link>

      <div className="flex-center gap-4 sm:gap-6">
        <ToggleSwitch />
        <SignInAndCreate session={session} />
      </div>
    </nav>
  );
};

export default Navbar;
