"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeAnimation } from "@/lib/motion";
type FollowButtonProps = {
  userId: string;
  followingId: string;
};

const FollowButton = ({ userId, followingId }: FollowButtonProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const followUser = async () => {
    await fetch(`/api/user/follow/${userId}`, {
      method: "PATCH",
      body: JSON.stringify({ followingId }),
    });
  };

  const unFollowUser = async () => {
    await fetch(`/api/user/unfollow/${userId}`, {
      method: "PATCH",
      body: JSON.stringify({ followingId }),
    });
  };

  const handleOnClick = async () => {
    try {
      setIsSubmitting(true);
      if (isFollowing) {
        await unFollowUser();
      } else {
        await followUser();
      }
      setIsFollowing((prevIsFollowing) => !prevIsFollowing);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleOnClick}
      className="rounded-button bg-primary mt-4 w-full"
      {...fadeAnimation}
    >
      {isSubmitting ? (
        <div className="h-6 flex items-center justify-center">
          <span className="loader bottom-3"></span>
        </div>
      ) : (
        <>{isFollowing ? "Following" : "Follow"}</>
      )}
    </motion.button>
  );
};

export default FollowButton;
