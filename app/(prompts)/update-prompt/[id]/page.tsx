import Form from "@/components/Form";
import { Params } from "@/common.types";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const UpdatePromptPage = async ({ params: { id } }: Params) => {
  const session = await getCurrentUser();

  if (!session?.user) {
    redirect("/signin");
  }

  return <Form type="Edit" promptId={id} userId={session?.user?.id} />;
};

export default UpdatePromptPage;
