"use client";

import Image from "next/image";
import Link from "next/link";
import PromptCardList from "./PromptCardList";
import ProfileActions from "./ProfileActions";
import FollowerList from "./FollowerList";
import { ModalType, Post, UserProfile } from "@/common.types";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { fade, fadeRight } from "@/lib/motion";
import UserNameIcon from "./UserNameIcon";
import { Session } from "next-auth";

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
  const [uploadedImage, setUploadedImage] = useState("");
  const [image, setImage] = useState("");
  const [showImageActions, setShowImageActions] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const response = await fetch(`/api/user/${id}`);
    const responseJson = await response.json();

    const userProfileResponse: UserProfile = responseJson.result.userProfile;
    const userPostsResponse: Post[] = responseJson.result.prompts || [];
    setUserProfile(userProfileResponse);
    if (userProfileResponse?.image) {
      setUploadedImage(userProfileResponse.image);
    }
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

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes("image")) {
      alert("Please upload an image!");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      setImage(result);
      setShowImageActions(true);
    };
  };

  const handleClose = () => {
    setImage("");
    setShowImageActions(false);
  };

  const handleDone = async () => {
    setShowImageActions(false);
    await fetch(`/api/user/${id}`, {
      method: "PUT",
      body: JSON.stringify({ image }),
    });
    setUploadedImage(image);
    setImage("");
  };

  return (
    userProfile && (
      <section className="w-full flex-col flex-center">
        <div className="w-full sm:max-w-[800px] xl:max-w-[1200px] flex-between">
          <motion.div
            className="flex flex-col mt-10 max-w-[600px]"
            {...fadeRight}
          >
            <div className="flex">
              <div className="group relative hover:opacity-50">
                {uploadedImage || image ? (
                  <div className="w-28 h-28 relative">
                    <Image
                      src={image ? image : uploadedImage}
                      style={{ objectFit: "cover" }}
                      className="rounded-full "
                      alt="user image"
                      fill
                    />
                  </div>
                ) : (
                  <span>
                    <UserNameIcon
                      name={userProfile.name[0]}
                      className="w-28 h-28 text-7xl"
                    />
                  </span>
                )}
                {session && session?.user?.id === userProfile._id && (
                  <>
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      className="form_image-input left-0 right-0 bottom-0 top-0"
                      onChange={(e) => handleChangeImage(e)}
                    />
                    <span
                      className="invisible group-hover:visible absolute left-0 right-0 bottom-0 top-0 
                 flex justify-center items-center"
                    >
                      <EditIcon />
                    </span>
                  </>
                )}
              </div>

              {showImageActions && (
                <div className="flex gap-2">
                  <div
                    className="primary-color button-hover cursor-pointer"
                    onClick={handleDone}
                  >
                    <DoneIcon />
                  </div>
                  <div
                    className="primary-color button-hover cursor-pointer"
                    onClick={handleClose}
                  >
                    <CloseIcon />
                  </div>
                </div>
              )}
            </div>

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
          <motion.div className="mt-10 hidden lg:flex gap-10" {...fade}>
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
