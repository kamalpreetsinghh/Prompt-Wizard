import Profile from "@/components/Profile";

type UserProfileProps = {
  params: {
    id: string;
  };
};

const UserProfile = async ({ params: { id } }: UserProfileProps) => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users/${id}/posts`, {
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

  const result = await res.json();
  console.log("HI");
  console.log(result);

  return <Profile userPosts={result} />;
};

export default UserProfile;
