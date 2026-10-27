import { TaskCard } from "./components/TaskCard";

export default function Page() {
    return (
        <section>
            <div className="flex flex-col">
                <h3 className="h3 text-white">Project Taks </h3>
                <small className="text-gray-200">Track and manage your team's tasks.</small>
            </div>
            <div className="mt-16 flex items-center gap-8">
                <TaskCard
                    name="Total Tasks"
                    value={10}
                    TopBarColor={"#7F9EF1"}
                    icon=""
                />
                <TaskCard
                    name="In Progress"
                    value={12}
                    TopBarColor={"#FFE288"}
                    icon=""
                />
                <TaskCard
                    name="Completed"
                    value={6}
                    TopBarColor={"#75F1A8"}
                    icon=""
                />
            </div>
        </section>
    )
}