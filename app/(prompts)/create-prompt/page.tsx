import Form from "@/components/Form";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const CreatePromptPage = async () => {
  const session = await getCurrentUser();

  if (!session?.user) {
    redirect("/signin");
  }

  return <Form type="Create" userId={session?.user?.id} />;
};

export default CreatePromptPage;
