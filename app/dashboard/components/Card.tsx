import { Icon } from "@iconify/react"

type CardProps = {
    title: string;
    icon: string;
    value: number;
};

export const Card = ({
    title,
    icon,
    value,
}: CardProps) => {
    return (
        <div className="flex flex-col justify-between bg-[#1D1D1D] rounded-md w-50 h-32 p-4">
            <div className="flex items-start justify-between">
                <figure className="bg-[#36353A] rounded-full p-2 text-[#95959F] flex justify-between items-start">
                    <Icon
                        icon={icon}
                        width={24}
                        height={24}
                    />
                </figure>
                <h1 className="h1 font-semibold hanken text-white m-0 leading-none">
                    {value}
                </h1>
            </div>
            <h6 className="text-xl text-white font-semibold">
                {title}
            </h6>
        </div>
    )
}