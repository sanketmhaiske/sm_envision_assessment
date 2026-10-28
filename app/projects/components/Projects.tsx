'use client'
import { WarningPopup } from "@/components/common/WarningPopup"
import { Button } from "@/elements/Button"
import { Select } from "@/elements/select"
import { deleteProject } from "@/hook/axiosClient"
import { Icon } from "@iconify/react"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import { useState } from "react"
import { UpdateProjectForm } from "./UpdateProjectForm"
import ProjectDetailsPopup from "./ProjectDetails"
import { formatDate } from "@/utils/formatDate"
import { AlertPopup } from "@/components/common/AlertPopup"
import { SearchBar } from "./SearchBar"
import { AddProjectForm } from "@/app/dashboard/components/AddProjectForm"

export function Projects({ projects, refetch }: { projects: Array<any>, refetch: () => void }) {
    const [addProjectForm, setAddProjectForm] = useState(false)
    const [searchValue, setSearchValue] = useState("");
    const [filter, setFilter] = useState("All");
    const [alertPopup, setAlertPopup] = useState({
        show: false,
        message: "",
        type: ''
    });

    const [deleteProjectWarning, setDeleteProjectWarning] = useState({
        _id: "",
        warning: false
    })
    const [updateProjectForm, setUpdateProjectForm] = useState({
        projectId: "",
        show: false
    })

    const [projectDetails, setProjectDetails] = useState({
        show: false,
        project: {
            title: "",
            description: "",
            projectType: "",
            status: "",
            priority: "",
            deadline: ""
        }
    })

    const deleteProjectMutation = useMutation({
        mutationFn: async () => {
            return await deleteProject({ _id: deleteProjectWarning?._id })
        },
        onSuccess: (data: any) => {
            setDeleteProjectWarning({ _id: "", warning: false })
            setAlertPopup({
                show: true,
                message: "Project deleted successfully",
                type: "success"
            })
            setTimeout(() => {
                refetch();
            }, 2000);
        },
        onError: (err: any) => {
            console.log(err)
            setAlertPopup({
                show: true,
                message: err?.response?.data?.message || "Failed to delete project",
                type: "error"
            })
        }
    })

    const filteredProjects = projects.filter((project: any) => {
        if (filter === "Active") {
            return project.status === "Active"
        } else if (filter === "On Hold") {
            return project.status === "On Hold"
        } else if (filter === "Completed") {
            return project.status === "Completed"
        } else {
            return project
        }
    })

    const showProjects = searchValue ? filteredProjects.filter((project: any) => {
        return project.title.toLowerCase().includes(searchValue.toLowerCase())
    }) : filteredProjects

    return (
        <>
            <SearchBar
                setSearchValue={setSearchValue}
                projectsLength={projects.length}
                setAddProjectForm={setAddProjectForm}
            />
            {addProjectForm &&
                <AddProjectForm
                    setAddProjectForm={setAddProjectForm}
                    setAlertPopup={setAlertPopup}
                    refetch={refetch}
                />
            }
            <section className="w-full mt-8">
                {/* Warning Popup */}
                {deleteProjectWarning.warning &&
                    <WarningPopup
                        proceed={() => deleteProjectMutation.mutate()}
                        cancel={() => setDeleteProjectWarning({ _id: "", warning: false })}
                        message="Are you sure you want to delete this project?"
                        loading={deleteProjectMutation.isPending}
                    />
                }
                {updateProjectForm.show &&
                    <UpdateProjectForm
                        setUpdateProjectForm={() => setUpdateProjectForm({
                            show: false,
                            projectId: ""
                        })}
                        projectId={updateProjectForm.projectId}
                        setAlertPopup={setAlertPopup}
                        refetch={refetch}
                    />
                }
                {projectDetails.show &&
                    <ProjectDetailsPopup
                        project={projectDetails.project}
                        onClose={() => setProjectDetails({
                            show: false,
                            project: {
                                title: "",
                                description: "",
                                projectType: "",
                                status: "",
                                priority: "",
                                deadline: ""
                            }
                        })}

                    />
                }
                {alertPopup.show &&
                    <AlertPopup
                        close={() => setAlertPopup({
                            show: false,
                            message: "",
                            type: ''
                        })}
                        message={alertPopup.message}
                        alertType={alertPopup.type}
                    />
                }
                <div className="flex justify-end items-center">
                    <Select
                        options={[
                            { label: 'Active', value: 'Active' },
                            { label: 'On Hold', value: 'On Hold' },
                            { label: 'Completed', value: 'Completed' },
                        ]}
                        name=""
                        placeholder="All Projects"
                        onChange={(e) => setFilter(e.target.value)}
                        icon="bi:filter"
                    />
                </div>
                <div className="w-full overflow-x-auto">
                    <table className="w-full min-w-175 mt-4 bg-[#18151C] rounded-md overflow-hidden">
                        <thead className="bg-[#1D1D1D] text-[#95959F] px-6">
                            <tr className="p-4 px-4 text-left">
                                <th className="p-2 px-6">Project name</th>
                                <th>Status</th>
                                <th>Priority</th>
                                <th>Deadline</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {showProjects?.map((project: any) => (
                                <tr className="text-sm text-white" key={project._id}>
                                    <td className="p-2 px-6 py-4">
                                        <Link href={`/tasks/${project._id}?project_title=${project.title}`}>
                                            {project.title}
                                        </Link>
                                    </td>
                                    <td className="">
                                        <span
                                            className={`bg-[#282038] text-xs px-2 py-1 rounded-md  
                                                ${project.status === "Active" && 'text-[#3D61B6]'} 
                                                ${project.status === "Completed" && 'text-[#49B38F]'} 
                                                ${project.status === "On Hold" && 'text-[#B58022]'} 
                                            `}>
                                            {project.status}
                                        </span>
                                    </td>
                                    <td>{project.priority}</td>
                                    <td>{formatDate(project.deadline)}</td>
                                    <td>
                                        <div className="flex gap-2 items-center">
                                            <figure
                                                title={'Delete Task'}
                                                className="rounded-md bg-[#36353A] p-2">
                                                <Icon
                                                    icon="ant-design:delete-outlined"
                                                    width={14}
                                                    height={14}
                                                    className="text-red-400 hover:text-red-500"
                                                    onClick={() => setDeleteProjectWarning({ _id: project._id, warning: true })}
                                                />
                                            </figure>
                                            <figure
                                                title={'Edit Task'}
                                                onClick={() => setUpdateProjectForm({
                                                    show: true,
                                                    projectId: project._id
                                                })}
                                                className="rounded-md bg-[#36353A] p-2">
                                                <Icon
                                                    icon="material-symbols:edit"
                                                    width={14}
                                                    height={14}
                                                />
                                            </figure>
                                            <figure
                                                title={'View Details'}
                                                onClick={() => setProjectDetails({
                                                    show: true,
                                                    project: project
                                                })}
                                                className="rounded-md bg-[#36353A] p-2">
                                                <Icon
                                                    icon="akar-icons:eye-open"
                                                    width={14}
                                                    height={14}
                                                />
                                            </figure>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}