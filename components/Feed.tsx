"use client";

import PromptCardList from "./PromptCardList";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Post } from "@/common.types";
import { Pagination } from "@mui/material";

type FeedProps = {
  posts: Post[];
};

const Feed = ({ posts }: FeedProps) => {
  const limit = 5;

  const [userPosts, setUserPosts] = useState<Post[]>(posts);
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(posts.length / limit);

  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState<Post[]>([]);
  const [searchPage, setSearchPage] = useState(1);
  const [searchPageCount, setSearchPageCount] = useState(1);

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (searchText) {
      console.log(searchedResults);
      const paginatedPosts = getPaginatedPosts(
        searchPage,
        limit,
        searchedResults
      );
      setUserPosts(paginatedPosts);
      setSearchPageCount(Math.ceil(searchedResults.length / limit));
    } else {
      const paginatedPosts = getPaginatedPosts(page, limit, posts);
      setUserPosts(paginatedPosts);
      Math.ceil(posts.length / limit);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [page, searchedResults, searchPage]);

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
    return posts.filter(
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

    setSearchPage(1);

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
        <PromptCardList
          posts={userPosts}
          showUserInfo
          handleTagClick={handleTagClick}
        />
      </div>

      <Pagination
        className="mt-10 mb-4 flex-center"
        count={searchText ? searchPageCount : pageCount}
        page={searchText ? searchPage : page}
        onChange={handlePageChange}
      />
    </section>
  );
};

export default Feed;
