import { Icon } from '@iconify/react';

type SelectTypes = {
    name: string
    placeholder: string
    onChange: (e: any) => void
    className?: string
    icon?: string
    label?: string
    options: { value: string, label: string }[]
    defaultValue?: string
    value?: string
}

export function Select({ name, placeholder, onChange, className, icon, label, options, defaultValue, value}: SelectTypes) {
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
                <select
                    name={name}
                    onChange={onChange}
                    value={value}
                    className="bg-transparent text-gray-200 text-sm p-2 w-full outline-none">
                    <option value="">{placeholder}</option>
                    {options.map((option: any) => (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}