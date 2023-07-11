"use client";

import React, { useEffect, useState } from "react";

type ProfileActionsProps = {
  userId: string;
  followingId: string;
};

const ProfileActions = ({ userId, followingId }: ProfileActionsProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = await fetch(`/api/user/follow/${userId}/${followingId}`);
      const responseJson = await response.json();
      if (responseJson) {
        console.log(responseJson);
        setIsFollowing(responseJson.isFollowingUser);
      }
    };

    fetchData().catch((error) => console.log(error));
  }, []);

  const handleOnClick = async () => {
    setIsFollowing((prevIsFollowing) => !prevIsFollowing);

    try {
      if (isFollowing) {
        console.log("Unfollowing");
        const response = await fetch(`/api/user/unfollow/${userId}`, {
          method: "PATCH",
          body: JSON.stringify({ followingId }),
        });
      } else {
        console.log("following");
        const response = await fetch(`/api/user/follow/${userId}`, {
          method: "PATCH",
          body: JSON.stringify({ followingId }),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleOnClick}
      className="primary-button mt-4"
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default ProfileActions;
