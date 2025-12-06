import IndiaMap from "@/components/dashboard/india-map";
import MetricsCards from "@/components/dashboard/metrics-cards";
import PolicySelector from "@/components/dashboard/policy-selector";
import DemographicBreakdown from "@/components/dashboard/demographic-breakdown";
import OpinionTimeline from "@/components/dashboard/opinion-timeline";

function DashboardPage() {
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

export default DashboardPage;
