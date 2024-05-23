"use client";

import { useEffect, useState } from "react";

type ProfileActionsProps = {
  userId: string;
  followingId: string;
};

const ProfileActions = ({ userId, followingId }: ProfileActionsProps) => {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/user/follow/${userId}/${followingId}`);
      const responseJson = await response.json();
      if (responseJson) {
        setIsFollowing(responseJson.isFollowingUser);
      }
    };

    fetchData().catch((error) => console.log(error));
  }, []);

  const handleOnClick = async () => {
    setIsFollowing((prevIsFollowing) => !prevIsFollowing);

    try {
      if (isFollowing) {
        const response = await fetch(`/api/user/unfollow/${userId}`, {
          method: "PATCH",
          body: JSON.stringify({ followingId }),
        });
      } else {
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
      className="rounded-button bg-primary mt-4"
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default ProfileActions;
