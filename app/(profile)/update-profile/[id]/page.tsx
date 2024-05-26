import ProflieForm from "@/components/profile/ProfileForm";
import { getCurrentUser } from "@/lib/session";
import { Params } from "@/common.types";

const UpdateProfilePage = async ({ params: { id } }: Params) => {
  const session = await getCurrentUser();

  if (!session?.user) {
    return null;
  }

  return <ProflieForm userId={id} />;
};

export default UpdateProfilePage;
