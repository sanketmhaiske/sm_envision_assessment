"use client";

import { Button } from "@/elements/Button";
import { updateTaskStatusChange } from "@/hook/axiosClient";
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
        onError: (err: any) => {
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
                    <Button
                        text="Close"
                        icon=""
                        className="bg-gray-300 w-max"
                        onClick={onClose}
                    />
                    <Button
                        text={handleTaskStatusChange.isPending ? "Saving..." : "Save Status"}
                        icon=""
                        className="bg-[#FFE288] text-[#1D1D1D] font-semibold w-max"
                        onClick={() => handleTaskStatusChange.mutate(status)}
                        disabled={status === currentStatus}
                    />
                </div>
            </div>
        </div>
    );
}