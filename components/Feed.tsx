"use client";

import PromptCardList from "./PromptCardList";
import { useEffect, useRef, useState } from "react";
import { Post } from "@/common.types";

const Feed = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState<Post[]>([]);

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt", { cache: "no-cache" });
      const data = await res.json();
      setAllPosts(data);
    };

    fetchPosts();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const filterPrompts = (searchText: string): Post[] => {
    const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const searchText = e.target.value;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setSearchText(searchText);

    timerRef.current = window.setTimeout(() => {
      setSearchedResults(filterPrompts(searchText));
    }, 500);
  };

  const handleTagClick = (tag: string) => {
    setSearchText(tag);
    setSearchedResults(filterPrompts(tag));
  };

  return (
    <section className="w-full">
      <div className="flex-center w-full mt-16">
        <input
          className="form_field-input max-w-[800px]"
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearch}
        />
      </div>

      <div className="flex-center">
        {searchText ? (
          <PromptCardList
            posts={searchedResults}
            showUserActions={false}
            handleTagClick={handleTagClick}
          />
        ) : (
          <PromptCardList
            posts={allPosts}
            showUserActions={false}
            handleTagClick={handleTagClick}
          />
        )}
      </div>
    </section>
  );
};

export default Feed;
