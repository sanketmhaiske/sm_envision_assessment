
'use client'
import { Button } from "@/elements/Button";
import { Input } from "@/elements/Input";
import { Select } from "@/elements/select";
import { TextArea } from "@/elements/TextArea";
import { addTask } from "@/hook/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { AlertPopup } from "@/components/common/AlertPopup";

type TaskFormProps = {
    setAddTaskForm: (value: boolean) => void,
    projectId: string
    refetch: () => void
}

export function AddTaskForm({ setAddTaskForm, projectId, refetch }: TaskFormProps) {
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

    const handleChange = (e: { target: { name: string, value: string } }) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = useMutation({
        mutationFn: async () => {
            return await addTask({
                ...form,
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
                message: "Task added successfully",
                type: "success"
            })
            setTimeout(() => {
                refetch();
            }, 2000);
        },
        onError: (error: any) => {
            setAlertPopup({
                show: true,
                message: error?.message || "Failed to add task",
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
                        setAddTaskForm(false)
                    }}
                    message={alertPopup.message}
                    alertType={alertPopup.type}
                />
            }
            <div className="bg-[#18151C] p-6 rounded-md relative">
                <div className="flex flex-col">
                    <h5 className="text-white h4 bricolage font-semibold">
                        Add Task
                    </h5>
                    <small className="text-gray-300 text-xs">
                        Add a new task to your project
                    </small>
                </div>
                <figure
                    onClick={() => setAddTaskForm(false)}
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

                    />
                    <TextArea
                        name="description"
                        placeholder="Enter task description"
                        label="Description"
                        className="h-30 resize-none"
                        onChange={handleChange}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <Select
                            name="status"
                            placeholder="Choose task status"
                            onChange={handleChange}
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
                        />
                        <Select
                            name="priority"
                            placeholder="Set priority"
                            onChange={handleChange}
                            label="Priority"
                            options={[
                                { value: "High", label: "High" },
                                { value: "Medium", label: "Medium" },
                                { value: "Low", label: "Low" },
                            ]}
                        />
                    </div>
                </div>
                <Button
                    text={handleSubmit.isPending ? "Adding..." : "Add Task"}
                    icon=""
                    className="bg-[#FFE288] text-[#1D1D1D] font-semibold mt-6"
                    onClick={() => handleSubmit.mutate()}
                    disabled={handleSubmit.isPending}
                />
            </div>
        </section>
    )
}