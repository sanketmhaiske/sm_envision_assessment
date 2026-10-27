'use client'
// import { AddProjectForm } from "@/app/dashboard/components/AddProjectForm";
// import { AlertPopup } from "@/components/common/AlertPopup";
import { Button } from "@/elements/Button";
import { Input } from "@/elements/Input";
import { Icon } from "@iconify/react";
// import { useState } from "react";

type SearchBarProps = {
    setSearchValue: (value: string) => void,
    projectsLength: number
    setAddProjectForm: (value: boolean) => void
}

export function SearchBar({ setSearchValue, projectsLength, setAddProjectForm }: SearchBarProps) {
    // const [alertPopup, setAlertPopup] = useState({
    //     show: false,
    //     message: "",
    //     type: ''
    // });
    return (
        <>
            
            {/* {alertPopup.show &&
                <AlertPopup
                    close={() => setAlertPopup({
                        show: false,
                        message: "",
                        type: ''
                    })}
                    message={alertPopup.message}
                    alertType={alertPopup.type}
                />
            } */}
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
                    className="bg-[#FFE288] text-[#1D1D1D] font-semibold w-max"
                    onClick={() => setAddProjectForm(true)}
                />
            </div>
        </>
    )
}