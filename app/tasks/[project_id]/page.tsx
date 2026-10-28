'use client'
import { getProjectTasks } from "@/hook/axiosClient";
import { TaskCard } from "../components/TaskCard";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { TaskTable } from "../components/TaskTable";
import { AddTaskForm } from "../components/AddTaskForm";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

export default function Page() {
    const params = useParams();
    const projectId = params.project_id as string;
    const [projectTitle, setProjectTitle] = useState("");

    useEffect(() => {
        const { searchParams } = new URL(window.location.href);
        const projectTitle = searchParams.get("project_title");
        if (projectTitle) {
            setProjectTitle(projectTitle)
        }
    }, [])


    const { data: tasks, isLoading, refetch } = useQuery({
        queryKey: ["project_tasks", projectId],
        queryFn: async () => await getProjectTasks(projectId)
    });

    const [addTaskForm, setAddTaskForm] = useState(false)

    return (
        <section className="mb-16">
            <div className="flex flex-col">
                <h2 className="h2 text-white font-semibold bricolage">Project Tasks </h2>
                <small className="text-gray-400">Track and manage your team's tasks.</small>
            </div>
            <div className="flex sm:items-center gap-2 mt-8">
                <figure className="mt-0.5">
                    <Icon
                        icon="octicon:project-check-24"
                        width={20}
                        height={20}
                        className="text-[#FFE288]"
                    />
                </figure>
                <span className="text-gray-300 hanken">
                    <strong className="text-[#FFE288]">Project:</strong>  {projectTitle}
                </span>
            </div>
            <div className="mt-8 flex items-center flex-wrap gap-8">
                <TaskCard
                    name="Total Tasks"
                    value={tasks?.length || 0}
                    TopBarColor={"#7F9EF1"}
                    icon="clarity:tasks-line"
                />
                <TaskCard
                    name="In Progress"
                    value={tasks?.filter((t: any) => t.status === "In Progress").length || 0}
                    TopBarColor={"#FFE288"}
                    icon="carbon:in-progress"
                />
                <TaskCard
                    name="Completed"
                    value={tasks?.filter((t: any) => t.status === "Completed").length || 0}
                    TopBarColor={"#75F1A8"}
                    icon="fluent-mdl2:completed"
                />
            </div>
            {addTaskForm &&
                <AddTaskForm
                    setAddTaskForm={setAddTaskForm}
                    projectId={projectId}
                    refetch={refetch}
                />
            }
            {isLoading ?
                <span className="text-base text-white flex justify-center my-16">Getting project tasks...</span> :
                <TaskTable
                    projectTasks={tasks}
                    refetch={refetch}
                    setAddTaskForm={setAddTaskForm}
                />
            }
        </section>
    )
}