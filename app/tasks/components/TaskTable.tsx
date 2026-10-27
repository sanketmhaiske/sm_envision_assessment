'use client'
import { WarningPopup } from "@/components/common/WarningPopup"
import { deleteTask, updateTaskStatusChange } from "@/hook/api"
import { Icon } from "@iconify/react"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { UpdateTaskForm } from "./UpdateTask"
import TaskProgress from "./TaskProgress"
import { AlertPopup } from "@/components/common/AlertPopup"
import { formatDate } from "@/utils/formatDate"

export function TaskTable({ projectTasks, refetch }: { projectTasks: Array<any> , refetch: () => void}) {

    const [deleteTaskWarning, setDeleteTaskWarning] = useState({
        _id: "",
        warning: false
    })

    const [alertPopup, setAlertPopup] = useState({
        show: false,
        message: "",
        type: ''
    });

    const deleteTaskMutation = useMutation({
        mutationFn: async () => {
            return await deleteTask({ _id: deleteTaskWarning?._id })
        },
        onSuccess: (data: any) => {
            setAlertPopup({
                show: true,
                message: "Task deleted successfully",
                type: "success"
            })
            setDeleteTaskWarning({ _id: "", warning: false })
        },
        onError: (err: any) => {
            setAlertPopup({
                show: true,
                message: err?.message || "Failed to delete task",
                type: "error"
            })
        }
    })

    const [updateTaskForm, setUpdateTaskForm] = useState({
        taskId: "",
        projectId: "",
        show: false
    })
    const [updateTaskStatus, setUpdateTaskStatus] = useState({
        show: false,
        taskId: "",
        status: ""
    })


    return (
        <section className="w-full mt-8">
            {/* Warning Popup */}
            {deleteTaskWarning.warning &&
                <WarningPopup
                    proceed={() => deleteTaskMutation.mutate()}
                    cancel={() => setDeleteTaskWarning({ _id: "", warning: false })}
                    message="Are you sure you want to delete this task?"
                    loading={deleteTaskMutation.isPending}
                />
            }
            {updateTaskForm.show &&
                <UpdateTaskForm
                    setUpdateTaskForm={() => setUpdateTaskForm({
                        taskId: "",
                        show: false,
                        projectId: ""
                    })}
                    taskId={updateTaskForm.taskId}
                    projectId={updateTaskForm.projectId}
                    refetch={refetch}
                />
            }
            {updateTaskStatus.show &&
                <TaskProgress
                    currentStatus={updateTaskStatus.status}
                    taskId={updateTaskStatus.taskId}
                    onClose={() => setUpdateTaskStatus({
                        taskId: "",
                        show: false,
                        status: ""
                    })}
                    setUpdateTaskStatus={setUpdateTaskStatus}
                    refetch={refetch}
                    setAlertPopup={setAlertPopup}
                />
            }
            {alertPopup.show &&
                <AlertPopup
                    close={() => 
                        setAlertPopup({ show: false, message: "", type: "" })
                    }
                    message={alertPopup.message}
                    alertType={alertPopup.type}
                />
            }
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
                    {projectTasks?.map((task: any) => (
                        <tr className="text-sm text-white" key={task._id}>
                            <td className="p-2 px-4 py-4">{task.title}</td>
                            <td className="">{task.status}</td>
                            <td>{task.priority}</td>
                            <td>{formatDate(task.deadline)}</td>
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
                                            onClick={() => setDeleteTaskWarning({ _id: task._id, warning: true })}
                                        />
                                    </figure>
                                    <figure
                                        title={'Edit Task'}
                                        onClick={() => setUpdateTaskForm({
                                            taskId: task._id,
                                            show: true,
                                            projectId: task.projectId
                                        })}
                                        className="rounded-md bg-[#36353A] p-2">
                                        <Icon
                                            icon="material-symbols:edit"
                                            width={14}
                                            height={14}
                                        />
                                    </figure>
                                    <figure
                                        onClick={() => setUpdateTaskStatus({
                                            taskId: task._id,
                                            show: true,
                                            status: task.status
                                        })}
                                        title={'Change Status'}
                                        className="rounded-md bg-[#36353A] p-2">
                                        <Icon
                                            icon="hugeicons:progress"
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