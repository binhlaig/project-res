"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

export default function Home() {
  const { status } = useSession();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
        redirect("/login")
    },
  });
  const router = useRouter();
  const user = session?.user

  const showSession = () => {
    if (status === "authenticated") {
      return (
        <button
          className="border border-solid border-black rounded"
          onClick={() => {
            signOut({ redirect: false }).then(() => {
              router.push("/");
            });
          }}
        >
          Sign Out
        </button>
      );
    } else if (status === "loading") {
      return  <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-12 w-12"></div>
    } else {
      return (
        <Link
          href="/login"
          className="border border-solid border-black rounded"
        >
          Sign In
        </Link>
      );
    }
  };
  console.log(user);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-xl">Home {user?.username}
      </h1>
      {showSession()}
    </main>
  );
}
