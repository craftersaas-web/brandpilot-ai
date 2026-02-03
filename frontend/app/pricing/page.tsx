"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Zap, Building2, Users, ArrowRight } from "lucide-react";
import { AuthModal } from "@/components/auth";

const plans = [
    {
        name: "Free",
        price: "$0",
        period: "forever",
        description: "Perfect for trying out GEO-Sight",
        features: [
            { name: "1 audit per day", included: true },
            { name: "Basic visibility score", included: true },
            { name: "Single brand tracking", included: true },
            { name: "Action Center access", included: false },
            { name: "API access", included: false },
            { name: "Priority support", included: false },
        ],
        cta: "Get Started",
        popular: false,
    },
    {
        name: "Pro",
        price: "$49",
        period: "per month",
        description: "For growing brands and marketers",
        features: [
            { name: "Unlimited audits", included: true },
            { name: "Full visibility analytics", included: true },
            { name: "Track up to 5 brands", included: true },
            { name: "Full Action Center access", included: true },
            { name: "API access (1000 req/mo)", included: true },
            { name: "Email support", included: true },
        ],
        cta: "Start Pro Trial",
        popular: true,
    },
    {
        name: "Agency",
        price: "$199",
        period: "per month",
        description: "For agencies and enterprise teams",
        features: [
            { name: "Unlimited audits", included: true },
            { name: "White-label reports", included: true },
            { name: "Track up to 20 brands", included: true },
            { name: "Full Action Center + AI suggestions", included: true },
            { name: "Unlimited API access", included: true },
            { name: "Priority 24/7 support", included: true },
        ],
        cta: "Contact Sales",
        popular: false,
    },
];

export default function PricingPage() {
    const { data: session } = useSession();
    const [annual, setAnnual] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);

    const handlePlanClick = (planName: string) => {
        if (!session) {
            setShowAuthModal(true);
            return;
        }
        window.location.href = "/dashboard/settings?plan=" + planName.toLowerCase();
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 container mx-auto px-6 py-16">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <Badge className="mb-4 bg-purple-500/20 text-purple-400 border-purple-500/30">
                        Pricing
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
                        Choose Your Visibility Plan
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Start free and scale as your AI visibility grows. Cancel anytime.
                    </p>

                    {/* Annual/Monthly Toggle */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <span className={annual ? "text-muted-foreground" : "font-medium"}>
                            Monthly
                        </span>
                        <button
                            onClick={() => setAnnual(!annual)}
                            className={`relative w-14 h-7 rounded-full transition-colors ${annual ? "bg-primary" : "bg-secondary"
                                }`}
                        >
                            <div
                                className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${annual ? "left-8" : "left-1"
                                    }`}
                            />
                        </button>
                        <span className={!annual ? "text-muted-foreground" : "font-medium"}>
                            Annual
                            <Badge className="ml-2 bg-green-500/20 text-green-400">Save 20%</Badge>
                        </span>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan) => (
                        <Card
                            key={plan.name}
                            className={`glass-card border-0 relative ${plan.popular ? "gradient-border glow-purple scale-105" : ""
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                                        Most Popular
                                    </Badge>
                                </div>
                            )}
                            <CardHeader className="text-center pt-8">
                                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                                <CardDescription>{plan.description}</CardDescription>
                                <div className="mt-4">
                                    <span className="text-4xl font-bold gradient-text">
                                        {annual && plan.price !== "$0"
                                            ? `$${Math.round(parseInt(plan.price.slice(1)) * 0.8)}`
                                            : plan.price}
                                    </span>
                                    <span className="text-muted-foreground">/{plan.period}</span>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {plan.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        {feature.included ? (
                                            <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                                        ) : (
                                            <X className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                                        )}
                                        <span
                                            className={
                                                feature.included ? "" : "text-muted-foreground"
                                            }
                                        >
                                            {feature.name}
                                        </span>
                                    </div>
                                ))}
                            </CardContent>
                            <CardFooter className="pt-4">
                                <Button
                                    className={`w-full h-12 ${plan.popular
                                        ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
                                        : ""
                                        }`}
                                    variant={plan.popular ? "default" : "outline"}
                                    onClick={() => handlePlanClick(plan.name)}
                                >
                                    {plan.cta}
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="mt-24 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        {[
                            {
                                q: "What is a GEO audit?",
                                a: "A GEO (Generative Engine Optimization) audit checks how AI platforms like ChatGPT, Gemini, and Perplexity mention and describe your brand. We provide a visibility score and actionable recommendations.",
                            },
                            {
                                q: "Can I cancel anytime?",
                                a: "Yes! You can cancel your subscription at any time. You'll continue to have access until the end of your billing period.",
                            },
                            {
                                q: "What's included in the Action Center?",
                                a: "The Action Center provides Citation Gap analysis, JSON-LD schema generation for AI visibility, and Hallucination Alerts when AI makes incorrect claims about your brand.",
                            },
                            {
                                q: "Do you offer refunds?",
                                a: "Yes, we offer a 14-day money-back guarantee on all paid plans. See our refund policy for details.",
                            },
                        ].map((faq, idx) => (
                            <Card key={idx} className="glass-card border-0">
                                <CardContent className="pt-6">
                                    <h3 className="font-semibold mb-2">{faq.q}</h3>
                                    <p className="text-muted-foreground">{faq.a}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-24 text-center">
                    <Card className="glass-card border-0 gradient-border max-w-2xl mx-auto">
                        <CardContent className="py-12">
                            <h2 className="text-2xl font-bold mb-4">
                                Ready to improve your AI visibility?
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                Start with a free audit and see where your brand stands.
                            </p>
                            <Link href="/">
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
                                >
                                    <Zap className="w-5 h-5 mr-2" />
                                    Run Free Audit
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />

            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onSuccess={() => setShowAuthModal(false)}
            />
        </div>
    );
}
