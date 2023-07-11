import Image from "next/image";
import Link from "next/link";
import PromptCardList from "./PromptCardList";
import { Post, UserProfile } from "@/common.types";
import { getCurrentUser } from "@/lib/session";
import ProfileActions from "./ProfileActions";

type ProfileProps = {
  userProfile: UserProfile;
  userPosts: Post[];
};

const Profile = async ({ userPosts, userProfile }: ProfileProps) => {
  const session = await getCurrentUser();

  // const res = await fetch(
  //   `${process.env.NEXTAUTH_URL}/api/user/follow/${session?.user?.id}`,
  //   {
  //     method: "POST",
  //     body: JSON.stringify({
  //       followingId: userProfile._id,
  //     }),
  //   }
  // );

  // if (!res.ok) {
  //   return (
  //     <p>
  //       There is some issue in the system. We advise you to visi this website
  //       later.
  //     </p>
  //   );
  // }

  // const isFollowingResult = await res.json();
  // const { isFollowing } = {isFollowingResult};

  return (
    <section className="w-full flex-col flex-center">
      <div className="w-full sm:max-w-[800px] xl:max-w-[1200px] flex-between">
        <div className="flex flex-col mt-10 max-w-[600px]">
          <Image
            src={userProfile?.image}
            width={100}
            height={100}
            className="rounded-full"
            alt="user image"
          />
          <p className="text-2xl text-grey-color mt-8">
            {userProfile.username}
          </p>
          <p className="text-4xl font-bold text-grey-color mt-4">
            {userProfile.name}
          </p>
          <p className="desc">{userProfile.bio}</p>

          {session?.user?.id === userProfile._id && (
            <div className="flex gap-2">
              <Link
                href={`/update-profile/${userProfile._id}`}
                className="primary-button mt-4"
              >
                Edit Profile
              </Link>
              <Link
                href={`/profile/update/${userProfile._id}`}
                className="primary-button mt-4"
              >
                Followers
              </Link>
              <Link
                href={`/profile/update/${userProfile._id}`}
                className="primary-button mt-4"
              >
                Following
              </Link>
            </div>
          )}

          {session && session?.user?.id !== userProfile._id && (
            <ProfileActions
              userId={session?.user?.id}
              followingId={userProfile._id}
              isFollowing
            />
          )}
        </div>
        <div className="flex-center mt-10 hidden lg:flex gap-10">
          <Image
            className=""
            src="/assets/images/ai.png"
            width={200}
            height={200}
            alt="AI Image"
          />
          <Image
            src="/assets/images/prompt.png"
            width={190}
            height={190}
            alt="Prompt Image"
          />
        </div>
      </div>

      <div>
        <PromptCardList posts={userPosts} showUserActions />
      </div>
    </section>
  );
};

export default Profile;
