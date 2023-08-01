"use client";

import FormField from "@/components/FormField";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { SignUp } from "@/common.types";
import Link from "next/link";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user: SignUp = { name, email, password };
    const response = await fetch("/api/user/create", {
      method: "POST",
      body: JSON.stringify(user),
    });

    if (response.ok) {
      alert("Account Created");
    }
  };

  return (
    <section className="w-full py-8 flex justify-between items-center">
      <motion.div
        className="w-full sm:pr-24"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <div className="flex flex-col w-full items-center sm:px-20">
          <h1 className="head_text orange_gradient mt-10 mb-2">Hi there!</h1>
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
            <button className="primary-button my-4" type="submit">
              Create Account
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
        className="hidden sm:flex"
        initial={{ opacity: 0, scale: 0.9, x: 40 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <Image
          className="object-cover "
          src="/assets/images/signin.png"
          height={1000}
          width={1000}
          alt="Signin Image"
        />
      </motion.div>
    </section>
  );
};

export default SignUpPage;
