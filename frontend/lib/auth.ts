import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

// Fallback mock users for when backend is not available
const mockUsers = [
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

export const authOptions: NextAuthOptions = {
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

                try {
                    // Try backend authentication first
                    const response = await fetch(`${BACKEND_URL}/api/auth/login/json`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        return {
                            id: String(data.user.id),
                            email: data.user.email,
                            name: data.user.name,
                            role: data.user.role,
                            tier: data.user.tier,
                            accessToken: data.access_token,
                        };
                    }
                } catch (error) {
                    console.log("Backend unavailable, using mock auth");
                }

                // Fallback to mock users if backend is unavailable
                const user = mockUsers.find(
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
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role || "user";
                token.tier = (user as any).tier || "free";
                token.accessToken = (user as any).accessToken;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.sub;
                (session.user as any).role = token.role;
                (session.user as any).tier = token.tier;
                (session.user as any).accessToken = token.accessToken;
            }
            return session;
        },
    },
    pages: {
        signIn: "/",
        error: "/",
    },
    secret: process.env.NEXTAUTH_SECRET || "geosight-secret-key-change-in-production",
};

export default NextAuth(authOptions);
