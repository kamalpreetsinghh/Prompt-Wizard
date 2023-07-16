import Form from "@/components/Form";
import { Params, Post } from "@/common.types";
import { getCurrentUser } from "@/lib/session";

const UpdatePromptPage = async ({ params: { id } }: Params) => {
  const session = await getCurrentUser();

  if (!session?.user) {
    return null;
  }

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/prompt/${id}`);

  if (!res.ok) {
    return <p>User not found.</p>;
  }

  const { prompt, tag, _id } = (await res.json()) as Post;

  const userPrompt = {
    id: _id,
    prompt,
    tag,
  };

  return (
    <Form type="Edit" userPrompt={userPrompt} userId={session?.user?.id} />
  );
};

export default UpdatePromptPage;
