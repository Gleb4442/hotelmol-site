import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { consultationLeadSchema, leadSubmissions } from "@/shared/schema";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validated = consultationLeadSchema.parse(body);

        const [lead] = await db.insert(leadSubmissions).values({ ...validated, type: "consultation" }).returning();

        // Trigger n8n webhook
        const webhookUrl = "https://n8n.myn8napp.online/webhook/contact-form";
        try {
            await fetch(webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...validated, source: "consultation_form", id: lead.id }),
            });
        } catch (e) {
            console.error("n8n webhook failed", e);
        }

        return NextResponse.json(lead);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
