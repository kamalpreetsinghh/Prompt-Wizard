"use client";

import UploadImage from "./UploadImage";
import { UserProfile } from "@/common.types";
import ProfileActions from "./ProfileActions";
import Link from "next/link";
import { motion } from "framer-motion";
import { fade, fadeRight } from "@/lib/motion";
import Image from "next/image";

type ProfileInfoProps = {
  userProfile: UserProfile;
  isLoggedInUser: boolean;
  loggedInUserId: string;
  showFollowersModal: () => void;
  showFollowingModal: () => void;
};

const ProfileInfo = ({
  userProfile,
  isLoggedInUser,
  loggedInUserId,
  showFollowersModal,
  showFollowingModal,
}: ProfileInfoProps) => {
  return (
    <div className="w-full sm:max-w-[800px] xl:max-w-[1200px] flex-between">
      <motion.div className="flex flex-col mt-10 max-w-[600px]" {...fadeRight}>
        <UploadImage
          userImage={userProfile?.image || null}
          canEdit={isLoggedInUser}
          name={userProfile?.name[0]}
          userId={userProfile?._id}
        />
        <p className="text-2xl text-grey-color mt-8">{userProfile.username}</p>
        <p className="text-4xl font-bold mt-4">{userProfile.name}</p>
        <p className="description">{userProfile.bio}</p>
        {isLoggedInUser ? (
          <div className="flex gap-2">
            <Link
              href={`/update-profile/${userProfile._id}`}
              className="rounded-button bg-primary mt-4"
            >
              Edit Profile
            </Link>
            <button
              onClick={showFollowersModal}
              className="rounded-button bg-primary mt-4"
            >
              Followers
            </button>
            <button
              onClick={showFollowingModal}
              className="rounded-button bg-primary mt-4"
            >
              Following
            </button>
          </div>
        ) : (
          <ProfileActions
            userId={loggedInUserId}
            followingId={userProfile._id}
          />
        )}
      </motion.div>
      <motion.div className="mt-10 hidden lg:flex gap-10" {...fade}>
        <Image
          src="/assets/images/ai.png"
          width={200}
          height={200}
          alt="AI Image"
          priority={true}
        />
        <Image
          src="/assets/images/prompt.png"
          width={190}
          height={190}
          alt="Prompt Image"
        />
      </motion.div>
    </div>
  );
};

export default ProfileInfo;
