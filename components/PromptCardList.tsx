import PromptCard from "./PromptCard";
import { Post } from "@/common.types";

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
    <div className="prompt_layout mt-4">
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
    </div>
  );
};

export default PromptCardList;
