import { Button } from "@/elements/Button";
import { Icon } from "@iconify/react";


type WarningPopupProps = {
    close: () => void;
    message: string
    alertType: 'success' | 'error' | string
};

export function AlertPopup({ close, message, alertType }: WarningPopupProps) {
    return (
        <div className="fixedBG z-100">
            <div className="flex flex-col gap-4 bg-[#1D1D1D] p-6 rounded-md min-w-100 max-w-120">
                <div className="flex items-start gap-4">
                    <figure className={`${alertType === 'error' && 'bg-red-100'} ${alertType === 'success' && 'bg-green-100'} p-2 rounded-full`}>
                        {alertType === 'error' && (
                            <Icon
                                icon="material-symbols:warning"
                                width={24}
                                height={24}
                                className="text-red-500"
                            />
                        )}
                        {alertType === 'success' && (
                            <Icon
                                icon="akar-icons:circle-check-fill"
                                width={24}
                                height={24}
                                className="text-green-500"
                            />
                        )}
                    </figure>
                    <h6 className="h5 text-white hanken font-semibold">
                        {message}
                    </h6>
                </div>
                <div className="flex gap-2 justify-end">
                    <Button
                        text="Close"
                        onClick={close}
                        className="bg-gray-300 w-max"
                    />
                </div>
            </div>
        </div>
    )
}