import PromptCard from "./PromptCard";
import { Post } from "@/common.types";

type PromptCardListProps = {
  posts: Array<Post>;
  showUserActions?: boolean;
  handleTagClick?: (tag: string) => void;
};

const PromptCardList = ({
  posts,
  showUserActions,
  handleTagClick,
}: PromptCardListProps) => {
  return (
    <div className="mt-16 prompt_layout">
      {posts.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          showUserActions={showUserActions}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

export default PromptCardList;
