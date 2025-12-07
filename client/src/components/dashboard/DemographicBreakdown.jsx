"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card.jsx";
import { Progress } from "../../components/ui/progress.jsx";

const demographics = [
  { category: "Urban Population", support: 72, opposition: 28 },
  { category: "Rural Population", support: 58, opposition: 42 },
  { category: "Youth (18-35)", support: 78, opposition: 22 },
  { category: "Middle Age (36-55)", support: 64, opposition: 36 },
  { category: "Senior (55+)", support: 52, opposition: 48 },
];

const incomeGroups = [
  { group: "High Income", support: 81 },
  { group: "Middle Income", support: 68 },
  { group: "Low Income", support: 54 },
];

function DemographicBreakdown() {
  return (
    <Card className="border-white/10 bg-[oklch(0.15_0_0)]/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-base text-white">Demographic Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {demographics.map((demo) => (
          <div key={demo.category}>
            <div className="mb-1 flex justify-between text-sm">
              <span className="text-white/70">{demo.category}</span>
              <span className="font-medium text-white">{demo.support}%</span>
            </div>
            <div className="flex h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="bg-green-500 transition-all"
                style={{ width: `${demo.support}%` }}
              />
              <div
                className="bg-red-500 transition-all"
                style={{ width: `${demo.opposition}%` }}
              />
            </div>
          </div>
        ))}

        <div className="border-t border-white/10 pt-4">
          <p className="mb-3 text-sm font-medium text-white">By Income Level</p>
          {incomeGroups.map((group) => (
            <div key={group.group} className="mb-2">
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-white/70">{group.group}</span>
                <span className="font-medium text-white">{group.support}%</span>
              </div>
              <Progress value={group.support} className="h-1.5" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default DemographicBreakdown;
