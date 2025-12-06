import DashboardSidebar from "../../components/dashboard/DashboardSidebar.jsx";
import DashboardHeader from "../../components/dashboard/DashboardHeader.jsx";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
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