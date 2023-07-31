import PromptCard from "./PromptCard";
import { Post } from "@/common.types";
import { motion } from "framer-motion";
import { container } from "../lib/motion";

type PromptCardListProps = {
  posts: Array<Post>;
  showUserActions?: boolean;
  showUserInfo?: boolean;
  handleTagClick?: (tag: string) => void;
  onDelete?: () => void;
};

const PromptCardList = ({
  posts,
  showUserActions,
  showUserInfo,
  handleTagClick,
  onDelete,
}: PromptCardListProps) => {
  return (
    <motion.div
      className="prompt_layout mt-4"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {posts.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          showUserActions={showUserActions}
          showUserInfo={showUserInfo}
          handleTagClick={handleTagClick}
          onDelete={onDelete}
        />
      ))}
    </motion.div>
  );
};

export default PromptCardList;
