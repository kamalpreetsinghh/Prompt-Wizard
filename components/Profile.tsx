import PromptCardList from "./PromptCardList";
import { Post } from "@/common.types";

const Profile = (userPosts: Post[]) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient"> Profile</span>
      </h1>
      <p className="desc text-left">Desc</p>

      <PromptCardList posts={userPosts} handleTagClick={() => {}} />
    </section>
  );
};

export default Profile;
