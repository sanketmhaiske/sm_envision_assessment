import ProjectModal from "@/db/project";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { validateProjectData } from "./validator";


export async function GET(req: Request) {
    await connectDB();
    const projects = await ProjectModal.find();
    return NextResponse.json({ success: true, result: projects }, { status: 200 })
}

export async function POST(req: Request) {
    await connectDB();
    const data = await req.json();
    const validateError = await validateProjectData(data);
    if (validateError) return NextResponse.json({ success: false, message: validateError }, { status: 400 })
    const project = await ProjectModal.create(data);
    return NextResponse.json({ success: true, message: "Project created successfully", result: project }, { status: 200 })
}