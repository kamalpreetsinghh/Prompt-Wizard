"use client";

import Image from "next/image";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PromptCardUser from "./PromptCardUser";
import { useState } from "react";
import { Post } from "@/common.types";
import { revalidateTag } from "next/cache";
import { useRouter } from "next/navigation";

type PromptCardProps = {
  post: Post;
  showUserActions?: boolean;
  handleTagClick?: (tag: string) => void;
};

const PromptCard = ({
  post,
  showUserActions = false,
  handleTagClick,
}: PromptCardProps) => {
  const router = useRouter();

  const [showCopyIcon, setShowCopyIcon] = useState(false);

  const { username, image } = post.creator;

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
      router.refresh();

      revalidateTag("userPosts");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <Link href={`/profile/${post?.creator?._id}`}>
          <PromptCardUser image={image} username={username} />
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
          className="font-inter orange_gradient cursor-pointer button-hover"
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          #{post.tag}
        </p>
        {showUserActions && (
          <div className="flex gap-2">
            <Link href={`/update-prompt/${post._id}`}>
              <EditIcon className="primary-color button-hover" />
            </Link>
            <span onClick={handleDelete}>
              <DeleteIcon className="primary-color button-hover" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptCard;
