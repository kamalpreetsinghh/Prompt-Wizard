"use client";

import FormField from "@/components/FormField";
import Link from "next/link";
import FormAndImage from "@/components/FormAndImage";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { errors, regex } from "@/constants";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (updatedEmail: string) => {
    setEmail(updatedEmail);
    setEmailError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!regex.email.test(email)) {
      setEmailError(errors.email);
      return;
    }

    setIsLoading(true);

    const response = await fetch("/api/user/forgotpassword", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    setIsLoading(false);

    if (response.ok) {
      setEmail("");
      toast.success(
        "Email for resetting your password sent. \nPlease check your inbox for further instructions.",
        {
          duration: 6000,
        }
      );
    } else if (response.status === 400) {
      setEmailError(errors.emailNotExist);
    }
  };

  return (
    <FormAndImage
      image="/assets/images/forgotpassword.png"
      imageDesc="Forgot Password Image"
    >
      <>
        <div className="w-full my-6 max-w-lg mx-auto flex flex-col items-center">
          <h1 className="text-5xl orange_gradient mt-8 pb-2">
            Forgot Password?
          </h1>
          <p className="desc max-w-md mb-6">
            No worries, we will send you reset instructions.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center mt-2">
          <form
            className="flex flex-col w-full max-w-lg gap-7 glassmorphism"
            onSubmit={handleSubmit}
          >
            <FormField
              title="Email"
              state={email}
              placeholder="Email"
              setState={handleEmailChange}
              errorMessage={emailError}
              isRequired
            />
            <button
              className="form-button mt-4 mb-6"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="h-6 flex items-center justify-center">
                  <span className="loader bottom-3"></span>
                </div>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
          <p className="flex justify-center">
            <Link className="text-grey-color" href="/signin">
              <ArrowBackIcon />
              &nbsp; Back to Log in
            </Link>
          </p>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
      </>
    </FormAndImage>
  );
};

export default ForgotPasswordPage;
