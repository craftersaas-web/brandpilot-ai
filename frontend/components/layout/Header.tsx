"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AuthModal } from "@/components/auth";
import {
    Eye,
    User,
    LogOut,
    Settings,
    Shield,
    ChevronDown,
    Menu,
} from "lucide-react";

interface HeaderProps {
    onMenuToggle?: () => void;
    showMenuButton?: boolean;
}

export function Header({ onMenuToggle, showMenuButton = false }: HeaderProps) {
    const { data: session, status } = useSession();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authView, setAuthView] = useState<"login" | "signup">("login");
    const [showUserMenu, setShowUserMenu] = useState(false);

    const isAdmin = (session?.user as any)?.role === "admin";
    const tier = (session?.user as any)?.tier || "free";

    const getTierBadge = () => {
        switch (tier) {
            case "pro":
                return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Pro</Badge>;
            case "agency":
                return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Agency</Badge>;
            default:
                return <Badge variant="outline" className="text-muted-foreground">Free</Badge>;
        }
    };

    return (
        <>
            <header className="glass-strong sticky top-0 z-50 border-b border-border/50">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Left side */}
                        <div className="flex items-center gap-4">
                            {showMenuButton && (
                                <Button variant="ghost" size="icon" onClick={onMenuToggle}>
                                    <Menu className="w-5 h-5" />
                                </Button>
                            )}
                            <Link href="/" className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 glow-purple">
                                    <Eye className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold gradient-text">BrandPilot AI</h1>
                                    <p className="text-xs text-muted-foreground">
                                        Generative Engine Optimization
                                    </p>
                                </div>
                            </Link>
                        </div>

                        {/* Right side */}
                        <div className="flex items-center gap-4">
                            {status === "loading" ? (
                                <div className="w-8 h-8 rounded-full bg-secondary animate-pulse" />
                            ) : session?.user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary/50 transition-colors"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-medium">
                                            {session.user.name?.charAt(0) ||
                                                session.user.email?.charAt(0)}
                                        </div>
                                        <div className="hidden md:block text-left">
                                            <p className="text-sm font-medium">{session.user.name}</p>
                                            <div className="flex items-center gap-2">
                                                {getTierBadge()}
                                                {isAdmin && (
                                                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                                                        Admin
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                    </button>

                                    {/* Dropdown menu */}
                                    {showUserMenu && (
                                        <div className="absolute right-0 top-full mt-2 w-48 glass-card rounded-lg border border-border/50 py-2 shadow-xl">
                                            <Link
                                                href="/dashboard"
                                                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-secondary/50"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                <User className="w-4 h-4" />
                                                Dashboard
                                            </Link>
                                            <Link
                                                href="/dashboard/settings"
                                                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-secondary/50"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                <Settings className="w-4 h-4" />
                                                Settings
                                            </Link>
                                            {isAdmin && (
                                                <Link
                                                    href="/admin"
                                                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-secondary/50"
                                                    onClick={() => setShowUserMenu(false)}
                                                >
                                                    <Shield className="w-4 h-4" />
                                                    Admin Panel
                                                </Link>
                                            )}
                                            <hr className="my-2 border-border/50" />
                                            <button
                                                onClick={() => signOut({ callbackUrl: "/" })}
                                                className="flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-secondary/50 w-full"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Sign Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        onClick={() => {
                                            setAuthView("login");
                                            setShowAuthModal(true);
                                        }}
                                    >
                                        Sign In
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setAuthView("signup");
                                            setShowAuthModal(true);
                                        }}
                                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
                                    >
                                        Get Started
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                defaultView={authView}
                onSuccess={() => setShowAuthModal(false)}
            />
        </>
    );
}
