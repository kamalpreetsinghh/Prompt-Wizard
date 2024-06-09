"use client";

import { FollowerUser, ModalType } from "@/common.types";
import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import Followers from "./Followers";

const Connections = ({ userId }: { userId: string }) => {
  const [followers, setFollowers] = useState<FollowerUser[]>([]);
  const [following, setFollowing] = useState<any[]>([]);
  const [modalType, setModalType] = useState(ModalType.Followers);
  const [isFollowersLoading, setIsFollowersLoading] = useState(false);

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const fetchConnections = async () => {
      setIsFollowersLoading(true);
      const [followersResponse, followingResponse] = await Promise.all([
        fetch(`/api/user/followers/${userId}`),
        fetch(`/api/user/following/${userId}`),
      ]);

      const followerJson = await followersResponse.json();
      if (followerJson) {
        setFollowers(followerJson);
      }

      const followingJson = await followingResponse.json();
      if (followingJson) {
        setFollowing(followingJson);
      }

      setIsFollowersLoading(false);
    };

    fetchConnections();
  }, []);

  const showFollowersModal = () => {
    setModalType(ModalType.Followers);
    showModal();
  };

  const showFollowingModal = () => {
    setModalType(ModalType.Following);
    showModal();
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
    <div className="flex gap-2">
      <Link
        href={`/update-profile/${userId}`}
        className="rounded-button bg-primary mt-4"
      >
        Edit Profile
      </Link>
      <button
        onClick={showFollowersModal}
        className="rounded-button bg-primary mt-4"
      >
        Followers
      </button>
      <button
        onClick={showFollowingModal}
        className="rounded-button bg-primary mt-4"
      >
        Following
      </button>
      <dialog className="rounded-2xl w-[90vw] max-w-md p-4" ref={dialogRef}>
        <div className="flex-col items-center justify-center">
          <div>
            <h1 className="mb-2 font-bold text-center">
              {ModalType[modalType]}
            </h1>
            <IoClose
              className="absolute right-0 top-0 m-4 font-bold cursor-pointer"
              onClick={closeModal}
            />
          </div>

          <div className="w-full h-96 overflow-y-scroll overflow-x-scroll">
            <hr className="divider-color mx-4" />
            {isFollowersLoading ? (
              <div className="flex justify-center items-center h-full">
                <div className="half-circle-spinner">
                  <div className="circle circle-1"></div>
                  <div className="circle circle-2"></div>
                </div>
              </div>
            ) : (
              <>
                {modalType === ModalType.Following ? (
                  <>
                    {following.length === 0 ? (
                      <h1 className="my-4 flex items-center justify-center">
                        No Following
                      </h1>
                    ) : (
                      <Followers
                        modalType={modalType}
                        userId={userId}
                        followers={following}
                      />
                    )}
                  </>
                ) : (
                  <>
                    {followers.length === 0 ? (
                      <h1 className="my-4 flex items-center justify-center">
                        No Followers
                      </h1>
                    ) : (
                      <Followers
                        modalType={modalType}
                        userId={userId}
                        followers={followers}
                      />
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Connections;
