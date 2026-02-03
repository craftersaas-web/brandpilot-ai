"use client";

import React from "react";
import { Header, Footer } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, User, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog-data";

export default function BlogPage() {
    const featuredPost = BLOG_POSTS[0];
    const otherPosts = BLOG_POSTS.slice(1);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Hero */}
                <section className="py-20 relative overflow-hidden bg-secondary/10">
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                    <div className="container mx-auto px-6 text-center">
                        <Badge className="mb-4 bg-purple-500/20 text-purple-400 border-purple-500/30">
                            Knowledge Hub
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
                            AEO & GEO Insights
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                            The latest research and strategies for the generative search era.
                        </p>

                        <div className="max-w-lg mx-auto relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                                placeholder="Search articles..."
                                className="pl-10 h-12 bg-background border-border/50 shadow-sm"
                            />
                        </div>
                    </div>
                </section>

                {/* Featured Post */}
                <section className="py-16">
                    <div className="container mx-auto px-6">
                        <Link href={`/blog/${featuredPost.slug}`}>
                            <Card className="glass-card border-0 overflow-hidden group cursor-pointer border border-transparent hover:border-purple-500/30 transition-all">
                                <div className="grid md:grid-cols-2">
                                    <div className={`h-64 md:h-auto bg-gradient-to-br ${featuredPost.gradient} flex items-center justify-center relative overflow-hidden`}>
                                        <Sparkles className="w-32 h-32 text-purple-400/20 transform group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                                    </div>
                                    <CardContent className="p-8 md:p-12 space-y-6">
                                        <Badge className="bg-primary/20 text-primary">Featured Article</Badge>
                                        <h2 className="text-3xl md:text-4xl font-bold group-hover:gradient-text transition-all">
                                            {featuredPost.title}
                                        </h2>
                                        <p className="text-lg text-muted-foreground leading-relaxed">
                                            {featuredPost.excerpt}
                                        </p>
                                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" /> {featuredPost.date}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <User className="w-4 h-4" /> {featuredPost.author}
                                            </div>
                                        </div>
                                        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 gap-2">
                                            Read More <ArrowRight className="w-4 h-4" />
                                        </Button>
                                    </CardContent>
                                </div>
                            </Card>
                        </Link>
                    </div>
                </section>

                {/* Post Grid */}
                <section className="py-16 bg-secondary/5">
                    <div className="container mx-auto px-6">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {otherPosts.map((post, i) => (
                                <Link key={i} href={`/blog/${post.slug}`}>
                                    <Card className="glass-card border-0 flex flex-col h-full group hover:border-purple-500/30 transition-all overflow-hidden border border-transparent">
                                        <div className={`h-48 bg-gradient-to-br ${post.gradient} relative overflow-hidden flex items-center justify-center`}>
                                            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                                            <Sparkles className="w-16 h-16 text-white/10" />
                                        </div>
                                        <CardContent className="p-6 flex-1 flex flex-col gap-4">
                                            <div className="flex items-center justify-between">
                                                <Badge variant="outline" className="text-xs">{post.category}</Badge>
                                                <span className="text-xs text-muted-foreground">{post.readTime}</span>
                                            </div>
                                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                                            <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>
                                            <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/50">
                                                <span className="text-xs text-muted-foreground">{post.date}</span>
                                                <div className="flex items-center gap-1 text-primary text-sm font-medium">
                                                    Read More <ArrowRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
