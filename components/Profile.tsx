"use client";

import Image from "next/image";
import Link from "next/link";
import PromptCardList from "./PromptCardList";
import ProfileActions from "./ProfileActions";
import FollowerList from "./FollowerList";
import { ModalType, Post, SessionInterface, UserProfile } from "@/common.types";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type ProfileProps = {
  id: string;
  session?: SessionInterface;
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
        <div className="w-full sm:max-w-[800px] xl:max-w-[1200px] flex-between">
          <motion.div
            className="flex flex-col mt-10 max-w-[600px]"
            initial={{ opacity: 0, scale: 0.9, x: -40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <Image
              src={userProfile?.image}
              width={100}
              height={100}
              className="rounded-full"
              alt="user image"
            />
            <p className="text-2xl text-grey-color mt-8">
              {userProfile.username}
            </p>
            <p className="text-4xl font-bold text-grey-color mt-4">
              {userProfile.name}
            </p>
            <p className="desc">{userProfile.bio}</p>

            {session && session?.user?.id === userProfile._id && (
              <div className="flex gap-2">
                <Link
                  href={`/update-profile/${userProfile._id}`}
                  className="primary-button mt-4"
                >
                  Edit Profile
                </Link>
                <button
                  onClick={showFollowersModal}
                  className="primary-button mt-4"
                >
                  Followers
                </button>
                <button
                  onClick={showFollowingModal}
                  className="primary-button mt-4"
                >
                  Following
                </button>
              </div>
            )}

            {session && session?.user?.id !== userProfile._id && (
              <ProfileActions
                userId={session?.user?.id}
                followingId={userProfile._id}
              />
            )}
          </motion.div>
          <motion.div
            className="mt-10 hidden lg:flex gap-10"
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <Image
              className=""
              src="/assets/images/ai.png"
              width={200}
              height={200}
              alt="AI Image"
            />
            <Image
              src="/assets/images/prompt.png"
              width={190}
              height={190}
              alt="Prompt Image"
            />
          </motion.div>
        </div>

        <PromptCardList
          posts={userPosts}
          showUserActions={showActions}
          onDelete={handleDeletePrompt}
        />

        {session && session?.user?.id === userProfile._id && (
          <dialog className="rounded-2xl w-full max-w-md  " ref={dialogRef}>
            <div className="flex-col flex-center">
              <h1 className="mt-2 mb-4 font-bold flex-center">
                {ModalType[modalType]}
              </h1>
              <div className="border-t border-nav-border w-full">
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
