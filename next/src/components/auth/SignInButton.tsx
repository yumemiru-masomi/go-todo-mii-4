"use client";

import { signIn } from "next-auth/react";

export function SignInButton() {
  const handleSignIn = async () => {
    await signIn("google");
  };

  return (
    <button
      onClick={handleSignIn}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Sign in with Google
    </button>
  );
}
