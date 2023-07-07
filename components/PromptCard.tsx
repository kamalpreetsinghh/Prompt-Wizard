"use client";

import Image from "next/image";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PromptCardUser from "./PromptCardUser";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Post, SessionInterface, UserProfile } from "@/common.types";

type PromptCardProps = {
  post: Post;
  showUserActions: boolean;
};

const PromptCard = ({ post, showUserActions }: PromptCardProps) => {
  const { data } = useSession();
  const session = data as SessionInterface;
  const router = useRouter();

  const showActions = session?.user.id === post.creator._id && showUserActions;

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

      <p className="my-4 text-lg">{post.prompt}</p>
      <div className="flex flex-between">
        <p
          className="font-inter orange_gradient cursor-pointer"
          onClick={() => {}}
        >
          #{post.tag}
        </p>
        {showActions && (
          <div>
            <Link href={`/update-prompt/${post._id}`}>
              <EditIcon />
            </Link>
            <span onClick={handleDelete}>
              <DeleteIcon />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptCard;
