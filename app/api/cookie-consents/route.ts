import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        // We no longer send Telegram notifications for cookie consents as requested by the user.
        // We just return success to acknowledge that the client-side consent was processed.
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Cookie consent error:", error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
