import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card.jsx";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts";
import { mockAnalytics } from "../../services/mockData";

const trendData = mockAnalytics.trendData;
const policyComparison = mockAnalytics.policyComparison;
const sentimentData = mockAnalytics.sentimentData;

export default function AnalyticsPage() {
  return (
     <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-white/70">
          Detailed analysis of policy simulations and citizen responses
        </p>
      </div>
      {/* ... Rest of the JSX ... */}
      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        <Card className="border-white/10 bg-[oklch(0.15_0_0)]/50 backdrop-blur-sm">
          <CardHeader><CardTitle className="text-white">Support Trends Over Time</CardTitle></CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.7)" }} />
                  <YAxis stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.7)" }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "oklch(0.15 0 0)", 
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      color: "#fff"
                    }} 
                    labelStyle={{ color: "#fff" }} 
                  />
                  <Legend wrapperStyle={{ color: "rgba(255,255,255,0.7)" }} />
                  <Line type="monotone" dataKey="support" stroke="#22c55e" strokeWidth={2} name="Support" />
                  <Line type="monotone" dataKey="opposition" stroke="#ef4444" strokeWidth={2} name="Opposition" />
                  <Line type="monotone" dataKey="neutral" stroke="#6b7280" strokeWidth={2} name="Neutral" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-[oklch(0.15_0_0)]/50 backdrop-blur-sm">
          <CardHeader><CardTitle className="text-white">Policy Comparison</CardTitle></CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={policyComparison} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis type="number" stroke="rgba(255,255,255,0.5)" tick={{ fill: "rgba(255,255,255,0.7)" }} />
                  <YAxis dataKey="policy" type="category" stroke="rgba(255,255,255,0.5)" width={100} tick={{ fill: "rgba(255,255,255,0.7)" }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "oklch(0.15 0 0)", 
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      color: "#fff"
                    }} 
                    labelStyle={{ color: "#fff" }} 
                  />
                  <Bar dataKey="support" fill="#22c55e" radius={[0, 4, 4, 0]} name="Support %" />
                  <Bar dataKey="opposition" fill="#ef4444" radius={[0, 4, 4, 0]} name="Opposition %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-white/10 bg-[oklch(0.15_0_0)]/50 backdrop-blur-sm">
            <CardHeader><CardTitle className="text-white">Overall Sentiment</CardTitle></CardHeader>
            <CardContent>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={sentimentData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                {sentimentData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: "oklch(0.15 0 0)", 
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: "8px",
                                color: "#fff"
                              }} 
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                 <div className="flex justify-center gap-4 mt-4">
                  {sentimentData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2 text-sm text-white/80">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span>{item.name}: {item.value}%</span>
                    </div>
                  ))}
                </div>
            </CardContent>
        </Card>
        <Card className="lg:col-span-2 border-white/10 bg-[oklch(0.15_0_0)]/50 backdrop-blur-sm">
            <CardHeader><CardTitle className="text-white">Key Insights</CardTitle></CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="rounded-lg bg-[oklch(0.75_0.18_165)]/10 border border-[oklch(0.75_0.18_165)]/20 p-4">
                        <h4 className="font-medium text-[oklch(0.75_0.18_165)] mb-1">High Support Detected</h4>
                        <p className="text-sm text-white/70">Healthcare policy shows 78% support across all demographics. Consider accelerating implementation.</p>
                    </div>
                    <div className="rounded-lg bg-yellow-500/10 border border-yellow-500/20 p-4">
                        <h4 className="font-medium text-yellow-400 mb-1">Mixed Reactions</h4>
                        <p className="text-sm text-white/70">Tax Reform policy has polarized opinions. Urban areas show 60% support vs 35% in rural regions.</p>
                    </div>
                    <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-4">
                        <h4 className="font-medium text-blue-400 mb-1">Trending Upward</h4>
                        <p className="text-sm text-white/70">Overall policy support has increased by 20% over the past 6 months across all simulations.</p>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
     </>
  );
}