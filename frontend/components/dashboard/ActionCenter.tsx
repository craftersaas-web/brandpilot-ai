"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Copy,
    ExternalLink,
    AlertTriangle,
    CheckCircle,
    Code,
    FileText,
    Target,
    Sparkles
} from "lucide-react";

interface CitationGap {
    platform: string;
    url: string;
    competitor_mentioned: string;
    context: string;
    priority: string;
    pitch_template: string;
}

interface HallucinationAlert {
    source: string;
    incorrect_claim: string;
    correct_information: string;
    severity: string;
    correction_draft: string;
}

interface SchemaData {
    organization: object;
    faq: object;
    person?: object;
}

interface ActionCenterProps {
    citationGaps: CitationGap[];
    hallucinationAlerts: HallucinationAlert[];
    schemaData?: SchemaData;
    brandName?: string;
    industry?: string;
}

export function ActionCenter({
    citationGaps,
    hallucinationAlerts,
    schemaData,
    brandName = "Your Brand",
    industry = "your industry"
}: ActionCenterProps) {

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    // Generate schema code for display
    const generateSchemaCode = () => {
        if (!schemaData) {
            return `{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "${brandName}",
  "url": "https://yourbrand.com",
  "description": "The leading ${industry} solution for modern businesses.",
  "sameAs": [
    "https://linkedin.com/company/${brandName.toLowerCase().replace(/\s/g, '-')}",
    "https://twitter.com/${brandName.toLowerCase().replace(/\s/g, '')}"
  ],
  "knowsAbout": ["${industry}", "${industry} solutions", "business optimization"]
}`;
        }
        return JSON.stringify(schemaData, null, 2);
    };

    const getPriorityColor = (priority: string) => {
        switch (priority.toLowerCase()) {
            case "high": return "bg-red-500/20 text-red-400 border-red-500/30";
            case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
            case "low": return "bg-green-500/20 text-green-400 border-green-500/30";
            default: return "bg-blue-500/20 text-blue-400 border-blue-500/30";
        }
    };

    const getSeverityColor = (severity: string) => {
        switch (severity.toLowerCase()) {
            case "critical": return "bg-red-500/20 text-red-400";
            case "major": return "bg-orange-500/20 text-orange-400";
            case "minor": return "bg-yellow-500/20 text-yellow-400";
            default: return "bg-blue-500/20 text-blue-400";
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Citation Gaps Card */}
            <Card className="glass-card border-0 overflow-hidden">
                <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-geo-purple/20">
                            <Target className="w-5 h-5 text-geo-purple" style={{ color: "oklch(0.65 0.25 280)" }} />
                        </div>
                        <div>
                            <CardTitle className="text-lg">Citation Gaps</CardTitle>
                            <CardDescription>Where competitors are mentioned but you are not</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                    {citationGaps.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                            <CheckCircle className="w-12 h-12 text-green-400 mb-3" />
                            <p className="text-muted-foreground">No citation gaps found!</p>
                        </div>
                    ) : (
                        citationGaps.map((gap, index) => (
                            <div
                                key={index}
                                className="p-4 rounded-lg bg-secondary/30 border border-border/50 space-y-3 hover:bg-secondary/40 transition-colors"
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">{gap.platform}</span>
                                        <Badge variant="outline" className={getPriorityColor(gap.priority)}>
                                            {gap.priority}
                                        </Badge>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => window.open(gap.url, "_blank")}
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </Button>
                                </div>
                                <p className="text-sm text-muted-foreground">{gap.context}</p>
                                <div className="text-xs text-muted-foreground">
                                    Competitor: <span className="text-foreground">{gap.competitor_mentioned}</span>
                                </div>
                                <div className="pt-2 border-t border-border/30">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-muted-foreground">Pitch Template</span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-7 text-xs gap-1"
                                            onClick={() => copyToClipboard(gap.pitch_template)}
                                        >
                                            <Copy className="w-3 h-3" />
                                            Copy Pitch
                                        </Button>
                                    </div>
                                    <p className="text-xs mt-1 text-muted-foreground line-clamp-2">
                                        {gap.pitch_template}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </CardContent>
            </Card>

            {/* Schema Injection Card */}
            <Card className="glass-card border-0 overflow-hidden">
                <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-geo-blue/20">
                            <Code className="w-5 h-5" style={{ color: "oklch(0.65 0.2 250)" }} />
                        </div>
                        <div>
                            <CardTitle className="text-lg">Schema Injection</CardTitle>
                            <CardDescription>JSON-LD schema optimized for AI crawlers</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="relative">
                        <pre className="p-4 rounded-lg bg-black/40 text-xs overflow-x-auto max-h-64 overflow-y-auto">
                            <code className="text-green-400">{generateSchemaCode()}</code>
                        </pre>
                        <Button
                            variant="secondary"
                            size="sm"
                            className="absolute top-2 right-2 h-8 text-xs gap-1"
                            onClick={() => copyToClipboard(generateSchemaCode())}
                        >
                            <Copy className="w-3 h-3" />
                            Copy
                        </Button>
                    </div>
                    <div className="p-3 rounded-lg bg-geo-purple/10 border border-geo-purple/20">
                        <p className="text-xs text-muted-foreground">
                            <Sparkles className="w-3 h-3 inline mr-1" style={{ color: "oklch(0.65 0.25 280)" }} />
                            Paste this code into the <code className="px-1 py-0.5 rounded bg-secondary">&lt;head&gt;</code> section
                            of your website to improve AI visibility.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Hallucination Alerts Card */}
            <Card className="glass-card border-0 overflow-hidden">
                <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-destructive/20">
                            <AlertTriangle className="w-5 h-5 text-destructive" />
                        </div>
                        <div>
                            <CardTitle className="text-lg">Hallucination Alerts</CardTitle>
                            <CardDescription>Incorrect facts AI is saying about your brand</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                    {hallucinationAlerts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                            <CheckCircle className="w-12 h-12 text-green-400 mb-3" />
                            <p className="text-muted-foreground">No hallucinations detected!</p>
                        </div>
                    ) : (
                        hallucinationAlerts.map((alert, index) => (
                            <div
                                key={index}
                                className="p-4 rounded-lg bg-destructive/5 border border-destructive/20 space-y-3"
                            >
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                                        {alert.severity}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground capitalize">
                                        Source: {alert.source}
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    <div>
                                        <span className="text-xs text-destructive font-medium">AI Claims:</span>
                                        <p className="text-sm mt-1 line-through text-muted-foreground">
                                            {alert.incorrect_claim}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-xs text-green-400 font-medium">Correct Info:</span>
                                        <p className="text-sm mt-1">
                                            {alert.correct_information}
                                        </p>
                                    </div>
                                </div>
                                <div className="pt-3 border-t border-border/30">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full text-xs gap-2"
                                        onClick={() => copyToClipboard(alert.correction_draft)}
                                    >
                                        <FileText className="w-3 h-3" />
                                        Copy Correction Article Draft
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
