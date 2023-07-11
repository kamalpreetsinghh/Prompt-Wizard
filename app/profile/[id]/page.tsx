import { Params } from "@/common.types";
import Profile from "@/components/Profile";

const UserProfilePage = async ({ params: { id } }: Params) => {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/user/${id}`);
  const responseJson = await response.json();

  const userProfile = responseJson.result.userProfile;
  const userPosts = responseJson.result.prompts || [];

  if (!userProfile) {
    return null;
  }

  return <Profile userProfile={userProfile} userPosts={userPosts} />;
};

export default UserProfilePage;
