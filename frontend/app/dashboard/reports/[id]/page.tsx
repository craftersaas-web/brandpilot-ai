"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VisibilityIndex, ActionCenter, PlatformStatus } from "@/components/dashboard";
import {
    ArrowLeft,
    Download,
    Share2,
    Calendar,
    Building2,
} from "lucide-react";

// Mock report data
const reportData = {
    id: 1,
    brand_name: "TechCorp",
    visibility_score: 78,
    chatgpt_mentioned: true,
    gemini_mentioned: true,
    perplexity_mentioned: false,
    overall_sentiment: "positive",
    created_at: "2026-02-03T14:30:00",
    mentions: [
        {
            source: "chatgpt",
            query_type: "industry",
            query: "What are the top CRM tools?",
            response_preview: "TechCorp is one of the leading CRM platforms known for its innovative features...",
            brand_mentioned: true,
            contexts: ["TechCorp is known for innovative approach"],
            sentiment: "positive",
            sentiment_score: 0.75,
            is_mock: false,
        },
        {
            source: "gemini",
            query_type: "reputation",
            query: "What is the reputation of TechCorp?",
            response_preview: "TechCorp has built a solid reputation in the CRM industry...",
            brand_mentioned: true,
            contexts: ["solid reputation in the CRM industry"],
            sentiment: "positive",
            sentiment_score: 0.65,
            is_mock: false,
        },
    ],
    citation_gaps: [
        {
            platform: "Reddit r/CRM",
            url: "https://reddit.com/r/CRM/comments/example",
            competitor_mentioned: "Salesforce",
            context: "Discussion about enterprise CRM tools",
            priority: "high",
            pitch_template: "Have you considered TechCorp? We offer enterprise features at competitive pricing.",
        },
    ],
    hallucination_alerts: [],
};

export default function ReportPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const params = useParams();

    React.useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!session) {
        return null;
    }

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                                <Building2 className="w-5 h-5 text-purple-400" />
                            </div>
                            <h1 className="text-3xl font-bold gradient-text">
                                {reportData.brand_name}
                            </h1>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(reportData.created_at)}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="gap-2">
                        <Share2 className="w-4 h-4" />
                        Share
                    </Button>
                    <Button variant="outline" className="gap-2">
                        <Download className="w-4 h-4" />
                        Export PDF
                    </Button>
                </div>
            </div>

            {/* Report Content */}
            <div className="space-y-8">
                {/* Visibility Score and Platform Status */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <Card className="glass-card border-0">
                        <CardHeader>
                            <CardTitle className="text-center">Visibility Index</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <VisibilityIndex score={reportData.visibility_score} />
                        </CardContent>
                    </Card>

                    <div className="lg:col-span-2">
                        <PlatformStatus
                            chatgptMentioned={reportData.chatgpt_mentioned}
                            geminiMentioned={reportData.gemini_mentioned}
                            perplexityMentioned={reportData.perplexity_mentioned}
                            overallSentiment={reportData.overall_sentiment}
                            mentions={reportData.mentions}
                        />
                    </div>
                </div>

                {/* Action Center */}
                <div>
                    <h2 className="text-2xl font-bold mb-6">Action Center</h2>
                    <ActionCenter
                        citationGaps={reportData.citation_gaps}
                        hallucinationAlerts={reportData.hallucination_alerts}
                        brandName={reportData.brand_name}
                        industry="CRM"
                    />
                </div>

                {/* Summary */}
                <Card className="glass-card border-0">
                    <CardHeader>
                        <CardTitle>Report Summary</CardTitle>
                        <CardDescription>Key findings from this audit</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="p-4 rounded-lg bg-secondary/30">
                                <div className="text-2xl font-bold gradient-text">
                                    {reportData.visibility_score}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Visibility Score
                                </div>
                            </div>
                            <div className="p-4 rounded-lg bg-secondary/30">
                                <div className="text-2xl font-bold text-green-400">
                                    {[reportData.chatgpt_mentioned, reportData.gemini_mentioned, reportData.perplexity_mentioned].filter(Boolean).length}/3
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Platforms
                                </div>
                            </div>
                            <div className="p-4 rounded-lg bg-secondary/30">
                                <div className="text-2xl font-bold text-yellow-400">
                                    {reportData.citation_gaps.length}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Citation Gaps
                                </div>
                            </div>
                            <div className="p-4 rounded-lg bg-secondary/30">
                                <div className="text-2xl font-bold text-red-400">
                                    {reportData.hallucination_alerts.length}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Alerts
                                </div>
                            </div>
                        </div>
                        <p className="text-muted-foreground">
                            {reportData.brand_name} has a visibility score of {reportData.visibility_score}/100
                            across major AI platforms. The brand is mentioned in{" "}
                            {[reportData.chatgpt_mentioned && "ChatGPT", reportData.gemini_mentioned && "Gemini", reportData.perplexity_mentioned && "Perplexity"].filter(Boolean).join(", ") || "no platforms"}.
                            Overall sentiment is {reportData.overall_sentiment}.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
