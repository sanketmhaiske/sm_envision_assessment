import { Icon } from "@iconify/react";


export function Header() {
    return (
        <header className="flex items-center justify-between py-4 fixed top-0 z-10 w-[calc(100%-140px)] border-b border-(--border)">
            <div className="flex items-center bg-[#18151E] gap-2 w-100 p-2 rounded-md text-gray-400">
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
                <span className="h-10 w-10 rounded-full bg-gray-200 flex justify-center items-center">
                    <Icon
                        icon="carbon:notification-new"
                        width={24}
                        height={24}
                    />
                </span>
                <span className="h-10 w-10 rounded-full bg-gray-200 flex justify-center items-center">
                    <Icon
                        icon="carbon:help"
                        width={24}
                        height={24}
                    />
                </span>
                <span className="h-10 w-10 rounded-full bg-gray-200 flex justify-center items-center">
                    <Icon
                        icon="hugeicons:menu-circle"
                        width={20}
                        height={20}
                    />
                </span>
            </div>
        </header>
    )
}