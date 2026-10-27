import { Projects } from "./components/Projects";
import { getProjects } from "@/hook/api";
import { SearchBar } from "./components/SearchBar";
import { Suspense } from "react";


export default function Page() {
    return (
        <Suspense fallback={<p className="text-white">Loading projects...</p>}>
            <ProjectContent />
        </Suspense>
    )
}

async function ProjectContent() {
    const projects = await getProjects();
    return (
        <section className="mb-16">
            <div className="flex flex-col">
                <h2 className="h2 text-white bricolage">Projects</h2>
                <small className="text-gray-400 text-xs">Manage and track all your projects.</small>
            </div>
            <SearchBar />
            <Projects projects={projects} />
        </section>
    )
}