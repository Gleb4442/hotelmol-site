
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    console.log("Test route hit via POST");
    return NextResponse.json({ message: "Test route working" });
}

export async function GET(request: Request) {
    console.log("Test route hit via GET");
    return NextResponse.json({ message: "Test route working (GET)" });
}
