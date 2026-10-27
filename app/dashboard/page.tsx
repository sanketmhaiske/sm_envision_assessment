import { Suspense } from "react";
import { ActiveProjects } from "./components/ActiveProjects";
import { Card } from "./components/Card";
import { getProjects, getTasks } from "@/hook/api";


export default function Page() {
    return (
        <Suspense fallback={<p className="text-white">Loading dashboard...</p>}>
            <DashboardContent />
        </Suspense>
    );
}

async function DashboardContent() {
    const [projects, tasks] = await Promise.all([
        getProjects(),
        getTasks(),
    ]);

    return (
        <section className="w-full mb-16">
            <div>
                <h2 className="text-white text-4xl bricolage font-semibold">
                    Welcome back, Sanket
                </h2>
                <small className="text-gray-50 text-sm">
                    Here is quick overview of your workspace today
                </small>
            </div>

            <div className="flex items-center gap-8 mt-8">
                <Card
                    title="Total Projects"
                    icon="ic:outline-workspaces"
                    value={projects?.length || 0}
                />
                <Card
                    title="Active Projects"
                    icon="fluent:flash-20-regular"
                    value={projects?.filter((p: any) => p.status === "Active").length || 0}
                />
                <Card
                    title="Completed Tasks"
                    icon="fluent-mdl2:completed"
                    value={tasks?.filter((t: any) => t.status === "Completed").length || 0}
                />
                <Card
                    title="Pending Tasks"
                    icon="iconoven:pending-clock-sharp"
                    value={tasks?.filter((t: any) => t.status === "Pending").length || 0}
                />
            </div>

            <ActiveProjects
                activeProjects={projects?.filter((p: any) => p.status === "Active") || []}
            />
        </section>
    );
}