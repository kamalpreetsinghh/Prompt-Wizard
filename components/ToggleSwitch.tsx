"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ToggleSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (theme === "system") {
      setTheme("dark");
    }
  }, []);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="mx-2">
      <input
        type="checkbox"
        id="checkTheme"
        className="toggle"
        defaultChecked={theme === "dark"}
        onClick={() => setTheme(theme !== "dark" ? "dark" : "light")}
      />
      <label htmlFor="checkTheme"></label>
    </div>
  );
};

export default ToggleSwitch;
