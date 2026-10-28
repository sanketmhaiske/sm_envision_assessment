'use client'
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";


export function Header() {
    const [open, setOpen] = useState(false)
    return (
        <header className="flex items-center justify-between bg-[#04010A] py-4 lg:fixed top-0 z-10 w-full lg:w-[calc(100%-140px)] border-b border-(--border)">
            <div className="flex items-center bg-[#18151E] gap-2 w-60 lg:w-100 p-2 rounded-md text-gray-400">
                <figure>
                    <Icon
                        icon="basil:search-outline"
                        width={24}
                        height={24}
                    />
                </figure>
                <span>Search here..</span>
            </div>
            <div className="flex items-center gap-4">
                <span
                    onClick={() => setOpen(!open)}
                    className="h-10 w-10 rounded-full bg-[#222225] text-white flex justify-center items-center relative cursor-pointer">
                    <Icon
                        icon="iconamoon:profile-circle"
                        width={28}
                        height={28}
                    />
                    {open && <MobileMenu setOpen={setOpen} />}
                </span>
            </div>
        </header>
    )
}

const MobileMenu = ({ setOpen }: { setOpen: (open: boolean) => void }) => {

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => {
            document.removeEventListener('mousedown', handler)
        }
    }, [])


    return (
        <div className="w-40 h-max bg-[#222225] rounded-md absolute top-12 right-4 p-4" ref={ref}>
            <div className="flex flex-col gap-2">
                <Link href="/dashboard" className="flex items-center gap-2 hover:text-[#ffe288]">
                    <Icon
                        icon="material-symbols:dashboard"
                        width={16}
                        height={16}
                    />
                    Dashboard
                </Link>
                <Link href="/projects" className="flex items-center gap-2 hover:text-[#ffe288]">
                    <Icon
                        icon="ic:outline-workspaces"
                        width={16}
                        height={16}
                    />
                    Projects
                </Link>
                <Link
                    href="/"
                    onClick={() => localStorage.removeItem('token')}
                    className="flex items-center gap-2 hover:text-[#ffe288]"
                >
                    <Icon
                        icon={'hugeicons:logout-circle-02'}
                        width={16}
                        height={16}
                    />
                    Logout
                </Link>
            </div>
        </div>
    )
}