"use client";

import { useEffect, useState } from "react";
import { signIn, getProviders } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import GitHub from "@mui/icons-material/GitHub";

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
          className="button rounded-xl bg-slate-800 text-white my-2 py-3 px-5"
          onClick={() => handleSignIn(providers?.github?.id)}
        >
          <GitHub className="mx-2" />
          Sign in with {providers?.github?.name}
        </button>
      </div>
    );
  }
};

export default AuthProviders;
