import { useState } from "react";

import IndiaMap from "../../components/dashboard/IndiaMap.jsx";
import MetricsCards from "../../components/dashboard/MetricsCards.jsx";
import PolicySelector from "../../components/dashboard/PolicySelector.jsx";
import DemographicBreakdown from "../../components/dashboard/DemographicBreakdown.jsx";
import OpinionTimeline from "../../components/dashboard/OpinionTimeline.jsx";

function DashboardHome() {
  const [selectedPolicy, setSelectedPolicy] = useState("digital");
  const [hasRun, setHasRun] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const runSimulation = async () => {
    if (isRunning) return;

    setIsRunning(true);

    // TODO: call backend here
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setHasRun(true);       // 👈 this is what flips the label logic
    setIsRunning(false);
  };

  if (!hasRun) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="w-full max-w-xl">
          <PolicySelector
            selectedPolicy={selectedPolicy}
            onChangePolicy={setSelectedPolicy}
            onRun={runSimulation}
            isRunning={isRunning}
            hasRun={hasRun}          // 👈 important
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Policy Simulation Dashboard</h1>
          <p className="text-muted-foreground">
            Analyze public sentiment across India&apos;s states and demographics
          </p>
        </div>
      </div>

      <PolicySelector
        selectedPolicy={selectedPolicy}
        onChangePolicy={setSelectedPolicy}
        onRun={runSimulation}
        isRunning={isRunning}
        hasRun={hasRun}          // 👈 important here too
      />

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
