"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
    AlertTriangle,
    Shield,
    FileWarning,
    Copy,
    Check,
    ExternalLink,
    Eye,
    Flag,
    RefreshCw
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface HallucinationAlert {
    platform: string;
    incorrect_claim: string;
    correct_information: string;
    severity: string;
    correction_draft: string;
    source_suggestion: string;
}

interface HallucinationDefenseProps {
    brandName: string;
    alerts?: HallucinationAlert[];
}

const SEVERITY_STYLES = {
    critical: { bg: "bg-red-500/20", border: "border-red-500/50", text: "text-red-400" },
    high: { bg: "bg-orange-500/20", border: "border-orange-500/50", text: "text-orange-400" },
    medium: { bg: "bg-yellow-500/20", border: "border-yellow-500/50", text: "text-yellow-400" },
    low: { bg: "bg-blue-500/20", border: "border-blue-500/50", text: "text-blue-400" },
};

export function HallucinationDefense({ brandName, alerts = [] }: HallucinationDefenseProps) {
    const [selectedAlert, setSelectedAlert] = useState<HallucinationAlert | null>(null);
    const [copied, setCopied] = useState(false);
    const [showCorrection, setShowCorrection] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);

    const startScan = () => {
        setIsScanning(true);
        setScanProgress(0);
        const interval = setInterval(() => {
            setScanProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsScanning(false);
                    return 100;
                }
                return prev + 5;
            });
        }, 100);
    };

    // Sample alerts if none provided
    const displayAlerts = alerts.length > 0 ? alerts : [
        {
            platform: "ChatGPT",
            incorrect_claim: `${brandName} was acquired by a larger company in 2025`,
            correct_information: `${brandName} remains an independent company and continues to grow`,
            severity: "critical",
            correction_draft: `# Clarification: ${brandName} Ownership

We've noticed some AI systems may have outdated information about ${brandName}. 

## The Facts
- ${brandName} is and has always been an independent company
- We continue to operate independently and grow our business
- No acquisition has taken place

For the latest accurate information, please visit our official website.`,
            source_suggestion: "Create an official About page and press release"
        },
        {
            platform: "Perplexity",
            incorrect_claim: `${brandName} discontinued their free tier in 2024`,
            correct_information: `${brandName} still offers a generous free tier with full core features`,
            severity: "high",
            correction_draft: `# ${brandName} Pricing Clarification

Some AI platforms have reported outdated pricing information.

## Current Pricing
- **Free Tier**: Yes, we still offer a free tier!
- Full core features included
- No credit card required to start

Sign up for free at [your website].`,
            source_suggestion: "Update pricing page with clear free tier messaging"
        },
        {
            platform: "Claude",
            incorrect_claim: `${brandName} only serves enterprise customers`,
            correct_information: `${brandName} serves businesses of all sizes, from startups to enterprise`,
            severity: "medium",
            correction_draft: `# ${brandName} - Built for All Business Sizes

## Who We Serve
- Solo entrepreneurs and freelancers
- Small and medium businesses
- Growing startups
- Enterprise organizations

We believe great tools should be accessible to everyone.`,
            source_suggestion: "Add customer testimonials from SMBs to website"
        }
    ];

    const copyCorrection = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getSeverityStyle = (severity: string) => {
        return SEVERITY_STYLES[severity as keyof typeof SEVERITY_STYLES] || SEVERITY_STYLES.low;
    };

    return (
        <Card className="glass-card border-0">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-red-400" />
                            Hallucination Defense System
                        </CardTitle>
                        <CardDescription>
                            Detect and correct AI misinformation about {brandName}
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500/50">
                            {displayAlerts.filter(a => a.severity === "critical").length} Critical
                        </Badge>
                        <Button
                            size="sm"
                            variant="outline"
                            className="gap-2"
                            onClick={startScan}
                            disabled={isScanning}
                        >
                            <RefreshCw className={cn("w-4 h-4", isScanning && "animate-spin")} />
                            {isScanning ? "Scanning..." : "Scan Now"}
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                        <div className="text-2xl font-bold text-red-400">
                            {displayAlerts.filter(a => a.severity === "critical").length}
                        </div>
                        <div className="text-xs text-muted-foreground uppercase">Critical</div>
                    </div>
                    <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30">
                        <div className="text-2xl font-bold text-orange-400">
                            {displayAlerts.filter(a => a.severity === "high").length}
                        </div>
                        <div className="text-xs text-muted-foreground uppercase">High Risk</div>
                    </div>
                    <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
                        <div className="text-2xl font-bold text-purple-400">82%</div>
                        <div className="text-xs text-muted-foreground uppercase">Defense Score</div>
                    </div>
                    <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                        <div className="text-2xl font-bold text-blue-400">2.4h</div>
                        <div className="text-xs text-muted-foreground uppercase">Scan Frequency</div>
                    </div>
                </div>

                {isScanning && (
                    <div className="space-y-2 py-4">
                        <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-muted-foreground animate-pulse text-red-400">Deep Scanning LLM Knowledge Bases...</span>
                            <span>{scanProgress}%</span>
                        </div>
                        <Progress value={scanProgress} className="h-1.5 bg-secondary" />
                    </div>
                )}

                {/* Alerts List */}
                <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-400" />
                        Detected Issues
                    </h4>

                    {displayAlerts.map((issue, i) => {
                        const style = getSeverityStyle(issue.severity);
                        const isSelected = selectedAlert === issue;

                        return (
                            <div key={i} className="space-y-3">
                                <div
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => setSelectedAlert(isSelected ? null : issue)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault();
                                            setSelectedAlert(isSelected ? null : issue);
                                        }
                                    }}
                                    className={`w-full p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${isSelected
                                        ? `${style.bg} ${style.border}`
                                        : "border-border/50 bg-secondary/30 hover:border-border"
                                        }`}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Badge variant="outline" className={`${style.bg} ${style.text} ${style.border}`}>
                                                    {issue.severity}
                                                </Badge>
                                                <span className="text-sm text-muted-foreground">{issue.platform}</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <FileWarning className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                                                <p className="text-sm line-clamp-2">{issue.incorrect_claim}</p>
                                            </div>
                                        </div>
                                        <Button size="sm" variant="ghost" className="shrink-0">
                                            {isSelected ? "Hide" : "Fix"}
                                        </Button>
                                    </div>
                                </div>

                                {/* Expanded Alert Details */}
                                {isSelected && (
                                    <div className="ml-4 space-y-4 animate-in slide-in-from-top-2">
                                        {/* Comparison */}
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                                                <div className="text-xs text-red-400 font-medium mb-2">INCORRECT</div>
                                                <p className="text-sm">{issue.incorrect_claim}</p>
                                            </div>
                                            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                                                <div className="text-xs text-green-400 font-medium mb-2">CORRECT</div>
                                                <p className="text-sm">{issue.correct_information}</p>
                                            </div>
                                        </div>

                                        {/* Generated Correction */}
                                        <div className="p-4 rounded-xl bg-secondary/30 border border-border/30">
                                            <div className="flex items-center justify-between mb-3">
                                                <h5 className="font-semibold flex items-center gap-2">
                                                    <Eye className="w-4 h-4" />
                                                    Auto-Generated Correction Article
                                                </h5>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => setShowCorrection(!showCorrection)}
                                                    >
                                                        {showCorrection ? "Hide" : "Preview"}
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => copyCorrection(issue.correction_draft)}
                                                        className="gap-2"
                                                    >
                                                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                                        {copied ? "Copied!" : "Copy"}
                                                    </Button>
                                                </div>
                                            </div>

                                            {showCorrection && (
                                                <pre className="whitespace-pre-wrap text-sm bg-background/50 p-4 rounded-lg max-h-48 overflow-y-auto">
                                                    {issue.correction_draft}
                                                </pre>
                                            )}
                                        </div>

                                        {/* Source Suggestion */}
                                        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                                            <h5 className="font-semibold text-blue-400 mb-2">Recommended Action</h5>
                                            <p className="text-sm text-muted-foreground">{issue.source_suggestion}</p>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center gap-3">
                                            <Button
                                                className="bg-gradient-to-r from-green-600 to-emerald-600 gap-2"
                                                onClick={() => window.alert(`Correction published to ${issue.platform} (Demo Mode)`)}
                                            >
                                                <Check className="w-4 h-4" />
                                                Publish Correction
                                            </Button>
                                            <Button variant="outline" className="gap-2">
                                                <Flag className="w-4 h-4" />
                                                Report to {issue.platform}
                                            </Button>
                                            <Button variant="ghost" className="gap-2">
                                                <ExternalLink className="w-4 h-4" />
                                                View in {issue.platform}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Prevention Tips */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30">
                    <h4 className="font-semibold mb-3">Prevent Future Hallucinations</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-400 mt-0.5" />
                            Keep your website updated with accurate, factual information
                        </li>
                        <li className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-400 mt-0.5" />
                            Add structured data (schema) to help AI understand your content
                        </li>
                        <li className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-400 mt-0.5" />
                            Create authoritative content on topics where misinformation occurs
                        </li>
                        <li className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-400 mt-0.5" />
                            Monitor AI platforms regularly for new inaccuracies
                        </li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
}

export default HallucinationDefense;
