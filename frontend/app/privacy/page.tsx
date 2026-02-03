import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 container mx-auto px-6 py-16 max-w-4xl">
                <h1 className="text-4xl font-bold gradient-text mb-8">Privacy Policy</h1>
                <p className="text-muted-foreground mb-8">Last updated: February 3, 2026</p>

                <Card className="glass-card border-0">
                    <CardContent className="prose prose-invert max-w-none pt-8">
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                            <p className="text-muted-foreground mb-4">
                                GEO-Sight ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy
                                explains how we collect, use, disclose, and safeguard your information when you use our Service.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>

                            <h3 className="text-xl font-medium mb-3 mt-6">2.1 Personal Information</h3>
                            <p className="text-muted-foreground mb-4">When you create an account, we collect:</p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                                <li>Name and email address</li>
                                <li>Password (encrypted)</li>
                                <li>Payment information (processed by third-party providers)</li>
                                <li>Company or brand information you provide</li>
                            </ul>

                            <h3 className="text-xl font-medium mb-3 mt-6">2.2 Usage Data</h3>
                            <p className="text-muted-foreground mb-4">We automatically collect:</p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                                <li>IP address and browser type</li>
                                <li>Pages visited and features used</li>
                                <li>Time and date of visits</li>
                                <li>Device information</li>
                            </ul>

                            <h3 className="text-xl font-medium mb-3 mt-6">2.3 Audit Data</h3>
                            <p className="text-muted-foreground mb-4">
                                When you run audits, we collect and store brand names, industry information, and the
                                resulting visibility scores, sentiment analysis, and AI platform responses.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
                            <p className="text-muted-foreground mb-4">We use collected information to:</p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                                <li>Provide, maintain, and improve our Service</li>
                                <li>Process transactions and send related information</li>
                                <li>Send you technical notices, updates, and support messages</li>
                                <li>Respond to your comments and questions</li>
                                <li>Analyze usage patterns to improve user experience</li>
                                <li>Protect against fraudulent or unauthorized activity</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">4. Data Sharing</h2>
                            <p className="text-muted-foreground mb-4">We may share your information with:</p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                                <li><strong>Service Providers:</strong> Third parties who perform services on our behalf (payment processing, analytics)</li>
                                <li><strong>AI Platforms:</strong> We query ChatGPT, Gemini, and Perplexity APIs using your brand information</li>
                                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                            </ul>
                            <p className="text-muted-foreground mb-4">
                                <strong>We do not sell your personal information to third parties.</strong>
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
                            <p className="text-muted-foreground mb-4">
                                We implement appropriate security measures to protect your personal information, including:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                                <li>Encryption in transit (TLS/SSL) and at rest</li>
                                <li>Regular security assessments</li>
                                <li>Access controls and authentication</li>
                                <li>Secure data storage practices</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
                            <p className="text-muted-foreground mb-4">
                                We retain your personal information for as long as your account is active or as needed
                                to provide services. Audit data is retained for 2 years after the last audit, unless
                                you request earlier deletion.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
                            <p className="text-muted-foreground mb-4">Depending on your location, you may have the right to:</p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                                <li>Access your personal information</li>
                                <li>Correct inaccurate data</li>
                                <li>Request deletion of your data</li>
                                <li>Object to or restrict processing</li>
                                <li>Data portability</li>
                                <li>Withdraw consent</li>
                            </ul>
                            <p className="text-muted-foreground mb-4">
                                To exercise these rights, contact us at privacy@geosight.ai.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">8. Cookies and Tracking</h2>
                            <p className="text-muted-foreground mb-4">
                                We use cookies and similar technologies to enhance your experience. You can control
                                cookie settings through your browser preferences.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">9. International Transfers</h2>
                            <p className="text-muted-foreground mb-4">
                                Your information may be transferred to and processed in countries other than your own.
                                We ensure appropriate safeguards are in place for such transfers.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">10. Children's Privacy</h2>
                            <p className="text-muted-foreground mb-4">
                                Our Service is not intended for children under 13. We do not knowingly collect
                                information from children under 13.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">11. Changes to This Policy</h2>
                            <p className="text-muted-foreground mb-4">
                                We may update this Privacy Policy from time to time. We will notify you of significant
                                changes via email or through the Service.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
                            <p className="text-muted-foreground mb-4">
                                If you have questions about this Privacy Policy, please contact us at:
                            </p>
                            <p className="text-muted-foreground">
                                Email: privacy@geosight.ai<br />
                                Address: 123 AI Street, Tech City, TC 12345
                            </p>
                        </section>
                    </CardContent>
                </Card>
            </main>

            <Footer />
        </div>
    );
}
