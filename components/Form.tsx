"use client";

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
            tag: tag.replace(/\s/g, "").toLowerCase(),
            creator: session?.user?.id,
          }),
        });
      } else {
        response = await fetch(`/api/prompt/${userPrompt?.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            prompt: prompt,
            tag: tag.replace(/\s/g, "").toLowerCase(),
          }),
        });
      }

      if (response.ok) {
        router.back();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <section className="w-full max-w-full flex-center flex-col my-10 sm:my-6">
      <h1 className="head_text text-left">
        <span className="orange_gradient">{type} Post</span>
      </h1>

      <p className="desc text-left max-w-md">
        Create and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <FormField
          title="Your AI Prompt"
          state={prompt}
          placeholder="Type prompt here"
          setState={setPrompt}
          isTextArea
          isRequired
        />

        <FormField
          title="Field of Prompt (#product, #webdevelopment, #idea, etc.)"
          state={tag}
          placeholder="#TAG"
          setState={setTag}
          isRequired
        />

        <div className="flex-end mx-3 mb-5 gap-4">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-button bg-red-800"
          >
            Cancel
          </button>

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
