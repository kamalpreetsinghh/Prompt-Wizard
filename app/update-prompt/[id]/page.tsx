import Form from "@/components/Form";
import { Post } from "@/common.types";
import { getCurrentUser } from "@/lib/session";

const UpdatePrompt = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();

  if (!session?.user) {
    return null;
  }

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/prompt/${id}`, {
    method: "GET",
  });

  if (!res.ok) {
    return (
      <p>
        There is some issue in the system. We advise you to visi this website
        later.
      </p>
    );
  }

  const { prompt, tag, _id } = (await res.json()) as Post;

  const userPrompt = {
    id: _id,
    prompt,
    tag,
  };

  return <Form type="Edit" userPrompt={userPrompt} session={session} />;
};

export default UpdatePrompt;
