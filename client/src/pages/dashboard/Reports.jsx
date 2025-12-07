
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { FileText, Download, Eye, Calendar, Plus, X } from "lucide-react";
import { mockReports, downloadReport } from "../../services/mockData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

export default function ReportsPage() {
  const [reports] = useState(mockReports);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleView = (report) => {
    setSelectedReport(report);
  };

  const handleDownload = (report) => {
    downloadReport(report);
  };

  const handleGenerateReport = () => {
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      alert("Report generation started! It will appear in your reports list when complete.");
    }, 1500);
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Reports</h1>
          <p className="text-white/70">
            Generated simulation reports and analysis documents
          </p>
        </div>
        <Button
          onClick={handleGenerateReport}
          disabled={isGenerating}
          className="gap-2 bg-[oklch(0.75_0.18_165)] text-black hover:bg-[oklch(0.78_0.18_165)]"
        >
          {isGenerating ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />
              Generating...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              Generate New Report
            </>
          )}
        </Button>
      </div>

      <div className="grid gap-4">
        {reports.map((report) => (
          <Card
            key={report.id}
            className="border-white/10 bg-[oklch(0.15_0_0)]/50 backdrop-blur-sm hover:bg-[oklch(0.18_0_0)]/70 transition-colors"
          >
            <CardContent className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-[oklch(0.75_0.18_165)]/20 p-3">
                  <FileText className="h-5 w-5 text-[oklch(0.75_0.18_165)]" />
                </div>
                <div>
                  <h3 className="font-medium text-white">{report.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-white/70">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {report.date}
                    </span>
                    <span>{report.pages} pages</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        report.status === "completed"
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                      }`}
                    >
                      {report.status === "completed"
                        ? "Completed"
                        : "In Progress"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleView(report)}
                  className="gap-2 bg-transparent border-white/10 text-white/80 hover:text-white hover:bg-white/10"
                >
                  <Eye className="h-4 w-4" />
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(report)}
                  disabled={report.status === "in-progress"}
                  className="gap-2 bg-transparent border-white/10 text-white/80 hover:text-white hover:bg-white/10 disabled:opacity-50"
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Report Dialog */}
      {selectedReport && (
        <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
          <DialogContent className="max-w-3xl bg-[oklch(0.15_0_0)] border-white/10 text-white">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedReport.name}</DialogTitle>
              <DialogDescription className="text-white/70">
                Generated on {selectedReport.date} • {selectedReport.pages} pages
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto">
              {selectedReport.content ? (
                <>
                  <div className="rounded-lg bg-white/5 p-4 border border-white/10">
                    <h4 className="font-semibold mb-2 text-[oklch(0.75_0.18_165)]">Summary</h4>
                    <p className="text-sm text-white/80">{selectedReport.content.summary}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-lg bg-green-500/10 p-4 border border-green-500/20">
                      <p className="text-xs text-white/60 mb-1">Support</p>
                      <p className="text-2xl font-bold text-green-400">
                        {selectedReport.content.support}%
                      </p>
                    </div>
                    <div className="rounded-lg bg-red-500/10 p-4 border border-red-500/20">
                      <p className="text-xs text-white/60 mb-1">Opposition</p>
                      <p className="text-2xl font-bold text-red-400">
                        {selectedReport.content.opposition}%
                      </p>
                    </div>
                    <div className="rounded-lg bg-gray-500/10 p-4 border border-gray-500/20">
                      <p className="text-xs text-white/60 mb-1">Neutral</p>
                      <p className="text-2xl font-bold text-gray-400">
                        {selectedReport.content.neutral}%
                      </p>
                    </div>
                  </div>
                  <div className="rounded-lg bg-white/5 p-4 border border-white/10">
                    <h4 className="font-semibold mb-3 text-[oklch(0.75_0.18_165)]">Key Findings</h4>
                    <ul className="space-y-2">
                      {selectedReport.content.keyFindings?.map((finding, idx) => (
                        <li key={idx} className="text-sm text-white/80 flex items-start gap-2">
                          <span className="text-[oklch(0.75_0.18_165)] mt-1">•</span>
                          <span>{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-white/60">Report is still being generated...</p>
                  <p className="text-sm text-white/40 mt-2">
                    Progress: {selectedReport.progress || 0}%
                  </p>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setSelectedReport(null)}
                className="border-white/10 text-white/80 hover:text-white hover:bg-white/10"
              >
                Close
              </Button>
              {selectedReport.content && (
                <Button
                  onClick={() => {
                    handleDownload(selectedReport);
                    setSelectedReport(null);
                  }}
                  className="gap-2 bg-[oklch(0.75_0.18_165)] text-black hover:bg-[oklch(0.78_0.18_165)]"
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
