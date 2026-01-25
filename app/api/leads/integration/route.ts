
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { integrationLeadSchema, leadSubmissions } from "@/shared/schema";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validated = integrationLeadSchema.parse(body);

        const [lead] = await db.insert(leadSubmissions).values({ ...validated, type: "integration" }).returning();

        // Trigger n8n webhook
        const webhookUrl = process.env.N8N_LEAD_WEBHOOK_URL || "https://n8n.myn8napp.online/webhook/contact-form";
        try {
            await fetch(webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...validated, source: "integration_request", id: lead.id }),
            });
        } catch (e) {
            console.error("n8n webhook failed", e);
        }

        return NextResponse.json(lead);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
