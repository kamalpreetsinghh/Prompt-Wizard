"use client";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const Pagination = () => {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [hasRightPage, setHasRightPage] = useState(false);

  useEffect(() => {
    if (pageParam) {
      setPage(parseInt(pageParam));
    }
  }, []);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleLeftPageClick = () => {
    const newPage = page - 1;
    if (searchParams) {
      const params = createQueryString("page", newPage.toString());

      const newPathname = `${window.location.pathname}?${params}`;
      setPage(newPage);
      router.push(newPathname);
    }
  };

  const handleRightPageClick = () => {
    const newPage = page + 1;
    if (searchParams) {
      const params = createQueryString("page", newPage.toString());

      const newPathname = `${window.location.pathname}?${params}`;
      setPage(newPage);
      router.push(newPathname);
    }
  };

  return (
    <div className="w-full flex-center gap-5 mt-10">
      <button disabled={page <= 1} onClick={handleLeftPageClick}>
        <ChevronLeftIcon />
      </button>
      <button>{page}</button>
      <button onClick={handleRightPageClick}>
        <ChevronRightIcon />
      </button>
    </div>
  );
};

export default Pagination;
