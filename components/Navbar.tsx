import Image from "next/image";
import Link from "next/link";
import AuthProviders from "./AuthProviders";

import { getCurrentUser } from "@/lib/session";
import ProfileMenu from "./ProfileMenu";

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
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="primary-button">
              Create Post
            </Link>
            <ProfileMenu session={session} />
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
