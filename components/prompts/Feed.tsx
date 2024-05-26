"use client";

import PromptCardList from "./PromptCardList";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Post } from "@/common.types";
import { motion } from "framer-motion";
import StyledPagination from "../StyledPagination";
import Link from "next/link";
import { pacifico } from "@/app/font";

type FeedProps = {
  posts: Post[];
};

const Feed = ({ posts }: FeedProps) => {
  const limit = 6;
  const pageCount = posts.length > 0 ? Math.ceil(posts.length / limit) : 1;

  const [displayPosts, setDisplayPosts] = useState<Post[]>(
    posts.length > 0 ? posts.slice(0, 6) : []
  );

  const [page, setPage] = useState(1);

  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState<Post[]>([]);
  const [searchPage, setSearchPage] = useState(1);
  const [searchPageCount, setSearchPageCount] = useState(1);

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
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
      setDisplayPosts(getPaginatedPosts(page, limit, posts));
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

          <StyledPagination
            count={searchText ? searchPageCount : pageCount}
            page={searchText ? searchPage : page}
            handlePageChange={handlePageChange}
          />
        </>
      ) : searchText ? (
        <p
          className={`${pacifico.className} text-primary mt-28 font-extrabold text-xl lg:text-3xl text-center`}
        >
          No prompts were found for the search input.
        </p>
      ) : (
        <>
          <p
            className={`${pacifico.className} mt-28 font-extrabold text-xl lg:text-3xl text-center`}
          >
            Currently there are no posts.
          </p>
          <motion.p
            whileHover={{ scale: 1.1 }}
            className={`${pacifico.className} text-primary font-extrabold 
                    text-xl lg:text-3xl text-center mt-6 cursor-pointer`}
          >
            <Link href="/create-prompt">
              Create and share creative prompts to the community.
            </Link>
          </motion.p>
        </>
      )}
    </section>
  );
};

export default Feed;
