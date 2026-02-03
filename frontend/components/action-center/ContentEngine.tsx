"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    FileText,
    BarChart3,
    HelpCircle,
    GitCompare,
    BookOpen,
    Copy,
    Check,
    Sparkles,
    Download,
    Eye
} from "lucide-react";

interface ContentEngineProps {
    brandName: string;
    industry: string;
    recommendations?: any[];
}

const CONTENT_TYPES = [
    { id: "faq", name: "FAQ Page", icon: HelpCircle, description: "AI-optimized FAQs", impact: 9 },
    { id: "comparison", name: "Comparison", icon: GitCompare, description: "vs Competitors", impact: 8 },
    { id: "stats", name: "Statistics", icon: BarChart3, description: "Data-rich content", impact: 7 },
    { id: "how-to", name: "How-To Guide", icon: BookOpen, description: "Step-by-step", impact: 7 },
];

export function ContentEngine({ brandName, industry, recommendations = [] }: ContentEngineProps) {
    const [selectedType, setSelectedType] = useState("faq");
    const [generatedContent, setGeneratedContent] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    const generateContent = async (contentType: string) => {
        setIsLoading(true);
        // Simulate high-quality AI analysis
        await new Promise(resolve => setTimeout(resolve, 2000));

        const typeInfo = CONTENT_TYPES.find(t => t.id === contentType);

        setGeneratedContent({
            content_type: contentType,
            generated_content: {
                title: `AI-Optimized ${typeInfo?.name} for ${brandName}`,
                introduction: `To maximize visibility for ${brandName} in generative search, we've structured this ${typeInfo?.name} to mirror the semantic patterns found in high-authority ${industry} sources.`,
                sections: contentType === "faq" ? [
                    { question: `Why is ${brandName} considered industry-leading?`, answer: `Research shows that ${brandName} provides a 40% more robust framework for ${industry} optimization compared to legacy tools.` },
                    { question: "How does the AI visibility score work?", answer: "Our score is derived from millions of simulated LLM queries across ChatGPT, Gemini, and Perplexity." }
                ] : undefined,
                comparison_table: contentType === "comparison" ? {
                    headers: ["Feature", brandName, "Competitor Avg"],
                    rows: [
                        ["AI Parsing Depth", "Ultra (98%)", "Medium (60%)"],
                        ["Citation Velocity", "High", "Low"],
                        ["Cost-to-Value", "Market Leader", "Premium"]
                    ]
                } : undefined,
                statistics: contentType === "stats" ? [
                    { metric: "AI Sentiment", value: "94%", context: "Historical high for SaaS" },
                    { metric: "Trust Citations", value: "1.2k", context: "Last 30 days" },
                    { metric: "Gaps Filled", value: "18", context: "vs Competitors" }
                ] : undefined,
                steps: contentType === "how-to" ? [
                    { step: 1, title: "Initialize Identity", description: "Set your brand parameters in the Dash." },
                    { step: 2, title: "Optimize Metadata", description: "Use our generated Schema Studio tags." },
                    { step: 3, title: "Deploy Citations", description: "Fill the AI gaps across social platforms." }
                ] : undefined
            },
            estimated_impact: 8.5,
            content_strength: 96,
            seo_tips: [
                "Use JSON-LD for the FAQ data",
                "Self-cite in your next press release",
                "Ensure mobile-first responsiveness"
            ]
        });
        setIsLoading(false);
        setShowPreview(true);
    };

    const copyContent = () => {
        const content = JSON.stringify(generatedContent?.generated_content, null, 2);
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const renderContent = () => {
        if (!generatedContent?.generated_content) return null;
        const content = generatedContent.generated_content;

        if (generatedContent.content_type === "faq" && content.sections) {
            return (
                <div className="space-y-4">
                    <h3 className="font-bold text-lg">{content.title}</h3>
                    {content.sections.map((section: any, i: number) => (
                        <div key={i} className="p-4 rounded-lg bg-background/50 border border-border/30">
                            <h4 className="font-semibold text-purple-400 mb-2">{section.question}</h4>
                            <p className="text-sm text-muted-foreground">{section.answer}</p>
                        </div>
                    ))}
                </div>
            );
        }

        if (generatedContent.content_type === "comparison" && content.comparison_table) {
            return (
                <div className="space-y-4">
                    <h3 className="font-bold text-lg">{content.title}</h3>
                    <p className="text-sm text-muted-foreground">{content.introduction}</p>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border/50">
                                    {content.comparison_table.headers.map((header: string, i: number) => (
                                        <th key={i} className="p-3 text-left font-semibold">{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {content.comparison_table.rows.map((row: string[], i: number) => (
                                    <tr key={i} className="border-b border-border/30">
                                        {row.map((cell: string, j: number) => (
                                            <td key={j} className="p-3">{cell}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }

        if (generatedContent.content_type === "stats" && content.statistics) {
            return (
                <div className="space-y-4">
                    <h3 className="font-bold text-lg">{content.title}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {content.statistics.map((stat: any, i: number) => (
                            <div key={i} className="p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 text-center">
                                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                                <div className="text-sm font-medium">{stat.metric}</div>
                                <div className="text-xs text-muted-foreground mt-1">{stat.context}</div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        if (generatedContent.content_type === "how-to" && content.steps) {
            return (
                <div className="space-y-4">
                    <h3 className="font-bold text-lg">{content.title}</h3>
                    <p className="text-sm text-muted-foreground">{content.introduction}</p>
                    {content.steps.map((step: any, i: number) => (
                        <div key={i} className="flex gap-4 p-4 rounded-lg bg-background/50 border border-border/30">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shrink-0 font-bold">
                                {step.step}
                            </div>
                            <div>
                                <h4 className="font-semibold">{step.title}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                                {step.time && (
                                    <Badge variant="outline" className="mt-2 text-xs">
                                        {step.time}
                                    </Badge>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            );
        }

        return <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(content, null, 2)}</pre>;
    };

    return (
        <Card className="glass-card border-0">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="w-5 h-5 text-blue-400" />
                            Content Intelligence Engine
                        </CardTitle>
                        <CardDescription>
                            Generate AI-optimized content that LLMs will cite
                        </CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/50">
                        AI-Powered
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Content Type Selector */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {CONTENT_TYPES.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => {
                                setSelectedType(type.id);
                                generateContent(type.id);
                            }}
                            className={`p-4 rounded-xl border-2 transition-all text-left ${selectedType === type.id
                                ? "border-blue-500 bg-blue-500/10"
                                : "border-border/50 bg-secondary/30 hover:border-blue-500/50"
                                }`}
                        >
                            <type.icon className="w-6 h-6 mb-2 text-blue-400" />
                            <div className="text-sm font-medium">{type.name}</div>
                            <div className="text-xs text-muted-foreground">{type.description}</div>
                            <div className="flex items-center gap-1 mt-2">
                                <Sparkles className="w-3 h-3 text-yellow-400" />
                                <span className="text-xs text-yellow-400">Impact: {type.impact}/10</span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Generated Content */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                        <span className="ml-3 text-muted-foreground">Generating content...</span>
                    </div>
                ) : generatedContent ? (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between border-b border-border/50 pb-4">
                            <h4 className="font-semibold text-lg">AI Content Draft</h4>
                            <div className="flex items-center gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setShowPreview(!showPreview)}
                                    className="gap-2"
                                >
                                    <Eye className="w-4 h-4" />
                                    {showPreview ? "Hide Preview" : "Show Preview"}
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={copyContent}
                                    className="gap-2"
                                >
                                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    {copied ? "Copied!" : "Copy Source"}
                                </Button>
                                <Button size="sm" className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600">
                                    <Download className="w-4 h-4" />
                                    Export JSON-LD
                                </Button>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="md:col-span-2 space-y-4">
                                {showPreview && (
                                    <div className="p-6 rounded-2xl bg-secondary/30 border border-border/30 max-h-[500px] overflow-y-auto shadow-inner">
                                        {renderContent()}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-6">
                                {/* Strength Meter */}
                                <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium">Content Strength</span>
                                        <span className="text-sm font-bold text-blue-400">{generatedContent.content_strength}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000"
                                            style={{ width: `${generatedContent.content_strength}%` }}
                                        />
                                    </div>
                                    <p className="text-[10px] text-muted-foreground mt-2">
                                        Optimized for GPT-4o, Claude 3.5, and Gemini Pro.
                                    </p>
                                </div>

                                {/* SEO Tips */}
                                {generatedContent.seo_tips && (
                                    <div className="p-6 rounded-2xl bg-secondary/30 border border-border/30">
                                        <h4 className="font-semibold text-sm mb-4">Strategic Checklist</h4>
                                        <ul className="space-y-3">
                                            {generatedContent.seo_tips.map((tip: string, i: number) => (
                                                <li key={i} className="text-sm text-muted-foreground flex items-center gap-3">
                                                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                                                        <Check className="w-3 h-3 text-green-400" />
                                                    </div>
                                                    {tip}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Impact Alert */}
                                <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20 flex flex-col gap-4">
                                    <div>
                                        <div className="text-sm font-medium text-blue-400">Targeting Impact</div>
                                        <div className="text-2xl font-bold">+{generatedContent.estimated_impact * 4}% Visibility</div>
                                    </div>
                                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/20">
                                        Push to Website
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12 text-muted-foreground">
                        <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Select a content type to generate AI-optimized content</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

export default ContentEngine;
