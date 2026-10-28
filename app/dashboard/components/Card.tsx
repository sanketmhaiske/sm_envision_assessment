import { Icon } from "@iconify/react"

type CardProps = {
    title: string;
    icon: string;
    value: number;
    bgColor?: string
};

export const Card = ({
    title,
    icon,
    value,
    bgColor,
}: CardProps) => {
    return (
        <div className="flex flex-col justify-between bg-[#1D1D1D] rounded-md lg:w-50 h-32 p-4">
            <div className="flex items-start justify-between">
                <figure
                    style={{ background: bgColor }}
                    className="rounded-full p-2 text-[#1D1D1D] flex justify-between items-start">
                    <Icon
                        icon={icon}
                        width={24}
                        height={24}
                    />
                </figure>
                <h1 className="text-5xl sm:h1 font-semibold hanken text-white m-0 leading-none">
                    {value}
                </h1>
            </div>
            <h6 className="h6 text-white font-semibold">
                {title}
            </h6>
        </div>
    )
}