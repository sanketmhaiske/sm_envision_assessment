import { Icon } from "@iconify/react"



type ButtonTypes = {
    text: React.ReactNode | string,
    className?: string,
    type?: string
    onClick?: () => void
    disabled?: boolean
    icon?: string
}

export function Button({ text, className, type, onClick, disabled, icon }: ButtonTypes) {
    return (
        <div className={`flex items-center w-max rounded-md justify-center gap-2 p-2 px-4 text-sm duration-200 ${disabled ? 'opacity-70 cursor-not-allowed' : 'opacity-100 cursor-pointer'} ${className}`}>
            {icon &&
                <Icon
                    icon={icon}
                    width={20}
                    height={20}
                />
            }
            <button
                disabled={disabled}
                onClick={onClick}
                className={`text-nowrap flex items-center gap-1 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                {text}
            </button>
        </div>
    )
}