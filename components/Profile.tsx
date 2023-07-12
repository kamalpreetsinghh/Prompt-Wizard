"use client";

import Image from "next/image";
import Link from "next/link";
import PromptCardList from "./PromptCardList";
import ProfileActions from "./ProfileActions";
import FollowerList from "./FollowerList";
import { Post, SessionInterface, UserProfile } from "@/common.types";
import { useEffect, useRef, useState } from "react";

type ProfileProps = {
  userProfile: UserProfile;
  userPosts: Post[];
  session?: SessionInterface;
};

const Profile = ({ userPosts, userProfile, session }: ProfileProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [modalName, setModalName] = useState("");

  useEffect(() => {
    if (session) {
      const fetchFollowing = async () => {
        const response = await fetch(
          `/api/user/following/${session?.user?.id}`
        );
        const followingJson = await response.json();
        if (followingJson) {
          console.log(followingJson);
          setFollowing(followingJson);
        }
      };

      const fetchFollowers = async () => {
        const response = await fetch(
          `/api/user/followers/${session?.user?.id}`
        );
        const followerJson = await response.json();
        if (followerJson) {
          console.log(followerJson);
          setFollowers(followerJson);
        }
      };

      fetchFollowing().catch((error) => console.log(error));
      fetchFollowers().catch((error) => console.log(error));
    }
  }, []);

  const showActions = session && session?.user?.id === userProfile._id;

  const showFollowingModal = () => {
    setModalName("Following");
    showModal();
  };

  const showFollowersModal = () => {
    setModalName("Followers");
    showModal();
  };

  const showModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
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
      <div className="w-full sm:max-w-[800px] xl:max-w-[1200px] flex-between">
        <div className="flex flex-col mt-10 max-w-[600px]">
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
        </div>
        <div className="flex-center mt-10 hidden lg:flex gap-10">
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
        </div>
      </div>

      <div>
        <PromptCardList posts={userPosts} showUserActions={showActions} />
      </div>

      <dialog className="rounded-2xl w-full max-w-lg " ref={dialogRef}>
        <div className="flex-col flex-center">
          <h1 className="mt-2 mb-4 font-bold flex-center">{modalName}</h1>
          <div className="border-t border-nav-border">
            <FollowerList
              followers={modalName === "Following" ? following : followers}
            />
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default Profile;
