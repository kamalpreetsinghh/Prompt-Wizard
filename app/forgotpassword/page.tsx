"use client";

import FormField from "@/components/FormField";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/user/forgotpassword", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      alert("Password Reset Email Sent.");
    }
  };

  return (
    <section className="w-full flex justify-between items-center">
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
          <h1 className="text-4xl orange_gradient mt-8 mb-2">
            Forgot Password?
          </h1>
          <p className="desc max-w-md mb-6">
            No worries, we will send you reset instructions
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <form
            className="flex flex-col w-full max-w-lg gap-7 glassmorphism"
            onSubmit={handleSubmit}
          >
            <FormField
              title="Email"
              state={email}
              placeholder="Email"
              setState={setEmail}
              isRequired
            />
            <button className="primary-button" type="submit">
              Reset Password
            </button>
          </form>
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

export default ForgotPasswordPage;
