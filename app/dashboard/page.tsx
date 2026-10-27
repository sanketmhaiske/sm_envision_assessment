import { Suspense } from "react";
import { DashboardContent } from "./components/DashboardContent";


export default function Page() {
    return (
        <Suspense fallback={<p className="text-white">Loading dashboard...</p>}>
            <DashboardContent />
        </Suspense>
    );
}

