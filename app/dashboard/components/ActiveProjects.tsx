'use client'
import { Button } from "@/elements/Button"
import { AddProjectForm } from "./AddProjectForm"
import { useState } from "react"
import { Icon } from "@iconify/react"
import { WarningPopup } from "@/components/common/WarningPopup"
import { Select } from "@/elements/select"
import { deleteProject } from "@/hook/api"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import { UpdateProjectForm } from "../../projects/components/UpdateProjectForm"
import ProjectDetailsPopup from "@/app/projects/components/ProjectDetails"
import { AlertPopup } from "@/components/common/AlertPopup"
import { formatDate } from "@/utils/formatDate"

export function ActiveProjects({ activeProjects }: { activeProjects: Array<any> }) {
    const [addProjectForm, setAddProjectForm] = useState(false);
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
            console.log(data)
            setAlertPopup({
                show: true,
                message: "Project deleted successfully",
                type: "success"
            })
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

    return (
        <section className="w-full mt-16">
            {addProjectForm &&
                <AddProjectForm
                    setAddProjectForm={setAddProjectForm}
                    setAlertPopup={setAlertPopup}
                />}
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
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <h3 className="h3 text-white"> Active Projects </h3>
                    <small className="text-gray-200">Your active projects overview</small>
                </div>
                <Button
                    text={<><Icon icon="akar-icons:plus" width={16} height={16} /> New Project</>}
                    icon=""
                    className="bg-[#FFE288] text-[#1D1D1D] font-semibold"
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
                            <td className="p-2 px-4 py-4">
                                <Link href={`/tasks/${project._id}?project_title=${project.title}`}>
                                    {project.title}
                                </Link>
                            </td>
                            <td className="">{project.status}</td>
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
        </section>
    )
}