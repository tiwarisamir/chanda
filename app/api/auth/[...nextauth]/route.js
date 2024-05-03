import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import connectDB from "@/db/connectDB";
import User from "@/models/User";
import Payment from "@/models/Payment";

export const authoptions = NextAuth({
  providers: [
    // OAuth authentication providers...

    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),
    // Passwordless / email sign in
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: "NextAuth.js <no-reply@example.com>",
    // }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === "github") {
        await connectDB();

        const currentUser = await User.findOne({ email: user.email });
        if (!currentUser) {
          const newUser = new User({
            email: user.email,
            username: user.email.split("@")[0],
          });
          await newUser.save();
        }
        return true;
      }
    },
    async session({ session, user, token }) {
      const dbUser = await User.findOne({ email: session.user.email });
      session.user.name = dbUser.username;
      return session;
    },
  },
});

export { authoptions as GET, authoptions as POST };
