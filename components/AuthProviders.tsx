"use client";

import { useEffect, useState } from "react";
import { signIn, getProviders } from "next-auth/react";

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

  if (providers) {
    return (
      <div>
        {Object.values(providers).map((provider: Provider, index) => (
          <button
            className="primary-button"
            key={index}
            onClick={() => signIn(provider?.id)}
          >
            Sign In
          </button>
        ))}
      </div>
    );
  }
};

export default AuthProviders;
