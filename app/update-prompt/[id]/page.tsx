import Form from "@/components/Form";
import { Params, Post } from "@/common.types";
import { getCurrentUser } from "@/lib/session";

const UpdatePromptPage = async ({ params: { id } }: Params) => {
  const session = await getCurrentUser();

  if (!session?.user) {
    return null;
  }

  return <Form type="Edit" promptId={id} userId={session?.user?.id} />;
};

export default UpdatePromptPage;
