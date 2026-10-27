'use client'
import { AddProjectForm } from "@/app/dashboard/components/AddProjectForm";
import { AlertPopup } from "@/components/common/AlertPopup";
import { Button } from "@/elements/Button";
import { Input } from "@/elements/Input";
import { Icon } from "@iconify/react";
import { useState } from "react";

export function SearchBar({ setSearchValue, projectsLength }: { setSearchValue: (value: string) => void, projectsLength: number }) {
    const [addProjectForm, setAddProjectForm] = useState(false)
    const [alertPopup, setAlertPopup] = useState({
        show: false,
        message: "",
        type: ''
    });
    return (
        <>
            {addProjectForm &&
                <AddProjectForm
                    setAddProjectForm={setAddProjectForm}
                    setAlertPopup={setAlertPopup}
                />}
            {alertPopup.show &&
                <AlertPopup
                    close={() => setAlertPopup({
                        show: false,
                        message: "",
                        type: ''
                    })}
                    message={alertPopup.message}
                    alertType={alertPopup.type}
                />
            }
            <div className="flex items-center justify-between mt-8">
                <div className="flex items-center gap-2">
                    <Input
                        type="text"
                        name="search"
                        placeholder="Search projects"
                        icon="material-symbols:search-rounded"
                        label=""
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="w-125 text-white"
                    />
                    <small className="text-gray-400 text-xs">{projectsLength} Projects</small>
                </div>
                <Button
                    text={<><Icon icon="akar-icons:plus" width={16} height={16} /> New Project</>}
                    icon=""
                    className="bg-[#FFE288] text-[#1D1D1D] font-semibold"
                    onClick={() => setAddProjectForm(true)}
                />
            </div>
        </>
    )
}