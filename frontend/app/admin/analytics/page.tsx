"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    TrendingUp,
    TrendingDown,
    Users,
    FileText,
    DollarSign,
    BarChart3,
    PieChart,
    Download,
} from "lucide-react";

// Mock analytics data
const monthlyStats = [
    { month: "Sep", users: 320, audits: 1200, revenue: 4500 },
    { month: "Oct", users: 450, audits: 2100, revenue: 6800 },
    { month: "Nov", users: 580, audits: 2800, revenue: 8200 },
    { month: "Dec", users: 720, audits: 3500, revenue: 9800 },
    { month: "Jan", users: 890, audits: 4200, revenue: 11200 },
    { month: "Feb", users: 1247, audits: 5100, revenue: 12450 },
];

const tierBreakdown = [
    { name: "Free", count: 850, percentage: 68, color: "bg-gray-500" },
    { name: "Pro", count: 312, percentage: 25, color: "bg-purple-500" },
    { name: "Agency", count: 85, percentage: 7, color: "bg-blue-500" },
];

const topIndustries = [
    { name: "Technology", audits: 1450, percentage: 28 },
    { name: "SaaS", audits: 1120, percentage: 22 },
    { name: "E-commerce", audits: 890, percentage: 17 },
    { name: "Marketing", audits: 720, percentage: 14 },
    { name: "Finance", audits: 540, percentage: 11 },
    { name: "Other", audits: 380, percentage: 8 },
];

export default function AdminAnalyticsPage() {
    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold gradient-text">Analytics</h1>
                    <p className="text-muted-foreground">
                        Platform performance and growth metrics
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Last 30 Days</Button>
                    <Button variant="outline" className="gap-2">
                        <Download className="w-4 h-4" />
                        Export Report
                    </Button>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="glass-card border-0">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 rounded-lg bg-purple-500/20">
                                <Users className="w-6 h-6 text-purple-400" />
                            </div>
                            <div className="flex items-center gap-1 text-green-400 text-sm">
                                <TrendingUp className="w-4 h-4" />
                                +40%
                            </div>
                        </div>
                        <p className="text-3xl font-bold">1,247</p>
                        <p className="text-muted-foreground">Total Users</p>
                        <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 w-3/4" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">75% to goal of 1,700</p>
                    </CardContent>
                </Card>

                <Card className="glass-card border-0">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 rounded-lg bg-blue-500/20">
                                <FileText className="w-6 h-6 text-blue-400" />
                            </div>
                            <div className="flex items-center gap-1 text-green-400 text-sm">
                                <TrendingUp className="w-4 h-4" />
                                +21%
                            </div>
                        </div>
                        <p className="text-3xl font-bold">5,100</p>
                        <p className="text-muted-foreground">Audits This Month</p>
                        <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 w-[85%]" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">85% to goal of 6,000</p>
                    </CardContent>
                </Card>

                <Card className="glass-card border-0">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 rounded-lg bg-green-500/20">
                                <DollarSign className="w-6 h-6 text-green-400" />
                            </div>
                            <div className="flex items-center gap-1 text-green-400 text-sm">
                                <TrendingUp className="w-4 h-4" />
                                +11%
                            </div>
                        </div>
                        <p className="text-3xl font-bold">$12,450</p>
                        <p className="text-muted-foreground">Monthly Revenue</p>
                        <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 w-[83%]" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">83% to goal of $15,000</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Growth Chart Placeholder */}
                <Card className="glass-card border-0">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="w-5 h-5" />
                            Growth Trend
                        </CardTitle>
                        <CardDescription>Users and audits over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 flex items-end justify-between gap-2">
                            {monthlyStats.map((stat, idx) => (
                                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                                    <div className="w-full flex flex-col gap-1">
                                        <div
                                            className="w-full bg-purple-500/50 rounded-t"
                                            style={{ height: `${stat.users / 15}px` }}
                                        />
                                        <div
                                            className="w-full bg-blue-500/50 rounded-b"
                                            style={{ height: `${stat.audits / 80}px` }}
                                        />
                                    </div>
                                    <span className="text-xs text-muted-foreground">{stat.month}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center justify-center gap-6 mt-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded bg-purple-500/50" />
                                <span className="text-sm text-muted-foreground">Users</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded bg-blue-500/50" />
                                <span className="text-sm text-muted-foreground">Audits</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tier Breakdown */}
                <Card className="glass-card border-0">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <PieChart className="w-5 h-5" />
                            Subscription Breakdown
                        </CardTitle>
                        <CardDescription>Users by tier</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {tierBreakdown.map((tier, idx) => (
                                <div key={idx} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-3 h-3 rounded-full ${tier.color}`} />
                                            <span className="font-medium">{tier.name}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="font-bold">{tier.count}</span>
                                            <span className="text-muted-foreground ml-2">({tier.percentage}%)</span>
                                        </div>
                                    </div>
                                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${tier.color}`}
                                            style={{ width: `${tier.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 p-4 rounded-lg bg-secondary/30">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-muted-foreground">Conversion Rate</span>
                                <span className="font-bold text-green-400">32%</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                32% of free users convert to paid plans
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Top Industries */}
            <Card className="glass-card border-0">
                <CardHeader>
                    <CardTitle>Top Industries</CardTitle>
                    <CardDescription>Most audited industries on the platform</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {topIndustries.map((industry, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center text-sm font-bold">
                                        {idx + 1}
                                    </div>
                                    <span className="font-medium">{industry.name}</span>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold">{industry.audits.toLocaleString()}</p>
                                    <p className="text-xs text-muted-foreground">{industry.percentage}%</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
