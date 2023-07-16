import Link from "next/link";
import DefaultPromptList from "@/components/DefaultPromptList";
import { prompts } from "@/constants";

const Home = () => {
  return (
    <section className="w-full min-h-screen flex-center flex-col">
      <div className="my-6">
        <h1 className="head_text text-center">
          Discover & Share
          <br />
          <span className="orange_gradient text-center">
            AI-Powered Prompts
          </span>
        </h1>
        <p className="mb-4 desc text-center">
          Prompt Wizard is an open-source AI prompting tool for modern world to
          discover, create and share creative prompts
        </p>
      </div>

      <DefaultPromptList posts={prompts} />

      <Link className="primary-button mt-4 mb-14" href="/prompts">
        See All Prompts
      </Link>
    </section>
  );
};

export default Home;
