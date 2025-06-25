import { SignInButton } from "@/components/auth/SignInButton";

export default function SignIn() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">TODOアプリ</h1>
      <SignInButton />
    </main>
  );
}
