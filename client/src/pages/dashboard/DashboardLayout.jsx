import DashboardSidebar from "../../components/dashboard/DashboardSidebar.jsx";
import DashboardHeader from "../../components/dashboard/DashboardHeader.jsx";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[oklch(0.12_0_0)] via-[oklch(0.08_0_0)] to-[oklch(0.0_0_0)] text-white">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;