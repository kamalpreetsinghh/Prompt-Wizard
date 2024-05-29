import { Params } from "@/common.types";
import UserPosts from "@/components/profile/UserPosts";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { getCurrentUser } from "@/lib/session";

const UserProfilePage = async ({ params: { id } }: Params) => {
  const session = await getCurrentUser();

  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/user/${id}`);
  const profile = await response.json();

  return (
    <>
      <ProfileHeader
        userProfile={profile}
        loggedInUserId={session && session?.user?.id ? session?.user?.id : null}
      />
      <UserPosts
        userId={id}
        canEdit={session && session?.user?.id === id ? true : false}
      />
    </>
  );
};

export default UserProfilePage;
