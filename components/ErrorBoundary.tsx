const ErrorBoundary = () => {
  return (
    <div className="h-[100vh] w-[100vw] flex flex-col justify-center items-center p-8">
      <h2 className="text-lg lg:text-4xl font-black py-8">
        Something went wrong!
      </h2>
      <button
        className="rounded-button bg-primary my-8"
        onClick={() => {
          window.location.reload();
        }}
      >
        Try again
      </button>
    </div>
  );
};

export default ErrorBoundary;
