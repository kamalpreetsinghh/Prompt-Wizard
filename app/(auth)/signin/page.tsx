"use client";

import { Providers } from "@/common.types";
import FormAndImage from "@/components/FormAndImage";
import FormField from "@/components/FormField";
import { errors, regex } from "@/constants";
import GitHub from "@mui/icons-material/GitHub";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SignInPage = () => {
  const [providers, setProviders] = useState<Providers | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    fetchProviders();
  }, []);

  const handleEmailChange = (updatedEmail: string) => {
    setEmail(updatedEmail);
    setEmailError("");
  };

  const handlePasswordChange = (updatedPassword: string) => {
    setPassword(updatedPassword);
    setPasswordError("");
  };

  const handleSignIn = async (providerId: string) => {
    const callbackUrl = localStorage.getItem("callbackUrl") || "/";
    await signIn(providerId, { callbackUrl });
  };

  const handleFormSubmit = async (e: React.FormEvent, providerId: string) => {
    e.preventDefault();

    const callbackUrl = localStorage.getItem("callbackUrl") || "/";

    if (validateForm()) {
      setIsLoading(true);
      const response = await signIn(providerId, {
        email,
        password,
        redirect: false,
      });

      setIsLoading(false);

      if (!response?.error) {
        router.replace(callbackUrl);
      } else if (response?.error === "Email does not exist.") {
        setEmailError(response.error);
      } else if (response?.error === "Incorrect Username or Password.") {
        setPasswordError(response.error);
      }
    }
  };

  const validateForm = () => {
    let isValidForm = true;
    if (!regex.email.test(email)) {
      setEmailError(errors.email);
      isValidForm = false;
    }

    if (!regex.password.test(password)) {
      setPasswordError(errors.password);
      isValidForm = false;
    }
    return isValidForm;
  };

  return (
    <FormAndImage image="/icons/signin.svg" imageDesc="Sign In Image">
      <div className="w-full my-2 max-w-lg mx-auto flex flex-col items-center">
        <h1 className="heading orange-gradient mt-8 mb-2">Hi there!</h1>
        <p className="description max-w-md mb-6">Welcome to Prompt Wizard</p>
        {providers && (
          <div className="w-full flex flex-col">
            <button
              className="button rounded-xl border border-zinc-400 my-2 py-3 px-5"
              onClick={() => handleSignIn(providers?.google?.id)}
            >
              <Image
                className="mx-2"
                src="/icons/google.svg"
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
                placeholder="explore@mountains.com"
                setState={handleEmailChange}
                errorMessage={emailError}
              />

              <FormField
                title="Password"
                state={password}
                placeholder="no0neCanGuessIt"
                setState={handlePasswordChange}
                errorMessage={passwordError}
                type="password"
              />
              <div className="flex flex-end">
                <Link
                  className="text-blue-600 font-bold"
                  href="/forgot-password"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                className="form-button my-4"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="h-6 flex items-center justify-center">
                    <span className="loader bottom-3"></span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <p className="flex justify-center">
              Don&apos;t have an account?&nbsp;
              <Link className="text-blue-600 font-bold" href="/signup">
                Sign up
              </Link>
            </p>
          </div>
        )}
      </div>
    </FormAndImage>
  );
};

export default SignInPage;
