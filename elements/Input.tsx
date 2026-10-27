import { Icon } from '@iconify/react';

type InputTypes = {
    type: string
    name: string
    placeholder: string
    onChange: (e: any) => void
    className?: string
    icon?: string
    label?: string
    defaultValue?: string
}

export function Input({ name, placeholder, onChange, className, icon, type, label , defaultValue}: InputTypes) {
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
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    className={`bg-transparent text-gray-200 text-sm p-2 w-full outline-none ${className}`}
                />
            </div>
        </div>
    )
}