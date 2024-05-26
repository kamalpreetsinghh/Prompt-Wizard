import Follower from "./Follower";
import { FollowerUser, ModalType } from "@/common.types";

type FollowersProps = {
  modalType: ModalType;
  userId: string;
  followers: FollowerUser[];
};

const Followers = ({ modalType, userId, followers }: FollowersProps) => {
  return (
    <>
      {followers.map((follower) => (
        <Follower
          key={follower.username}
          modalType={modalType}
          userId={userId}
          follower={follower}
        />
      ))}
    </>
  );
};

export default Followers;
