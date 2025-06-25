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
      className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
    >
      Sign Out
    </button>
  );
}
