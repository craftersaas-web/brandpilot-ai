"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    // Check if user is admin
    const isAdmin = (session?.user as any)?.role === "admin";

    React.useEffect(() => {
        if (status === "unauthenticated" || (status === "authenticated" && !isAdmin)) {
            router.push("/");
        }
    }, [status, isAdmin, router]);

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!session || !isAdmin) {
        return null;
    }

    return (
        <div className="min-h-screen">
            <Sidebar
                collapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            />
            <main
                className={`transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-64"
                    }`}
            >
                {children}
            </main>
        </div>
    );
}
