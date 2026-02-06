import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactLeadSchema, leadSubmissions } from "@/shared/schema";

export async function POST(request: Request) {
    console.log("Contact API POST hit");
    try {
        const body = await request.json();
        const validated = contactLeadSchema.parse(body);

        const [lead] = await db.insert(leadSubmissions).values({ ...validated, type: "contact" }).returning();



        return NextResponse.json(lead);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
