"use client";

import React, { useState } from "react";
import { Header, Footer } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, MapPin, Send, Loader2, Sparkles } from "lucide-react";

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Header />

            <main className="flex-1 py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Info Block */}
                        <div className="space-y-8">
                            <div>
                                <Badge className="mb-4 bg-blue-500/20 text-blue-400 border-blue-500/30">
                                    Contact Us
                                </Badge>
                                <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text text-left">
                                    Let's Future-Proof Your Brand
                                </h1>
                                <p className="text-lg text-muted-foreground max-w-md">
                                    Have questions about GEO? Interested in our enterprise solutions? Our team of AI visibility experts is here to help.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                                        <Mail className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Email</h4>
                                        <p className="text-muted-foreground">hello@geosight.ai</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                        <MessageSquare className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Live Chat</h4>
                                        <p className="text-muted-foreground">Available Mon-Fri, 9am - 5pm EST</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                                        <MapPin className="w-6 h-6 text-orange-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Headquarters</h4>
                                        <p className="text-muted-foreground">123 AI Boulevard, San Francisco, CA</p>
                                    </div>
                                </div>
                            </div>

                            <Card className="glass-card border-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10">
                                <CardContent className="p-6 flex items-center gap-4">
                                    <Sparkles className="w-8 h-8 text-yellow-500" />
                                    <p className="text-sm font-medium">
                                        "GEO-Sight transformed our digital strategy. Their support team is top-notch."
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Form Block */}
                        <Card className="glass-card border-0">
                            {submitted ? (
                                <CardContent className="p-12 text-center space-y-6">
                                    <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
                                        <Send className="w-10 h-10 text-green-400" />
                                    </div>
                                    <h2 className="text-2xl font-bold">Message Sent!</h2>
                                    <p className="text-muted-foreground">
                                        Thank you for reaching out. We'll get back to you within 24 hours.
                                    </p>
                                    <Button variant="outline" onClick={() => setSubmitted(false)}>
                                        Send another message
                                    </Button>
                                </CardContent>
                            ) : (
                                <CardHeader className="p-8 pb-0">
                                    <CardTitle>Send a Message</CardTitle>
                                    <CardDescription>Fill out the form below and we'll be in touch.</CardDescription>
                                    <form onSubmit={handleSubmit} className="space-y-4 pt-6">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2 text-left">
                                                <label className="text-sm font-medium">First Name</label>
                                                <Input placeholder="John" required className="bg-secondary/50" />
                                            </div>
                                            <div className="space-y-2 text-left">
                                                <label className="text-sm font-medium">Last Name</label>
                                                <Input placeholder="Doe" required className="bg-secondary/50" />
                                            </div>
                                        </div>
                                        <div className="space-y-2 text-left">
                                            <label className="text-sm font-medium">Email</label>
                                            <Input type="email" placeholder="john@company.com" required className="bg-secondary/50" />
                                        </div>
                                        <div className="space-y-2 text-left">
                                            <label className="text-sm font-medium">Message</label>
                                            <Textarea placeholder="How can we help?" className="min-h-[150px] bg-secondary/50" required />
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-lg"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-5 h-5 mr-2" />
                                                    Send Message
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                </CardHeader>
                            )}
                        </Card>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
