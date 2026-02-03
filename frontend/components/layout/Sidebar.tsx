"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Search,
    History,
    Settings,
    Building2,
    ChevronLeft,
    ChevronRight,
    LogOut,
    Shield,
    Users,
    BarChart3,
    FileText,
    Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
    collapsed?: boolean;
    onToggle?: () => void;
}

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
    const pathname = usePathname();
    const { data: session } = useSession();
    const isAdmin = (session?.user as any)?.role === "admin";

    const userNavItems = [
        { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { href: "/dashboard/action-center", icon: Sparkles, label: "Action Center" },
        { href: "/dashboard/history", icon: History, label: "Audit History" },
        { href: "/dashboard/brands", icon: Building2, label: "Brands" },
        { href: "/dashboard/settings", icon: Settings, label: "Settings" },
    ];


    const adminNavItems = [
        { href: "/admin", icon: Shield, label: "Admin Panel" },
        { href: "/admin/users", icon: Users, label: "Users" },
        { href: "/admin/audits", icon: FileText, label: "Audits" },
        { href: "/admin/analytics", icon: BarChart3, label: "Analytics" },
        { href: "/admin/settings", icon: Settings, label: "Settings" },
    ];

    const navItems = isAdmin ? adminNavItems : userNavItems;

    return (
        <aside
            className={cn(
                "fixed left-0 top-0 z-40 h-screen glass-strong border-r border-border/50 transition-all duration-300",
                collapsed ? "w-16" : "w-64"
            )}
        >
            {/* Logo */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-border/50">
                {!collapsed && (
                    <Link href="/" className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
                            <Search className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold gradient-text">BrandPilot AI</span>
                    </Link>
                )}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onToggle}
                    className="ml-auto"
                >
                    {collapsed ? (
                        <ChevronRight className="w-4 h-4" />
                    ) : (
                        <ChevronLeft className="w-4 h-4" />
                    )}
                </Button>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                                isActive
                                    ? "bg-primary/20 text-primary"
                                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                            )}
                        >
                            <item.icon className="w-5 h-5 flex-shrink-0" />
                            {!collapsed && <span>{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* User Section */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border/50">
                {session?.user && (
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-medium">
                            {session.user.name?.charAt(0) || session.user.email?.charAt(0)}
                        </div>
                        {!collapsed && (
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{session.user.name}</p>
                                <p className="text-xs text-muted-foreground truncate">
                                    {session.user.email}
                                </p>
                            </div>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="flex-shrink-0"
                        >
                            <LogOut className="w-4 h-4" />
                        </Button>
                    </div>
                )}
            </div>
        </aside>
    );
}
