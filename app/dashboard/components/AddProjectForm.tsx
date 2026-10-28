'use client'
import { Button } from "@/elements/Button";
import { Input } from "@/elements/Input";
import { Select } from "@/elements/select";
import { TextArea } from "@/elements/TextArea";
import { postProject } from "@/hook/axiosClient";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Icon } from "@iconify/react";


type AddProjectType = {
    setAddProjectForm: (value: boolean) => void,
    setAlertPopup: ({ show, message, type }: { show: boolean, message: string, type: string }) => void
    refetch: () => void
}

export function AddProjectForm({ setAddProjectForm, setAlertPopup, refetch }: AddProjectType) {
    const [form, setForm] = useState({
        title: '',
        description: '',
        projectType: '',
        priority: '',
        status: '',
        deadline: ''
    })

    const handleChange = (e: { target: { name: string, value: string } }) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = useMutation({
        mutationFn: async () => {
            return await postProject(form);
        },
        onSuccess: (data: any) => {
            setForm({
                title: '',
                description: '',
                projectType: '',
                priority: '',
                status: '',
                deadline: ''
            })
            setAlertPopup({
                show: true,
                message: "Project created successfully",
                type: "success"
            })
            setTimeout(() => {
                setAddProjectForm(false);
                refetch();
            }, 2000);
        },
        onError: (error: any) => {
            
            setAlertPopup({
                show: true,
                message: error?.response?.data?.message || "Failed to create project",
                type: "error"
            })
        }
    })

    return (
        <section className="fixedBG">
            <div className="bg-[#18151C] border border-[#353540] p-4 sm:p-6 rounded-md relative m-2">
                <div className="flex flex-col">
                    <h5 className="text-white h4 bricolage font-semibold">
                        Add Project
                    </h5>
                    <small className="text-gray-300 text-xs">
                        Add a new project to your workspace
                    </small>
                </div>
                <figure
                    onClick={() => setAddProjectForm(false)}
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
                        placeholder="E.g.  E-Commerce Website Redesign"
                        className=""
                        label="Project Title"
                        onChange={handleChange}

                    />
                    <TextArea
                        name="description"
                        placeholder="Enter project description"
                        className="h-30 resize-none"
                        onChange={handleChange}
                    />
                    <div className="grid grid-cols-2 gap-1 sm:gap-4">
                        <Select
                            name="projectType"
                            placeholder="Select project type"
                            onChange={handleChange}
                            label="Project Type"
                            options={[
                                { value: "Web Application", label: "Web Application" },
                                { value: "Website", label: "Website" },
                                { value: "Mobile App", label: "Mobile App" },
                                { value: "UI/UX Design", label: "UI/UX Design" },
                                { value: "E-commerce", label: "E-commerce" },
                                { value: "API & Backend", label: "API & Backend" },
                                { value: "SaaS Platform", label: "SaaS Platform" },
                                { value: "Branding & Identity", label: "Branding & Identity" },
                                { value: "Digital Marketing", label: "Digital Marketing" },
                                { value: "Maintenance & Support", label: "Maintenance & Support" },
                            ]}
                        />
                        <Select
                            name="priority"
                            placeholder="Select project status"
                            onChange={handleChange}
                            label="Priority"
                            options={[
                                { value: "High", label: "High" },
                                { value: "Medium", label: "Medium" },
                                { value: "Low", label: "Low" },
                            ]}
                        />
                        <Select
                            name="status"
                            placeholder="Choose project status"
                            onChange={handleChange}
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
                        />
                    </div>
                </div>
                <Button
                    text={handleSubmit.isPending ? "Adding..." : "Add Project"}
                    icon=""
                    className="bg-[#FFE288] text-[#1D1D1D] mt-6 font-semibold"
                    onClick={() => handleSubmit.mutate()}
                />
            </div>
        </section>
    )
}