import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { 
      role, 
      language, 
      userAgent, 
      referrer, 
      path,
      isSkip 
    } = data;

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error("Telegram credentials missing");
      return NextResponse.json({ success: false }, { status: 500 });
    }

    // Attempt to get IP and Geo data
    // Using x-forwarded-for or remoteAddress
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "Unknown";
    
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

    // Format Message
    const emoji = isSkip ? "⏩" : "👤";
    const status = isSkip ? "Пропустил выбор" : `Выбрал роль: *${role}*`;
    
    const message = `
🚀 *Новый визит на Hotelmol!*

${emoji} *Статус:* ${status}
🌐 *Язык:* ${language.toUpperCase()}
🌍 *Гео:* ${geoInfo}
📱 *Устройство:* ${userAgent}
🔗 *Источник:* ${referrer || "Прямой заход"}
📍 *Страница:* ${path}
🔑 *IP:* \`${ip}\`
    `.trim();

    // Send to Telegram
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
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
