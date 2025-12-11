import Image from "next/image";
import Link from "next/link";

export default function Home() {


  return (
    <div className="min-h-screen flex flex-col items-center pt-6 bg-zinc-50 font-sans dark:bg-black">
        <h3 className="mt-8 text-4xl text-center font-bold text-zinc-800 dark:text-zinc-200">
            Welcome to the Yodlr Design Challenge!
         </h3>
      <div className="mt-12 flex flex-col items-center gap-3 ">
      <Link href="/signup" className="text-3xl text-blue-600 hover:text-blue-300">
        Sign Up
      </Link>
         <p className="text-2xl text-blue-600">Or</p>
      <Link href="/login" className="text-3xl text-blue-600 hover:text-blue-300">
        Log In
      </Link>
      </div>
    </div>
  );
}
