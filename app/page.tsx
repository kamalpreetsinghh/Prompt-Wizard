import Link from "next/link";
import DefaultPromptList from "@/components/DefaultPromptList";
import { prompts } from "@/constants";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <div className="my-6 w-full flex-col items-center">
        <h1 className="heading text-center">
          Unleash Your Creativity With
          <br />
          <span className="orange-gradient text-center">
            AI-Powered Prompts
          </span>
        </h1>
        <p className="mb-4 description text-center mx-auto">
          Prompt Wizard is an open-source AI prompting tool for the modern world
          to discover, create and share creative prompts.
        </p>
      </div>

      <DefaultPromptList posts={prompts} />

      <Link className="rounded-button bg-primary my-4" href="/prompts">
        See All Prompts
      </Link>
    </section>
  );
};

export default Home;
