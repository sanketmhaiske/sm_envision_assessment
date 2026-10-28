import { seedProjects, seedTasks } from "./seeddata";
import connectDB from "@/lib/mongoose";
import ProjectModel from "@/db/project";
import TaskModel from "@/db/task";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    await connectDB();
    try {
        if (seedProjects.length) {
            const projects = await ProjectModel.find();
            if (!projects.length) {
                await Promise.all(seedProjects.map(async ({ id, ...project }) => {
                    await ProjectModel.create(({
                        ...project,
                        seedId: id,
                        deadline: new Date(project.deadline),
                    }))
                }))
            }
        }

        if (seedTasks.length) {
            const tasks = await TaskModel.find();
            if (!tasks.length) {
                const projects = await ProjectModel.find();
                const projectMap = new Map(
                    projects.map((p) => [p.seedId, p._id])
                );
                await Promise.all(seedTasks.map(async ({ id, ...task }) => {
                    await TaskModel.create({
                        ...task,
                        projectId: projectMap.get(task.projectId),
                    });
                }))
            }
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Error seeding database' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Database seeded successfully' }, { status: 200 });
}