"use client";

import { useRouter } from "next/navigation";

const SignInButton = () => {
  const router = useRouter();

  const handleClick = () => {
    const callbackUrl = window.location.pathname;
    if (callbackUrl !== "/signin") {
      localStorage.setItem("callbackUrl", window.location.pathname);
    }
    router.push("/signin");
  };

  return (
    <button className="primary-button" onClick={handleClick}>
      Sign In
    </button>
  );
};

export default SignInButton;
