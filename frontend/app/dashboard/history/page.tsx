"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Search,
    Filter,
    Download,
    Clock,
    Building2,
    ChevronLeft,
    ChevronRight,
    ArrowUpDown,
} from "lucide-react";

// Mock audit history data
const auditHistory = [
    { id: 1, brandName: "TechCorp", score: 78, sentiment: "positive", date: "2026-02-03T14:30:00", platforms: { chatgpt: true, gemini: true, perplexity: false } },
    { id: 2, brandName: "StartupXYZ", score: 45, sentiment: "neutral", date: "2026-02-02T10:15:00", platforms: { chatgpt: true, gemini: false, perplexity: true } },
    { id: 3, brandName: "InnovateCo", score: 23, sentiment: "negative", date: "2026-02-01T16:45:00", platforms: { chatgpt: false, gemini: false, perplexity: true } },
    { id: 4, brandName: "TechCorp", score: 65, sentiment: "positive", date: "2026-01-30T09:00:00", platforms: { chatgpt: true, gemini: true, perplexity: true } },
    { id: 5, brandName: "DataFlow", score: 82, sentiment: "positive", date: "2026-01-28T11:30:00", platforms: { chatgpt: true, gemini: true, perplexity: true } },
    { id: 6, brandName: "CloudSync", score: 55, sentiment: "neutral", date: "2026-01-25T15:00:00", platforms: { chatgpt: true, gemini: false, perplexity: true } },
];

export default function HistoryPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!session) {
        router.push("/");
        return null;
    }

    const filteredAudits = auditHistory.filter((audit) =>
        audit.brandName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredAudits.length / itemsPerPage);
    const paginatedAudits = filteredAudits.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
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
            year: "numeric",
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
                    <h1 className="text-3xl font-bold gradient-text">Audit History</h1>
                    <p className="text-muted-foreground">
                        View and search all your past brand audits
                    </p>
                </div>
                <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    Export CSV
                </Button>
            </div>

            {/* Search and Filters */}
            <Card className="glass-card border-0 mb-6">
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Search by brand name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 bg-secondary/50"
                            />
                        </div>
                        <Button variant="outline" className="gap-2">
                            <Filter className="w-4 h-4" />
                            Filters
                        </Button>
                        <Button variant="outline" className="gap-2">
                            <ArrowUpDown className="w-4 h-4" />
                            Sort
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Results Table */}
            <Card className="glass-card border-0">
                <CardHeader>
                    <CardTitle>
                        {filteredAudits.length} audit{filteredAudits.length !== 1 ? "s" : ""} found
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {paginatedAudits.map((audit) => (
                            <div
                                key={audit.id}
                                className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/40 transition-colors cursor-pointer"
                                onClick={() => router.push(`/dashboard/reports/${audit.id}`)}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                                        <Building2 className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="font-medium">{audit.brandName}</p>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Clock className="w-3 h-3" />
                                            {formatDate(audit.date)}
                                        </div>
                                    </div>
                                </div>

                                <div className="hidden md:flex items-center gap-2">
                                    {audit.platforms.chatgpt && (
                                        <Badge variant="outline" className="text-xs">ChatGPT</Badge>
                                    )}
                                    {audit.platforms.gemini && (
                                        <Badge variant="outline" className="text-xs">Gemini</Badge>
                                    )}
                                    {audit.platforms.perplexity && (
                                        <Badge variant="outline" className="text-xs">Perplexity</Badge>
                                    )}
                                </div>

                                <div className="flex items-center gap-4">
                                    {getSentimentBadge(audit.sentiment)}
                                    <div className="text-right">
                                        <p className={`text-2xl font-bold ${getScoreColor(audit.score)}`}>
                                            {audit.score}
                                        </p>
                                        <p className="text-xs text-muted-foreground">Score</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {paginatedAudits.length === 0 && (
                            <div className="text-center py-12 text-muted-foreground">
                                No audits found matching your search.
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between mt-6 pt-6 border-t border-border/50">
                            <p className="text-sm text-muted-foreground">
                                Page {currentPage} of {totalPages}
                            </p>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
