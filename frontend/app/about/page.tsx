"use client";

import React from "react";
import { Header, Footer } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Target, Zap, Shield, Users, BarChart3 } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            <main>
                {/* Hero Section */}
                <section className="py-20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5" />
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="max-w-3xl mx-auto text-center">
                            <Badge className="mb-4 bg-purple-500/20 text-purple-400 border-purple-500/30 px-3 py-1">
                                Our Mission
                            </Badge>
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
                                The Future of Search is Generative
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                We're on a mission to help brands navigate the shift from traditional Search Engine Optimization (SEO) to Generative Engine Optimization (GEO).
                            </p>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-20">
                    <div className="container mx-auto px-6">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold mb-6">What is GEO?</h2>
                                <p className="text-lg text-muted-foreground mb-4">
                                    Generative Engine Optimization (GEO) is the process of optimizing content to be cited, mentioned, and recommended by AI platforms like ChatGPT, Gemini, Perplexity, and Claude.
                                </p>
                                <p className="text-lg text-muted-foreground mb-6">
                                    Traditional SEO focuses on keywords and backlinks for Google. GEO focuses on context, citations, and authority for Large Language Models (LLMs).
                                </p>
                                <div className="space-y-4">
                                    {[
                                        { title: "AI Visibility", text: "How often your brand is mentioned by AI models." },
                                        { title: "Citation Gaps", text: "Identifying where competitors are cited but you are not." },
                                        { title: "Sentiment Analysis", text: "Ensuring AI tools view your brand positively." }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-3">
                                            <div className="mt-1">
                                                <Zap className="w-5 h-5 text-purple-400" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">{item.title}</h4>
                                                <p className="text-sm text-muted-foreground">{item.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <Card className="glass-card border-0 overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 p-8">
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-4 p-4 glass-card border border-border/50 rounded-xl">
                                                <Target className="w-10 h-10 text-orange-400" />
                                                <div>
                                                    <h4 className="font-bold">Context-First Strategy</h4>
                                                    <p className="text-sm text-muted-foreground">LLMs value deep context over simple keyword match.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 p-4 glass-card border border-border/50 rounded-xl">
                                                <BarChart3 className="w-10 h-10 text-blue-400" />
                                                <div>
                                                    <h4 className="font-bold">Verified Authority</h4>
                                                    <p className="text-sm text-muted-foreground">Building trust through cross-platform citations.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 p-4 glass-card border border-border/50 rounded-xl">
                                                <Shield className="w-10 h-10 text-green-400" />
                                                <div>
                                                    <h4 className="font-bold">Hallucination Defense</h4>
                                                    <p className="text-sm text-muted-foreground">Correcting misinformation at the source.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Team/Brand Stats */}
                <section className="py-20 bg-secondary/20">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-3xl font-bold mb-12">The GEO-Sight Impact</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div>
                                <div className="text-4xl font-bold gradient-text mb-2">10M+</div>
                                <p className="text-muted-foreground">AI Responses Analyzed</p>
                            </div>
                            <div>
                                <div className="text-4xl font-bold gradient-text mb-2">5,000+</div>
                                <p className="text-muted-foreground">Brands Optimized</p>
                            </div>
                            <div>
                                <div className="text-4xl font-bold gradient-text mb-2">45%</div>
                                <p className="text-muted-foreground">Average Visibility Growth</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
