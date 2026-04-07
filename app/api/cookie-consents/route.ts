import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { supabaseAdmin } from "@/utils/supabase/admin";
import { cookieConsentInputSchema } from "@/shared/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = cookieConsentInputSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { session_id, policy_version, action, consents } = parsed.data;

    // 1. Hash IP — never log the raw address
    const forwarded = request.headers.get("x-forwarded-for");
    const rawIp = forwarded?.split(",")[0]?.trim() ?? "unknown";
    const salt = process.env.CONSENT_IP_SALT ?? "";
    const ipHash = createHash("sha256").update(rawIp + salt).digest("hex");

    // 2. User-Agent
    const userAgent = request.headers.get("user-agent") ?? null;

    // 3. Country (Cloudflare / Vercel)
    const country =
      request.headers.get("cf-ipcountry") ??
      request.headers.get("x-vercel-ip-country") ??
      null;

    // 4. Banner text hash (SHA-256 of policy version)
    const bannerTextHash = createHash("sha256")
      .update(policy_version)
      .digest("hex");

    // 5. Insert — append-only, never update
    const { data, error } = await supabaseAdmin
      .from("cookie_consents")
      .insert({
        session_id,
        policy_version,
        action,
        consents,
        ip_hash: ipHash,
        user_agent: userAgent,
        country: country?.substring(0, 2) || null,
        banner_text_hash: bannerTextHash,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to save consent" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, consent_id: data.id });
  } catch (error: any) {
    console.error("Cookie consent error:", error);
    return NextResponse.json(
      { error: error.message ?? "Internal error" },
      { status: 500 }
    );
  }
}
