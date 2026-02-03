"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    User,
    Mail,
    Lock,
    Bell,
    CreditCard,
    Key,
    Save,
    Loader2,
    Copy,
    RefreshCw,
} from "lucide-react";

export default function SettingsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [profile, setProfile] = useState({
        name: session?.user?.name || "",
        email: session?.user?.email || "",
    });
    const [apiKey, setApiKey] = useState("gs_live_xxxxxxxxxxxxxxxxxxxxxxxxx");
    const [showApiKey, setShowApiKey] = useState(false);

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!session) {
        router.push("/");
        return null;
    }

    const tier = (session.user as any)?.tier || "free";

    const handleSave = async () => {
        setIsSaving(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsSaving(false);
    };

    const copyApiKey = () => {
        navigator.clipboard.writeText(apiKey);
    };

    return (
        <div className="p-8 max-w-4xl">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold gradient-text">Settings</h1>
                <p className="text-muted-foreground">
                    Manage your account and preferences
                </p>
            </div>

            <div className="space-y-8">
                {/* Profile Settings */}
                <Card className="glass-card border-0">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            Profile Settings
                        </CardTitle>
                        <CardDescription>Update your personal information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    type="text"
                                    value={profile.name}
                                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    className="pl-10 bg-secondary/50"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    type="email"
                                    value={profile.email}
                                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                    className="pl-10 bg-secondary/50"
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleSave} disabled={isSaving} className="gap-2">
                            {isSaving ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Save className="w-4 h-4" />
                            )}
                            Save Changes
                        </Button>
                    </CardFooter>
                </Card>

                {/* Subscription */}
                <Card className="glass-card border-0">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CreditCard className="w-5 h-5" />
                            Subscription
                        </CardTitle>
                        <CardDescription>Manage your subscription plan</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">Current Plan:</span>
                                    <Badge className={
                                        tier === "agency" ? "bg-blue-500/20 text-blue-400" :
                                            tier === "pro" ? "bg-purple-500/20 text-purple-400" :
                                                "bg-secondary"
                                    }>
                                        {tier.charAt(0).toUpperCase() + tier.slice(1)}
                                    </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {tier === "free"
                                        ? "1 audit per day, basic features"
                                        : tier === "pro"
                                            ? "Unlimited audits, full Action Center access"
                                            : "White-label, 20 brands, priority support"}
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => router.push("/pricing")}
                            >
                                {tier === "free" ? "Upgrade" : "Manage Plan"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* API Access */}
                <Card className="glass-card border-0">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Key className="w-5 h-5" />
                            API Access
                        </CardTitle>
                        <CardDescription>
                            {tier === "free"
                                ? "API access is available on Pro and Agency plans"
                                : "Use your API key to integrate GEO-Sight"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {tier !== "free" ? (
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Input
                                        type={showApiKey ? "text" : "password"}
                                        value={apiKey}
                                        readOnly
                                        className="bg-secondary/50 font-mono"
                                    />
                                    <Button variant="outline" size="icon" onClick={copyApiKey}>
                                        <Copy className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" size="icon">
                                        <RefreshCw className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="showApiKey"
                                        checked={showApiKey}
                                        onChange={(e) => setShowApiKey(e.target.checked)}
                                        className="rounded"
                                    />
                                    <label htmlFor="showApiKey" className="text-sm">
                                        Show API key
                                    </label>
                                </div>
                            </div>
                        ) : (
                            <Button onClick={() => router.push("/pricing")}>
                                Upgrade to Access API
                            </Button>
                        )}
                    </CardContent>
                </Card>

                {/* Notifications */}
                <Card className="glass-card border-0">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="w-5 h-5" />
                            Notifications
                        </CardTitle>
                        <CardDescription>Configure how you receive updates</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            { label: "Weekly visibility reports", enabled: true },
                            { label: "Hallucination alerts", enabled: true },
                            { label: "New citation opportunities", enabled: false },
                            { label: "Product updates", enabled: true },
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between py-2">
                                <span>{item.label}</span>
                                <button
                                    className={`relative w-11 h-6 rounded-full transition-colors ${item.enabled ? "bg-primary" : "bg-secondary"
                                        }`}
                                >
                                    <div
                                        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${item.enabled ? "left-6" : "left-1"
                                            }`}
                                    />
                                </button>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Security */}
                <Card className="glass-card border-0">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Lock className="w-5 h-5" />
                            Security
                        </CardTitle>
                        <CardDescription>Manage your account security</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full justify-start gap-2">
                            <Lock className="w-4 h-4" />
                            Change Password
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-2 text-destructive hover:text-destructive">
                            Delete Account
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
