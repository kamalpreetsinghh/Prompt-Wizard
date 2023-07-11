import Image from "next/image";

type PromptCardUserProps = {
  image: string;
  username: string;
};

const PromptCardUser = ({ image, username }: PromptCardUserProps) => {
  return (
    <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
      <Image
        src={image}
        alt="user_image"
        width={40}
        height={40}
        className="rounded-full object-contain"
      />

      <div className="flex flex-col">
        <h3 className="font-satoshi font-semibold text-grey-color">
          {username}
        </h3>
      </div>
    </div>
  );
};

export default PromptCardUser;
