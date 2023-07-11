"use client";

import React from "react";

type ProfileActionsProps = {
  userId: string;
  followingId: string;
  isFollowing: boolean;
};

const ProfileActions = ({
  userId,
  followingId,
  isFollowing,
}: ProfileActionsProps) => {
  const buttonText = isFollowing ? "Following" : "Follow";
  const handleFollow = async () => {
    try {
      const res = await fetch(`/api/user/follow/${userId}`, {
        method: "PATCH",
        body: JSON.stringify({ followingId: followingId }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleFollow}
      className="primary-button mt-4"
    >
      {buttonText}
    </button>
  );
};

export default ProfileActions;
