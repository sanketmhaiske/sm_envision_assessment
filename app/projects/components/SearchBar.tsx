'use client'
import { AddProjectForm } from "@/app/dashboard/components/AddProjectForm";
import { Button } from "@/elements/Button";
import { Input } from "@/elements/Input";
import { useState } from "react";

export function SearchBar() {
    const [addProjectForm, setAddProjectForm] = useState(false)
    return (
        <>
            {addProjectForm && <AddProjectForm setAddProjectForm={setAddProjectForm} />}
            <div className="flex items-center justify-between mt-8">
                <div className="flex items-center gap-2">
                    <Input
                        type="text"
                        name="search"
                        placeholder="Search projects"
                        icon="material-symbols:search-rounded"
                        label=""
                        onChange={() => ''}
                        className="w-[500px]"
                    />
                    <small className="text-gray-400 text-xs">180 Projects</small>
                </div>
                <Button
                    text="New Project"
                    icon=""
                    className="bg-gray-400 text-white"
                    onClick={() => setAddProjectForm(true)}
                />
            </div>
        </>
    )
}