"use client";

import UploadImage from "./UploadImage";
import { UserProfile } from "@/common.types";
import { motion } from "framer-motion";
import { fadeRight } from "@/lib/motion";

type ProfileInfoProps = {
  userProfile: UserProfile;
  canEdit: boolean;
};

const ProfileInfo = ({ userProfile, canEdit }: ProfileInfoProps) => {
  return (
    <motion.div
      className="flex flex-col items-center md:items-start mt-10 max-w-[600px]"
      {...fadeRight}
    >
      <UploadImage
        userImage={userProfile?.image || null}
        canEdit={canEdit}
        name={userProfile?.name[0]}
        userId={userProfile?._id}
      />
      <p className="text-2xl text-grey-color mt-8">{userProfile.username}</p>
      <p className="text-4xl font-bold mt-4">{userProfile.name}</p>
      <p className="description">{userProfile.bio}</p>
    </motion.div>
  );
};

export default ProfileInfo;
