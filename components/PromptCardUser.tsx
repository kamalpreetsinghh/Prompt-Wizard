import Image from "next/image";
import { UserProfile } from "@/common.types";

type PromptCardUserProps = {
  userProfile: UserProfile;
};

const PromptCardUser = ({ userProfile }: PromptCardUserProps) => {
  return (
    <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
      <Image
        src={userProfile.image}
        alt="user_image"
        width={40}
        height={40}
        className="rounded-full object-contain"
      />

      <div className="flex flex-col">
        <h3 className="font-satoshi font-semibold text-gray-400">
          {userProfile.username}
        </h3>
        <p className="font-inter text-sm text-gray-100">{userProfile.email}</p>
      </div>
    </div>
  );
};

export default PromptCardUser;
