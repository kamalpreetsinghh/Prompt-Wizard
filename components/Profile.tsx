"use client";

import PromptCardList from "./PromptCardList";
import FollowerList from "./FollowerList";
import { ModalType, Post, UserProfile } from "@/common.types";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { fade } from "@/lib/motion";
import { Session } from "next-auth";
import ProfileInfo from "./ProfileInfo";

type ProfileProps = {
  id: string;
  session: Session | null;
};

const Profile = ({ session, id }: ProfileProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>();

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [modalType, setModalType] = useState(ModalType.Followers);
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const response = await fetch(`/api/user/${id}`);
    const responseJson = await response.json();

    const userProfileResponse: UserProfile = responseJson.result.userProfile;
    const userPostsResponse: Post[] = responseJson.result.prompts || [];
    setUserProfile(userProfileResponse);
    setUserPosts(userPostsResponse);

    if (session && session?.user?.id === userProfileResponse._id) {
      fetchFollowing().catch((error) => console.log(error));
      fetchFollowers().catch((error) => console.log(error));
    }

    const actions =
      (session && session?.user?.id === userProfileResponse?._id) || false;
    setShowActions(actions);
  };

  const fetchFollowing = async () => {
    const response = await fetch(`/api/user/following/${session?.user?.id}`);
    const followingJson = await response.json();
    if (followingJson) {
      setFollowing(followingJson);
    }
  };

  const fetchFollowers = async () => {
    const response = await fetch(`/api/user/followers/${session?.user?.id}`);
    const followerJson = await response.json();
    if (followerJson) {
      setFollowers(followerJson);
    }
  };

  const showFollowingModal = () => {
    setModalType(ModalType.Following);
    showModal();
  };

  const showFollowersModal = () => {
    setModalType(ModalType.Followers);
    showModal();
  };

  const showModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const handleDeletePrompt = () => {
    fetchUserProfile();
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
    userProfile && (
      <section className="w-full flex-col flex-center">
        <ProfileInfo
          userProfile={userProfile}
          isLoggedInUser={
            (session && session?.user?.id === userProfile._id) || false
          }
          loggedInUserId={session?.user?.id}
          showFollowersModal={showFollowersModal}
          showFollowingModal={showFollowingModal}
        />

        {userPosts.length > 0 ? (
          <PromptCardList
            posts={userPosts}
            showUserActions={showActions}
            onDelete={handleDeletePrompt}
          />
        ) : (
          <motion.div className="mt-28 text-xl flex-col items-center" {...fade}>
            {session && session?.user?.id === userProfile._id ? (
              <>
                <p className="text-center text-grey-color">
                  You have not created any post.
                </p>
                <p className="mt-4 text-center text-grey-color">
                  Create and share creative prompts to the community.
                </p>
              </>
            ) : (
              <p className="text-center text-grey-color">
                User has not shared any posts.
              </p>
            )}
          </motion.div>
        )}

        {session && session?.user?.id === userProfile._id && (
          <dialog className="rounded-2xl w-full max-w-md  " ref={dialogRef}>
            <div className="flex-col flex-center">
              <h1 className="mt-2 mb-4 font-bold flex-center">
                {ModalType[modalType]}
              </h1>
              <div
                className="border-t border-nav-border w-full 
              h-96 overflow-y-scroll overflow-x-scroll"
              >
                {modalType === ModalType.Following &&
                  following.length === 0 && (
                    <h1 className="my-4 flex-center">No Following</h1>
                  )}
                {modalType === ModalType.Followers &&
                  followers.length === 0 && (
                    <h1 className="my-4 flex-center">No Followers</h1>
                  )}
                <FollowerList
                  modalType={modalType}
                  userId={session?.user?.id}
                  followers={
                    modalType === ModalType.Following ? following : followers
                  }
                />
              </div>
            </div>
          </dialog>
        )}
      </section>
    )
  );
};

export default Profile;
