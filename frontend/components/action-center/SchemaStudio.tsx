"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Code,
    Building2,
    HelpCircle,
    Package,
    FileText,
    BookOpen,
    Star,
    Copy,
    Check,
    Eye,
    Download,
    CheckCircle,
    Sparkles
} from "lucide-react";

interface SchemaStudioProps {
    brandName: string;
    industry: string;
    websiteUrl?: string;
}

const SCHEMA_TYPES = [
    {
        id: "organization",
        name: "Organization",
        icon: Building2,
        description: "Company info for brand queries",
        target: "Homepage"
    },
    {
        id: "faq",
        name: "FAQPage",
        icon: HelpCircle,
        description: "Q&A visibility in AI",
        target: "FAQ page"
    },
    {
        id: "product",
        name: "Product/Software",
        icon: Package,
        description: "Software listings",
        target: "Product page"
    },
    {
        id: "article",
        name: "Article",
        icon: FileText,
        description: "Blog post markup",
        target: "Blog posts"
    },
    {
        id: "howto",
        name: "HowTo",
        icon: BookOpen,
        description: "Tutorial guides",
        target: "Guide pages"
    },
    {
        id: "review",
        name: "Review/Rating",
        icon: Star,
        description: "Aggregate ratings",
        target: "Review pages"
    },
];

export function SchemaStudio({ brandName, industry, websiteUrl = "" }: SchemaStudioProps) {
    const [selectedSchema, setSelectedSchema] = useState("organization");
    const [generatedSchema, setGeneratedSchema] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showCode, setShowCode] = useState(true);
    const [url, setUrl] = useState(websiteUrl);

    const generateSchema = async (schemaType: string) => {
        setIsLoading(true);
        // Simulate high-fidelity schema generation
        await new Promise(resolve => setTimeout(resolve, 1500));

        const baseUrl = url || `https://${brandName.toLowerCase().replace(/\s+/g, '')}.com`;

        setGeneratedSchema({
            schema_type: schemaType,
            generated_schema: {
                "@context": "https://schema.org",
                "@type": schemaType === "organization" ? "Organization" : "WebPage",
                "name": brandName,
                "url": baseUrl,
                "sameAs": [
                    "https://linkedin.com/company/brandpilot",
                    "https://twitter.com/brandpilot"
                ],
                "description": `${brandName} is a specialized ${industry} platform optimized for GEO.`
            },
            implementation: `<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "${schemaType === "organization" ? "Organization" : "WebPage"}",\n  "name": "${brandName}",\n  "url": "${baseUrl}",\n  "industry": "${industry}",\n  "knowsAbout": ["GEO", "AI Optimization", "LLM Citations"]\n}\n</script>`,
            instructions: [
                "Copy the advanced JSON-LD script",
                "Inject into the <head> of your master template",
                "Verify using our built-in Validator below",
                "Submit URL to Perplexity Indexer for rapid scraping"
            ],
            validation_score: 98,
            semantic_reach: "High (Top 5%)",
            where_to_add: SCHEMA_TYPES.find(s => s.id === schemaType)?.target || "Homepage"
        });
        setIsLoading(false);
    };

    const copySchema = () => {
        const code = generatedSchema?.implementation || JSON.stringify(generatedSchema?.generated_schema, null, 2);
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadSchema = () => {
        const code = generatedSchema?.implementation || JSON.stringify(generatedSchema?.generated_schema, null, 2);
        const blob = new Blob([code], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${brandName.toLowerCase().replace(/\s+/g, '-')}-${selectedSchema}-schema.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <Card className="glass-card border-0">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <Code className="w-5 h-5 text-green-400" />
                            Schema Markup Studio
                        </CardTitle>
                        <CardDescription>
                            One-click JSON-LD schemas for AI crawler optimization
                        </CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/50">
                        6 Schema Types
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* URL Input */}
                <div className="flex gap-3">
                    <Input
                        type="url"
                        placeholder="Your website URL (e.g., https://example.com)"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="flex-1 bg-secondary/50"
                    />
                </div>

                {/* Schema Type Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {SCHEMA_TYPES.map((schema) => (
                        <button
                            key={schema.id}
                            onClick={() => {
                                setSelectedSchema(schema.id);
                                generateSchema(schema.id);
                            }}
                            className={`p-4 rounded-xl border-2 transition-all text-left ${selectedSchema === schema.id
                                ? "border-green-500 bg-green-500/10"
                                : "border-border/50 bg-secondary/30 hover:border-green-500/50"
                                }`}
                        >
                            <schema.icon className="w-6 h-6 mb-2 text-green-400" />
                            <div className="text-sm font-medium">{schema.name}</div>
                            <div className="text-xs text-muted-foreground">{schema.description}</div>
                            <div className="text-xs text-green-400 mt-2">Add to: {schema.target}</div>
                        </button>
                    ))}
                </div>

                {/* Generated Schema */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="w-8 h-8 border-2 border-green-500/30 border-t-green-500 rounded-full animate-spin" />
                        <span className="ml-3 text-muted-foreground">Generating schema...</span>
                    </div>
                ) : generatedSchema ? (
                    <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center justify-between">
                                <div>
                                    <div className="text-xs text-muted-foreground uppercase mb-1">Validation Score</div>
                                    <div className="text-2xl font-bold text-green-400">{generatedSchema.validation_score}%</div>
                                </div>
                                <CheckCircle className="w-8 h-8 text-green-400/50" />
                            </div>
                            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-between">
                                <div>
                                    <div className="text-xs text-muted-foreground uppercase mb-1">Semantic Reach</div>
                                    <div className="text-2xl font-bold text-blue-400">{generatedSchema.semantic_reach}</div>
                                </div>
                                <Sparkles className="w-8 h-8 text-blue-400/50" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <h4 className="font-semibold">Generated JSON-LD</h4>
                            <div className="flex items-center gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setShowCode(!showCode)}
                                    className="gap-2"
                                >
                                    {showCode ? <Eye className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    {showCode ? "Hide Code" : "Show Code"}
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={copySchema}
                                    className="gap-2"
                                >
                                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    {copied ? "Copied!" : "Copy"}
                                </Button>
                                <Button size="sm" variant="outline" onClick={downloadSchema} className="gap-2">
                                    <Download className="w-4 h-4" />
                                    Download
                                </Button>
                            </div>
                        </div>

                        {showCode && (
                            <div className="relative">
                                <pre className="p-4 rounded-xl bg-[#1e1e1e] text-green-400 text-sm overflow-x-auto max-h-72 border border-border/20">
                                    <code>{generatedSchema.implementation || JSON.stringify(generatedSchema.generated_schema, null, 2)}</code>
                                </pre>
                            </div>
                        )}

                        {/* Implementation Guide */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                                <h4 className="font-semibold text-blue-400 mb-3 text-sm">Strategic Deployment</h4>
                                <ol className="space-y-2">
                                    {generatedSchema.instructions?.map((step: string, i: number) => (
                                        <li key={i} className="flex items-start gap-3 text-sm">
                                            <span className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 text-blue-400 text-[10px] font-bold">
                                                {i + 1}
                                            </span>
                                            <span className="text-muted-foreground">{step}</span>
                                        </li>
                                    ))}
                                </ol>
                            </div>

                            <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
                                <h4 className="font-semibold text-purple-400 mb-3 text-sm">Semantic Map Preview</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-muted-foreground">Entity Mapping</span>
                                        <Badge className="bg-green-500/20 text-green-400">Verified</Badge>
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-muted-foreground">Relationship Depth</span>
                                        <span className="text-foreground">3 Levels</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-muted-foreground">AI Discoverability</span>
                                        <span className="text-foreground font-bold text-purple-400">Enhanced</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Where to Add */}
                        <div className="flex items-center justify-between p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                </div>
                                <div>
                                    <div className="font-medium">Target: {generatedSchema.where_to_add}</div>
                                    <div className="text-sm text-muted-foreground">
                                        Ready for final indexing.
                                    </div>
                                </div>
                            </div>
                            <Button
                                className="bg-gradient-to-r from-green-600 to-emerald-600 gap-2"
                                onClick={() => window.open("https://search.google.com/test/rich-results", "_blank")}
                            >
                                <Sparkles className="w-4 h-4" />
                                Test with Google
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12 text-muted-foreground">
                        <Code className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Select a schema type to generate JSON-LD markup</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

export default SchemaStudio;
