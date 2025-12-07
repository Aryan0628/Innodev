"use client";

import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Users, AlertTriangle } from "lucide-react";

const metrics = [
  {
    label: "Overall Support",
    value: "67.4%",
    change: "+2.3%",
    trend: "up",
    icon: TrendingUp,
  },
  {
    label: "Opposition",
    value: "24.8%",
    change: "-1.2%",
    trend: "down",
    icon: TrendingDown,
  },
  {
    label: "Population Simulated",
    value: "1.2M",
    change: "250 households",
    trend: "neutral",
    icon: Users,
  },
  {
    label: "Risk Level",
    value: "Medium",
    change: "3 states flagged",
    trend: "warning",
    icon: AlertTriangle,
  },
];

function MetricsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.label} className="p-4 border-white/10 bg-[oklch(0.15_0_0)]/50 backdrop-blur-sm hover:bg-[oklch(0.18_0_0)]/70 transition-colors">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-white/70">{metric.label}</p>
              <p className="mt-1 text-2xl font-bold text-white">{metric.value}</p>
              <p
                className={`mt-1 text-xs ${
                  metric.trend === "up"
                    ? "text-green-400"
                    : metric.trend === "down"
                    ? "text-red-400"
                    : metric.trend === "warning"
                    ? "text-[oklch(0.75_0.18_165)]"
                    : "text-white/60"
                }`}
              >
                {metric.change}
              </p>
            </div>
            <div
              className={`rounded-lg p-2 ${
                metric.trend === "up"
                  ? "bg-green-500/10 border border-green-500/20"
                  : metric.trend === "down"
                  ? "bg-red-500/10 border border-red-500/20"
                  : metric.trend === "warning"
                  ? "bg-[oklch(0.75_0.18_165)]/10 border border-[oklch(0.75_0.18_165)]/20"
                  : "bg-white/5 border border-white/10"
              }`}
            >
              <metric.icon
                className={`h-5 w-5 ${
                  metric.trend === "up"
                    ? "text-green-400"
                    : metric.trend === "down"
                    ? "text-red-400"
                    : metric.trend === "warning"
                    ? "text-[oklch(0.75_0.18_165)]"
                    : "text-white/60"
                }`}
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default MetricsCards;
