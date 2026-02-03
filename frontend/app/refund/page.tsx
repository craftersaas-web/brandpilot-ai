import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RefundPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 container mx-auto px-6 py-16 max-w-4xl">
                <h1 className="text-4xl font-bold gradient-text mb-8">Refund Policy</h1>
                <p className="text-muted-foreground mb-8">Last updated: February 3, 2026</p>

                <Card className="glass-card border-0">
                    <CardContent className="prose prose-invert max-w-none pt-8">
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">14-Day Money-Back Guarantee</h2>
                            <p className="text-muted-foreground mb-4">
                                We want you to be completely satisfied with GEO-Sight. If you're not happy with your
                                subscription for any reason, we offer a <strong>14-day money-back guarantee</strong> on
                                all paid plans.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">Eligibility for Refunds</h2>
                            <p className="text-muted-foreground mb-4">You are eligible for a full refund if:</p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                                <li>You request a refund within 14 days of your initial subscription purchase</li>
                                <li>You are requesting a refund for your first subscription period</li>
                                <li>You have not previously received a refund for GEO-Sight</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">Non-Refundable Items</h2>
                            <p className="text-muted-foreground mb-4">The following are not eligible for refunds:</p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                                <li>Subscription renewals after the first billing period</li>
                                <li>Partial month usage (we don't prorate refunds)</li>
                                <li>Additional API credits or add-on purchases</li>
                                <li>Agency plan custom implementations</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">How to Request a Refund</h2>
                            <p className="text-muted-foreground mb-4">
                                To request a refund, please follow these steps:
                            </p>
                            <ol className="list-decimal pl-6 text-muted-foreground space-y-2 mb-4">
                                <li>Email us at <strong>billing@geosight.ai</strong> with the subject line "Refund Request"</li>
                                <li>Include your account email address</li>
                                <li>Provide a brief explanation of why you're requesting a refund (optional but helpful)</li>
                                <li>We will process your request within 3-5 business days</li>
                            </ol>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">Refund Processing</h2>
                            <p className="text-muted-foreground mb-4">
                                Once approved, refunds will be credited to your original payment method within
                                5-10 business days, depending on your bank or credit card company.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">Cancellation</h2>
                            <p className="text-muted-foreground mb-4">
                                You can cancel your subscription at any time from your account settings. When you cancel:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                                <li>You will continue to have access until the end of your current billing period</li>
                                <li>Your account will be downgraded to the Free plan</li>
                                <li>Your audit history and data will be preserved</li>
                                <li>You will not be charged for future billing periods</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">Annual Subscriptions</h2>
                            <p className="text-muted-foreground mb-4">
                                For annual subscriptions, refunds are handled as follows:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                                <li>Full refund within 14 days of purchase</li>
                                <li>After 14 days, a prorated refund may be considered on a case-by-case basis</li>
                                <li>Contact our support team to discuss your situation</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">Chargebacks</h2>
                            <p className="text-muted-foreground mb-4">
                                We encourage you to contact us before initiating a chargeback with your bank.
                                Chargebacks incur additional fees and may result in account suspension. We're
                                committed to resolving any billing issues directly.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                            <p className="text-muted-foreground mb-4">
                                Have questions about our refund policy? Contact our billing team:
                            </p>
                            <p className="text-muted-foreground">
                                Email: billing@geosight.ai<br />
                                Response time: 1-2 business days
                            </p>
                        </section>

                        <div className="pt-4">
                            <Link href="/pricing">
                                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500">
                                    View Pricing Plans
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </main>

            <Footer />
        </div>
    );
}
