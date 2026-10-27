import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";



export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-20 bg-[#151515] h-screen fixed left-0 flex flex-col items-center">
            <Link
                href={'/dashboard'}
                className="bg-[#353540] text-[#7F9EF1] rounded-full w-12 h-12 my-4 flex justify-center items-center">
                <Icon
                    icon="ant-design:project-outlined"
                    width={30}
                    height={30}
                />
            </Link>
            <div className="flex flex-col gap-8 mt-8">
                <Link
                    href="/dashboard"
                    className={`${pathname.includes('dashboard') ? 'bg-white text-gray-600' : 'text-white'} p-2 rounded-md`}>
                    <Icon
                        icon="material-symbols:dashboard"
                        width={30}
                        height={30}
                    />
                </Link>
                <Link
                    href='/projects'
                    className={`${pathname.includes('projects') ? 'bg-white text-gray-600' : 'text-white'} p-2 rounded-md`}>
                    <Icon
                        icon="ic:outline-workspaces"
                        width={30}
                        height={30}
                    />
                </Link>
                {/* <Link
                    href='/tasks'
                    className={`${pathname.includes('tasks') ? 'bg-white text-gray-600' : 'text-white'} p-2 rounded-md`}>
                    <Icon
                        icon="bi:list-task"
                        width={30}
                        height={30}
                    />
                </Link> */}
            </div>
        </div>
    )
}