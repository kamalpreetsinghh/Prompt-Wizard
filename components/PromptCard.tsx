"use client";

import { Post, SessionInterface } from "@/common.types";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import React, { useState } from "react";
import PromptActions from "./PromptActions";
import PromptCardUser from "./PromptCardUser";

type PromptCardProps = {
  post: Post;
  handleTagClick: (tag: string) => void;
};

const PromptCard = ({ post, handleTagClick }: PromptCardProps) => {
  const { data } = useSession();
  const session = data as SessionInterface;
  const pathName = usePathname();
  const router = useRouter();

  const [showCopyIcon, setShowCopyIcon] = useState(false);

  const handleCopy = () => {
    setShowCopyIcon(true);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setShowCopyIcon(false), 3000);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/prompt/${post._id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`/api/prompt/?id=${post._id}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <PromptCardUser creator={post.creator} />

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              showCopyIcon ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"
            }
            alt={showCopyIcon ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm orange_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
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
