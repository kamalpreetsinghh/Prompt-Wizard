import Image from "next/image";
import UserNameIcon from "./UserNameIcon";

type PromptCardUserProps = {
  image?: string;
  username: string;
};

const PromptCardUser = ({ image, username }: PromptCardUserProps) => {
  return (
    <div className="flex items-center gap-3 cursor-pointer">
      {image ? (
        <div className="flex w-10 h-10 relative">
          <Image
            src={image}
            alt="user image"
            style={{ objectFit: "cover" }}
            fill
            className="rounded-full"
          />
        </div>
      ) : (
        <UserNameIcon
          name={username[0].toUpperCase()}
          className="rounded-icon-name text-white flex justify-center items-center w-10 h-10 text-2xl"
        />
      )}

      <div className="flex flex-col">
        <h3 className="font-satoshi font-semibold text-grey-color">
          {username}
        </h3>
      </div>
    </div>
  );
};

export default PromptCardUser;
