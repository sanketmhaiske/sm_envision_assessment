import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwtAuth";
import UserModel from "@/db/credential";
import { JwtPayload } from "jsonwebtoken";


export async function POST(req: Request) {
    await connectDB();
    const data = await req.json();
    const username = data.username;
    const sc = data.securityCode;
    
    if (!username || !sc) return NextResponse.json({ success: false, message: "Username and security code are required" }, { status: 400 });

    const { token } = await UserModel.findOne();
    const user = await verifyToken(token as string) as JwtPayload | null;

    if (user?.username !== username || user?.securityCode !== sc) {
        return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 400 })
    }

    return NextResponse.json({ success: true, message: "Login successful", token: token }, { status: 200 })
}