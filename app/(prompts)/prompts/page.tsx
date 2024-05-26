import Feed from "@/components/prompts/Feed";

const PromptsPage = async () => {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/prompt`);
  const prompts = await response.json();

  return <Feed posts={prompts} />;
};

export default PromptsPage;
