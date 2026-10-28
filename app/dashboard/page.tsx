'use client'
import { ActiveProjects } from "./components/ActiveProjects";
import { Card } from "./components/Card";
import { getProjects, getAllTasks } from "@/hook/axiosClient";
import { useQuery } from "@tanstack/react-query";


export default function Page() {
   
    const { data: projects, isLoading, refetch } = useQuery({
        queryKey: ["projects"],
        queryFn: async () => await getProjects()
    });

    const { data: allTasks, isLoading: tasksLoading } = useQuery({
        queryKey: ["all_tasks"],
        queryFn: async () => await getAllTasks()
    });

    return (
        <section className="w-full mb-16">
            <div>
                <h2 className="text-white h1 bricolage font-semibold">
                    Welcome back, Sanket
                </h2>
                <small className="text-gray-50 text-sm">
                    Here is quick overview of your workspace today
                </small>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-2 md:flex items-center md:gap-8 mt-8">
                <Card
                    title="Total Projects"
                    icon="ic:outline-workspaces"
                    value={projects?.length || 0}
                    bgColor="#7F9EF1"
                />
                <Card
                    title="Active Projects"
                    icon="fluent:flash-20-regular"
                    value={projects?.filter((p: any) => p.status === "Active").length || 0}
                    bgColor="#75F1A8"
                />
                <Card
                    title="Completed Tasks"
                    icon="fluent-mdl2:completed"
                    value={allTasks?.filter((t: any) => t.status === "Completed").length || 0}
                    bgColor="#FFE288"
                />
                <Card
                    title="Pending Tasks"
                    icon="iconoven:pending-clock-sharp"
                    value={allTasks?.filter((t: any) => t.status === "Pending").length || 0}
                    bgColor="#F09A69"
                />
            </div>
            <ActiveProjects
                activeProjects={projects?.filter((p: any) => p.status === "Active") || []}
                refetch={refetch}
            />
        </section>
    );

}

