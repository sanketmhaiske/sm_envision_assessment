'use client'
import { Button } from "@/elements/Button";
import { Input } from "@/elements/Input";
import { Select } from "@/elements/select";
import { TextArea } from "@/elements/TextArea";
import { getProjectDetails, updateProject } from "@/hook/axiosClient";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { AlertPopup } from "@/components/common/AlertPopup";


type ProjectFormProps = {
    setUpdateProjectForm: ({ projectId, show }: { projectId: string, show: boolean }) => void,
    projectId: string
    setAlertPopup: ({ show, message, type }: { show: boolean, message: string, type: string }) => void
    refetch: () => void
}

export function UpdateProjectForm({ setUpdateProjectForm, projectId , setAlertPopup, refetch}: ProjectFormProps) {
    const [form, setForm] = useState({
        title: '',
        description: '',
        status: '',
        deadline: '',
        priority: '',
    })

    useEffect(() => {
        const getProject = async () => {
            if (!projectId) return;
            const project = await getProjectDetails(projectId);
            setForm(project)
        }
        getProject();
    }, [projectId])


    const handleChange = (e: { target: { name: string, value: string } }) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleUpdate = useMutation({
        mutationFn: async () => {
            return await updateProject({
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
                message: "Task updated successfully",
                type: "success"
            })
            setTimeout(() => {
                setUpdateProjectForm({ projectId: "", show: false })
                refetch();
            }, 2000);
        },
        onError: (error: any) => {
            
        }
    })

    return (
        <section className="fixedBG">
            <div className="bg-[#222225] p-4 sm:p-6 rounded-md relative m-4">
                <div className="flex flex-col">
                    <h5 className="text-white h4 bricolage font-semibold">
                        Update Project
                    </h5>
                    <small className="text-gray-300 text-xs">
                        Update project details
                    </small>
                </div>
                <figure
                    onClick={() => setUpdateProjectForm({ projectId: "", show: false })}
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
                        placeholder="Enter project description"
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
                            label="Project Status"
                            options={[
                                { value: "Active", label: "Active" },
                                { value: "Completed", label: "Completed" },
                                { value: "On Hold", label: "On Hold" },
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
                    text={handleUpdate.isPending ? "Updating..." : "Update Project"}
                    icon=""
                    className="bg-[#FFE288] text-[#1D1D1D] mt-6"
                    onClick={() => handleUpdate.mutate()}
                />
            </div>
        </section>
    )
}