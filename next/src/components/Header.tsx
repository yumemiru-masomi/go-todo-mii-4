// next/src/component/Header.tsx
"use client";

import { useRouter } from "next/navigation";
import { format, addDays, parseISO } from "date-fns";
import { ja } from "date-fns/locale";
import { Bars3Icon } from "@heroicons/react/24/solid";

type Props = {
  date: string; // "2025-04-17"
};

export default function TodoHeader({ date }: Props) {
  const router = useRouter();
  const currentDate = parseISO(date);

  const goToDate = (offset: number) => {
    const nextDate = addDays(currentDate, offset);
    const formatted = format(nextDate, "yyyy-MM-dd");
    router.push(`/todos/${formatted}`);
  };

  const goToday = () => {
    const today = new Date();
    const formatted = format(today, "yyyy-MM-dd");
    router.push(`/todos/${formatted}`);
  };

  return (
    <>
      <div className="flex items-center justify-between py-10">
        {/* ハンバーガーアイコン */}
        <button
          onClick={() => router.push("/auth/signout")}
          aria-label="メニューを開く"
          className="p-2"
        >
          <Bars3Icon className="w-6 h-6 text-white" />
        </button>

        {/* 今日ボタン */}
        <button
          onClick={goToday}
          className="px-3 py-1 rounded-full border border-gray-300 text-sm hover:bg-gray-100 transition"
        >
          今日
        </button>
        {/* 中央：日付 */}
        <div className="text-center text-lg font-semibold tracking-wide">
          {format(currentDate, "yyyy年 M月 d日 (E)", { locale: ja })}
        </div>

        <div className="flex items-center">
          {/* 左ボタン */}
          <button
            onClick={() => goToDate(-1)}
            className="text-2xl font-bold px-2 hover:text-blue-500 transition"
          >
            ←
          </button>
          {/* 右ボタン */}
          <button
            onClick={() => goToDate(1)}
            className="text-2xl font-bold px-2 hover:text-blue-500 transition"
          >
            →
          </button>
        </div>
      </div>
    </>
  );
}
