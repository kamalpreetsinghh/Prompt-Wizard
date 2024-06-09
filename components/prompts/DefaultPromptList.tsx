"use client";

import { motion } from "framer-motion";
import { container, item } from "@/lib/motion";
import PromptCopy from "./PromptCopy";

type DefaultPromptListProps = {
  posts: { prompt: string; tag: string }[];
};

type DefaultPromptProps = {
  post: { prompt: string; tag: string };
};

const DefaultPromptList = ({ posts }: DefaultPromptListProps) => (
  <motion.div
    className="prompt-layout"
    variants={container}
    initial="hidden"
    animate="visible"
  >
    {posts.map((post, index) => (
      <DefaultPrompt key={index} post={post} />
    ))}
  </motion.div>
);

const DefaultPrompt = ({ post }: DefaultPromptProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(post.prompt);
  };
  return (
    <motion.div
      className="prompt-card"
      variants={item}
      whileHover={{ scale: 1.03 }}
    >
      <p className="mb-4 text-lg">{post.prompt}</p>
      <div className="flex flex-between">
        <p className="font-inter orange-gradient cursor-pointer button-hover">
          #{post.tag}
        </p>
        <PromptCopy onCopy={handleCopy} />
      </div>
    </motion.div>
  );
};

export default DefaultPromptList;
