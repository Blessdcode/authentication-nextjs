import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Section */}
      <div className="flex flex-col justify-center items-center bg-darkBlue text-white w-full p-6 sm:p-16 space-y-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-center">
          Welcome to DropSaas
        </h1>
        <p className="text-lg sm:text-xl text-center opacity-90">
          Discover amazing features and tools designed to make your life easier.
        </p>
        <Link href={"/auth/sign-up"} className="bg-white text-darkBlue px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition duration-300">
          Get Started
        </Link>
      </div>

      
    </div>
  );
}
