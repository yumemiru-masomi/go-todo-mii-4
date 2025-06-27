import { handleSignIn } from "../../app/actions/auth";

export function SignInButton() {
  return (
    <form action={handleSignIn}>
      <button
        type="submit"
        className="px-6 py-3 rounded-xl bg-white/10 text-white/90 backdrop-blur-md hover:bg-white/20 transition"
      >
        Sign in with Google
      </button>
    </form>
  );
}
