//next/src/app/todos/[date]/page.tsx
"use client";

import TodoHeader from "@/components/Header";
import { use, useCallback, useEffect, useState } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type PageProps = {
  params: Promise<{
    date: string;
  }>;
};

export default function TodoPage({ params }: PageProps) {
  const { date } = use(params);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchTodos = useCallback(async () => {
    const res = await fetch(`${apiUrl}/todos`);
    const data = await res.json();
    setTodos(data);
  }, [apiUrl]);

  // Todo取得
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAddTodo = async () => {
    await fetch(`${apiUrl}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTitle,
        completed: false,
      }),
    });

    //入れた値をリセット
    setNewTitle("");
    //全Todoリストを再取得する
    fetchTodos();
  };

  const handleToggleCompleted = async (todo: Todo) => {
    await fetch(`${apiUrl}/todos/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: todo.title,
        completed: !todo.completed,
      }),
    });

    fetchTodos();
  };

  const handleDeleteTodo = async (todo: Todo) => {
    await fetch(`${apiUrl}/todos/${todo.id}`, {
      method: "DELETE",
    });

    fetchTodos();
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <TodoHeader date={date} />
      {/* 入力フォーム */}
      <div className="flex items-center gap-2 mb-6">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="新しいTodoを入力..."
          className="flex-1 p-2 rounded-lg bg-white/10 backdrop-blur-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition"
        />
        <button
          onClick={handleAddTodo}
          className="px-4 py-2 rounded-full text-sm font-semibold text-white bg-white/10 hover:bg-white/20 transition"
        >
          追加
        </button>
      </div>

      {/* Todo一覧 */}
      <ul className="space-y-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center p-4 rounded-xl shadow-lg bg-white/20 backdrop-blur-md hover:bg-white/30 transition"
          >
            <div className="flex items-center">
              {/* チェックボックス */}
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleCompleted(todo)}
                className="w-5 h-5 mr-4 rounded border border-white/30 bg-white/10 checked:bg-white/40 checked:border-white/50 appearance-none checked:after:content-['✔'] checked:after:text-white checked:after:text-sm checked:after:block checked:after:text-center transition"
              />
              <span className="text-lg font-medium text-white">
                {todo.title}
              </span>
            </div>
            <button
              onClick={() => handleDeleteTodo(todo)}
              className={`px-3 py-1 rounded-full text-sm font-semibold text-white`}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
