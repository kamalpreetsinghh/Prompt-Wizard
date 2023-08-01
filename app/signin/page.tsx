"use client";

import AuthProviders from "@/components/AuthProviders";
import FormField from "@/components/FormField";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          <AuthProviders />
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

export default SignInPage;
