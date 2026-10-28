'use client'
import { Projects } from "./components/Projects";
import { getProjects } from "@/hook/axiosClient";
import { useQuery } from "@tanstack/react-query";


export default function Page() {
    const { data: projects, isLoading, refetch } = useQuery({
        queryKey: ["projects"],
        queryFn: async () => await getProjects()
    });

    return (
        <section className="mb-16">
            <div className="flex flex-col">
                <h2 className="h2 text-white bricolage">Projects</h2>
                <small className="text-gray-400 text-xs">Manage and track all your projects.</small>
            </div>
            {isLoading && <p className="text-white mt-16 flex justify-center font-semibold bricolage">Getting Projects...</p>}
            {projects?.length && <Projects projects={projects} refetch={refetch} />}
        </section>
    )
}
