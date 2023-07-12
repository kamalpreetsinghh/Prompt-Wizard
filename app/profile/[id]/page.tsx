import { Params } from "@/common.types";
import Profile from "@/components/Profile";
import { getCurrentUser } from "@/lib/session";

const UserProfilePage = async ({ params: { id } }: Params) => {
  const session = await getCurrentUser();

  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/user/${id}`);
  const responseJson = await response.json();

  const userProfile = responseJson.result.userProfile;
  const userPosts = responseJson.result.prompts || [];

  if (!userProfile) {
    return null;
  }

  return (
    <Profile
      userProfile={userProfile}
      userPosts={userPosts}
      session={session}
    />
  );
};

export default UserProfilePage;
