"use client";

import React from "react";
import { Header, Footer } from "@/components/layout";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main className="container mx-auto px-6 py-20 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
                    <p>Last updated: February 3, 2026</p>
                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
                        <p>By accessing and using GEO-Sight, you agree to be bound by these Terms of Service.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">2. Description of Service</h2>
                        <p>GEO-Sight provides AI visibility auditing and optimization tools.</p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
