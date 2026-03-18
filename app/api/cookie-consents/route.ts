
import { NextResponse } from "next/server";

function formatTelegramMessage(data: any, geoInfo: string, ip: string) {
    const { language, categories, userAgent, referrer, path } = data;
    
    const categoryLabels: Record<string, string> = {
        essential: "Обязательные",
        analytics: "Аналитические",
        marketing: "Маркетинговые"
    };

    const categoriesList = Object.entries(categories)
        .filter(([_, value]) => value)
        .map(([key, _]) => `• ${categoryLabels[key] || key}`)
        .join("\n") || "Нет данных";

    return `
🍪 *Принятие куки на Hotelmol!*

🌐 *Язык:* ${language?.toUpperCase() || "Неизвестен"}
✅ *Согласие на:*
${categoriesList}

🌍 *Гео:* ${geoInfo}
📱 *Устройство:* ${userAgent || "Неизвестно"}
🔗 *Источник:* ${referrer || "Прямой заход"}
📍 *Страница:* ${path || "Неизвестна"}
🔑 *IP:* \`${ip}\`
    `.trim();
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { language, categories } = body;

        const token = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (!token || !chatId) {
            console.error("Telegram credentials missing");
            // Still return success to the user as cookie consent is saved locally
            return NextResponse.json({ success: true });
        }

        const forwarded = request.headers.get("x-forwarded-for");
        const ip = forwarded ? forwarded.split(",")[0] : "Unknown";
        const userAgent = request.headers.get("user-agent") || "Unknown";
        const referrer = request.headers.get("referer") || "Unknown";
        
        let geoInfo = "Unknown location";
        try {
            if (ip !== "Unknown" && ip !== "127.0.0.1" && ip !== "::1") {
                const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,city,regionName,isp`);
                const geoData = await geoRes.json();
                if (geoData.status === "success") {
                    geoInfo = `📍 ${geoData.country}, ${geoData.city} (${geoData.isp})`;
                }
            }
        } catch (e) {
            console.error("Geo lookup failed", e);
        }

        const message = formatTelegramMessage({
            language,
            categories,
            userAgent,
            referrer,
            path: body.path
        }, geoInfo, ip);

        const url = `https://api.telegram.org/bot${token}/sendMessage`;
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: "Markdown",
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Telegram API error:", errorData);
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Cookie consent error:", error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
