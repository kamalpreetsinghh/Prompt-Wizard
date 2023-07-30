"use client";

import { motion } from "framer-motion";
import DefaultPrompt from "./DefaultPrompt";

const DefaultPromptList = ({
  posts,
}: {
  posts: { prompt: string; tag: string }[];
}) => (
  <motion.div
    className="prompt_layout"
    initial={{ scale: 0.9 }}
    animate={{ scale: 1 }}
    transition={{
      duration: 0.5,
    }}
  >
    {posts.map((post, index) => (
      <DefaultPrompt key={index} post={post} />
    ))}
  </motion.div>
);

export default DefaultPromptList;
