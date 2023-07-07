"use client";

import PromptCardList from "./PromptCardList";
import { useEffect, useState } from "react";

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setAllPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      {searchText ? (
        <PromptCardList posts={allPosts} showUserActions={false} />
      ) : (
        <PromptCardList posts={allPosts} showUserActions={false} />
      )}
    </section>
  );
};

export default Feed;
