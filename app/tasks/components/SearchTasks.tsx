'use client'
// import { AddProjectForm } from "@/app/dashboard/components/AddProjectForm";
import { Button } from "@/elements/Button";
import { Input } from "@/elements/Input";
import { useState } from "react";

export function SearchTask({ setAddTaskForm }: { setAddTaskForm: (value: boolean) => void }) {
    return (
        <>
            {/* {addProjectForm && <AddProjectForm setAddProjectForm={setAddProjectForm} />} */}
            <div className="flex items-center justify-between mt-12">
                <div className="flex items-center gap-2">
                    <Input
                        type="text"
                        name="search"
                        placeholder="Search tasks"
                        icon="material-symbols:search-rounded"
                        label=""
                        onChange={() => ''}
                        className="w-125"
                    />
                    <small className="text-gray-400 text-xs">10 tasks</small>
                </div>
                <Button
                    text="New Task"
                    icon=""
                    className="bg-gray-400 text-white"
                    onClick={() => setAddTaskForm(true)}
                />
            </div>
        </>
    )
}