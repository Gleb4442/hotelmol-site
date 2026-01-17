
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { language, categories } = body;

        // Trigger n8n webhook
        const webhookUrl = "https://n8n.myn8napp.online/webhook/cookie-consent";
        try {
            await fetch(webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    source: "cookie_consent",
                    language,
                    categories,
                    timestamp: new Date().toISOString(),
                    userAgent: request.headers.get("user-agent") || "unknown"
                }),
            });
        } catch (e) {
            console.error("n8n webhook failed", e);
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
