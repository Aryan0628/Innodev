"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const timelineData = [
  { round: "R1", support: 45, opposition: 40 },
  { round: "R2", support: 52, opposition: 38 },
  { round: "R3", support: 58, opposition: 32 },
  { round: "R4", support: 62, opposition: 28 },
  { round: "R5", support: 65, opposition: 26 },
  { round: "R6", support: 67, opposition: 25 },
];

function OpinionTimeline() {
  return (
    <Card className="border-white/10 bg-[oklch(0.15_0_0)]/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-base text-white">
          Opinion Evolution (DeGroot Model)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timelineData}>
              <XAxis dataKey="round" tick={{ fontSize: 12, fill: "rgba(255,255,255,0.7)" }} stroke="rgba(255,255,255,0.5)" />
              <YAxis
                tick={{ fontSize: 12, fill: "rgba(255,255,255,0.7)" }}
                stroke="rgba(255,255,255,0.5)"
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.15 0 0)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                labelStyle={{ color: "#fff" }}
              />
              <Line
                type="monotone"
                dataKey="support"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ fill: "#22c55e", r: 3 }}
                name="Support %"
              />
              <Line
                type="monotone"
                dataKey="opposition"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ fill: "#ef4444", r: 3 }}
                name="Opposition %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-2 text-xs text-white/60">
          Simulation converged after 6 rounds using bounded confidence model
        </p>
      </CardContent>
    </Card>
  );
}

export default OpinionTimeline;
