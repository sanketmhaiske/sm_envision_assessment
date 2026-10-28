import ProjectModel from "@/db/project";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { validateProjectData } from "./validator";
import { userAuth } from "@/lib/userAuth";


async function handleGET(req: Request) {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const reqType = searchParams.get("reqType")
    if (reqType === 'details') {
        const projectId = searchParams.get("projectId")
        const project = await ProjectModel.findOne({ _id: projectId });
        return NextResponse.json({ success: true, result: project }, { status: 200 })
    }
    if (reqType === 'all') {
        const projects = await ProjectModel.find();
        return NextResponse.json({ success: true, result: projects }, { status: 200 })
    }
    return NextResponse.json({ success: false, message: "Invalid request type" }, { status: 400 })
}

async function handlePOST(req: Request) {
    await connectDB();
    const data = await req.json();
    const validateError = await validateProjectData(data);
    if (validateError) return NextResponse.json({ success: false, message: validateError }, { status: 400 })
    // Check Duplicate
    const existingProject = await ProjectModel.findOne({
        title: { $regex: `^${data?.title.trim()}$`, $options: "i" },
    });
    if (existingProject) {
        return NextResponse.json(
            { success: false, message: "Project name already exists" },
            { status: 409 }
        );
    }
    const project = await ProjectModel.create(data);
    return NextResponse.json({ success: true, message: "Project created successfully", result: project }, { status: 200 })
}

async function handlePUT(req: Request) {
    await connectDB();
    const data = await req.json();
    const validateError = await validateProjectData(data);
    if (validateError) return NextResponse.json({ success: false, message: validateError }, { status: 400 })

    try {
        const project = await ProjectModel.findByIdAndUpdate(data.projectId, data);
        return NextResponse.json({ success: true, message: "Project updated successfully", result: project }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Failed to update project" }, { status: 400 })
    }
}

async function handleDELETE(req: Request) {
    await connectDB();
    const data = await req.json();
    const projectId = data?._id;
    if (!projectId) return NextResponse.json({ success: false, message: "Invalid project id" }, { status: 400 });
    try {
        const project = await ProjectModel.findByIdAndDelete(projectId);
        return NextResponse.json({ success: true, message: "Project deleted successfully", result: project }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Failed to delete project" }, { status: 400 })
    }
}

export const GET = userAuth(handleGET)
export const POST = userAuth(handlePOST)
export const PUT = userAuth(handlePUT)
export const DELETE = userAuth(handleDELETE)