"use client";

import AuthProviders from "@/components/AuthProviders";
import { motion } from "framer-motion";
import Image from "next/image";

const SignInPage = () => {
  return (
    <section className="w-full flex justify-center lg:justify-between items-center">
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
          <AuthProviders />
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
            src="/assets/images/astronaught1.png"
            width={0}
            height={0}
            sizes="100vw"
            alt="Astronaught Image"
            style={{ objectFit: "cover", width: "100%", height: "auto" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default SignInPage;
