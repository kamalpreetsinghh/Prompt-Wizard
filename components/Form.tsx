"use client";

import FormField from "./FormField";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "./Loader";
import { motion } from "framer-motion";

type FormProps = {
  type: string;
  userId: string;
  promptId?: string;
};

const Form = ({ type, userId, promptId }: FormProps) => {
  const router = useRouter();

  const [prompt, setPrompt] = useState("");
  const [tag, setTag] = useState("");
  const [submitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (type === "Edit") {
      const fetchPrompt = async () => {
        setIsLoading(true);
        const response = await fetch(`/api/prompt/${promptId}`);
        const responseJson = await response.json();
        setIsLoading(false);
        setPrompt(responseJson.prompt);
        setTag(responseJson.tag);
      };

      fetchPrompt();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let response;
      if (type === "Create") {
        response = await fetch("/api/prompt", {
          method: "POST",
          body: JSON.stringify({
            prompt: prompt,
            tag: tag.replace(/\s/g, "").toLowerCase(),
            creator: userId,
          }),
        });
      } else {
        response = await fetch(`/api/prompt/${promptId}`, {
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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <motion.section
      className="w-full max-w-full flex-center flex-col my-10 sm:my-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.2,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <h1 className="heading text-left">
        <span className="orange-gradient">{type} Post</span>
      </h1>

      <p className="description text-left max-w-md">
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
            className="rounded-button bg-primary"
          >
            {submitting
              ? type === "Create"
                ? "Creating..."
                : `Editing...`
              : type}
          </button>
        </div>
      </form>
    </motion.section>
  );
};

export default Form;
