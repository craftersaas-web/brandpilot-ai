"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Settings,
    Key,
    Shield,
    Bell,
    Mail,
    Globe,
    Zap,
    Save,
    Loader2,
    RefreshCw,
    AlertTriangle,
} from "lucide-react";

export default function AdminSettingsPage() {
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsSaving(false);
    };

    return (
        <div className="p-8 max-w-4xl">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold gradient-text">System Settings</h1>
                <p className="text-muted-foreground">
                    Configure platform-wide settings and features
                </p>
            </div>

            <div className="space-y-8">
                {/* API Configuration */}
                <Card className="glass-card border-0">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Key className="w-5 h-5" />
                            API Configuration
                        </CardTitle>
                        <CardDescription>External API keys and integrations</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">OpenAI API Key</label>
                            <Input
                                type="password"
                                placeholder="sk-..."
                                className="bg-secondary/50 font-mono"
                                defaultValue="sk-••••••••••••••••••••••••"
                            />
                            <p className="text-xs text-muted-foreground">Used for ChatGPT queries</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Google AI API Key</label>
                            <Input
                                type="password"
                                placeholder="AIza..."
                                className="bg-secondary/50 font-mono"
                                defaultValue="AIza••••••••••••••••••••"
                            />
                            <p className="text-xs text-muted-foreground">Used for Gemini queries</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Perplexity API Key</label>
                            <Input
                                type="password"
                                placeholder="pplx-..."
                                className="bg-secondary/50 font-mono"
                                defaultValue="pplx-••••••••••••••••••"
                            />
                            <p className="text-xs text-muted-foreground">Used for Perplexity queries</p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleSave} disabled={isSaving} className="gap-2">
                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Save API Keys
                        </Button>
                    </CardFooter>
                </Card>

                {/* Rate Limits */}
                <Card className="glass-card border-0">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Zap className="w-5 h-5" />
                            Rate Limits
                        </CardTitle>
                        <CardDescription>Configure API usage limits per tier</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {[
                                { tier: "Free", audits: "1", api: "0", color: "bg-gray-500" },
                                { tier: "Pro", audits: "Unlimited", api: "1000", color: "bg-purple-500" },
                                { tier: "Agency", audits: "Unlimited", api: "Unlimited", color: "bg-blue-500" },
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-3 h-3 rounded-full ${item.color}`} />
                                        <span className="font-medium">{item.tier}</span>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-right">
                                            <p className="font-medium">{item.audits}</p>
                                            <p className="text-xs text-muted-foreground">audits/day</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium">{item.api}</p>
                                            <p className="text-xs text-muted-foreground">API req/mo</p>
                                        </div>
                                        <Button variant="outline" size="sm">Edit</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Feature Flags */}
                <Card className="glass-card border-0">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="w-5 h-5" />
                            Feature Flags
                        </CardTitle>
                        <CardDescription>Enable or disable platform features</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            { label: "User Registration", enabled: true, description: "Allow new users to sign up" },
                            { label: "Google OAuth", enabled: true, description: "Enable Google sign-in" },
                            { label: "API Access", enabled: true, description: "Allow API key generation" },
                            { label: "White-label Reports", enabled: true, description: "For Agency tier users" },
                            { label: "Beta Features", enabled: false, description: "Show experimental features" },
                            { label: "Maintenance Mode", enabled: false, description: "Disable all user access" },
                        ].map((flag, idx) => (
                            <div key={idx} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                                <div>
                                    <p className="font-medium">{flag.label}</p>
                                    <p className="text-sm text-muted-foreground">{flag.description}</p>
                                </div>
                                <button
                                    className={`relative w-11 h-6 rounded-full transition-colors ${flag.enabled ? "bg-primary" : "bg-secondary"
                                        }`}
                                >
                                    <div
                                        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${flag.enabled ? "left-6" : "left-1"
                                            }`}
                                    />
                                </button>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Email Templates */}
                <Card className="glass-card border-0">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Mail className="w-5 h-5" />
                            Email Templates
                        </CardTitle>
                        <CardDescription>Customize automated email messages</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {[
                            "Welcome Email",
                            "Password Reset",
                            "Subscription Confirmation",
                            "Weekly Report",
                            "Hallucination Alert",
                        ].map((template, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                                <span>{template}</span>
                                <Button variant="outline" size="sm">Edit Template</Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="glass-card border-0 border-l-4 border-l-red-500">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-red-400">
                            <AlertTriangle className="w-5 h-5" />
                            Danger Zone
                        </CardTitle>
                        <CardDescription>Irreversible actions - proceed with caution</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                            <div>
                                <p className="font-medium">Clear All Audit Data</p>
                                <p className="text-sm text-muted-foreground">Remove all audit history from the database</p>
                            </div>
                            <Button variant="outline" className="text-red-400 border-red-500/30 hover:bg-red-500/10">
                                Clear Data
                            </Button>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                            <div>
                                <p className="font-medium">Reset All User Sessions</p>
                                <p className="text-sm text-muted-foreground">Force all users to re-authenticate</p>
                            </div>
                            <Button variant="outline" className="text-red-400 border-red-500/30 hover:bg-red-500/10">
                                Reset Sessions
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
