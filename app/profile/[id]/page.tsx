import Profile from "@/components/Profile";

type UserProfileProps = {
  params: {
    id: string;
  };
};

const UserProfile = async ({ params: { id } }: UserProfileProps) => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users/${id}`, {
    method: "GET",
  });

  if (!res.ok) {
    return (
      <p>
        There is some issue in the system. We advise you to visit this website
        later.
      </p>
    );
  }

  const result = await res.json();

  return <Profile userPosts={result} />;
};

export default UserProfile;
