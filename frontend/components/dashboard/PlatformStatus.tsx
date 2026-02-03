"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, MessageSquare } from "lucide-react";

interface Mention {
    source: string;
    query_type: string;
    query: string;
    response_preview: string;
    brand_mentioned: boolean;
    contexts: string[];
    sentiment: string;
    sentiment_score: number;
    is_mock: boolean;
}

interface PlatformStatusProps {
    chatgptMentioned: boolean;
    geminiMentioned: boolean;
    perplexityMentioned: boolean;
    overallSentiment: string;
    mentions: Mention[];
}

export function PlatformStatus({
    chatgptMentioned,
    geminiMentioned,
    perplexityMentioned,
    overallSentiment,
    mentions
}: PlatformStatusProps) {

    const platforms = [
        {
            name: "ChatGPT",
            mentioned: chatgptMentioned,
            icon: "🤖",
            badgeClass: "badge-chatgpt"
        },
        {
            name: "Gemini",
            mentioned: geminiMentioned,
            icon: "✨",
            badgeClass: "badge-gemini"
        },
        {
            name: "Perplexity",
            mentioned: perplexityMentioned,
            icon: "🔍",
            badgeClass: "badge-perplexity"
        },
    ];

    const getSentimentIcon = (sentiment: string) => {
        switch (sentiment) {
            case "positive": return "😊";
            case "negative": return "😟";
            default: return "😐";
        }
    };

    const getSentimentClass = (sentiment: string) => {
        switch (sentiment) {
            case "positive": return "sentiment-positive";
            case "negative": return "sentiment-negative";
            default: return "sentiment-neutral";
        }
    };

    return (
        <div className="space-y-6">
            {/* Platform Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {platforms.map((platform) => (
                    <Card
                        key={platform.name}
                        className={`glass-card border-0 transition-all duration-300 ${platform.mentioned ? "glow-green" : ""
                            }`}
                    >
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{platform.icon}</span>
                                    <div>
                                        <div className="font-medium">{platform.name}</div>
                                        <div className={`text-sm ${platform.mentioned ? "text-green-400" : "text-muted-foreground"}`}>
                                            {platform.mentioned ? "Brand Mentioned" : "Not Found"}
                                        </div>
                                    </div>
                                </div>
                                {platform.mentioned ? (
                                    <CheckCircle className="w-6 h-6 text-green-400" />
                                ) : (
                                    <XCircle className="w-6 h-6 text-muted-foreground" />
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Overall Sentiment */}
            <Card className="glass-card border-0">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <MessageSquare className="w-5 h-5" />
                        Overall Sentiment Analysis
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <span className="text-4xl">{getSentimentIcon(overallSentiment)}</span>
                        <div>
                            <div className={`text-xl font-semibold capitalize ${getSentimentClass(overallSentiment)}`}>
                                {overallSentiment}
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Based on analysis across all AI platforms
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Detailed Mentions */}
            {mentions.length > 0 && (
                <Card className="glass-card border-0">
                    <CardHeader>
                        <CardTitle className="text-lg">Detailed Responses</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {mentions.slice(0, 4).map((mention, index) => (
                            <div
                                key={index}
                                className="p-4 rounded-lg bg-secondary/30 border border-border/50 space-y-2"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="capitalize">
                                            {mention.source}
                                        </Badge>
                                        <Badge variant="secondary" className="capitalize">
                                            {mention.query_type}
                                        </Badge>
                                        {mention.is_mock && (
                                            <Badge variant="outline" className="text-xs bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                                                Demo Data
                                            </Badge>
                                        )}
                                    </div>
                                    <div className={`flex items-center gap-1 ${getSentimentClass(mention.sentiment)}`}>
                                        <span className="text-sm">{getSentimentIcon(mention.sentiment)}</span>
                                        <span className="text-xs capitalize">{mention.sentiment}</span>
                                    </div>
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-3">
                                    {mention.response_preview}
                                </p>
                                {mention.brand_mentioned && mention.contexts.length > 0 && (
                                    <div className="pt-2 border-t border-border/30">
                                        <span className="text-xs text-green-400">Brand mentioned in context:</span>
                                        <p className="text-xs text-muted-foreground mt-1 italic">
                                            &ldquo;...{mention.contexts[0]}...&rdquo;
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
