"use client";

import { UserProfile } from "@/common.types";
import { motion } from "framer-motion";
import ProfileInfo from "./ProfileInfo";
import Image from "next/image";
import { fade } from "@/lib/motion";
import Connections from "./Connections";
import FollowButton from "./FollowButton";
import Link from "next/link";

type ProfileHeaderProps = {
  userProfile: UserProfile;
  loggedInUserId: string | null;
};

const ProfileHeader = ({ userProfile, loggedInUserId }: ProfileHeaderProps) => {
  return (
    <div className="w-full sm:max-w-[800px] xl:max-w-[1200px] flex justify-center md:justify-between items-center ">
      <div>
        <ProfileInfo
          userProfile={userProfile}
          canEdit={userProfile._id === loggedInUserId}
        />
        {loggedInUserId ? (
          <>
            {userProfile._id === loggedInUserId ? (
              <Connections userId={loggedInUserId} />
            ) : (
              <FollowButton
                userId={loggedInUserId}
                followingId={userProfile._id}
              />
            )}
          </>
        ) : (
          <Link
            className="rounded-button bg-primary mt-4 flex w-full justify-center"
            href="/signin"
          >
            Follow
          </Link>
        )}
      </div>

      <motion.div className="mt-10 hidden xl:flex gap-10" {...fade}>
        <Image
          src="/images/ai.png"
          width={200}
          height={200}
          alt="AI Image"
          priority={true}
        />
        <Image
          src="/images/prompt.png"
          width={190}
          height={190}
          alt="Prompt Image"
        />
      </motion.div>
    </div>
  );
};

export default ProfileHeader;
