'use client'
import { Header } from "@/components/common/Header";
import { Sidebar } from "@/components/common/Sidebar";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

export function QueryProvider({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient();
    const pathname = usePathname();

    return (
        <QueryClientProvider
            client={queryClient}
        >
            {pathname == "/" ? <>  {children} </> :
                <Suspense fallback={<div>Loading...</div>}>
                    <div className="flex">
                        <Sidebar />
                        <div className="flex flex-col ml-30 w-[calc(100%-150px)]">
                            <Header />
                            <div className="mt-24">
                                {children}
                            </div>
                        </div>
                    </div>
                </Suspense>
            }
        </QueryClientProvider>

    )
}