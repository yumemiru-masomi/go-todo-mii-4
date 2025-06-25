"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { SignOutButton } from "@/components/auth/SignOutButton";

export default function SignOut() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex flex-col items-center justify-center">
      {/* 閉じるボタン（右上） */}
      <button
        aria-label="閉じる"
        className="absolute top-4 right-4 text-white"
        onClick={() => {
          window.history.back();
        }}
      >
        <XMarkIcon className="w-6 h-6" />
      </button>

      {/* メニュー内容 */}
      <SignOutButton />
    </div>
  );
}
