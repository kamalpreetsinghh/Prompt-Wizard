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
        <h3 className="font-satoshi font-semibold text-grey-color">
          {userProfile.username}
        </h3>
      </div>
    </div>
  );
};

export default PromptCardUser;
