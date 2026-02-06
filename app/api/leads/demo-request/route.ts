
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { demoLeadSchema, leadSubmissions } from "@/shared/schema";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validated = demoLeadSchema.parse(body);

        const [lead] = await db.insert(leadSubmissions).values({ ...validated, type: "demo" }).returning();



        return NextResponse.json(lead);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
