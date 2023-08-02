"use client";

import FormField from "@/components/FormField";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { SignUp } from "@/common.types";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const user: SignUp = { name, email, password };
    const response = await fetch("/api/user/create", {
      method: "POST",
      body: JSON.stringify(user),
    });

    setIsLoading(false);

    if (response.ok) {
      setName("");
      setEmail("");
      setPassword("");

      toast.success(
        "Account Created Successfully. \nPlease login to use your account.",
        {
          duration: 6000,
        }
      );
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
          <h1 className="head_text orange_gradient mt-8 mb-2">Hi there!</h1>
          <p className="desc max-w-md mb-6">Welcome to Prompt Wizard</p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full gap-7 glassmorphism"
          >
            <FormField
              title="First and Last Name"
              state={name}
              placeholder="Christopher Nolan"
              setState={setName}
              isRequired
            />

            <FormField
              title="Email"
              state={email}
              placeholder="Email"
              setState={setEmail}
              isRequired
            />

            <FormField
              title="Password"
              state={password}
              placeholder="Password"
              setState={setPassword}
              isRequired
            />
            <button
              className="primary-button my-4"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loader flex"></span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
          <p className="flex justify-center">
            Already have an account?&nbsp;
            <Link className="text-blue-600 font-bold" href="/signin">
              Sign in
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

export default SignUpPage;
