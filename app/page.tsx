import Feed from "@/components/Feed";
import { Post } from "@/common.types";

const Home = async () => {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/prompt`, {
    cache: "no-cache",
  });

  const posts: Post[] = (await response.json()) || [];

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br />
        <span className="orange_gradient text-center"> AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Prompt Wizard is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>

      <Feed posts={posts} />
    </section>
  );
};

export default Home;
