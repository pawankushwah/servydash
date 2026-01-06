import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
            <DashboardSidebar />
            <main className="flex-1 p-2 pt-10 md:p-10 h-screen overflow-auto">
                {children}
            </main>
        </div>
    );
}