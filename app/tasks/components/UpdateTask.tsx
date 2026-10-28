'use client'
import { Button } from "@/elements/Button";
import { Input } from "@/elements/Input";
import { Select } from "@/elements/select";
import { TextArea } from "@/elements/TextArea";
import { addTask, getTaskDetails, updateTask } from "@/hook/axiosClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { AlertPopup } from "@/components/common/AlertPopup"
import { set } from "mongoose";

type TaskFormProps = {
    setUpdateTaskForm: ({ taskId, show }: { taskId: string, show: boolean }) => void,
    taskId: string
    projectId: string
    refetch: () => void
}

export function UpdateTaskForm({ setUpdateTaskForm, taskId, projectId, refetch }: TaskFormProps) {
    const [form, setForm] = useState({
        title: '',
        description: '',
        status: '',
        deadline: '',
        priority: '',
    })

    const [alertPopup, setAlertPopup] = useState({
        show: false,
        message: "",
        type: ''
    });

    const { data } = useQuery({
        queryKey: ['task', taskId],
        queryFn: async () => await getTaskDetails(taskId),
        enabled: !!taskId
    })

    useEffect(() => {
        setForm(data?.data.result)
    }, [data?.data])


    const handleChange = (e: { target: { name: string, value: string } }) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleUpdate = useMutation({
        mutationFn: async () => {
            return await updateTask({
                ...form,
                _id: taskId,
                projectId
            });
        },
        onSuccess: (data: any) => {
            setForm({
                title: '',
                description: '',
                priority: '',
                status: '',
                deadline: ''
            })
            setAlertPopup({
                show: true,
                message: "Task updated successfully",
                type: "success"
            })
            setTimeout(() => {
                refetch();
            }, 2000);
        },
        onError: (err: any) => {
            setAlertPopup({
                show: true,
                message: err?.response?.data?.message || "Failed to update task",
                type: "error"
            })
        }
    })

    return (
        <section className="fixedBG">
            {alertPopup.show &&
                <AlertPopup
                    close={() => {
                        setAlertPopup({ show: false, message: "", type: "" })
                        setUpdateTaskForm({ taskId: "", show: false })
                    }}
                    message={alertPopup.message}
                    alertType={alertPopup.type}
                />
            }
            <div className="bg-[#222225] p-4 sm:p-6 rounded-md relative m-2">
                <div className="flex flex-col">
                    <h5 className="text-white h4 bricolage font-semibold">
                        Update Task
                    </h5>
                    <small className="text-gray-300 text-xs">
                        Update task details
                    </small>
                </div>
                <figure
                    onClick={() => setUpdateTaskForm({ taskId: "", show: false })}
                    className="absolute right-4 top-4 text-gray-300 cursor-pointer hover:text-gray-400"
                >
                    <Icon
                        icon={'ant-design:close-outlined'}
                        width={20}
                        height={20}
                    />
                </figure>
                <div className="mt-8 flex flex-col gap-4">
                    <Input
                        type="text"
                        name="title"
                        placeholder="E.g. Design landing page"
                        className=""
                        label="Task Title"
                        onChange={handleChange}
                        defaultValue={form?.title}

                    />
                    <TextArea
                        name="description"
                        placeholder="Enter task description"
                        label="Description"
                        className="h-30 resize-none"
                        onChange={handleChange}
                        defaultValue={form?.description}
                    />
                    <div className="grid grid-cols-2 gap-2 sm:gap-4">
                        <Select
                            name="status"
                            placeholder="Choose task status"
                            onChange={handleChange}
                            value={form?.status}
                            label="Task Status"
                            options={[
                                { value: "Pending", label: "Pending" },
                                { value: "In Progress", label: "In Progress" },
                                { value: "Completed", label: "Completed" },
                                { value: "Cancelled", label: "Cancelled" },
                            ]}
                        />
                        <Input
                            type="date"
                            name="deadline"
                            placeholder="Enter deadline date"
                            className=""
                            label="Deadline"
                            onChange={handleChange}
                            defaultValue={form?.deadline?.split('T')[0]}
                        />
                        <Select
                            name="priority"
                            placeholder="Set priority"
                            onChange={handleChange}
                            label="Priority"
                            value={form?.priority}
                            options={[
                                { value: "High", label: "High" },
                                { value: "Medium", label: "Medium" },
                                { value: "Low", label: "Low" },
                            ]}
                        />
                    </div>
                </div>
                <Button
                    text={handleUpdate.isPending ? "Updating..." : "Update Task"}
                    icon=""
                    className="bg-[#FFE288] text-[#1D1D1D] mt-6"
                    onClick={() => handleUpdate.mutate()}
                />
            </div>
        </section>
    )
}