import React from "react";
import Follower from "./Follower";
import { FollowerUser, ModalType } from "@/common.types";

type FollowerListProps = {
  modalType: ModalType;
  userId: string;
  followers: FollowerUser[];
};

const FollowerList = ({ modalType, userId, followers }: FollowerListProps) => {
  return (
    <div>
      {followers.map((follower) => (
        <Follower
          key={follower.username}
          modalType={modalType}
          userId={userId}
          follower={follower}
        />
      ))}
    </div>
  );
};

export default FollowerList;
