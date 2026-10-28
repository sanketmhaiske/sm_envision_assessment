"use client";
import { Button } from "@/elements/Button";
import { login } from "@/hook/axiosClient";
import { Icon } from "@iconify/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { AlertPopup } from "./common/AlertPopup";
import { useRouter } from 'next/navigation';


export default function Login() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [securityCode, setSecurityCode] = useState("");
    const [alertPopup, setAlertPopup] = useState({
        show: false,
        message: "",
        type: ''
    });

    const loginMutation = useMutation({
        mutationFn: async () => {
            return await login({ username, securityCode });
        },
        onSuccess: (data: any) => {
            if (data) {
                localStorage.setItem("token", data?.data?.token);
                router.push("/dashboard");
            }
        },
        onError: (error: any) => {
            setAlertPopup({
                show: true,
                message: error?.response?.data?.message || "Invalid credentials",
                type: "error"
            })
        },
    });

    const handleLogin = (e: any) => {
        e.preventDefault();
        loginMutation.mutate();
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#181818] px-4">
            {alertPopup.show &&
                <AlertPopup
                    close={() => setAlertPopup({
                        show: false,
                        message: "",
                        type: ''
                    })}
                    message={alertPopup.message}
                    alertType={alertPopup.type}
                />
            }
            <form
                onSubmit={handleLogin}
                className="w-full max-w-sm rounded-2xl border border-[#34333D] bg-[#222225] p-7 shadow-2xl"
            >
                <div className="mb-7">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFE288]/15 text-[#FFE288]">
                        <Icon
                            icon="ant-design:project-outlined"
                            width={30}
                            height={30}
                        />
                    </div>

                    <h1 className="text-2xl font-semibold text-white">
                        Welcome back
                    </h1>
                    <small className="text-xs text-[#95959F]">
                        Enter your credentials to access the workspace.
                    </small>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="mb-2 block text-sm text-gray-300">
                            Username
                        </label>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            autoComplete="username"
                            required
                            className="w-full rounded-lg border border-[#34333D] bg-[#181818] px-3 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-[#FFE288]"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-gray-300">
                            Security Code
                        </label>
                        <input
                            type="password"
                            value={securityCode}
                            onChange={(e) => setSecurityCode(e.target.value)}
                            placeholder="Enter security code"
                            autoComplete="off"
                            required
                            className="w-full rounded-lg border border-[#34333D] bg-[#181818] px-3 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-[#FFE288]"
                        />
                    </div>
                </div>
                <Button
                    type="submit"
                    className="mt-6 w-full rounded-lg bg-[#FFE288]"
                    text={loginMutation.isPending ? "Logging in..." : "Access Workspace"}
                    disabled={loginMutation.isPending}
                />

                <small className="mt-5 text-center text-xs text-[#95959F] mx-auto flex justify-center">
                    Secure workspace · Authorized access only
                </small>
            </form>
        </div>
    );
}
