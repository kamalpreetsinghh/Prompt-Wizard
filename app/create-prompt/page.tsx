import Form from "@/components/Form";
import { getCurrentUser } from "@/lib/session";

const CreatePrompt = async () => {
  const session = await getCurrentUser();

  if (!session?.user) {
    return null;
  }

  return <Form type="Create" session={session} />;
};

export default CreatePrompt;
