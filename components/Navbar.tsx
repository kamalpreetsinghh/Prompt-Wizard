import Image from "next/image";
import Link from "next/link";
import AuthProviders from "./AuthProviders";
import ProfileMenu from "./ProfileMenu";
import { getCurrentUser } from "@/lib/session";
import ToggleSwitch from "./ToggleSwitch";

const Navbar = async () => {
  const session = await getCurrentUser();

  return (
    <nav className="flex-between w-full py-5 gap-4">
      <Link href="/">
        <Image
          src="/assets/icons/logo.svg"
          alt="logo"
          width={150}
          height={40}
        />
      </Link>

      <div className="flex-center gap:2 sm:gap-4">
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
        {session?.user ? (
          <div className="flex gap-2 md:gap-6">
            <ProfileMenu session={session} />
            <Link href="/create-prompt" className="primary-button">
              Create Post
            </Link>
          </div>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
