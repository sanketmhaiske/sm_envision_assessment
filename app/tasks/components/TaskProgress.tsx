"use client";

import { updateTaskStatusChange } from "@/hook/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

type Props = {
    currentStatus: string;
    onClose: () => void;
    taskId: string
    setUpdateTaskStatus: ({ taskId, show, status }: { taskId: string, show: boolean, status: string }) => void
    refetch: () => void
    setAlertPopup: ({ show, message, type }: { show: boolean, message: string, type: string }) => void
};

export default function TaskProgress({
    currentStatus,
    onClose,
    taskId,
    setUpdateTaskStatus,
    refetch,
    setAlertPopup
}: Props) {
    const [status, setStatus] = useState(currentStatus);

    const statuses = [
        "Pending",
        "In Progress",
        "Completed",
        "Cancelled",
    ];

    const handleTaskStatusChange = useMutation({
        mutationFn: async (newStatus: string) => {
            return await updateTaskStatusChange({ _id: taskId, newStatus: newStatus })
        },
        onSuccess: (data: any) => {
            setUpdateTaskStatus({
                taskId,
                show: false,
                status
            })
            setTimeout(() => {
                refetch();
            }, 2000);

        },
        onError: (err:any) => {
            console.log(err)
            setAlertPopup({
                show: true,
                message: err?.message || "Failed to update task status",
                type: "error"
            })
        }
    })

    return (
        <div className="fixedBG">
            <div className="w-full max-w-sm rounded-xl border border-gray-700 bg-[#222225] p-5">
                <h2 className="text-lg font-semibold text-white">
                    Change Task Status
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                    Select the new status for this task.
                </p>

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="mt-4 w-full rounded-lg border border-gray-700 bg-[#34333D] p-3 text-sm text-white outline-none"
                >
                    {statuses.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>

                <div className="mt-5 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="rounded-lg border border-gray-600 px-4 py-2 text-sm text-gray-300"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => handleTaskStatusChange.mutate(status)}
                        disabled={status === currentStatus}
                        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {handleTaskStatusChange.isPending ? "Saving..." : "Save Status"}
                    </button>
                </div>
            </div>
        </div>
    );
}