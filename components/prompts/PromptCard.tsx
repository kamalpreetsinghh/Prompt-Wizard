"use client";

import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PromptCardUser from "./PromptCardUser";
import { Post } from "@/common.types";
import PromptCopy from "./PromptCopy";
import { motion } from "framer-motion";
import { item } from "@/lib/motion";

type PromptCardProps = {
  post: Post;
  showUserActions?: boolean;
  showUserInfo?: boolean;
  handleTagClick?: (tag: string) => void;
  showModal?: (id: string) => void;
};

const PromptCard = ({
  post,
  showUserActions = false,
  showUserInfo = false,
  handleTagClick,
  showModal,
}: PromptCardProps) => {
  const { username, image } = post.creator;

  const handleCopy = () => {
    navigator.clipboard.writeText(post.prompt);
  };

  return (
    <motion.div
      className="prompt_card"
      variants={item}
      whileHover={{ scale: 1.03 }}
    >
      {showUserInfo && (
        <div className="mb-4 flex justify-between items-start gap-5">
          <Link href={`/profile/${post?.creator?._id}`}>
            <PromptCardUser image={image} username={username} />
          </Link>

          <PromptCopy onCopy={handleCopy} />
        </div>
      )}

      <p className="mb-4 text-lg">{post.prompt}</p>
      <div className="flex flex-between">
        <p
          className="font-inter orange-gradient cursor-pointer button-hover"
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          #{post.tag}
        </p>
        <div className="flex gap-2 items-center">
          {showUserActions && showModal && (
            <div className="flex gap-2">
              <Link href={`/update-prompt/${post._id}`}>
                <EditIcon className="text-primary button-hover" />
              </Link>
              <span onClick={() => showModal(post._id)}>
                <DeleteIcon className="text-primary button-hover" />
              </span>
            </div>
          )}
          {!showUserInfo && <PromptCopy onCopy={handleCopy} />}
        </div>
      </div>
    </motion.div>
  );
};

export default PromptCard;
