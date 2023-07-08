import { UserProfile } from "@/common.types";
import ProflieForm from "@/components/ProfileForm";
import { getCurrentUser } from "@/lib/session";

const UpdateProfile = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const session = await getCurrentUser();

  if (!session?.user) {
    return null;
  }

  const userProfileResponse = await fetch(
    `${process.env.NEXTAUTH_URL}/api/user/${id}`
  );

  if (!userProfileResponse.ok) {
    return <p>Unable to get your profile information</p>;
  }

  const userProfile = (await userProfileResponse.json()) as UserProfile;

  return <ProflieForm session={session} userProfile={userProfile} />;
};

export default UpdateProfile;
