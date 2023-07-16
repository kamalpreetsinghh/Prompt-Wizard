import ProflieForm from "@/components/ProfileForm";
import { getCurrentUser } from "@/lib/session";
import { Params } from "@/common.types";

const UpdateProfilePage = async ({ params: { id } }: Params) => {
  const session = await getCurrentUser();

  if (!session?.user) {
    return null;
  }

  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/user/${id}`);

  if (!response.ok) {
    return <p>Unable to get your profile information</p>;
  }

  const responseJson = await response.json();

  return <ProflieForm userProfile={responseJson.result.userProfile} />;
};

export default UpdateProfilePage;
