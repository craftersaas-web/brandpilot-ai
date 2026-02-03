import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Mock user database for demo
const users = [
    {
        id: "1",
        email: "demo@geosight.ai",
        password: "demo123",
        name: "Demo User",
        role: "user",
        tier: "pro",
    },
    {
        id: "2",
        email: "admin@geosight.ai",
        password: "admin123",
        name: "Admin User",
        role: "admin",
        tier: "agency",
    },
];

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = users.find(
                    (u) =>
                        u.email === credentials.email && u.password === credentials.password
                );

                if (user) {
                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                        tier: user.tier,
                    };
                }

                return null;
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role || "user";
                token.tier = (user as any).tier || "free";
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.sub;
                (session.user as any).role = token.role;
                (session.user as any).tier = token.tier;
            }
            return session;
        },
    },
    pages: {
        signIn: "/",
    },
    secret: process.env.NEXTAUTH_SECRET || "geosight-secret-key-change-in-production",
});

export const handlers = { GET: handler, POST: handler };
export { handler as GET, handler as POST };
