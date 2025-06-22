"use client";

import { signIn } from "next-auth/react";

export default function HomePage() {
  const handleSignIn = async () => {
    await signIn("google", {
      callbackUrl: "/auth/callback",
    });
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">TODOアプリ</h1>
      <button
        onClick={handleSignIn}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Sign in with Google
      </button>
    </main>
  );
}
