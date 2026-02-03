"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BLOG_POSTS } from "@/lib/blog-data";
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react";

export default function BlogPostPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug;

    const post = BLOG_POSTS.find((p) => p.slug === slug);

    if (!post) {
        return (
            <div className="min-h-screen bg-background text-foreground flex flex-col">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
                        <Button onClick={() => router.push("/blog")}>Back to Blog</Button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Header />

            <main className="flex-1 py-20 px-6">
                <div className="container mx-auto max-w-4xl">
                    <Button
                        variant="ghost"
                        onClick={() => router.push("/blog")}
                        className="mb-8 gap-2 hover:bg-secondary"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Blog
                    </Button>

                    <div className={`h-64 md:h-96 rounded-3xl bg-gradient-to-br ${post.gradient} mb-12 relative overflow-hidden flex items-center justify-center p-12`}>
                        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                        <h1 className="text-4xl md:text-6xl font-bold text-center leading-tight">
                            {post.title}
                        </h1>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 mb-12 pb-8 border-b border-border/50">
                        <Badge className="bg-primary/20 text-primary">{post.category}</Badge>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" /> {post.date}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User className="w-4 h-4" /> {post.author}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" /> {post.readTime}
                        </div>
                        <div className="ml-auto">
                            <Button variant="outline" size="sm" className="gap-2">
                                <Share2 className="w-4 h-4" /> Share
                            </Button>
                        </div>
                    </div>

                    <article className="prose prose-invert prose-lg max-w-none prose-headings:gradient-text prose-a:text-primary">
                        {/* We'll use a simple markdown-like renderer or just white-space preserve for this demo */}
                        <div className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                            {post.content.trim()}
                        </div>
                    </article>

                    <div className="mt-20 p-8 glass-card rounded-3xl text-center">
                        <h3 className="text-2xl font-bold mb-4">Ready to boost your AI visibility?</h3>
                        <p className="text-muted-foreground mb-8">
                            Join thousands of brands using BrandPilot AI to dominate the generative search era.
                        </p>
                        <Button
                            className="bg-gradient-to-r from-purple-600 to-blue-600 text-lg py-6 px-12"
                            onClick={() => router.push("/")}
                        >
                            Start Free Audit Now
                        </Button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
