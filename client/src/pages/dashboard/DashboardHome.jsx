import IndiaMap from "../../components/dashboard/IndiaMap.jsx";
import MetricsCards from "../../components/dashboard/MetricsCards.jsx";
import PolicySelector from "../../components/dashboard/PolicySelector.jsx";
import DemographicBreakdown from "../../components/dashboard/DemographicBreakdown.jsx";
import OpinionTimeline from "../../components/dashboard/OpinionTimeline.jsx";

function DashboardHome() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Policy Simulation Dashboard</h1>
        <p className="text-muted-foreground">
          Analyze public sentiment across India&apos;s states and demographics
        </p>
      </div>

      <PolicySelector />
      <MetricsCards />

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <IndiaMap />
        </div>
        <div className="space-y-6">
          <DemographicBreakdown />
          <OpinionTimeline />
        </div>
      </div>
    </>
  );
}

export default DashboardHome;