import TaskModel from "@/db/task";
import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { validateTaskData } from "./validator";
import { userAuth } from "@/lib/userAuth";

// GET /api/tasks
async function handleGET(req: Request) {
    const { searchParams } = new URL(req.url);
    const reqType = searchParams.get("reqType")
    await connectDB();
    if (reqType === 'all') {
        const tasks = await TaskModel.find();
        return NextResponse.json({ success: true, result: tasks }, { status: 200 })
    }
    if (reqType === 'project_tasks') {
        const projectId = searchParams.get("projectId")
        const tasks = await TaskModel.find({ projectId });
        return NextResponse.json({ success: true, result: tasks }, { status: 200 })
    }

    if (reqType === 'details') {
        const taskId = searchParams.get("taskId")
        const task = await TaskModel.findOne({ _id: taskId });
        return NextResponse.json({ success: true, result: task }, { status: 200 })
    }

    return NextResponse.json({ success: false, message: "Invalid request type" }, { status: 400 })
}

async function handlePOST(req: Request) {
    await connectDB();
    const data = await req.json();
    const validationError = await validateTaskData(data);
    if (validationError) return NextResponse.json({ success: false, message: validationError }, { status: 400 })
    // Check Duplicate
    const existingTask = await TaskModel.findOne({
        title: { $regex: `^${data?.title.trim()}$`, $options: "i" },
    });

    if (existingTask) {
        return NextResponse.json(
            { success: false, message: "Task name already exists" },
            { status: 409 }
        );
    }

    try {
        const task = await TaskModel.create(data);
        return NextResponse.json({ success: true, message: "Task created successfully", result: task }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Failed to create task" }, { status: 400 })
    }
}

// Delete task
async function handleDELETE(req: Request) {
    await connectDB();
    const data = await req.json();
    try {
        const task = await TaskModel.findByIdAndDelete(data._id);
        return NextResponse.json({ success: true, message: "Task deleted successfully", result: task }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, message: "Failed to delete task" }, { status: 400 })
    }
}

async function handlePUT(req: Request) {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const reqType = searchParams.get("reqType")

    const data = await req.json();
    if (!data._id) return NextResponse.json({ success: false, message: "Task id is required" }, { status: 400 });

    if (reqType === 'status_change') {
        const taskId = data._id;
        const newStatus = data.newStatus;
        try {
            const task = await TaskModel.findByIdAndUpdate(taskId, { status: newStatus });
            return NextResponse.json({ success: true, message: "Task status updated successfully", result: task }, { status: 200 })
        } catch (error) {
            console.log(error)
            return NextResponse.json({ success: false, message: "Failed to update task status" }, { status: 400 })
        }
    }

    if (reqType === 'update') {
        const validationError = await validateTaskData(data);
        if (validationError) return NextResponse.json({ success: false, message: validationError }, { status: 400 })
        try {
            const task = await TaskModel.findByIdAndUpdate(data._id, data);
            return NextResponse.json({ success: true, message: "Task updated successfully", result: task }, { status: 200 })
        } catch (error) {
            console.log(error)
            return NextResponse.json({ success: false, message: "Failed to update task" }, { status: 400 })
        }
    }
}

export const GET = userAuth(handleGET)
export const POST = userAuth(handlePOST)
export const PUT = userAuth(handlePUT)
export const DELETE = userAuth(handleDELETE)