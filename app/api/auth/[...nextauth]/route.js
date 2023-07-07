import User from "@/model/User";
import dbConnect from "@/utils/datebase";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

// console.log('process.env.GOOGLE_CLIENT_ID',process.env.GOOGLE_CLIENT_ID,process.env.GOOGLE_CLIENT_SECRET)

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async onError(error, _) {
      console.error("NextAuth Error:", error);
      // Handle the error or redirect the user to an error page
      throw error;
    },
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      return session;
    },

    async signIn({ profile }) {
      try {
        await dbConnect();
        const userExist = await User.findOne({
          email: profile.email,
        });

        if (!userExist) {
          await User.create({
            email: profile.email,
            username: profile.username?.replace(" ", "")?.toLowerCase(),
            image: profile.image,
          });
        }
      } catch (error) {}
    },
  },
});

export { handler as GET, handler as POST };
