import Image from "next/image";
import Link from "next/link";
import AuthProviders from "./AuthProviders";
import ProfileMenu from "./ProfileMenu";
import { getCurrentUser } from "@/lib/session";
import ToggleSwitch from "./ToggleSwitch";

const Navbar = async () => {
  const session = await getCurrentUser();

  return (
    <nav className="flex-between navbar">
      <div className="flex gap-2 flex-center">
        <Link href="/">
          <Image
            src="/assets/icons/logo.svg"
            alt="logo"
            width={150}
            height={40}
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="flex-center gap-4">
        <div className="flex-center mx-4">
          <ToggleSwitch />
          <div>
            <Image
              src="/assets/icons/dark-theme.svg"
              width={25}
              height={25}
              alt="Theme"
            />
          </div>
        </div>
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <ProfileMenu session={session} />
            <Link href="/create-prompt" className="primary-button">
              Create Post
            </Link>
          </div>
        ) : (
          <AuthProviders />
        )}
      </div>

      {/* Mobile Navigation */}
      {/* <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user?.image ?? "/assets/images/logo.png"}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <AuthProviders />
        )}
      </div> */}
    </nav>
  );
};

export default Navbar;
