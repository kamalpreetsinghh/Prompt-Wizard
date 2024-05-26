"use client";

import { FollowerUser, ModalType } from "@/common.types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import UserNameIcon from "../UserNameIcon";

type FollowerProps = {
  modalType: ModalType;
  userId: string;
  follower: FollowerUser;
};

const Follower = ({
  modalType,
  userId,
  follower: { _id, username, name, image },
}: FollowerProps) => {
  const [isFollowing, setIsFollowing] = useState(true);

  const handleOnClick = async () => {
    try {
      setIsFollowing((prevIsFollowing) => !prevIsFollowing);
      if (modalType === ModalType.Following) {
        if (isFollowing) {
          await fetch(`/api/user/unfollow/${userId}`, {
            method: "PATCH",
            body: JSON.stringify({ followingId: _id }),
          });
        } else {
          await fetch(`/api/user/follow/${userId}`, {
            method: "PATCH",
            body: JSON.stringify({ followingId: _id }),
          });
        }
      } else {
        if (isFollowing) {
          await fetch(`/api/user/unfollow/${_id}`, {
            method: "PATCH",
            body: JSON.stringify({ followingId: userId }),
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full my-4 flex justify-between items-center">
      <Link href={`/profile/${_id}`} className="flex gap-3 cursor-pointer">
        {image ? (
          <div className="w-12 h-12 relative">
            <Image
              src={image}
              fill={true}
              style={{ objectFit: "cover" }}
              alt="Profile Picture"
              className="rounded-full object-contain"
            />
          </div>
        ) : (
          <UserNameIcon
            name={username[0].toUpperCase()}
            className="w-12 h-12 text-2xl"
          />
        )}

        <div>
          <p className="font-bold">{username}</p>
          <p className="text-grey-color">{name}</p>
        </div>
      </Link>

      <button
        className="rounded-button bg-primary"
        disabled={modalType === ModalType.Followers && !isFollowing}
        onClick={handleOnClick}
      >
        {modalType === ModalType.Following
          ? isFollowing
            ? "Following"
            : "Follow"
          : isFollowing
          ? "Remove"
          : "Removed"}
      </button>
    </div>
  );
};

export default Follower;
