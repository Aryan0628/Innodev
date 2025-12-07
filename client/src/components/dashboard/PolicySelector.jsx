"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Play, RefreshCw } from "lucide-react";

const policies = [
  { id: "gst", name: "GST Implementation" },
  { id: "farm", name: "Farm Bills 2020" },
  { id: "caa", name: "Citizenship Amendment Act" },
  { id: "reservation", name: "Reservation Policy Changes" },
  { id: "digital", name: "Digital India Initiative" },
];

function PolicySelector() {
  const [selectedPolicy, setSelectedPolicy] = useState("digital");
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 2000);
  };

  return (
    <Card className="mb-6 p-4 border-white/10 bg-[oklch(0.15_0_0)]/50 backdrop-blur-sm">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[200px]">
          <label className="mb-2 block text-sm font-medium text-white">
            Select Policy
          </label>
          <Select value={selectedPolicy} onValueChange={setSelectedPolicy}>
            <SelectTrigger className="bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="Choose a policy" />
            </SelectTrigger>
            <SelectContent className="bg-[oklch(0.15_0_0)] border-white/10">
              {policies.map((policy) => (
                <SelectItem key={policy.id} value={policy.id} className="text-white">
                  {policy.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 pt-6">
          <Button
            onClick={handleSimulate}
            disabled={isSimulating}
            className="gap-2 bg-[oklch(0.75_0.18_165)] text-black hover:bg-[oklch(0.78_0.18_165)]"
          >
            {isSimulating ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Simulating...
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Run Simulation
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default PolicySelector;
