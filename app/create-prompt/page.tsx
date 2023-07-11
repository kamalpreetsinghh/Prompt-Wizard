import Form from "@/components/Form";
import { getCurrentUser } from "@/lib/session";

const CreatePromptPage = async () => {
  const session = await getCurrentUser();

  if (!session?.user) {
    return null;
  }

  return <Form type="Create" userId={session?.user?.id} />;
};

export default CreatePromptPage;
