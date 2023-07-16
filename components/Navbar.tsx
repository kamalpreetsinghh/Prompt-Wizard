import Image from "next/image";
import Link from "next/link";
import AuthProviders from "./AuthProviders";
import ProfileMenu from "./ProfileMenu";
import { getCurrentUser } from "@/lib/session";
import ToggleSwitch from "./ToggleSwitch";

const Navbar = async () => {
  const session = await getCurrentUser();

  return (
    <nav className="flex-between w-full py-4 gap-4">
      <Link href="/">
        <Image
          src="/assets/icons/logo.svg"
          alt="logo"
          width={150}
          height={40}
        />
      </Link>

      <div className="flex-center gap-6">
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
          <div className="flex gap-4 md:gap-6">
            <ProfileMenu session={session} />
            <Link href="/create-prompt">
              <span className="rounded-navbar-button hidden sm:flex">
                Create Post
              </span>
              <span className="rounded-icon px-3 py-1 sm:hidden">+</span>
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
