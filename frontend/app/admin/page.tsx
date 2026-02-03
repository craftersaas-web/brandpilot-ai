"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Users,
    FileText,
    TrendingUp,
    DollarSign,
    Activity,
    ArrowRight,
    ArrowUpRight,
    ArrowDownRight,
    Building2,
    Eye,
} from "lucide-react";

// Mock data
const stats = [
    { label: "Total Users", value: "1,247", change: "+12%", trend: "up", icon: Users },
    { label: "Audits Today", value: "89", change: "+5%", trend: "up", icon: FileText },
    { label: "Monthly Revenue", value: "$12,450", change: "+18%", trend: "up", icon: DollarSign },
    { label: "Active Sessions", value: "34", change: "-3%", trend: "down", icon: Activity },
];

const recentActivity = [
    { type: "user", action: "New signup", detail: "john@example.com", time: "2 min ago" },
    { type: "audit", action: "Audit completed", detail: "TechCorp - Score: 78", time: "5 min ago" },
    { type: "payment", action: "New subscription", detail: "$49 Pro plan", time: "12 min ago" },
    { type: "user", action: "Plan upgrade", detail: "sarah@startup.io → Agency", time: "25 min ago" },
    { type: "audit", action: "Audit completed", detail: "StartupXYZ - Score: 45", time: "32 min ago" },
];

const topBrands = [
    { name: "TechCorp", audits: 45, avgScore: 72 },
    { name: "DataFlow Inc", audits: 38, avgScore: 68 },
    { name: "CloudSync", audits: 32, avgScore: 54 },
    { name: "InnovateCo", audits: 28, avgScore: 41 },
];

export default function AdminDashboard() {
    const { data: session } = useSession();

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold gradient-text">Admin Dashboard</h1>
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Admin</Badge>
                </div>
                <p className="text-muted-foreground mt-1">
                    Welcome back, {session?.user?.name}. Here's what's happening.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, idx) => (
                    <Card key={idx} className="glass-card border-0">
                        <CardContent className="pt-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                                </div>
                                <div className={`p-3 rounded-lg ${stat.trend === "up" ? "bg-green-500/20" : "bg-red-500/20"
                                    }`}>
                                    <stat.icon className={`w-6 h-6 ${stat.trend === "up" ? "text-green-400" : "text-red-400"
                                        }`} />
                                </div>
                            </div>
                            <div className={`flex items-center gap-1 mt-3 text-sm ${stat.trend === "up" ? "text-green-400" : "text-red-400"
                                }`}>
                                {stat.trend === "up" ? (
                                    <ArrowUpRight className="w-4 h-4" />
                                ) : (
                                    <ArrowDownRight className="w-4 h-4" />
                                )}
                                <span>{stat.change} from last month</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity */}
                <Card className="glass-card border-0">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="w-5 h-5" />
                                Recent Activity
                            </CardTitle>
                            <CardDescription>Latest platform events</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivity.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${item.type === "user" ? "bg-purple-400" :
                                                item.type === "audit" ? "bg-blue-400" :
                                                    "bg-green-400"
                                            }`} />
                                        <div>
                                            <p className="font-medium">{item.action}</p>
                                            <p className="text-sm text-muted-foreground">{item.detail}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-muted-foreground">{item.time}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Top Brands */}
                <Card className="glass-card border-0">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Building2 className="w-5 h-5" />
                                Top Audited Brands
                            </CardTitle>
                            <CardDescription>Most active brands on the platform</CardDescription>
                        </div>
                        <Link href="/admin/audits">
                            <Button variant="ghost" className="gap-2">
                                View All <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {topBrands.map((brand, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                                            <Eye className="w-5 h-5 text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{brand.name}</p>
                                            <p className="text-sm text-muted-foreground">{brand.audits} audits</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-xl font-bold ${brand.avgScore >= 60 ? "text-green-400" :
                                                brand.avgScore >= 40 ? "text-yellow-400" :
                                                    "text-red-400"
                                            }`}>
                                            {brand.avgScore}
                                        </p>
                                        <p className="text-xs text-muted-foreground">Avg Score</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Link href="/admin/users">
                        <Card className="glass-card border-0 hover:bg-secondary/30 transition-colors cursor-pointer">
                            <CardContent className="py-6 text-center">
                                <Users className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                                <p className="font-medium">Manage Users</p>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/admin/audits">
                        <Card className="glass-card border-0 hover:bg-secondary/30 transition-colors cursor-pointer">
                            <CardContent className="py-6 text-center">
                                <FileText className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                                <p className="font-medium">View Audits</p>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/admin/analytics">
                        <Card className="glass-card border-0 hover:bg-secondary/30 transition-colors cursor-pointer">
                            <CardContent className="py-6 text-center">
                                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-400" />
                                <p className="font-medium">Analytics</p>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/admin/settings">
                        <Card className="glass-card border-0 hover:bg-secondary/30 transition-colors cursor-pointer">
                            <CardContent className="py-6 text-center">
                                <Activity className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                                <p className="font-medium">Settings</p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
    );
}
