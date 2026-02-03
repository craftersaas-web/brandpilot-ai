"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Building2,
    Plus,
    Pencil,
    Trash2,
    Globe,
    Tag,
    TrendingUp,
    Lock,
} from "lucide-react";

// Mock brands data
const brandsData = [
    {
        id: 1,
        name: "TechCorp",
        industry: "Technology",
        website: "https://techcorp.com",
        lastAudit: "2026-02-03",
        score: 78,
    },
    {
        id: 2,
        name: "StartupXYZ",
        industry: "SaaS",
        website: "https://startupxyz.io",
        lastAudit: "2026-02-02",
        score: 45,
    },
];

export default function BrandsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [showAddModal, setShowAddModal] = useState(false);

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

    const tier = (session.user as any)?.tier || "free";
    const maxBrands = tier === "free" ? 1 : tier === "pro" ? 5 : 20;
    const canAddMore = brandsData.length < maxBrands;

    const getScoreColor = (score: number) => {
        if (score >= 70) return "text-green-400";
        if (score >= 40) return "text-yellow-400";
        return "text-red-400";
    };

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold gradient-text">Brands</h1>
                    <p className="text-muted-foreground">
                        Manage the brands you're tracking ({brandsData.length}/{maxBrands})
                    </p>
                </div>
                <Button
                    onClick={() => setShowAddModal(true)}
                    disabled={!canAddMore}
                    className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
                >
                    <Plus className="w-4 h-4" />
                    Add Brand
                </Button>
            </div>

            {/* Upgrade Banner for Free Users */}
            {tier === "free" && brandsData.length >= 1 && (
                <Card className="glass-card border-0 mb-8 gradient-border">
                    <CardContent className="py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-lg bg-purple-500/20">
                                    <Lock className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                    <p className="font-medium">Want to track more brands?</p>
                                    <p className="text-sm text-muted-foreground">
                                        Upgrade to Pro for up to 5 brands, or Agency for 20 brands.
                                    </p>
                                </div>
                            </div>
                            <Button onClick={() => router.push("/pricing")}>
                                View Plans
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Brands Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {brandsData.map((brand) => (
                    <Card key={brand.id} className="glass-card border-0 hover:scale-[1.02] transition-transform">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                                        <Building2 className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg">{brand.name}</CardTitle>
                                        <CardDescription className="flex items-center gap-1">
                                            <Tag className="w-3 h-3" />
                                            {brand.industry}
                                        </CardDescription>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Globe className="w-4 h-4" />
                                <a href={brand.website} target="_blank" rel="noopener noreferrer" className="hover:text-foreground truncate">
                                    {brand.website}
                                </a>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm">Latest Score</span>
                                </div>
                                <span className={`text-2xl font-bold ${getScoreColor(brand.score)}`}>
                                    {brand.score}
                                </span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Last audited</span>
                                <span>{brand.lastAudit}</span>
                            </div>

                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => router.push(`/?brand=${encodeURIComponent(brand.name)}`)}
                            >
                                Run New Audit
                            </Button>
                        </CardContent>
                    </Card>
                ))}

                {/* Add Brand Card */}
                {canAddMore && (
                    <Card
                        className="glass-card border-0 border-dashed cursor-pointer hover:bg-secondary/30 transition-colors flex items-center justify-center min-h-[280px]"
                        onClick={() => setShowAddModal(true)}
                    >
                        <CardContent className="text-center py-12">
                            <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-4">
                                <Plus className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <p className="font-medium">Add New Brand</p>
                            <p className="text-sm text-muted-foreground">
                                Track another brand's AI visibility
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Add Brand Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setShowAddModal(false)}
                    />
                    <Card className="glass-card border-0 w-full max-w-md relative z-10 mx-4">
                        <CardHeader>
                            <CardTitle>Add New Brand</CardTitle>
                            <CardDescription>Enter the brand details to start tracking</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Brand Name</label>
                                <Input placeholder="e.g., TechCorp" className="bg-secondary/50" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Industry</label>
                                <Input placeholder="e.g., Technology, SaaS" className="bg-secondary/50" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Website (optional)</label>
                                <Input placeholder="https://example.com" className="bg-secondary/50" />
                            </div>
                            <div className="flex gap-2 pt-4">
                                <Button variant="outline" onClick={() => setShowAddModal(false)} className="flex-1">
                                    Cancel
                                </Button>
                                <Button onClick={() => setShowAddModal(false)} className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600">
                                    Add Brand
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
