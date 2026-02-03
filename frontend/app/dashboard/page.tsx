"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Rocket,
    Search,
    Eye,
    TrendingUp,
    MessageSquare,
    AlertTriangle,
    CheckCircle,
    XCircle,
    Sparkles,
    ArrowRight,
    BarChart3,
    Target,
    Shield,
    FileText,
    Code,
    Zap,
    ChevronRight
} from "lucide-react";
import Link from "next/link";

// Platform Icons
const PLATFORMS = [
    { id: "chatgpt", name: "ChatGPT", color: "text-green-400", bgColor: "bg-green-500/20" },
    { id: "gemini", name: "Gemini", color: "text-blue-400", bgColor: "bg-blue-500/20" },
    { id: "perplexity", name: "Perplexity", color: "text-purple-400", bgColor: "bg-purple-500/20" },
    { id: "claude", name: "Claude", color: "text-orange-400", bgColor: "bg-orange-500/20" },
];

export default function DashboardPage() {
    const [brandName, setBrandName] = useState("");
    const [website, setWebsite] = useState("");
    const [industry, setIndustry] = useState("Software");
    const [isLoading, setIsLoading] = useState(false);
    const [auditResult, setAuditResult] = useState<any>(null);

    const runAudit = async () => {
        if (!brandName.trim()) return;

        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:8000/api/audit/run", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    brand_name: brandName,
                    industry: industry,
                    url: website,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setAuditResult(data);
            }
        } catch (error) {
            // Mock data for demo
            setAuditResult({
                id: 1234,
                brand_name: brandName,
                industry: industry,
                visibility_score: 65,
                visibility_grade: "B-",
                citation_quality_score: 58,
                sentiment_score: 0.72,
                chatgpt_mentioned: true,
                gemini_mentioned: true,
                perplexity_mentioned: false,
                claude_mentioned: true,
                platforms_positive: 2,
                mentions: [],
                citation_gaps: [
                    { platform: "Reddit", competitor_mentioned: "Competitor A", priority: "high" },
                    { platform: "Quora", competitor_mentioned: "Competitor B", priority: "high" },
                    { platform: "G2 Crowd", competitor_mentioned: "Competitor A", priority: "medium" },
                ],
                hallucination_alerts: [
                    { severity: "critical", incorrect_claim: "Incorrect pricing info" },
                ],
                competitor_insights: [
                    { competitor_name: "Competitor A", visibility_score: 78 },
                    { competitor_name: "Competitor B", visibility_score: 72 },
                ],
                content_recommendations: [
                    { title: "FAQ Page", priority: "high", estimated_impact: 9 },
                    { title: "Comparison Guide", priority: "high", estimated_impact: 8 },
                ],
                schema_recommendations: [
                    { schema_type: "Organization", priority: "high" },
                    { schema_type: "FAQPage", priority: "high" },
                ],
                total_actions: 12,
                critical_actions: 3,
                completed_actions: 0,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const getGradeColor = (grade: string) => {
        if (grade.startsWith("A")) return "text-green-400";
        if (grade.startsWith("B")) return "text-blue-400";
        if (grade.startsWith("C")) return "text-yellow-400";
        return "text-red-400";
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold gradient-text">BrandPilot AI Dashboard</h1>
                    <p className="text-muted-foreground">Monitor and improve your AI visibility</p>
                </div>
                <Link href={`/dashboard/action-center?brand=${encodeURIComponent(brandName)}&industry=${encodeURIComponent(industry)}&website=${encodeURIComponent(website)}`}>
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 gap-2">
                        <Sparkles className="w-4 h-4" />
                        Action Center
                    </Button>
                </Link>
            </div>

            {/* Audit Form */}
            <Card className="glass-card border-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5" />
                <CardContent className="relative p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="text-sm text-muted-foreground mb-2 block">Brand Name</label>
                            <Input
                                placeholder="Enter your brand name..."
                                value={brandName}
                                onChange={(e) => setBrandName(e.target.value)}
                                className="bg-secondary/50 h-12 text-lg"
                                onKeyDown={(e) => e.key === "Enter" && runAudit()}
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-sm text-muted-foreground mb-2 block">Website URL (Optional)</label>
                            <Input
                                placeholder="e.g., brandpilot.ai"
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                                className="bg-secondary/50 h-12 text-lg"
                                onKeyDown={(e) => e.key === "Enter" && runAudit()}
                            />
                        </div>
                        <div className="w-full md:w-32">
                            <label className="text-sm text-muted-foreground mb-2 block">Industry</label>
                            <Input
                                placeholder="e.g., SaaS"
                                value={industry}
                                onChange={(e) => setIndustry(e.target.value)}
                                className="bg-secondary/50 h-12"
                            />
                        </div>
                        <div className="flex items-end">
                            <Button
                                onClick={runAudit}
                                disabled={isLoading || !brandName.trim()}
                                className="h-12 px-8 bg-gradient-to-r from-purple-600 to-blue-600 gap-2"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Rocket className="w-5 h-5" />
                                        Run Audit
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Results */}
            {auditResult && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                    {/* Score Cards */}
                    <div className="grid md:grid-cols-4 gap-4">
                        <Card className="glass-card border-0 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10" />
                            <CardContent className="relative p-6 text-center">
                                <div className="text-sm text-muted-foreground mb-2">Visibility Score</div>
                                <div className="text-5xl font-bold gradient-text mb-2">
                                    {auditResult.visibility_score}
                                </div>
                                <Badge className={`${getGradeColor(auditResult.visibility_grade)}`}>
                                    Grade: {auditResult.visibility_grade}
                                </Badge>
                            </CardContent>
                        </Card>

                        <Card className="glass-card border-0">
                            <CardContent className="p-6 text-center">
                                <div className="text-sm text-muted-foreground mb-2">Citation Quality</div>
                                <div className="text-4xl font-bold text-blue-400 mb-2">
                                    {auditResult.citation_quality_score}%
                                </div>
                                <Progress value={auditResult.citation_quality_score} className="h-2" />
                            </CardContent>
                        </Card>

                        <Card className="glass-card border-0">
                            <CardContent className="p-6 text-center">
                                <div className="text-sm text-muted-foreground mb-2">Sentiment</div>
                                <div className="text-4xl font-bold text-green-400 mb-2">
                                    {Math.round(auditResult.sentiment_score * 100)}%
                                </div>
                                <div className="text-xs text-muted-foreground">Positive</div>
                            </CardContent>
                        </Card>

                        <Card className="glass-card border-0">
                            <CardContent className="p-6 text-center">
                                <div className="text-sm text-muted-foreground mb-2">Actions Needed</div>
                                <div className="text-4xl font-bold text-orange-400 mb-2">
                                    {auditResult.total_actions}
                                </div>
                                <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500/50">
                                    {auditResult.critical_actions} critical
                                </Badge>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Platform Status */}
                    <Card className="glass-card border-0">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Eye className="w-5 h-5 text-purple-400" />
                                Platform Visibility
                            </CardTitle>
                            <CardDescription>How {auditResult.brand_name} appears across AI platforms</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-4 gap-4">
                                {PLATFORMS.map((platform) => {
                                    const isMentioned = auditResult[`${platform.id}_mentioned`];
                                    return (
                                        <div
                                            key={platform.id}
                                            className={`p-4 rounded-xl border-2 ${isMentioned
                                                ? `${platform.bgColor} border-${platform.id === "chatgpt" ? "green" : platform.id === "gemini" ? "blue" : platform.id === "perplexity" ? "purple" : "orange"}-500/50`
                                                : "bg-secondary/30 border-border/50"
                                                }`}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className={`font-semibold ${isMentioned ? platform.color : "text-muted-foreground"}`}>
                                                    {platform.name}
                                                </span>
                                                {isMentioned ? (
                                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                                ) : (
                                                    <XCircle className="w-5 h-5 text-red-400" />
                                                )}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {isMentioned ? "Brand mentioned" : "Not found"}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Link href={`/dashboard/action-center?tab=citations&brand=${encodeURIComponent(brandName)}&industry=${encodeURIComponent(industry)}&website=${encodeURIComponent(website)}`}>
                            <Card className="glass-card border-0 hover:border-purple-500/50 transition-all cursor-pointer group">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                                            <MessageSquare className="w-6 h-6 text-orange-400" />
                                        </div>
                                        <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500/50">
                                            {auditResult.citation_gaps.length} gaps
                                        </Badge>
                                    </div>
                                    <h4 className="font-semibold mb-1">Citation Builder</h4>
                                    <p className="text-sm text-muted-foreground mb-3">
                                        Generate content to get cited
                                    </p>
                                    <div className="flex items-center gap-1 text-sm text-purple-400">
                                        Open <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href={`/dashboard/action-center?tab=content&brand=${encodeURIComponent(brandName)}&industry=${encodeURIComponent(industry)}&website=${encodeURIComponent(website)}`}>
                            <Card className="glass-card border-0 hover:border-purple-500/50 transition-all cursor-pointer group">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                            <FileText className="w-6 h-6 text-blue-400" />
                                        </div>
                                        <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/50">
                                            {auditResult.content_recommendations.length} ideas
                                        </Badge>
                                    </div>
                                    <h4 className="font-semibold mb-1">Content Engine</h4>
                                    <p className="text-sm text-muted-foreground mb-3">
                                        AI-optimized content
                                    </p>
                                    <div className="flex items-center gap-1 text-sm text-purple-400">
                                        Open <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href={`/dashboard/action-center?tab=schema&brand=${encodeURIComponent(brandName)}&industry=${encodeURIComponent(industry)}&website=${encodeURIComponent(website)}`}>
                            <Card className="glass-card border-0 hover:border-purple-500/50 transition-all cursor-pointer group">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                                            <Code className="w-6 h-6 text-green-400" />
                                        </div>
                                        <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/50">
                                            {auditResult.schema_recommendations.length} schemas
                                        </Badge>
                                    </div>
                                    <h4 className="font-semibold mb-1">Schema Studio</h4>
                                    <p className="text-sm text-muted-foreground mb-3">
                                        JSON-LD for AI crawlers
                                    </p>
                                    <div className="flex items-center gap-1 text-sm text-purple-400">
                                        Open <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href={`/dashboard/action-center?tab=hallucinations&brand=${encodeURIComponent(brandName)}&industry=${encodeURIComponent(industry)}&website=${encodeURIComponent(website)}`}>
                            <Card className="glass-card border-0 hover:border-purple-500/50 transition-all cursor-pointer group">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                                            <Shield className="w-6 h-6 text-red-400" />
                                        </div>
                                        <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500/50">
                                            {auditResult.hallucination_alerts.length} alerts
                                        </Badge>
                                    </div>
                                    <h4 className="font-semibold mb-1">Defense System</h4>
                                    <p className="text-sm text-muted-foreground mb-3">
                                        Fix AI misinformation
                                    </p>
                                    <div className="flex items-center gap-1 text-sm text-purple-400">
                                        Open <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>

                    {/* Competitor Comparison */}
                    <Card className="glass-card border-0">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <Target className="w-5 h-5 text-orange-400" />
                                        Competitor Comparison
                                    </CardTitle>
                                    <CardDescription>Your visibility vs competitors</CardDescription>
                                </div>
                                <Link href={`/dashboard/action-center?tab=competitors&brand=${encodeURIComponent(brandName)}&industry=${encodeURIComponent(industry)}&website=${encodeURIComponent(website)}`}>
                                    <Button variant="outline" size="sm" className="gap-2">
                                        Full Analysis <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {/* Your Brand */}
                                <div className="flex items-center gap-4">
                                    <div className="w-32 font-semibold flex items-center gap-2">
                                        {auditResult.brand_name}
                                        <Badge className="bg-purple-500/20 text-purple-400 text-xs">You</Badge>
                                    </div>
                                    <div className="flex-1">
                                        <div className="h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg"
                                            style={{ width: `${auditResult.visibility_score}%` }} />
                                    </div>
                                    <div className="w-16 text-right font-bold text-purple-400">
                                        {auditResult.visibility_score}
                                    </div>
                                </div>

                                {/* Competitors */}
                                {auditResult.competitor_insights.map((comp: any, i: number) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="w-32 font-medium text-muted-foreground truncate">
                                            {comp.competitor_name}
                                        </div>
                                        <div className="flex-1">
                                            <div
                                                className={`h-8 rounded-lg ${comp.visibility_score > auditResult.visibility_score
                                                    ? "bg-red-500/60"
                                                    : "bg-gray-500/40"
                                                    }`}
                                                style={{ width: `${comp.visibility_score}%` }}
                                            />
                                        </div>
                                        <div className={`w-16 text-right font-bold ${comp.visibility_score > auditResult.visibility_score
                                            ? "text-red-400"
                                            : "text-gray-400"
                                            }`}>
                                            {comp.visibility_score}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* CTA */}
                    <Card className="glass-card border-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10">
                        <CardContent className="p-8 text-center">
                            <Zap className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
                            <h3 className="text-2xl font-bold mb-2">Ready to Improve Your AI Visibility?</h3>
                            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                                Use the Action Center to automatically generate content, fix issues, and outrank competitors.
                            </p>
                            <Link href="/dashboard/action-center">
                                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 gap-2 px-8">
                                    <Sparkles className="w-5 h-5" />
                                    Open Action Center
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Empty State */}
            {!auditResult && !isLoading && (
                <Card className="glass-card border-0">
                    <CardContent className="py-16 text-center">
                        <Search className="w-16 h-16 mx-auto mb-6 text-muted-foreground/50" />
                        <h3 className="text-xl font-semibold mb-2">Enter Your Brand Name</h3>
                        <p className="text-muted-foreground max-w-md mx-auto">
                            Run an audit to analyze your brand's visibility across ChatGPT, Gemini, Perplexity, and Claude.
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
