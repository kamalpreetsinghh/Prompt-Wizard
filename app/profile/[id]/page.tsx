import { UserProfile } from "@/common.types";
import Profile from "@/components/Profile";

type UserProfileProps = {
  params: {
    id: string;
  };
};

const UserProfile = async ({ params: { id } }: UserProfileProps) => {
  const userProfileResponse = await fetch(
    `${process.env.NEXTAUTH_URL}/api/user/${id}`
  );

  if (!userProfileResponse.ok) {
    return <p>Unable to get your profile information</p>;
  }

  const userPostsResponse = await fetch(
    `${process.env.NEXTAUTH_URL}/api/user/posts/${id}`,
    { cache: "no-cache", next: { tags: ["userPosts"] } }
  );

  if (!userPostsResponse.ok) {
    return (
      <p>
        There is some issue in the system. We advise you to visit this website
        later.
      </p>
    );
  }

  const userProfile = (await userProfileResponse.json()) as UserProfile;

  const userPosts = await userPostsResponse.json();

  if (!userProfile) {
    return null;
  }

  return <Profile userProfile={userProfile} userPosts={userPosts} />;
};

export default UserProfile;
