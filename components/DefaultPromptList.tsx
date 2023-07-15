import DefaultPrompt from "./DefaultPrompt";

const DefaultPromptList = ({
  posts,
}: {
  posts: { prompt: string; tag: string }[];
}) => (
  <div className="prompt_layout">
    {posts.map((post, index) => (
      <DefaultPrompt key={index} post={post} />
    ))}
  </div>
);

export default DefaultPromptList;
