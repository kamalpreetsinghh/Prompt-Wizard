import PromptCardList from "./PromptCardList";
import { Post } from "@/common.types";

type ProfileProps = {
  userPosts: Post[];
};

const Profile = ({ userPosts }: ProfileProps) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient"> Profile</span>
      </h1>
      <p className="desc text-left">Desc</p>

      <PromptCardList posts={userPosts} />
    </section>
  );
};

export default Profile;
