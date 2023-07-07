"use client";

import Image from "next/image";
import Link from "next/link";
import PromptActions from "./PromptActions";
import PromptCardUser from "./PromptCardUser";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Post, SessionInterface, UserProfile } from "@/common.types";

type PromptCardProps = {
  post: Post;
};

const PromptCard = ({ post }: PromptCardProps) => {
  const { data } = useSession();
  const session = data as SessionInterface;
  const router = useRouter();

  const [showCopyIcon, setShowCopyIcon] = useState(false);

  const { email, username, image } = post.creator;
  const userProfile: UserProfile = { email, username, image };

  const handleCopy = () => {
    setShowCopyIcon(true);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setShowCopyIcon(false), 3000);
  };

  const handleDelete = async () => {
    try {
      await fetch(`/api/prompt/${post._id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    router.push(`/update-prompt/${post._id}`);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <Link href={`/profile/${post?.creator?._id}`}>
          <PromptCardUser userProfile={userProfile} />
        </Link>

        <div className="copy_btn cursor-pointer" onClick={handleCopy}>
          <Image
            src={
              showCopyIcon ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"
            }
            alt={showCopyIcon ? "tick_icon" : "copy_icon"}
            width={18}
            height={18}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm orange_gradient cursor-pointer"
        onClick={() => {}}
      >
        #{post.tag}
      </p>

      {session?.user.id === post.creator._id && (
        <PromptActions onUpdate={handleUpdate} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default PromptCard;
