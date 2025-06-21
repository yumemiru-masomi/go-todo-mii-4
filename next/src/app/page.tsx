// app/page.tsx
import { redirect } from "next/navigation";

export default function Home() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // 01〜12
  const day = String(today.getDate()).padStart(2, "0"); // 01〜31
  const todayStr = `${year}-${month}-${day}`;

  redirect(`/todos/${todayStr}`);
}
