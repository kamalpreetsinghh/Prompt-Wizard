import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="h-[100vh] w-[100vw] flex flex-col justify-center items-center p-8">
      <h1
        className="text-6xl lg:text-9xl font-black 
      bg-clip-text text-transparent bg-gradient-to-r from-orange-700 to-orange-400"
      >
        404
      </h1>
      <h3 className="text-lg lg:text-4xl font-black py-8">
        This page isn&apos;t here for you, but we are.
      </h3>
      <p>
        If you manually entered the address, double check that it&apos;s spelled
        correctly
      </p>
      <Link className="rounded-button bg-primary my-8" href="/">
        Back to Prompt Wizard
      </Link>
    </div>
  );
};

export default NotFoundPage;
