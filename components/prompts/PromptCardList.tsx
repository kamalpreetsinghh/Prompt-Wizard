import PromptCard from "./PromptCard";
import { Post } from "@/common.types";
import { motion } from "framer-motion";
import { container } from "../../lib/motion";

type PromptCardListProps = {
  posts: Array<Post>;
  showUserActions?: boolean;
  showUserInfo?: boolean;
  handleTagClick?: (tag: string) => void;
  showModal?: (id: string) => void;
};

const PromptCardList = ({
  posts,
  showUserActions,
  showUserInfo,
  handleTagClick,
  showModal,
}: PromptCardListProps) => {
  return (
    <motion.div
      className="prompt-layout mt-4"
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
          showModal={showModal}
        />
      ))}
    </motion.div>
  );
};

export default PromptCardList;
