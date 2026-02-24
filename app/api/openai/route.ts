import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'OPENAI_API_KEY is not set' }, { status: 500 });
        }

        const openai = new OpenAI({ apiKey });

        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: "Ты — высококлассный цифровой консьерж премиального отеля 'Roomie'. Твоя задача — писать очень вежливые, короткие (до 4 предложений) и продающие сообщения для гостей в WhatsApp. Ты должен анализировать теги гостя и предлагать ровно одну наиболее подходящую услугу (например, конкретный столик в ресторане, спа, тихий коворкинг, поздний выезд и т.д.). Общайся дружелюбно, без лишней воды. В конце всегда подписывайся 'Ваш цифровой консьерж, Roomie ✨'."
                },
                {
                    role: 'user',
                    content: prompt
                }
            ]
        });

        return NextResponse.json({ text: response.choices[0]?.message?.content || "Не удалось сгенерировать текст." });
    } catch (error: any) {
        console.error("OpenAI API Error:", error);
        return NextResponse.json({ error: 'Failed to generate text' }, { status: 500 });
    }
}
