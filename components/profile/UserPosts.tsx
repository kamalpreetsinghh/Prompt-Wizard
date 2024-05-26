"use client";

import PromptCardList from "../prompts/PromptCardList";
import { Post } from "@/common.types";
import { motion } from "framer-motion";
import { fade } from "@/lib/motion";
import { pacifico } from "@/app/font";
import Link from "next/link";
import { useRef, useState } from "react";

type UserPostsProps = {
  posts: Post[];
  canEdit: boolean;
};

const UserPosts = ({ posts, canEdit }: UserPostsProps) => {
  let deletePostId = "";
  const [userPosts, setUserPosts] = useState(posts);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dialogRef = useRef<HTMLDialogElement>(null);

  const showModal = (id: string) => {
    deletePostId = id;
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
    setIsSubmitting(!isSubmitting);
    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/prompt/${deletePostId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setUserPosts(posts.filter((post: Post) => post._id !== deletePostId));
        closeModal();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
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
    <section className="w-full flex-col flex-center">
      {userPosts.length > 0 ? (
        <>
          <PromptCardList
            posts={userPosts}
            showUserActions={canEdit}
            showModal={showModal}
          />
          <dialog className="rounded-2xl w-full max-w-md  " ref={dialogRef}>
            <div className="flex-col flex-center">
              <h1 className="mt-2 mb-2 font-extrabold text-2xl flex-center">
                Confirm Delete?
              </h1>
              <p className="my-2">
                Are you sure you want to delete this prompt?
              </p>

              <div className="flex gap-2 my-4">
                <button
                  className="rounded-button bg-red-800 w-24"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="rounded-button bg-primary w-24"
                  onClick={handleConfirmDelete}
                >
                  {isSubmitting ? (
                    <div className="w-24 flex items-center justify-center">
                      <span className="loader bottom-2.5"></span>
                    </div>
                  ) : (
                    <>Delete</>
                  )}
                </button>
              </div>
            </div>
          </dialog>
        </>
      ) : (
        <motion.div className="mt-28 text-xl flex-col items-center" {...fade}>
          {canEdit ? (
            <>
              <p
                className={`${pacifico.className} font-extrabold text-xl lg:text-3xl text-center`}
              >
                You have not created any post.
              </p>
              <motion.p
                whileHover={{ scale: 1.1 }}
                className={`${pacifico.className} text-primary font-extrabold 
                    text-xl lg:text-3xl text-center mt-6 cursor-pointer`}
              >
                <Link href="/create-prompt">
                  Create and share creative prompts to the community.
                </Link>
              </motion.p>
            </>
          ) : (
            <p
              className={`${pacifico.className} text-primary font-extrabold text-xl lg:text-3xl text-center`}
            >
              User has not shared any posts.
            </p>
          )}
        </motion.div>
      )}
    </section>
  );
};

export default UserPosts;
