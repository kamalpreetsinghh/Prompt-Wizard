"use client";

import { useState } from "react";
import FormField from "./FormField";
import { SessionInterface, UserProfile } from "@/common.types";
import { useRouter } from "next/navigation";

type ProfileFormProps = {
  session: SessionInterface;
  userProfile: UserProfile;
};

const ProfileForm = ({ session, userProfile }: ProfileFormProps) => {
  const [username, setUsername] = useState(userProfile.username);
  const [name, setName] = useState(userProfile.name);
  const [bio, setBio] = useState(userProfile.description || "");
  const [usernameError, setUsernameError] = useState("");
  const [submitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/user/${userProfile._id}`, {
        method: "PATCH",
        body: JSON.stringify({
          username: username,
          name: name,
          description: bio,
        }),
      });

      if (response.status === 409) {
        setUsernameError("Username already exists");
      }

      if (response.ok) {
        router.back();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push(`/profile/${userProfile._id}`);
  };

  return (
    <section className="w-full max-w-full flex-center flex-col my-10 sm:my-6">
      <h1 className="head_text text-left">
        <span className="orange_gradient">Edit Profile</span>
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <FormField
          title="Username"
          state={username}
          placeholder="mountain_explorer"
          errorMessage={usernameError}
          isRequired
          setState={setUsername}
        />

        <FormField
          title="Name"
          state={name}
          placeholder="first & last name"
          isRequired
          setState={setName}
        />

        <FormField
          title="Bio"
          state={bio}
          placeholder="Hi, I'm a Software Engineer 👋"
          setState={setBio}
        />

        <div className="flex-end mx-3 mb-5 gap-4">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-button bg-red-800"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="primary-button"
          >
            {submitting ? `Editing...` : "Edit"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ProfileForm;
