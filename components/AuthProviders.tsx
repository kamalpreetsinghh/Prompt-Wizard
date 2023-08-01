"use client";

import { useEffect, useState } from "react";
import { signIn, getProviders } from "next-auth/react";
import Image from "next/image";
import GitHub from "@mui/icons-material/GitHub";
import FormField from "./FormField";
import Link from "next/link";

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  singinUrlParams?: Record<string, string> | null;
};

type Providers = Record<string, Provider>;

const AuthProviders = () => {
  const [providers, setProviders] = useState<Providers | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    fetchProviders();
  }, []);

  const handleSignIn = async (providerId: string) => {
    await signIn(providerId, { callbackUrl: "/" });
  };

  const handleFormSubmit = async (e: React.FormEvent, providerId: string) => {
    e.preventDefault();

    const response = await signIn(providerId, {
      username: email,
      password: password,
      callbackUrl: "/",
    });
  };

  if (providers) {
    return (
      <div className="w-full flex flex-col">
        <button
          className="button rounded-xl border border-zinc-400 my-2 py-3 px-5"
          onClick={() => handleSignIn(providers?.google?.id)}
        >
          <Image
            className="mx-2"
            src="/assets/icons/google.svg"
            width={20}
            height={20}
            alt="Google"
          />
          Sign in with {providers?.google?.name}
        </button>
        <button
          className="button rounded-xl border border-zinc-400 my-2 py-3 px-5"
          onClick={() => handleSignIn(providers?.github?.id)}
        >
          <GitHub className="mx-2" />
          Sign in with {providers?.github?.name}
        </button>
        <div className="flex my-2 w-full justify-center items-center gap-4">
          <hr className="w-2/5 border-orange-400" />
          <p className="text-orange-400">OR</p>
          <hr className="w-2/5 border-orange-400" />
        </div>

        <form
          onSubmit={(e) => handleFormSubmit(e, providers?.credentials?.id)}
          className="flex flex-col w-full gap-7 glassmorphism"
        >
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
          <div className="flex flex-end">
            <Link className="text-blue-600 font-bold" href="/forgotpassword">
              Forgot Password?
            </Link>
          </div>

          <button className="primary-button mt-2 mb-4" type="submit">
            Sign In
          </button>
        </form>

        <p className="flex justify-center">
          Don&apos;t have an account?&nbsp;
          <Link className="text-blue-600 font-bold" href="/signup">
            Sign up
          </Link>
        </p>
      </div>
    );
  }
};

export default AuthProviders;
