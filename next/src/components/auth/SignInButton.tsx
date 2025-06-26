"use client";

import { signIn } from "next-auth/react";

export function SignInButton() {
  const handleSignIn = async () => {
    await signIn("google");
  };

  return (
    <button
      onClick={handleSignIn}
      className="px-6 py-3 rounded-xl bg-white/10 text-white/90 backdrop-blur-md hover:bg-white/20 transition"
    >
      Sign in with Google
    </button>
  );
}
