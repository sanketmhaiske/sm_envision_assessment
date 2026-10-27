import TaskModel from "@/db/task";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
    await connectDB();
    const tasks = await TaskModel.find();
    return NextResponse.json({ success: true, result: tasks }, { status: 200 })
}