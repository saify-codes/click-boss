import { getUserWithEmail, getUserWithEmailPass } from "@/util/db";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({

            async authorize(credentials) {
                const { email, password } = credentials;
                return await getUserWithEmailPass(email, password)
            }
        })
    ],
    callbacks: {
        session: async ({ session, token }) => {
            if (session){
                const user = await getUserWithEmail(session.user.email)
                token.role=user.role
                return user
            }
        },
    },
    pages: { signIn: '/login' },
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };