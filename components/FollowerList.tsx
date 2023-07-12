import React from "react";
import Follower from "./Follower";
import { FollowerUser } from "@/common.types";

type FollowerListProps = {
  followers: FollowerUser[];
};

const FollowerList = ({ followers }: FollowerListProps) => {
  return (
    <div>
      {followers.map((follower) => (
        <Follower
          key={follower.username}
          id={follower.id}
          username={follower.username}
          name={follower.name}
          image={follower.image}
        />
      ))}
    </div>
  );
};

export default FollowerList;
