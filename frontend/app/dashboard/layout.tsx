"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
