"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import {
  Fragment,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { Menu, Transition } from "@headlessui/react";
import { User } from "@/common.types";
import UserNameIcon from "../UserNameIcon";

const ProfileMenu = ({ user }: { user: User }) => {
  const [openModal, setOpenModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpenModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleModal: MouseEventHandler<HTMLButtonElement> = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className="flex-center z-20 flex-col relative" ref={menuRef}>
      <Menu as="div">
        <Menu.Button className="flex-center" onClick={toggleModal}>
          {user.image ? (
            <div className="w-10 h-10 relative">
              <Image
                src={user.image}
                className="rounded-full"
                fill
                style={{ objectFit: "cover" }}
                alt="user profile image"
              />
            </div>
          ) : (
            <UserNameIcon name={user.name[0]} className="w-10 h-10 text-2xl" />
          )}
        </Menu.Button>

        <Transition
          show={openModal}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items static className="flex-start profile-menu-items">
            <div className="flex flex-col items-center gap-y-4">
              {user.image ? (
                <div className="w-20 h-20 relative">
                  <Image
                    src={user.image}
                    className="rounded-full"
                    fill
                    style={{ objectFit: "cover" }}
                    alt="profile Image"
                  />
                </div>
              ) : (
                <UserNameIcon
                  name={user.name[0]}
                  className="w-20 h-20 text-6xl"
                />
              )}
              <p className="font-semibold">{user.name}</p>
            </div>

            <div className="flex flex-col gap-3 pt-10 items-start w-full">
              <Menu.Item>
                <Link
                  href={`/prompts`}
                  className="text-sm"
                  onClick={() => setOpenModal(false)}
                >
                  Prompts
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link
                  href={`/profile/${user.id}`}
                  className="text-sm"
                  onClick={() => setOpenModal(false)}
                >
                  Profile
                </Link>
              </Menu.Item>
            </div>
            <div className="w-full flex-start border-t border-nav-border mt-5 pt-5">
              <Menu.Item>
                <button
                  type="button"
                  className="text-sm"
                  onClick={() => signOut()}
                >
                  Sign out
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default ProfileMenu;
