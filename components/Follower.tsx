import { FollowerUser } from "@/common.types";
import Image from "next/image";
import React from "react";

const Follower = ({ id, username, name, image }: FollowerUser) => {
  return (
    <div className="w-full my-4 flex gap-2">
      <Image
        src={image}
        width={50}
        height={50}
        alt="Profile Picture"
        className="rounded-full object-contain"
      />
      <div className="flex justify-between">
        <div>
          <p className="font-bold">{username}</p>
          <p className="text-grey-color">{name}</p>
        </div>
        <button className="primary-button">Following</button>
      </div>
    </div>
  );
};

export default Follower;
