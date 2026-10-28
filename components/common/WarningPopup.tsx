import { Button } from "@/elements/Button";
import { Icon } from "@iconify/react";


type WarningPopupProps = {
    proceed: () => void;
    cancel: () => void;
    message: string
    loading?: boolean
};

export function WarningPopup({ proceed, cancel, message, loading }: WarningPopupProps) {
    return (
        <div className="fixedBG">
            <div className="flex flex-col gap-4 bg-[#222225] p-6 rounded-md max-w-100 m-4">
                <div className="flex items-start gap-4">
                    <figure className="bg-red-200 p-2 rounded-full">
                        <Icon
                            icon="material-symbols:warning"
                            width={24}
                            height={24}
                            className="text-red-500"
                        />
                    </figure>
                    <h6 className="h5 text-white hanken font-semibold">
                        {message}
                    </h6>
                </div>
                <div className="flex gap-2 justify-end">
                    <Button
                        text={loading ? "Deleting..." : "Delete"}
                        onClick={proceed}
                        className="bg-red-300 w-max font-semibold"
                    />
                    <Button
                        text="Cancel"
                        onClick={cancel}
                        className="bg-gray-300 w-max font-semibold"
                    />
                </div>
            </div>
        </div>
    )
}