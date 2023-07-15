import Feed from "@/components/Feed";
import React from "react";
import { Post } from "@/common.types";

const PromptsPage = async () => {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/prompt`, {
    cache: "no-cache",
  });

  const posts: Post[] = (await response.json()) || [];

  return <Feed posts={posts} />;
};

export default PromptsPage;
