

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Users, UserCheck, UserX, TrendingUp } from "lucide-react";

const populationData = {
  total: 250000,
  active: 198500,
  inactive: 51500,
  growth: 12.5,
  demographics: [
    { category: "Urban", count: 145000, percentage: 58 },
    { category: "Rural", count: 105000, percentage: 42 },
  ],
  ageGroups: [
    { group: "18-25", count: 52500, percentage: 21 },
    { group: "26-35", count: 70000, percentage: 28 },
    { group: "36-45", count: 57500, percentage: 23 },
    { group: "46-55", count: 42500, percentage: 17 },
    { group: "55+", count: 27500, percentage: 11 },
  ],
  incomeGroups: [
    { group: "Low Income", count: 75000, percentage: 30 },
    { group: "Middle Income", count: 125000, percentage: 50 },
    { group: "High Income", count: 50000, percentage: 20 },
  ],
};

export default function PopulationPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Population Analytics</h1>
        <p className="text-white/70">
          Synthetic citizen distribution and demographics
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card className="border-white/10 bg-[oklch(0.15_0_0)]/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-[oklch(0.75_0.18_165)]/10 border border-[oklch(0.75_0.18_165)]/20 p-3">
                <Users className="h-5 w-5 text-[oklch(0.75_0.18_165)]" />
              </div>
              <div>
                <p className="text-sm text-white/70">
                  Total Population
                </p>
                <p className="text-2xl font-bold text-white">
                  {populationData.total.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-[oklch(0.15_0_0)]/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-3">
                <UserCheck className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-white/70">Active Citizens</p>
                <p className="text-2xl font-bold text-white">
                  {populationData.active.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-[oklch(0.15_0_0)]/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3">
                <UserX className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <p className="text-sm text-white/70">
                  Inactive Citizens
                </p>
                <p className="text-2xl font-bold text-white">
                  {populationData.inactive.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-[oklch(0.15_0_0)]/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-3">
                <TrendingUp className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-white/70">Growth Rate</p>
                <p className="text-2xl font-bold text-white">+{populationData.growth}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-white/10 bg-[oklch(0.15_0_0)]/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Demographics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {populationData.demographics.map((item) => (
              <div key={item.category}>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="text-white/80">{item.category}</span>
                  <span className="text-white/60">
                    {item.count.toLocaleString()} ({item.percentage}%)
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-[oklch(0.75_0.18_165)]"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-[oklch(0.15_0_0)]/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Age Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {populationData.ageGroups.map((item) => (
              <div key={item.group}>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="text-white/80">{item.group}</span>
                  <span className="text-white/60">
                    {item.percentage}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-[oklch(0.75_0.18_165)]"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-[oklch(0.15_0_0)]/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Income Groups</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {populationData.incomeGroups.map((item) => (
              <div key={item.group}>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="text-white/80">{item.group}</span>
                  <span className="text-white/60">
                    {item.count.toLocaleString()} ({item.percentage}%)
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-[oklch(0.75_0.18_165)]"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
