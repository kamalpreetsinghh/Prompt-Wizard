import { Params } from "@/common.types";
import Profile from "@/components/Profile";
import { getCurrentUser } from "@/lib/session";

const UserProfilePage = async ({ params: { id } }: Params) => {
  const session = await getCurrentUser();

  return <Profile id={id} session={session} />;
};

export default UserProfilePage;
