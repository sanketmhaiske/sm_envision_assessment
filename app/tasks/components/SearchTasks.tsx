'use client'
// import { AddProjectForm } from "@/app/dashboard/components/AddProjectForm";
import { Button } from "@/elements/Button";
import { Input } from "@/elements/Input";
import { Icon } from "@iconify/react";
import { useState } from "react";


type SearchTaskType = {
    setAddTaskForm: (value: boolean) => void
    setSearchValue: (value: string) => void
    projectTasksLength: number
}

export function SearchTask({ setAddTaskForm, setSearchValue, projectTasksLength }: SearchTaskType) {
    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-12">
                <div className="flex items-center gap-2">
                    <Input
                        type="text"
                        name="search"
                        placeholder="Search tasks"
                        icon="material-symbols:search-rounded"
                        label=""
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="w-125"
                    />
                    <small className="text-gray-400 text-xs">{projectTasksLength} tasks</small>
                </div>
                <Button
                    text={<><Icon icon="akar-icons:plus" width={16} height={16} />New Task</>}
                    icon=""
                    className="bg-[#FFE288] text-[#1D1D1D] font-semibold w-full md:w-max"
                    onClick={() => setAddTaskForm(true)}
                />
            </div>
        </>
    )
}