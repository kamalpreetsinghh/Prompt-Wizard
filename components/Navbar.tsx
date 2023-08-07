import Image from "next/image";
import Link from "next/link";
import ToggleSwitch from "./ToggleSwitch";
import { getCurrentUser } from "@/lib/session";
import SignInAndCreate from "./SignInAndCreate";

const Navbar = async () => {
  const session = await getCurrentUser();

  return (
    <nav className="flex-between w-full py-4 gap-4 px-6 sm:px-24">
      <Link href="/">
        <Image
          src="/assets/icons/logo.svg"
          alt="logo"
          width={150}
          height={40}
        />
      </Link>

      <div className="flex-center gap-4 sm:gap-6">
        <div className="flex-center mx-4">
          <ToggleSwitch />
          <div>
            <Image
              src="/assets/icons/moon.svg"
              width={25}
              height={25}
              alt="Theme"
            />
          </div>
        </div>
        <SignInAndCreate session={session} />
      </div>
    </nav>
  );
};

export default Navbar;
