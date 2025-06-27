//next/src/app/todos/[date]/page.tsx
import TodoScreen from "@/screen/TodoScreen";
import { auth } from "../../../../auth";
import TodoHeader from "@/components/Header";

type PageProps = {
  params: Promise<{
    date: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const session = await auth();

  console.log(session?.user); // デバッグ用

  if (!session?.user) {
    return <div className="text-white p-6">ログインが必要です</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <TodoHeader date={(await params).date} />
      <TodoScreen sessionUser={session?.user} />
    </div>
  );
}
