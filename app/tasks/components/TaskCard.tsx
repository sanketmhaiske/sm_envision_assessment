import { Icon } from "@iconify/react";


export function TaskCard({ TopBarColor, name, value, icon }: { TopBarColor: string, name: string, value: number, icon: string }) {
    return (
        <div className="flex flex-col justify-between w-52 h-32 bg-[#1D1D1D] rounded-lg overflow-hidden">
            <span
                style={{ backgroundColor: TopBarColor }}
                className={`text-[#151515] p-2 px-4 font-semibold`}>{name}</span>
            <div className="p-2 px-4 flex items-center justify-between">
                <h1 className="h1 font-semibold bricolage text-white">{value}</h1>
                <figure
                    style={{ backgroundColor: TopBarColor }}
                    className="rounded-full p-2">
                    <Icon
                        icon={icon}
                        width={24}
                        height={24}
                    />
                </figure>
            </div>
        </div>
    )
}