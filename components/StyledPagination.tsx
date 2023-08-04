"use client";

import Pagination from "@mui/material/Pagination";
import { ThemeProvider, styled } from "@mui/material/styles";
import { lightTheme, darkTheme } from "@/lib/mui-theme";
import { useTheme } from "next-themes";
import { ChangeEvent } from "react";

type StyledPaginationProps = {
  page: number;
  count: number;
  handlePageChange: (event: ChangeEvent<unknown>, page: number) => void;
};

const CustomizedPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    color: theme.palette.mode === "dark" ? "white" : "black",
  },
}));

const StyledPagination = ({
  page,
  count,
  handlePageChange,
}: StyledPaginationProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <CustomizedPagination
        color="primary"
        className="my-6"
        count={count}
        page={page}
        onChange={handlePageChange}
      />
    </ThemeProvider>
  );
};

export default StyledPagination;
