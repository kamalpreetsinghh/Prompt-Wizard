"use client";

import FormField from "@/components/FormField";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormAndImage from "@/components/FormAndImage";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { errors, regex } from "@/constants";

const ResetPasswordPage = () => {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  const handlePasswordChange = (updatedPassword: string) => {
    setPassword(updatedPassword);
    setPasswordError("");
  };

  const handleConfirmPasswordChange = (updatedConfirmPassword: string) => {
    setConfirmPassword(updatedConfirmPassword);
    setConfirmPasswordError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      try {
        const response = await fetch("/api/user/reset-password", {
          method: "POST",
          body: JSON.stringify({ token, password }),
        });

        setIsLoading(false);

        if (response.ok) {
          setPassword("");
          setConfirmPassword("");
          toast.success("Your password is updated.", {
            description: "You can use your new password for log in.",
          });
        }
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };

  const validateForm = (): boolean => {
    let isValidForm = true;

    if (!regex.password.test(password)) {
      setPasswordError(errors.password);
      isValidForm = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(errors.confirmPassword);
      isValidForm = false;
    }

    return isValidForm;
  };

  return (
    <FormAndImage
      image="/icons/resetpassword.svg"
      imageDesc="Reset Password Image"
    >
      <>
        <div className="w-full my-6 max-w-lg mx-auto flex flex-col items-center">
          <h1 className="text-5xl orange-gradient mt-8 pb-2">Reset Password</h1>
          <p className="description max-w-md mb-6">
            Please enter your new password.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center mt-2">
          <form
            className="flex flex-col w-full max-w-lg gap-7 glassmorphism"
            onSubmit={handleSubmit}
          >
            <FormField
              title="Password"
              state={password}
              placeholder="no0neCanGuessIt"
              setState={handlePasswordChange}
              errorMessage={passwordError}
              type="password"
            />

            <FormField
              title="Confirm Password"
              state={confirmPassword}
              placeholder="no0neCanGuessIt"
              setState={handleConfirmPasswordChange}
              errorMessage={confirmPasswordError}
              type="password"
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
        <Toaster richColors />
      </>
    </FormAndImage>
  );
};

export default ResetPasswordPage;
