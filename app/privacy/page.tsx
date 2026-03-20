"use client";

import { Card } from "@/components/ui/card";
import SEO from "@/components/SEO";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-background">
            <SEO
                title="Privacy Policy | Roomie by hotelmol"
                description="Privacy Policy for Roomie — the mobile app by hotelmol. Learn how we collect, use, and protect your personal data."
            />

            <section className="pt-[148px] pb-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="font-serif text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
                            Privacy Policy
                        </h1>
                        <p className="text-lg text-muted-foreground mb-12">
                            Effective Date: March 20, 2026
                        </p>

                        <Card className="p-8 mb-8">
                            <p className="text-lg leading-relaxed">
                                Welcome to Roomie, a mobile application developed and operated by hotelmol (hereinafter "Company", "we", "us", or "our"). This Privacy Policy explains how we collect, use, share, and protect your personal information when you use the Roomie mobile application and related services (collectively, the "Services").
                            </p>
                            <p className="text-lg leading-relaxed mt-4">
                                By using our Services, you acknowledge that you have read and understood this Privacy Policy.
                            </p>
                        </Card>

                        <div className="space-y-8">
                            <Card className="p-8">
                                <h2 className="font-serif text-2xl font-semibold mb-4">1. Information We Collect</h2>
                                <div className="space-y-4 text-muted-foreground leading-relaxed">
                                    <p>We collect the following categories of information:</p>
                                    <p><strong>1.1. Account Information.</strong> When you register, we collect your name, email address, phone number, and password (stored in hashed form).</p>
                                    <p><strong>1.2. Booking and Stay Data.</strong> When you make a reservation or use hotel services through the App, we collect booking dates, room type, number of guests, special requests, payment transaction records (processed by third-party providers — we do not store full card numbers), and stay history.</p>
                                    <p><strong>1.3. AI Concierge Interactions.</strong> We collect the messages and requests you send to the AI Concierge in order to generate responses. These interactions may be logged for quality assurance and service improvement purposes.</p>
                                    <p><strong>1.4. Loyalty Program Data.</strong> We collect your Roomie Coins balance, transaction history (points earned and redeemed), and related activity.</p>
                                    <p><strong>1.5. Device and Usage Data.</strong> We automatically collect information about your device (device model, operating system version, unique device identifiers), app usage logs, crash reports, and analytics data (e.g., screens visited, features used).</p>
                                    <p><strong>1.6. Location Data.</strong> We do not collect precise background location data. If a location-based feature is enabled (e.g., hotel map, nearby services), we access your location only at the moment of use and only with your explicit permission.</p>
                                </div>
                            </Card>

                            <Card className="p-8">
                                <h2 className="font-serif text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
                                <div className="space-y-4 text-muted-foreground leading-relaxed">
                                    <p>We use your information to:</p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Provide, operate, and maintain the Services (process bookings, authenticate your account, deliver AI Concierge responses).</li>
                                        <li>Process payments and send booking confirmations and receipts.</li>
                                        <li>Manage your Roomie Coins loyalty balance.</li>
                                        <li>Improve and personalize the Services, including training and refining AI features using aggregated and anonymized interaction data.</li>
                                        <li>Send transactional notifications (booking confirmation, check-in reminders, stay updates).</li>
                                        <li>Send marketing communications — only with your consent, and you may opt out at any time.</li>
                                        <li>Ensure security, detect fraud, and enforce our policies.</li>
                                        <li>Comply with legal obligations.</li>
                                    </ul>
                                </div>
                            </Card>

                            <Card className="p-8">
                                <h2 className="font-serif text-2xl font-semibold mb-4">3. Sharing and Disclosure</h2>
                                <div className="space-y-4 text-muted-foreground leading-relaxed">
                                    <p>We may share your information with:</p>
                                    <p><strong>3.1. Partner Hotels.</strong> We share your booking details (name, dates, room type, special requests) with the hotel where you have made a reservation. This transfer is necessary to fulfill your booking.</p>
                                    <p><strong>3.2. Payment Processors.</strong> Payments are processed by third-party providers (e.g., Stripe). These providers operate under their own privacy policies and security standards. We do not store full payment card details.</p>
                                    <p><strong>3.3. AI Service Providers.</strong> AI Concierge functionality may be powered by third-party AI providers (such as OpenAI or Google). Messages sent to the AI Concierge may be processed by these providers in accordance with their data processing agreements with us.</p>
                                    <p><strong>3.4. Analytics Providers.</strong> We may use third-party analytics services (e.g., Firebase) to understand App usage. These providers receive anonymized or pseudonymized data.</p>
                                    <p><strong>3.5. Legal Requirements.</strong> We may disclose your information if required by law, court order, or to protect the rights and safety of our users, the Company, or third parties.</p>
                                    <p>We do not sell your personal information to third parties.</p>
                                </div>
                            </Card>

                            <Card className="p-8">
                                <h2 className="font-serif text-2xl font-semibold mb-4">4. Data Retention</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    We retain your account and booking data for as long as your account is active, and for up to 3 years after your last activity, unless a longer retention period is required by law. AI Concierge interaction logs are retained for up to 12 months. You may request deletion of your data at any time (see Section 6).
                                </p>
                            </Card>

                            <Card className="p-8">
                                <h2 className="font-serif text-2xl font-semibold mb-4">5. Data Security</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    We implement industry-standard technical and organizational measures to protect your information, including encrypted data transmission (TLS/HTTPS), hashed passwords, and access controls. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.
                                </p>
                            </Card>

                            <Card className="p-8">
                                <h2 className="font-serif text-2xl font-semibold mb-4">6. Your Rights</h2>
                                <div className="space-y-4 text-muted-foreground leading-relaxed">
                                    <p>Depending on your jurisdiction, you may have the following rights regarding your personal data:</p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
                                        <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data.</li>
                                        <li><strong>Deletion:</strong> Request deletion of your personal data ("right to be forgotten").</li>
                                        <li><strong>Portability:</strong> Request your data in a structured, machine-readable format.</li>
                                        <li><strong>Objection / Restriction:</strong> Object to or request restriction of certain processing activities.</li>
                                        <li><strong>Withdraw Consent:</strong> Withdraw consent for marketing communications at any time via the unsubscribe link in any email or through App settings.</li>
                                    </ul>
                                    <p>To exercise any of these rights, contact us at: <strong>legal@hotelmol.com</strong>. We will respond within 30 days.</p>
                                </div>
                            </Card>

                            <Card className="p-8">
                                <h2 className="font-serif text-2xl font-semibold mb-4">7. Children's Privacy</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    The Services are not directed to children under the age of 18. We do not knowingly collect personal information from minors. If you believe a minor has provided us with personal data, please contact us and we will promptly delete it.
                                </p>
                            </Card>

                            <Card className="p-8">
                                <h2 className="font-serif text-2xl font-semibold mb-4">8. International Data Transfers</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Your data may be processed and stored on servers located outside your country of residence. We ensure that any such transfers are protected by appropriate safeguards (such as standard contractual clauses or equivalent mechanisms).
                                </p>
                            </Card>

                            <Card className="p-8">
                                <h2 className="font-serif text-2xl font-semibold mb-4">9. Changes to This Privacy Policy</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    We may update this Privacy Policy from time to time. When we do, we will update the Effective Date at the top of this page. If changes are material, we will notify you through the App or by email at least 14 days before the changes take effect. Your continued use of the Services after the effective date constitutes acceptance of the updated Policy.
                                </p>
                            </Card>

                            <Card className="p-8">
                                <h2 className="font-serif text-2xl font-semibold mb-4">10. Contact Information</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:<br />
                                    <strong>hotelmol</strong><br />
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
