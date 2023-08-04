"use client";

import FormField from "@/components/FormField";
import FormAndImage from "@/components/FormAndImage";
import Link from "next/link";
import { useState } from "react";
import { SignUp } from "@/common.types";
import { Toaster, toast } from "react-hot-toast";
import { errors, regex } from "@/constants";
import { capitalizeWords } from "@/lib/common";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = (updatedName: string) => {
    setName(updatedName);
    setNameError("");
  };

  const handleEmailChange = (updatedEmail: string) => {
    setEmail(updatedEmail);
    setEmailError("");
  };

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
      const user: SignUp = { name: capitalizeWords(name), email, password };
      const response = await fetch("/api/user/create", {
        method: "POST",
        body: JSON.stringify(user),
      });

      setIsLoading(false);

      if (response.ok) {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        toast.success(
          "Account Created Successfully. \nPlease login to use your account.",
          {
            duration: 6000,
          }
        );
      } else if (response.status === 403) {
        setEmailError(errors.emailAlreadyExisis);
      }
    }
  };

  const validateForm = (): boolean => {
    let isValidForm = true;

    if (!regex.name.test(name)) {
      setNameError(errors.name);
      isValidForm = false;
    }

    if (!regex.email.test(email)) {
      setEmailError(errors.email);
      isValidForm = false;
    }

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
    <FormAndImage image="/assets/images/signup.png" imageDesc="Sign Up Image">
      <div className="w-full max-w-lg mx-auto flex flex-col items-center">
        <h1 className="head_text orange_gradient mt-8 mb-2">Hi there!</h1>
        <p className="desc max-w-md mb-6">Welcome to Prompt Wizard</p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full gap-7 glassmorphism"
        >
          <FormField
            title="First and Last Name"
            state={name}
            placeholder="Christopher Nolan"
            setState={handleNameChange}
            errorMessage={nameError}
            isRequired
            autocapitalize={true}
          />

          <FormField
            title="Email"
            state={email}
            placeholder="Email"
            setState={handleEmailChange}
            errorMessage={emailError}
            isRequired
          />

          <FormField
            title="Password"
            state={password}
            placeholder="Password"
            setState={handlePasswordChange}
            errorMessage={passwordError}
            isRequired
            type="password"
          />

          <FormField
            title="Confirm Password"
            state={confirmPassword}
            placeholder="Confirm Password"
            setState={handleConfirmPasswordChange}
            errorMessage={confirmPasswordError}
            isRequired
            type="password"
          />
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
              "Create Account"
            )}
          </button>
        </form>
        <p className="flex justify-center">
          Already have an account?&nbsp;
          <Link className="text-blue-600 font-bold" href="/signin">
            Sign in
          </Link>
        </p>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </FormAndImage>
  );
};

export default SignUpPage;
