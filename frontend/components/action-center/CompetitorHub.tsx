"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
    Target,
    TrendingUp,
    TrendingDown,
    Users,
    Eye,
    Plus,
    Search,
    ArrowRight,
    BarChart3,
    Sparkles,
    RefreshCw
} from "lucide-react";

interface CompetitorInsight {
    competitor_name: string;
    visibility_score: number;
    platforms_mentioned: string[];
    key_strengths: string[];
    your_advantages: string[];
    steal_opportunities: string[];
}

interface CompetitorHubProps {
    brandName: string;
    brandScore: number;
    competitors?: CompetitorInsight[];
}

export function CompetitorHub({ brandName, brandScore = 65, competitors = [] }: CompetitorHubProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCompetitor, setSelectedCompetitor] = useState<CompetitorInsight | null>(null);

    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const startDeepAnalysis = () => {
        setIsAnalyzing(true);
        setTimeout(() => setIsAnalyzing(false), 2000);
    };

    // Sample competitors with more metrics
    const displayCompetitors = competitors.length > 0 ? competitors : [
        {
            competitor_name: "Legacy Auditor Pro",
            visibility_score: 82,
            market_share: 45,
            gap_score: -18,
            displacement_difficulty: "Medium",
            platforms_mentioned: ["chatgpt", "perplexity", "gemini", "claude"],
            key_strengths: ["Historical Authority", "Large Backlink Profile"],
            your_advantages: ["True GEO Compliance", "Synthesized Citations"],
            steal_opportunities: ["Target 'Pro alternatives'", "Expose outdated AEO logic"]
        },
        {
            competitor_name: "AI-Sight SEO",
            visibility_score: 74,
            market_share: 12,
            gap_score: +5,
            displacement_difficulty: "Low",
            platforms_mentioned: ["chatgpt", "perplexity"],
            key_strengths: ["Fast Content Velocity"],
            your_advantages: ["Superior Schema Accuracy"],
            steal_opportunities: ["Capture technical queries"]
        }
    ];

    const filteredCompetitors = displayCompetitors.filter(c =>
        c.competitor_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate share of voice
    const totalScore = displayCompetitors.reduce((acc, c) => acc + c.visibility_score, 0) + brandScore;
    const yourShareOfVoice = Math.round((brandScore / totalScore) * 100);

    const getScoreColor = (score: number) => {
        if (score >= 70) return "text-green-400";
        if (score >= 50) return "text-yellow-400";
        return "text-red-400";
    };

    const getScoreBgColor = (score: number) => {
        if (score >= 70) return "bg-green-500/20";
        if (score >= 50) return "bg-yellow-500/20";
        return "bg-red-500/20";
    };

    return (
        <Card className="glass-card border-0">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="w-5 h-5 text-orange-400" />
                            Competitive Intelligence Hub
                        </CardTitle>
                        <CardDescription>
                            Analyze competitors and find opportunities to outrank them
                        </CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-orange-500/20 text-orange-400 border-orange-500/50">
                        {displayCompetitors.length} Tracked
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Intelligence Metrics */}
                <div className="grid md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30">
                        <div className="text-xs text-muted-foreground uppercase mb-1">SOV Gap</div>
                        <div className="text-2xl font-bold text-orange-400">-{100 - yourShareOfVoice}%</div>
                    </div>
                    <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
                        <div className="text-xs text-muted-foreground uppercase mb-1">Displacement Potential</div>
                        <div className="text-2xl font-bold text-purple-400">High</div>
                    </div>
                    <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                        <div className="text-xs text-muted-foreground uppercase mb-1">Platform Coverage</div>
                        <div className="text-2xl font-bold text-blue-400">{yourShareOfVoice > 50 ? "Leading" : "Rising"}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                        <div className="text-xs text-muted-foreground uppercase mb-1">Intelligence Multiplier</div>
                        <div className="text-2xl font-bold text-green-400">3.5x</div>
                    </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/30">
                    <div className="flex items-center gap-3">
                        <BarChart3 className="w-5 h-5 text-purple-400" />
                        <div>
                            <div className="font-medium text-sm">Deep Market Analysis Required</div>
                            <div className="text-xs text-muted-foreground">Competitor Alpha is saturating Perplexity results.</div>
                        </div>
                    </div>
                    <Button
                        size="sm"
                        onClick={startDeepAnalysis}
                        disabled={isAnalyzing}
                        className="bg-purple-600 hover:bg-purple-700 h-9 gap-2"
                    >
                        {isAnalyzing && <RefreshCw className="w-4 h-4 animate-spin" />}
                        {isAnalyzing ? "Analyzing..." : "Run Deep Scan"}
                    </Button>
                </div>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search competitors..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-secondary/50"
                    />
                </div>

                {/* Competitor Leaderboard */}
                <div className="space-y-3">
                    <h4 className="font-semibold">Visibility Leaderboard</h4>

                    {/* Your Brand */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-2 border-purple-500/50">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold text-sm">
                                    #1
                                </div>
                                <div>
                                    <div className="font-semibold flex items-center gap-2">
                                        {brandName}
                                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">You</Badge>
                                    </div>
                                    <div className="text-xs text-muted-foreground">4 platforms</div>
                                </div>
                            </div>
                            <div className={`text-2xl font-bold ${getScoreColor(brandScore)}`}>
                                {brandScore}
                            </div>
                        </div>
                    </div>

                    {/* Competitors */}
                    {filteredCompetitors.map((competitor, i) => {
                        const isAhead = competitor.visibility_score > brandScore;
                        const isSelected = selectedCompetitor?.competitor_name === competitor.competitor_name;

                        return (
                            <div key={i} className="space-y-3">
                                <div
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => setSelectedCompetitor(isSelected ? null : competitor)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault();
                                            setSelectedCompetitor(isSelected ? null : competitor);
                                        }
                                    }}
                                    className={`w-full p-4 rounded-xl border-2 transition-all text-left cursor-pointer ${isSelected
                                        ? "border-orange-500 bg-orange-500/10"
                                        : "border-border/50 bg-secondary/30 hover:border-orange-500/50"
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg ${getScoreBgColor(competitor.visibility_score)} flex items-center justify-center font-bold text-sm`}>
                                                #{i + 2}
                                            </div>
                                            <div>
                                                <div className="font-semibold flex items-center gap-2">
                                                    {competitor.competitor_name}
                                                    {isAhead ? (
                                                        <TrendingUp className="w-4 h-4 text-red-400" />
                                                    ) : (
                                                        <TrendingDown className="w-4 h-4 text-green-400" />
                                                    )}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {competitor.platforms_mentioned.length} platforms
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className={`text-2xl font-bold ${getScoreColor(competitor.visibility_score)}`}>
                                                {competitor.visibility_score}
                                            </div>
                                            <div className={`text-xs ${isAhead ? "text-red-400" : "text-green-400"}`}>
                                                {isAhead ? `+${competitor.visibility_score - brandScore}` : `${competitor.visibility_score - brandScore}`} vs you
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Details */}
                                {isSelected && (
                                    <div className="ml-4 space-y-4 animate-in slide-in-from-top-2">
                                        <div className="grid md:grid-cols-3 gap-4">
                                            {/* Their Strengths */}
                                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                                                <h5 className="font-semibold text-red-400 mb-3">Their Strengths</h5>
                                                <ul className="space-y-2">
                                                    {competitor.key_strengths.map((s, j) => (
                                                        <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                                                            {s}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Your Advantages */}
                                            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                                                <h5 className="font-semibold text-green-400 mb-3">Your Advantages</h5>
                                                <ul className="space-y-2">
                                                    {competitor.your_advantages.map((a, j) => (
                                                        <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0" />
                                                            {a}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Steal Opportunities */}
                                            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
                                                <h5 className="font-semibold text-purple-400 mb-3 flex items-center gap-2">
                                                    <Sparkles className="w-4 h-4" />
                                                    Steal Opportunities
                                                </h5>
                                                <ul className="space-y-2">
                                                    {competitor.steal_opportunities.map((o, j) => (
                                                        <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                                                            <ArrowRight className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                                                            {o}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center gap-3">
                                            <Button
                                                className="bg-gradient-to-r from-orange-600 to-red-600 gap-2"
                                                onClick={() => alert(`Targeting ${competitor.competitor_name} for displacement (Demo)`)}
                                            >
                                                <Target className="w-4 h-4" />
                                                Target This Competitor
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="gap-2"
                                                onClick={() => alert(`Generating comparison content vs ${competitor.competitor_name} (Demo)`)}
                                            >
                                                Create Comparison Content
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Quick Actions */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30">
                    <h4 className="font-semibold mb-3">Quick Win Opportunities</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                        <Button variant="outline" className="justify-start gap-2 h-auto py-3" onClick={() => alert("Analysis started for competitor alternatives (Demo)")}>
                            <Target className="w-4 h-4 text-orange-400" />
                            <div className="text-left">
                                <div className="font-medium">Target "[competitor] alternatives"</div>
                                <div className="text-xs text-muted-foreground">Create content for this query</div>
                            </div>
                        </Button>
                        <Button variant="outline" className="justify-start gap-2 h-auto py-3" onClick={() => alert("Comparison table generation started (Demo)")}>
                            <BarChart3 className="w-4 h-4 text-blue-400" />
                            <div className="text-left">
                                <div className="font-medium">Create comparison tables</div>
                                <div className="text-xs text-muted-foreground">AI loves structured comparisons</div>
                            </div>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default CompetitorHub;
