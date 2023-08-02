"use client";

import FormField from "@/components/FormField";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ResetPasswordPage = () => {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [passwordReset, setPasswordReset] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password) {
      alert("Please enter a password");
      return;
    }

    try {
      const response = await fetch("/api/user/resetpassword", {
        method: "POST",
        body: JSON.stringify({ token, password }),
      });

      if (response.ok) {
        setPassword("");
        setPasswordReset(true);
        toast.success(
          "Your password is updated. \nYou can use your new password for log in.",
          {
            duration: 6000,
          }
        );
      }
    } catch (error: any) {
      setError(true);
      console.log(error.message);
    }
  };

  return (
    <section className="w-full py-8 flex justify-center lg:justify-between items-center">
      <motion.div
        className="w-full lg:w-3/5 lg:pr-24"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <div className="w-full max-w-lg mx-auto flex flex-col items-center">
          <h1 className="text-5xl orange_gradient mt-8 pb-2">Reset Password</h1>
          <p className="desc max-w-md mb-6">Please enter your new password.</p>
        </div>
        <div className="flex flex-col items-center justify-center mt-2">
          <form
            className="flex flex-col w-full max-w-lg gap-7 glassmorphism"
            onSubmit={handleSubmit}
          >
            <FormField
              title="Password"
              state={password}
              placeholder="youcanneverguessit"
              setState={setPassword}
              isRequired
            />
            <button className="primary-button mt-4 mb-6" type="submit">
              Reset Password
            </button>
          </form>
          <p className="flex justify-center">
            <Link className="text-grey-color" href="/signin">
              <ArrowBackIcon />
              &nbsp; Back to Log in
            </Link>
          </p>
        </div>
      </motion.div>
      <motion.div
        className="hidden lg:flex w-2/5"
        initial={{ opacity: 0, scale: 0.9, x: 40 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <div className="flex w-full justify-center relative">
          <Image
            className="object-cover"
            src="/assets/images/astronaught2.png"
            width={0}
            height={0}
            sizes="100vw"
            alt="Astronaught Image"
            style={{ objectFit: "cover", width: "100%", height: "auto" }}
          />
        </div>
      </motion.div>
      <Toaster position="top-center" reverseOrder={false} />
    </section>
  );
};

export default ResetPasswordPage;
