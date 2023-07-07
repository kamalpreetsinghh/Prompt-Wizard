import PromptCard from "./PromptCard";
import { Post } from "@/common.types";

type PromptCardListProps = {
  posts: Array<Post>;
};

const PromptCardList = ({ posts }: PromptCardListProps) => {
  return (
    <div className="mt-16 prompt_layout">
      {posts.map((post) => (
        <PromptCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PromptCardList;
