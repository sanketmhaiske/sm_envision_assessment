import { Icon } from '@iconify/react';

type InputTypes = {
    name: string
    placeholder: string
    onChange: (e: any) => void
    className?: string
    icon?: string
    label?: string
}

export function TextArea({ name, placeholder, onChange, className, icon, label }: InputTypes) {
    return (
        <div>
            {label && <label className="text-gray-200 font-medium mb-1 flex text-xs">{label}</label>}
            <div className="flex items-center border border-(--border) rounded-md bg-[#1D1D1D] p-1 px-4 gap-1 w-full">
                <figure>
                    <Icon
                        icon={icon || ''}
                        width={20}
                        height={20}
                        className="text-gray-500"
                    />
                </figure>
                <textarea
                    name={name}
                    placeholder={placeholder}
                    onChange={onChange}
                    className={`bg-transparent text-gray-200 text-sm p-2 w-full outline-none ${className}`}
                >
                </textarea>
            </div>
        </div>
    )
}