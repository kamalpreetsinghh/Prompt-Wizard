import Image from "next/image";
import React from "react";

type PromptCardUserProps = {
  creator: {
    email: string;
    username: string;
    image: string;
  };
};

const PromptCardUser = ({ creator }: PromptCardUserProps) => {
  return (
    <div
      className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
      onClick={() => {}}
    >
      <Image
        src={creator.image}
        alt="user_image"
        width={40}
        height={40}
        className="rounded-full object-contain"
      />

      <div className="flex flex-col">
        <h3 className="font-satoshi font-semibold text-gray-400">
          {creator.username}
        </h3>
        <p className="font-inter text-sm text-gray-100">{creator.email}</p>
      </div>
    </div>
  );
};

export default PromptCardUser;
