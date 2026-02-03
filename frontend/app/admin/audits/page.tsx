"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Search,
    Filter,
    Download,
    Eye,
    Calendar,
    Clock,
    Building2,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

// Mock audits data
const auditsData = [
    { id: 1, brandName: "TechCorp", userId: 1, userEmail: "john@example.com", score: 78, sentiment: "positive", date: "2026-02-03T14:30:00", duration: "12s" },
    { id: 2, brandName: "StartupXYZ", userId: 2, userEmail: "sarah@startup.io", score: 45, sentiment: "neutral", date: "2026-02-03T14:15:00", duration: "8s" },
    { id: 3, brandName: "InnovateCo", userId: 4, userEmail: "emily@agency.co", score: 23, sentiment: "negative", date: "2026-02-03T13:45:00", duration: "15s" },
    { id: 4, brandName: "DataFlow", userId: 2, userEmail: "sarah@startup.io", score: 82, sentiment: "positive", date: "2026-02-03T12:30:00", duration: "10s" },
    { id: 5, brandName: "CloudSync", userId: 1, userEmail: "john@example.com", score: 55, sentiment: "neutral", date: "2026-02-03T11:00:00", duration: "9s" },
    { id: 6, brandName: "AIVentures", userId: 3, userEmail: "mike@techcorp.com", score: 67, sentiment: "positive", date: "2026-02-02T16:30:00", duration: "11s" },
];

export default function AdminAuditsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredAudits = auditsData.filter(
        (audit) =>
            audit.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            audit.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getScoreColor = (score: number) => {
        if (score >= 70) return "text-green-400";
        if (score >= 40) return "text-yellow-400";
        return "text-red-400";
    };

    const getSentimentBadge = (sentiment: string) => {
        switch (sentiment) {
            case "positive":
                return <Badge className="bg-green-500/20 text-green-400">Positive</Badge>;
            case "negative":
                return <Badge className="bg-red-500/20 text-red-400">Negative</Badge>;
            default:
                return <Badge className="bg-yellow-500/20 text-yellow-400">Neutral</Badge>;
        }
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold gradient-text">Audit Logs</h1>
                    <p className="text-muted-foreground">
                        View all audits across the platform
                    </p>
                </div>
                <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    Export CSV
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="glass-card border-0">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Audits</p>
                                <p className="text-2xl font-bold">1,247</p>
                            </div>
                            <Building2 className="w-8 h-8 text-purple-400" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="glass-card border-0">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Today</p>
                                <p className="text-2xl font-bold">89</p>
                            </div>
                            <Calendar className="w-8 h-8 text-blue-400" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="glass-card border-0">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Avg Score</p>
                                <p className="text-2xl font-bold text-green-400">58</p>
                            </div>
                            <Eye className="w-8 h-8 text-green-400" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="glass-card border-0">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Avg Time</p>
                                <p className="text-2xl font-bold">10.4s</p>
                            </div>
                            <Clock className="w-8 h-8 text-yellow-400" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search and Filters */}
            <Card className="glass-card border-0 mb-6">
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Search by brand or user email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 bg-secondary/50"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" className="gap-2">
                                <Filter className="w-4 h-4" />
                                Date Range
                            </Button>
                            <Button variant="outline" className="gap-2">
                                <Filter className="w-4 h-4" />
                                Sentiment
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Audits Table */}
            <Card className="glass-card border-0">
                <CardHeader>
                    <CardTitle>{filteredAudits.length} Audits</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border/50">
                                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Brand</th>
                                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">User</th>
                                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Score</th>
                                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Sentiment</th>
                                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Duration</th>
                                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAudits.map((audit) => (
                                    <tr key={audit.id} className="border-b border-border/50 hover:bg-secondary/20">
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                                                    <Building2 className="w-5 h-5 text-purple-400" />
                                                </div>
                                                <span className="font-medium">{audit.brandName}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-muted-foreground">{audit.userEmail}</td>
                                        <td className="py-4 px-4">
                                            <span className={`text-xl font-bold ${getScoreColor(audit.score)}`}>
                                                {audit.score}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">{getSentimentBadge(audit.sentiment)}</td>
                                        <td className="py-4 px-4 text-muted-foreground">{audit.duration}</td>
                                        <td className="py-4 px-4 text-muted-foreground">{formatDate(audit.date)}</td>
                                        <td className="py-4 px-4 text-right">
                                            <Button variant="ghost" size="sm" className="gap-2">
                                                <Eye className="w-4 h-4" />
                                                View
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-border/50">
                        <p className="text-sm text-muted-foreground">
                            Showing 1-6 of 1,247 audits
                        </p>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" disabled>
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
