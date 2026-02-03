"use client";

import React, { useState, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
    Rocket,
    MessageSquare,
    FileText,
    Code,
    Shield,
    Target,
    Sparkles,
    ArrowRight,
    CheckCircle,
    Clock,
    Zap,
    TrendingUp
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
    CitationBuilder,
    ContentEngine,
    SchemaStudio,
    HallucinationDefense,
    CompetitorHub
} from "@/components/action-center";

const ACTION_TABS = [
    { id: "overview", name: "Overview", icon: Rocket },
    { id: "citations", name: "Citation Builder", icon: MessageSquare },
    { id: "content", name: "Content Engine", icon: FileText },
    { id: "schema", name: "Schema Studio", icon: Code },
    { id: "hallucinations", name: "Hallucination Defense", icon: Shield },
    { id: "competitors", name: "Competitor Intel", icon: Target },
];

// Sample data - in real app, this would come from the audit
const SAMPLE_AUDIT_DATA = {
    brandName: "Your Brand",
    industry: "Software",
    visibilityScore: 65,
    citationGaps: [],
    hallucinationAlerts: [],
    competitorInsights: [],
};

function ActionCenterContent() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState("overview");
    const [brandName, setBrandName] = useState("Your Brand");
    const [website, setWebsite] = useState("");
    const [industry, setIndustry] = useState("Software");

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

    React.useEffect(() => {
        const tab = searchParams.get("tab");
        const brand = searchParams.get("brand");
        const ind = searchParams.get("industry");
        const site = searchParams.get("website");

        if (tab) setActiveTab(tab);
        if (brand) setBrandName(brand);
        if (ind) setIndustry(ind);
        if (site) setWebsite(site);
    }, [searchParams]);

    const renderOverview = () => (
        <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-4">
                <Card className="glass-card border-0">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-muted-foreground">Pending Actions</div>
                                <div className="text-2xl font-bold">12</div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-purple-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="glass-card border-0">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-muted-foreground">Completed</div>
                                <div className="text-2xl font-bold text-green-400">5</div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="glass-card border-0">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-muted-foreground">Est. Impact</div>
                                <div className="text-2xl font-bold text-blue-400">+28%</div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-blue-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="glass-card border-0">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-muted-foreground">Time Saved</div>
                                <div className="text-2xl font-bold text-orange-400">12h</div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                                <Clock className="w-5 h-5 text-orange-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Brand Settings */}
            <Card className="glass-card border-0">
                <CardHeader>
                    <CardTitle>Your Brand</CardTitle>
                    <CardDescription>Configure your brand details for personalized actions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                        <div>
                            <label className="text-sm text-muted-foreground mb-2 block">Brand Name</label>
                            <Input
                                value={brandName}
                                onChange={(e) => setBrandName(e.target.value)}
                                placeholder="Your Company Name"
                                className="bg-secondary/50"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-muted-foreground mb-2 block">Website URL</label>
                            <Input
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                                placeholder="e.g., brandpilot.ai"
                                className="bg-secondary/50"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-muted-foreground mb-2 block">Industry</label>
                            <Input
                                value={industry}
                                onChange={(e) => setIndustry(e.target.value)}
                                placeholder="e.g., SaaS, E-commerce, Marketing"
                                className="bg-secondary/50"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Priority Actions */}
            <Card className="glass-card border-0">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Zap className="w-5 h-5 text-yellow-400" />
                                Priority Actions
                            </CardTitle>
                            <CardDescription>High-impact actions to boost your AI visibility</CardDescription>
                        </div>
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/50">3 Critical</Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {[
                        {
                            title: "Generate Reddit Citations",
                            description: "3 high-potential discussions found where competitors are mentioned",
                            impact: 9,
                            tab: "citations",
                            priority: "critical"
                        },
                        {
                            title: "Add FAQ Schema",
                            description: "Your FAQ page is missing structured data for AI crawlers",
                            impact: 8,
                            tab: "schema",
                            priority: "high"
                        },
                        {
                            title: "Fix Hallucination",
                            description: "ChatGPT has incorrect information about your pricing",
                            impact: 8,
                            tab: "hallucinations",
                            priority: "critical"
                        },
                        {
                            title: "Create Comparison Content",
                            description: "Competitors are ranking for '[brand] alternatives' queries",
                            impact: 7,
                            tab: "content",
                            priority: "high"
                        },
                        {
                            title: "Target Competitor Gap",
                            description: "Opportunity to rank for 5 queries where CompetitorA ranks",
                            impact: 7,
                            tab: "competitors",
                            priority: "medium"
                        },
                    ].map((action, i) => (
                        <div
                            key={i}
                            className="p-4 rounded-xl bg-secondary/30 border border-border/30 hover:border-purple-500/50 transition-all"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-semibold">{action.title}</h4>
                                        <Badge
                                            variant="outline"
                                            className={`text-xs ${action.priority === "critical"
                                                ? "bg-red-500/20 text-red-400 border-red-500/50"
                                                : action.priority === "high"
                                                    ? "bg-orange-500/20 text-orange-400 border-orange-500/50"
                                                    : "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
                                                }`}
                                        >
                                            {action.priority}
                                        </Badge>
                                        <Badge variant="outline" className="text-xs bg-green-500/20 text-green-400 border-green-500/50">
                                            +{action.impact * 3}% impact
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{action.description}</p>
                                </div>
                                <Button
                                    variant="ghost"
                                    className="gap-2"
                                    onClick={() => setActiveTab(action.tab)}
                                >
                                    Take Action
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Quick Access Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ACTION_TABS.slice(1).map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className="p-6 rounded-xl bg-secondary/30 border border-border/30 hover:border-purple-500/50 transition-all text-left group"
                    >
                        <tab.icon className="w-8 h-8 mb-3 text-purple-400 group-hover:scale-110 transition-transform" />
                        <h4 className="font-semibold mb-1">{tab.name}</h4>
                        <p className="text-sm text-muted-foreground">
                            {tab.id === "citations" && "Generate ready-to-post content for forums and social"}
                            {tab.id === "content" && "Create AI-optimized FAQs, comparisons, and guides"}
                            {tab.id === "schema" && "One-click JSON-LD schemas for better AI visibility"}
                            {tab.id === "hallucinations" && "Detect and correct AI misinformation"}
                            {tab.id === "competitors" && "Analyze competitors and find opportunities"}
                        </p>
                        <div className="flex items-center gap-1 mt-3 text-sm text-purple-400">
                            Open <ArrowRight className="w-4 h-4" />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold gradient-text">Action Center</h1>
                    <p className="text-muted-foreground">Autopilot solutions to boost your AI visibility</p>
                </div>
                <Link href="/dashboard">
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 gap-2">
                        <Sparkles className="w-4 h-4" />
                        Run New Audit
                    </Button>
                </Link>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-secondary/30 border border-border/30 p-1 h-auto flex-wrap">
                    {ACTION_TABS.map((tab) => (
                        <TabsTrigger
                            key={tab.id}
                            value={tab.id}
                            className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600/20 data-[state=active]:to-blue-600/20"
                        >
                            <tab.icon className="w-4 h-4" />
                            <span className="hidden sm:inline">{tab.name}</span>
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                    {renderOverview()}
                </TabsContent>

                <TabsContent value="citations" className="mt-6">
                    <CitationBuilder brandName={brandName} industry={industry} />
                </TabsContent>

                <TabsContent value="content" className="mt-6">
                    <ContentEngine brandName={brandName} industry={industry} />
                </TabsContent>

                <TabsContent value="schema" className="mt-6">
                    <SchemaStudio brandName={brandName} industry={industry} />
                </TabsContent>

                <TabsContent value="hallucinations" className="mt-6">
                    <HallucinationDefense brandName={brandName} />
                </TabsContent>

                <TabsContent value="competitors" className="mt-6">
                    <CompetitorHub brandName={brandName} brandScore={65} />
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default function ActionCenterPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ActionCenterContent />
        </Suspense>
    );
}
