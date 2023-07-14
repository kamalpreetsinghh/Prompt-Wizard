"use client";

import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PromptCardUser from "./PromptCardUser";
import { Post } from "@/common.types";
import { revalidateTag } from "next/cache";
import { useRouter } from "next/navigation";
import PromptCopy from "./PromptCopy";

type PromptCardProps = {
  post: Post;
  showUserActions?: boolean;
  showUserInfo?: boolean;
  handleTagClick?: (tag: string) => void;
};

const PromptCard = ({
  post,
  showUserActions = false,
  showUserInfo = false,
  handleTagClick,
}: PromptCardProps) => {
  const router = useRouter();

  const { username, image } = post.creator;

  const handleCopy = () => {
    navigator.clipboard.writeText(post.prompt);
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
          className="font-inter orange_gradient cursor-pointer button-hover"
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          #{post.tag}
        </p>
        <div className="flex gap-2 items-center">
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
          {!showUserInfo && <PromptCopy onCopy={handleCopy} />}
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
