"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthModal } from "@/components/auth";
import {
  Rocket,
  Bot,
  Eye,
  MessageSquare,
  Shield,
  Target,
  FileText,
  Code,
  Sparkles,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Zap,
  Play,
  Star,
  Users
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Header, Footer } from "@/components/layout";

const FEATURES = [
  {
    icon: Eye,
    title: "AI Visibility Index",
    description: "Real-time tracking across ChatGPT, Gemini, Perplexity, and Claude",
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
  },
  {
    icon: MessageSquare,
    title: "Citation Builder",
    description: "Auto-generate Reddit, Quora, and forum content to get cited",
    color: "text-orange-400",
    bgColor: "bg-orange-500/20",
  },
  {
    icon: FileText,
    title: "Content Engine",
    description: "AI-optimized FAQs, comparisons, and guides LLMs love to cite",
    color: "text-purple-400",
    bgColor: "bg-purple-500/20",
  },
  {
    icon: Code,
    title: "Schema Studio",
    description: "One-click JSON-LD schemas for better AI crawler visibility",
    color: "text-green-400",
    bgColor: "bg-green-500/20",
  },
  {
    icon: Shield,
    title: "Hallucination Defense",
    description: "Detect and correct AI misinformation about your brand",
    color: "text-red-400",
    bgColor: "bg-red-500/20",
  },
  {
    icon: Target,
    title: "Competitor Intel",
    description: "Gap analysis and steal opportunities from competitors",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/20",
  },
];

const PLATFORMS = [
  { name: "ChatGPT", color: "text-green-400", users: "300M+" },
  { name: "Gemini", color: "text-blue-400", users: "200M+" },
  { name: "Perplexity", color: "text-purple-400", users: "15M+" },
  { name: "Claude", color: "text-orange-400", users: "100M+" },
];

const TESTIMONIALS = [
  {
    quote: "BrandPilot AI increased our AI visibility by 40% in just 3 weeks. The autopilot features are incredible.",
    author: "Sarah Chen",
    role: "CMO, TechFlow",
    rating: 5,
  },
  {
    quote: "Finally, a tool that doesn't just show problems but actually generates solutions. Game changer.",
    author: "Marcus Johnson",
    role: "Founder, GrowthLabs",
    rating: 5,
  },
  {
    quote: "The Citation Builder alone is worth the subscription. We're now mentioned in 80% more AI responses.",
    author: "Emily Rodriguez",
    role: "Head of Marketing, SaaSify",
    rating: 5,
  },
];

export default function HomePage() {
  const { data: session } = useSession();
  const [brandName, setBrandName] = useState("");
  const [website, setWebsite] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleQuickAudit = () => {
    if (!session) {
      setShowAuthModal(true);
      return;
    }
    if (brandName.trim()) {
      window.location.href = `/dashboard?brand=${encodeURIComponent(brandName)}&website=${encodeURIComponent(website)}`;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/50 text-purple-400">
              <Sparkles className="w-3 h-3 mr-1" />
              The #1 GEO Optimization Platform
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Rank Your Brand</span>
              <br />
              <span className="text-foreground">on AI Platforms</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              The complete autopilot solution to monitor, optimize, and improve your brand's visibility
              across ChatGPT, Gemini, Perplexity, and Claude.
            </p>

            {/* Quick Audit Form */}
            <div className="flex flex-col gap-6 max-w-2xl mx-auto mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 text-left">
                  <p className="text-sm font-semibold text-purple-400 ml-1">Brand Name</p>
                  <Input
                    placeholder="e.g., Apple, Nike, MySaaS"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="h-14 text-lg bg-secondary/50 border-border/50 focus:ring-2 focus:ring-purple-500/50"
                    onKeyDown={(e) => e.key === "Enter" && handleQuickAudit()}
                  />
                </div>
                <div className="space-y-2 text-left">
                  <p className="text-sm font-semibold text-blue-400 ml-1">Website URL</p>
                  <Input
                    placeholder="e.g., website.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="h-14 text-lg bg-secondary/50 border-border/50 focus:ring-2 focus:ring-blue-500/50"
                    onKeyDown={(e) => e.key === "Enter" && handleQuickAudit()}
                  />
                </div>
              </div>

              <Button
                onClick={handleQuickAudit}
                className="h-20 px-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 gap-3 text-2xl font-bold shadow-2xl shadow-purple-500/20 group transition-all duration-300 transform hover:scale-[1.02]"
              >
                <Rocket className="w-8 h-8 group-hover:rotate-12 transition-transform" />
                Start My Free Audit
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              ✓ No credit card required &nbsp;·&nbsp; ✓ 30-second analysis &nbsp;·&nbsp; ✓ Instant results
            </p>
          </div>

          {/* Platform Logos */}
          <div className="mt-16 flex justify-center items-center gap-8 flex-wrap">
            <span className="text-sm text-muted-foreground">Optimize for:</span>
            {PLATFORMS.map((platform) => (
              <div key={platform.name} className="flex items-center gap-2">
                <Bot className={`w-5 h-5 ${platform.color}`} />
                <span className={`font-semibold ${platform.color}`}>{platform.name}</span>
                <span className="text-xs text-muted-foreground">({platform.users} users)</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-500/20 border-purple-500/50 text-purple-400">
              Autopilot Solutions
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Stop Monitoring. Start Winning.</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Unlike basic tracking tools, BrandPilot AI generates ready-to-use content and solutions—not just reports.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <Card key={i} className="glass-card border-0 group hover:border-purple-500/50 transition-all">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`w-7 h-7 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-500/20 border-blue-500/50 text-blue-400">
              Simple Process
            </Badge>
            <h2 className="text-4xl font-bold mb-4">How BrandPilot AI Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three steps to dominate AI search results
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Run an Audit",
                description: "Enter your brand name and get instant visibility analysis across all major AI platforms.",
                icon: Rocket,
              },
              {
                step: 2,
                title: "Get Autopilot Actions",
                description: "Receive AI-generated content, schema markup, and citation opportunities ready to use.",
                icon: Zap,
              },
              {
                step: 3,
                title: "Watch Your Rankings Climb",
                description: "Implement the solutions and see your brand mentioned more in AI responses.",
                icon: TrendingUp,
              },
            ].map((item, i) => (
              <div key={i} className="text-center relative">
                {i < 2 && (
                  <div className="hidden md:block absolute top-16 left-1/2 w-full">
                    <ArrowRight className="w-8 h-8 text-purple-500/30 mx-auto" />
                  </div>
                )}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-r from-purple-500/10 to-blue-500/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: "40%", label: "Average Visibility Increase" },
              { value: "3x", label: "More AI Citations" },
              { value: "2hrs", label: "Saved Per Week" },
              { value: "10K+", label: "Brands Optimized" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-500/20 border-green-500/50 text-green-400">
              <Star className="w-3 h-3 mr-1" />
              Customer Stories
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Loved by Marketing Teams</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, i) => (
              <Card key={i} className="glass-card border-0">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, j) => (
                      <Star key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold">
                      {testimonial.author[0]}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="glass-card border-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 overflow-hidden relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            <CardContent className="p-12 text-center relative z-10">
              <h2 className="text-4xl font-bold mb-4">
                Ready to Dominate AI Search?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of brands already optimizing their AI visibility with GEO-Sight Pro.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dashboard">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 gap-2 px-8">
                    <Sparkles className="w-5 h-5" />
                    Start Free Audit
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="gap-2 px-8">
                    View Pricing
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setShowAuthModal(false);
          if (brandName.trim()) {
            window.location.href = `/dashboard?brand=${encodeURIComponent(brandName)}&website=${encodeURIComponent(website)}`;
          } else {
            window.location.href = "/dashboard";
          }
        }}
      />
    </div>
  );
}
