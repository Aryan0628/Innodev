import { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
  Clock,
  PlayCircle,
  CheckCircle,
  XCircle,
  Filter,
  Search,
  Download,
} from "lucide-react";
import { mockHistory } from "../../services/mockData";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

function HistoryPage() {
  const [history] = useState(mockHistory);
  const [filteredHistory, setFilteredHistory] = useState(history);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterHistory(query, statusFilter);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    filterHistory(searchQuery, status);
  };

  const filterHistory = (query, status) => {
    let filtered = history;

    if (query) {
      filtered = filtered.filter((item) =>
        item.policy.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (status !== "all") {
      filtered = filtered.filter((item) => item.status === status);
    }

    setFilteredHistory(filtered);
  };

  const handleExportHistory = () => {
    const csvContent =
      "Policy,Date,Duration,Status,Result\n" +
      filteredHistory
        .map(
          (item) =>
            `"${item.policy}","${item.date}","${item.duration}","${item.status}","${item.result}"`
        )
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `simulation_history_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold text-white">Simulation History</h1>
            <p className="text-white/70">
              Past policy simulations and their outcomes
            </p>
          </div>
          <Button
            onClick={handleExportHistory}
            variant="outline"
            className="gap-2 border-white/10 text-white/80 hover:text-white hover:bg-white/10"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
          <Input
            placeholder="Search policies..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-[oklch(0.75_0.18_165)]/50"
          />
        </div>
        <Select value={statusFilter} onValueChange={handleStatusFilter}>
          <SelectTrigger className="w-48 bg-white/5 border-white/10 text-white">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-[oklch(0.15_0_0)] border-white/10">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredHistory.length === 0 ? (
        <Card className="border-white/10 bg-[oklch(0.15_0_0)]/50">
          <CardContent className="py-12 text-center">
            <p className="text-white/60">No simulations found matching your criteria.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredHistory.map((item) => (
            <Card
              key={item.id}
              className="border-white/10 bg-[oklch(0.15_0_0)]/50 backdrop-blur-sm hover:bg-[oklch(0.18_0_0)]/70 transition-colors"
            >
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`rounded-full p-2 ${
                      item.status === "success"
                        ? "bg-green-500/10 border border-green-500/20"
                        : "bg-red-500/10 border border-red-500/20"
                    }`}
                  >
                    {item.status === "success" ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{item.policy}</h3>
                    <div className="flex items-center gap-4 text-sm text-white/70">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {item.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <PlayCircle className="h-3 w-3" />
                        {item.duration}
                      </span>
                      {item.details && (
                        <>
                          <span>• {item.details.population}</span>
                          <span>• {item.details.states} states</span>
                        </>
                      )}
                    </div>
                    {item.error && (
                      <p className="text-xs text-red-400 mt-1">{item.error}</p>
                    )}
                  </div>
                </div>
                <div
                  className={`text-sm font-medium ${
                    item.status === "success"
                      ? "text-[oklch(0.75_0.18_165)]"
                      : "text-red-400"
                  }`}
                >
                  {item.result}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

export default HistoryPage;
