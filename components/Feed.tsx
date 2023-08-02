"use client";

import PromptCardList from "./PromptCardList";
import { Pagination } from "@mui/material";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Post } from "@/common.types";
import Loader from "./Loader";
import { motion } from "framer-motion";

const Feed = () => {
  const limit = 6;

  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [displayPosts, setDisplayPosts] = useState<Post[]>([]);

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState<Post[]>([]);
  const [searchPage, setSearchPage] = useState(1);
  const [searchPageCount, setSearchPageCount] = useState(1);

  const [isLoading, setIsLoading] = useState(true);

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);

      const response = await fetch(`/api/prompt`);
      const posts = (await response.json()) || [];

      setIsLoading(false);
      setAllPosts(posts);

      if (posts.length > 0) {
        setDisplayPosts(getPaginatedPosts(page, limit, posts));
        setPageCount(Math.ceil(posts.length / limit));
      }
    };

    fetchPosts();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (searchText) {
      setDisplayPosts(getPaginatedPosts(searchPage, limit, searchedResults));
      setSearchPageCount(Math.ceil(searchedResults.length / limit));
    } else {
      setDisplayPosts(getPaginatedPosts(page, limit, allPosts));
    }
  }, [page, searchedResults, searchPage, searchText]);

  const getPaginatedPosts = (page: number, limit: number, posts: Post[]) => {
    let startIndex = (page - 1) * limit;
    let endIndex = page * limit;

    if (startIndex >= posts.length) {
      startIndex = 0;
    }

    if (endIndex >= posts.length) {
      endIndex = posts.length;
    }

    return posts.slice(startIndex, endIndex);
  };

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

    setSearchPage(1); //set page to 1 for search results

    timerRef.current = window.setTimeout(() => {
      setSearchedResults(filterPrompts(searchText));
    }, 500);
  };

  const handleTagClick = (tag: string) => {
    setSearchText(tag);
    setSearchedResults(filterPrompts(tag));
  };

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    if (searchText) {
      setSearchPage(page);
    } else {
      setPage(page);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="w-full flex-center flex-col">
      <motion.div
        className="flex-center w-full mt-2"
        initial={{ opacity: 0, scale: 0.9, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <input
          className="form_field-input max-w-[800px]"
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearch}
        />
      </motion.div>

      {displayPosts.length > 0 ? (
        <>
          <PromptCardList
            posts={displayPosts}
            showUserInfo
            handleTagClick={handleTagClick}
          />

          {pageCount > 1 && (
            <Pagination
              className="my-6"
              count={searchText ? searchPageCount : pageCount}
              page={searchText ? searchPage : page}
              onChange={handlePageChange}
            />
          )}
        </>
      ) : searchText ? (
        <h4 className="mt-28 text-xl text-center">
          No prompts found for the search.
        </h4>
      ) : (
        <h4 className="mt-28 text-xl text-center">No posts</h4>
      )}
    </section>
  );
};

export default Feed;
