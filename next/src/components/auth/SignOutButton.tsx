"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "auth/signin",
      redirect: true,
    });
  };

  return (
    <button
      onClick={handleSignOut}
      className="px-6 py-3 rounded-xl bg-white/10 text-white/90 backdrop-blur-md hover:bg-white/20 transition"
    >
      Sign Out
    </button>
  );
}
