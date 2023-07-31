"use client";

import { motion } from "framer-motion";
import DefaultPrompt from "./DefaultPrompt";
import { container } from "@/lib/motion";

const DefaultPromptList = ({
  posts,
}: {
  posts: { prompt: string; tag: string }[];
}) => (
  <motion.div
    className="prompt_layout"
    variants={container}
    initial="hidden"
    animate="visible"
  >
    {posts.map((post, index) => (
      <DefaultPrompt key={index} post={post} />
    ))}
  </motion.div>
);

export default DefaultPromptList;
