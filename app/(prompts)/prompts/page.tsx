"use client";

import ErrorBoundary from "@/components/ErrorBoundary";
import Loader from "@/components/Loader";
import Feed from "@/components/prompts/Feed";
import useSWR from "swr";
import { fetcher } from "@/lib/common";

const PromptsPage = () => {
  const { data: prompts, error, isLoading } = useSWR("/api/prompt", fetcher);

  if (error) return <ErrorBoundary />;

  if (isLoading) return <Loader />;

  return <Feed posts={prompts} />;
};

export default PromptsPage;
