"use client";

import { Card } from "@/components/ui/card";
import SEO from "@/components/SEO";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-background">
            <SEO
                title="Terms of Service | Roomie"
                description="Terms of Service and Privacy Policy for Roomie by hotelmol."
            />

            <section className="pt-[148px] pb-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="font-serif text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
                            Terms of Service
                        </h1>
                        <p className="text-lg text-muted-foreground mb-12">
                            Effective Date: 11.03.2026
                        </p>

                        <Card className="p-8 mb-8">
                            <p className="text-lg leading-relaxed">
                                Welcome to Roomie, a mobile application developed and operated by hotelmol (hereinafter "Company", "we", "us", or "our").
                            </p>
                            <p className="text-lg leading-relaxed mt-4">
                                These Terms of Service (hereinafter "Terms") govern your access to and use of the Roomie mobile application, the hotelmol.com website, and related services (collectively, the "Services"). Please read these Terms carefully before using the App.
                            </p>
                            <p className="text-lg leading-relaxed mt-4">
                                By using our Services, you confirm that you have read, understood, and agree to be bound by these Terms. If you do not agree, you may not use our App.
                            </p>
                        </Card>

                        <div className="space-y-8">
                            <Card className="p-8">
                                <h2 className="font-serif text-2xl font-semibold mb-4">1. The Role of the Roomie Platform</h2>
                                <div className="space-y-4 text-muted-foreground leading-relaxed">
                                    <p><strong>1.1. Roomie as an Information Intermediary.</strong> The Roomie App provides a technology platform that enables users (guests) to discover hotels, make reservations, manage their stay, and communicate with the hotel.</p>
                                    <p><strong>1.2. No Liability for Hotel Services.</strong> The company hotelmol does not own, manage, or control the hotels listed in the App. All services related to accommodation, food and beverage, and housekeeping are provided directly by the hotel. Any claims regarding the quality of these services must be directed to the management of the respective hotel.</p>
                                </div>
                            </Card>

                            <Card className="p-8">
                                <h2 className="font-serif text-2xl font-semibold mb-4">2. Registration and Account</h2>
                                <div className="space-y-4 text-muted-foreground leading-relaxed">
                                    <p><strong>2.1. Age Restrictions.</strong> To use the Services, you must be at least 18 years old and possess the legal capacity to enter into binding contracts.</p>
                                    <p><strong>2.2. Security.</strong> You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your profile.</p>
                                </div>
                            </Card>

                            <Card className="p-8">
                                <h2 className="font-serif text-2xl font-semibold mb-4">3. Booking, Payments, and Cancellation</h2>
                                <div className="space-y-4 text-muted-foreground leading-relaxed">
                                    <p><strong>3.1. Payment Processing.</strong> When booking a room or ordering additional services through the App, payments are processed securely through third-party payment gateways (e.g., Stripe). You agree to the terms of service of these payment processors.</p>
                                    <p><strong>3.2. Cancellation Policy.</strong> The conditions for booking cancellations, refunds, and no-show penalties are established exclusively by the specific partner hotel and are displayed at the time of booking. hotelmol is not responsible for any penalties withheld by the hotel.</p>
                                    <p><strong>3.3. Third-Party Links (WebView).</strong> The App may contain embedded links (WebView) to restaurant menus or hotel service catalogs. We do not control these third-party resources and are not responsible for their content or the payment processes on their end.</p>
                                </div>
                            </Card>

                            <Card className="p-8">
                                <h2 className="font-serif text-2xl font-semibold mb-4">4. Use of AI Concierge (Artificial Intelligence)</h2>
                                <div className="space-y-4 text-muted-foreground leading-relaxed">
                                    <p>4.1. The App integrates an AI assistant designed to answer frequently asked questions and provide recommendations.</p>
                                    <p>4.2. Limitation of AI Accuracy. While we strive to provide accurate information, the AI assistant's responses are generated algorithmically and may contain errors or inaccuracies.</p>
                                    <p>4.3. Any promises, discounts, or confirmations issued by the AI assistant are not legally binding until they are confirmed in your booking profile or by an official representative of the hotel.</p>
                                </div>
                            </Card>

                            <Card className="p-8">
                                <h2 className="font-serif text-2xl font-semibold mb-4">5. Loyalty Program (Roomie Coins)</h2>
                                <div className="space-y-4 text-muted-foreground leading-relaxed">
                                    <p>5.1. The App may offer a loyalty program allowing you to earn points ("Roomie Coins") for bookings.</p>
                                    <p>5.2. Points have no cash value, cannot be exchanged for cash, and cannot be transferred to other users.</p>
                                    <p>5.3. The company hotelmol reserves the right to change the rules for earning points, or to suspend or terminate the loyalty program entirely at any time, with prior notice to users.</p>
                                </div>
                            </Card>

                            <Card className="p-8">
                                <h2 className="font-serif text-2xl font-semibold mb-4">6. Acceptable Use</h2>
                                <div className="space-y-4 text-muted-foreground leading-relaxed">
                                    <p>You agree not to use the App to:</p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Violate any applicable local, state, national, or international laws.</li>
                                        <li>Send abusive, threatening, or discriminatory messages through the AI chat or to hotel staff.</li>
                                        <li>Attempt to hack, reverse-engineer, or circumvent the security systems of the App.</li>
                                    </ul>
                                </div>
                            </Card>

                            <Card className="p-8">
                                <h2 className="font-serif text-2xl font-semibold mb-4">7. Intellectual Property</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    All content, design, text, graphics, interfaces, and code of the App, as well as the trademarks "Roomie" and "hotelmol", are the exclusive property of the Company. You are granted a limited, non-exclusive, non-transferable license to use the App solely for your personal, non-commercial purposes.
                                </p>
                            </Card>

                            <Card className="p-8">
                                <h2 className="font-serif text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
                                <div className="space-y-4 text-muted-foreground leading-relaxed uppercase">
                                    <p>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, HOTELMOL SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, OR PUNITIVE DAMAGES (INCLUDING, BUT NOT LIMITED TO, LOSS OF DATA, LOST PROFITS, OR PERSONAL INJURY) ARISING OUT OF:</p>
                                    <p>(A) YOUR USE OR INABILITY TO USE THE APP;</p>
                                    <p>(B) ANY ACTS OR OMISSIONS OF PARTNER HOTELS OR THEIR STAFF;</p>
                                    <p>(C) UNAUTHORIZED ACCESS TO YOUR DATA.</p>
                                </div>
                            </Card>

                            <Card className="p-8">
                                <h2 className="font-serif text-2xl font-semibold mb-4">9. Dispute Resolution and Governing Law</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    These Terms shall be governed by the laws of Ukraine, without regard to its conflict of law provisions. Any disputes arising out of these Terms shall be resolved in the competent courts in the jurisdiction where the Company is registered.
                                </p>
                            </Card>

                            <Card className="p-8">
                                <h2 className="font-serif text-2xl font-semibold mb-4">10. Changes to the Terms</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    We reserve the right to modify these Terms at any time. The updated version becomes effective immediately upon its publication in the App or on the website. Your continued use of the Services constitutes your acceptance of the new terms.
                                </p>
                            </Card>

                            <Card className="p-8">
                                <h2 className="font-serif text-2xl font-semibold mb-4">11. Contact Information</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    If you have any questions regarding these Terms, please contact us:<br />
                                    Email: <a href="mailto:legal@hotelmol.com" className="text-primary hover:underline">legal@hotelmol.com</a>
                                </p>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
