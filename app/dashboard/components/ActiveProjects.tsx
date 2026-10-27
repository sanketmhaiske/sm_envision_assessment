'use client'
import { Button } from "@/elements/Button"
import { AddProjectForm } from "./AddProjectForm"
import { useState } from "react"

export function ActiveProjects({ activeProjects }: { activeProjects: Array<any> }) {
    const [addProjectForm, setAddProjectForm] = useState(false)
    return (
        <section className="w-full mt-16">
            {addProjectForm && <AddProjectForm setAddProjectForm={setAddProjectForm} />}
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <h3 className="h3 text-white"> Active Projects </h3>
                    <small className="text-gray-200">Your active projects overview</small>
                </div>
                <Button
                    text="New Project"
                    icon=""
                    className="bg-gray-400 text-white"
                    onClick={() => setAddProjectForm(true)}
                />
            </div>
            <table className="w-full mt-8 bg-[#18151C] rounded-md overflow-hidden">
                <thead className="bg-[#1D1D1D] text-[#95959F] px-4">
                    <tr className="p-4 px-4 text-left">
                        <th className="p-2 px-4">Project name</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Deadline</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {activeProjects.map((project: any) => (
                        <tr className="text-sm text-white" key={project._id}>
                            <td className="p-2 px-4 py-4">{project.title}</td>
                            <td className="">{project.status}</td>
                            <td>{project.priority}</td>
                            <td>{project.deadline}</td>
                            <td>View</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}