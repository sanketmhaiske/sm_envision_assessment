"use client";
import { Button } from "@/elements/Button";

type Project = {
    title: string;
    description: string;
    projectType: string;
    status: string;
    priority: string;
    deadline: string;
};

type Props = {
    project: Project;
    onClose: () => void;
};

export default function ProjectDetailsPopup({
    project,
    onClose,
}: Props) {
    const details = [
        { label: "Project Type", value: project.projectType },
        { label: "Status", value: project.status },
        { label: "Priority", value: project.priority },
        {
            label: "Deadline",
            value: project.deadline
                ? new Date(project.deadline).toLocaleDateString()
                : "Not set",
        },
    ];

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="project-title"
                className="w-full max-w-lg rounded-xl border border-[#34333D] bg-[#222225] p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <small className="text-xs font-medium uppercase tracking-wider text-[#FFE288] bricolage">
                            Project Details
                        </small>
                        <h6
                            id="project-title"
                            className="mt-2 h5 font-semibold text-white"
                        >
                            {project.title}
                        </h6>
                    </div>

                    <button
                        onClick={onClose}
                        aria-label="Close popup"
                        className="text-xl text-gray-400 hover:text-white cursor-pointer"
                    >
                        &times;
                    </button>
                </div>

                <small className="mt-2 text-xs text-gray-400 flex">
                    {project.description || "No description provided."}
                </small>

                <div className="mt-6 grid grid-cols-2 gap-3 hanken">
                    {details.map((item) => (
                        <div
                            key={item.label}
                            className="rounded-lg border border-[#34333D] bg-[#181818] p-3"
                        >
                            <p className="text-xs text-gray-500">
                                {item.label}
                            </p>
                            <p className="mt-2 text-sm font-medium text-gray-100">
                                {item.value}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex justify-end">
                    <Button
                        text="Close"
                        icon=""
                        className="bg-[#FFE288] text-[#1D1D1D] font-semibold w-max"
                        onClick={onClose}
                    />
                </div>
            </div>
        </div>
    );
}
