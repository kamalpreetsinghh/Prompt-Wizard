import Profile from "@/components/Profile";

type UserProfileProps = {
  params: {
    id: string;
  };
};

const UserProfile = async ({ params: { id } }: UserProfileProps) => {
  console.log(id);
  try {
    const response = await fetch(`/api/users/${id}/posts`, { method: "GET" });
  } catch (error) {
    console.log(error);
  }

  // console.log(result);
  // if (!result?.user)
  //   return <p className="no-result-text">Failed to fetch user info</p>;
  // return <Profile />;
};

export default UserProfile;
