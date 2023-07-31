"use client";

import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PromptCardUser from "./PromptCardUser";
import { Post } from "@/common.types";
import { useRouter } from "next/navigation";
import PromptCopy from "./PromptCopy";
import { useRef } from "react";

type PromptCardProps = {
  post: Post;
  showUserActions?: boolean;
  showUserInfo?: boolean;
  handleTagClick?: (tag: string) => void;
  onDelete?: () => void;
};

const PromptCard = ({
  post,
  showUserActions = false,
  showUserInfo = false,
  handleTagClick,
  onDelete,
}: PromptCardProps) => {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const { username, image } = post.creator;

  const handleCopy = () => {
    navigator.clipboard.writeText(post.prompt);
  };

  const showModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeModal = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`/api/prompt/${post._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        closeModal();
        if (onDelete) {
          onDelete();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (dialogRef.current) {
    dialogRef.current.addEventListener("click", (e) => {
      if (dialogRef.current) {
        const dialogDimensions = dialogRef.current.getBoundingClientRect();
        if (
          e.clientX < dialogDimensions.left ||
          e.clientX > dialogDimensions.right ||
          e.clientY < dialogDimensions.top ||
          e.clientY > dialogDimensions.bottom
        ) {
          dialogRef.current.close();
        }
      }
    });
  }

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
              <span onClick={showModal}>
                <DeleteIcon className="primary-color button-hover" />
              </span>
            </div>
          )}
          {!showUserInfo && <PromptCopy onCopy={handleCopy} />}
        </div>
      </div>

      <dialog className="rounded-2xl w-full max-w-md  " ref={dialogRef}>
        <div className="flex-col flex-center">
          <h1 className="mt-2 mb-2 font-extrabold text-2xl flex-center">
            Confirm Delete?
          </h1>
          <p className="my-2">Are you sure you want to delete this prompt?</p>

          <div className="flex gap-2 my-4">
            <button className="rounded-button bg-red-800" onClick={closeModal}>
              Cancel
            </button>
            <button className="primary-button" onClick={handleConfirmDelete}>
              Delete
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default PromptCard;
