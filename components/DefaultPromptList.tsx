import DefaultPrompt from "./DefaultPrompt";

const DefaultPromptList = ({
  posts,
}: {
  posts: { prompt: string; tag: string }[];
}) => (
  <div className="prompt_layout">
    {posts.map((post) => (
      <DefaultPrompt post={post} />
    ))}
  </div>
);

export default DefaultPromptList;
