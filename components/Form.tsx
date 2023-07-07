"use client";

import Link from "next/link";
import FormField from "./FormField";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SessionInterface } from "@/common.types";

type FormProps = {
  type: string;
  session: SessionInterface;
  userPrompt?: {
    id: string;
    prompt: string;
    tag: string;
  };
};

const Form = ({ type, session, userPrompt }: FormProps) => {
  const router = useRouter();

  const [prompt, setPrompt] = useState("");
  const [tag, setTag] = useState("");
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (userPrompt && type === "Edit") {
      setPrompt(userPrompt.prompt);
      setTag(userPrompt.tag);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let response;
      if (type === "Create") {
        response = await fetch("/api/prompt/new", {
          method: "POST",
          body: JSON.stringify({
            prompt: prompt,
            tag: tag,
            creator: session?.user?.id,
          }),
        });
      } else {
        response = await fetch(`/api/prompt/${userPrompt?.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            prompt: prompt,
            tag: tag,
          }),
        });
      }

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="orange_gradient">{type} Post</span>
      </h1>
      {type.toLowerCase() === "create" && (
        <p className="desc text-left max-w-md">
          Create and share amazing prompts with the world, and let your
          imagination run wild with any AI-powered platform.
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <FormField
          type="textarea"
          title="Your AI Prompt"
          state={prompt}
          placeholder="Type prompt here"
          setState={setPrompt}
          isRequired
        />

        <FormField
          type="textarea"
          title="Field of Prompt (#product, #webdevelopment, #idea, etc.)"
          state={tag}
          placeholder="#TAG"
          setState={setTag}
          isRequired
        />

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="rounded-button bg-red-800">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="primary-button"
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
