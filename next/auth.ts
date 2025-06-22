import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// Check for required environment variables
const googleClientId = process.env.AUTH_GOOGLE_ID;
const googleClientSecret = process.env.AUTH_GOOGLE_SECRET;

if (!googleClientId || !googleClientSecret) {
  console.warn(
    "Missing required environment variables: AUTH_GOOGLE_ID and/or AUTH_GOOGLE_SECRET"
  );
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
  ],
  callbacks: {
    async redirect({ baseUrl }) {
      // サインイン成功後、今日の日付のページへリダイレクト
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      const todayStr = `${year}-${month}-${day}`;
      return `${baseUrl}/todos/${todayStr}`;
    },
  },
});
