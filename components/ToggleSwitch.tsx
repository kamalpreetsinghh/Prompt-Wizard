"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa6";
import { MdLightMode } from "react-icons/md";

const ToggleSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component is mounted before attempting to access window object
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Return null if component is not yet mounted

  return (
    <button
      onClick={() => setTheme(theme !== "dark" ? "dark" : "light")}
      className="toggle-btn"
    >
      {theme === "dark" ? (
        <FaMoon className="w-6 h-6 text-primary" />
      ) : (
        <MdLightMode className="w-6 h-6 text-primary" />
      )}
    </button>
  );
};

export default ToggleSwitch;
