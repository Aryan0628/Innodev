import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card.jsx";
import { Button } from "../../components/ui/button.jsx";
import { Switch } from "../../components/ui/switch.jsx";
import { Label } from "../../components/ui/label.jsx";
import { Input } from "../../components/ui/input.jsx";
import { mockSettings } from "../../services/mockData";
import { Download, Upload, Trash2, Save, User, Mail } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";

export default function SettingsPage() {
  const { user } = useAuth0();
  const [settings, setSettings] = useState(mockSettings);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Load settings from localStorage if available
    const saved = localStorage.getItem("dashboardSettings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const updateSetting = (category, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    localStorage.setItem("dashboardSettings", JSON.stringify(settings));
    setHasChanges(false);
    alert("Settings saved successfully!");
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "civora_settings.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const imported = JSON.parse(event.target.result);
            setSettings(imported);
            localStorage.setItem("dashboardSettings", JSON.stringify(imported));
            alert("Settings imported successfully!");
          } catch (error) {
            alert("Error importing settings. Please check the file format.");
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleClearHistory = () => {
    // This would clear history in a real app
    alert("Simulation history cleared!");
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-white/70">
            Configure your simulation preferences and account settings
          </p>
        </div>
        {hasChanges && (
          <Button
            onClick={handleSave}
            className="gap-2 bg-[oklch(0.75_0.18_165)] text-black hover:bg-[oklch(0.78_0.18_165)]"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        )}
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Account Settings */}
        <Card className="border-white/10 bg-[oklch(0.15_0_0)]/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Account Information</CardTitle>
            <CardDescription className="text-white/70">
              Your account details from OAuth
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              {user?.picture ? (
                <img
                  src={user.picture}
                  alt={user.name || "User"}
                  className="h-16 w-16 rounded-full border-2 border-[oklch(0.75_0.18_165)]/30"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[oklch(0.75_0.18_165)]/20 border-2 border-[oklch(0.75_0.18_165)]/30">
                  <User className="h-8 w-8 text-[oklch(0.75_0.18_165)]" />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <User className="h-4 w-4 text-white/60" />
                  <p className="text-white font-medium">{user?.name || "User"}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-white/60" />
                  <p className="text-sm text-white/70">{user?.email || "No email"}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Simulation Settings */}
        <Card className="border-white/10 bg-[oklch(0.15_0_0)]/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Simulation Settings</CardTitle>
            <CardDescription className="text-white/70">
              Configure how simulations run
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-save" className="text-white">
                  Auto-save Results
                </Label>
                <p className="text-sm text-white/60">
                  Automatically save simulation results after completion
                </p>
              </div>
              <Switch
                id="auto-save"
                checked={settings.simulation.autoSave}
                onCheckedChange={(checked) =>
                  updateSetting("simulation", "autoSave", checked)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="notifications" className="text-white">
                  Email Notifications
                </Label>
                <p className="text-sm text-white/60">
                  Receive email when simulations complete
                </p>
              </div>
              <Switch
                id="notifications"
                checked={settings.simulation.notifications}
                onCheckedChange={(checked) =>
                  updateSetting("simulation", "notifications", checked)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="detailed-logs" className="text-white">
                  Detailed Logging
                </Label>
                <p className="text-sm text-white/60">
                  Enable verbose logging for debugging
                </p>
              </div>
              <Switch
                id="detailed-logs"
                checked={settings.simulation.detailedLogs}
                onCheckedChange={(checked) =>
                  updateSetting("simulation", "detailedLogs", checked)
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Model Configuration */}
        <Card className="border-white/10 bg-[oklch(0.15_0_0)]/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Model Configuration</CardTitle>
            <CardDescription className="text-white/70">
              DeGroot model parameters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="convergence" className="text-white">
                  Fast Convergence Mode
                </Label>
                <p className="text-sm text-white/60">
                  Use optimized convergence algorithm
                </p>
              </div>
              <Switch
                id="convergence"
                checked={settings.model.fastConvergence}
                onCheckedChange={(checked) =>
                  updateSetting("model", "fastConvergence", checked)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="real-time" className="text-white">
                  Real-time Updates
                </Label>
                <p className="text-sm text-white/60">
                  Show live updates during simulation
                </p>
              </div>
              <Switch
                id="real-time"
                checked={settings.model.realTimeUpdates}
                onCheckedChange={(checked) =>
                  updateSetting("model", "realTimeUpdates", checked)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="population-size" className="text-white">
                Population Size
              </Label>
              <Input
                id="population-size"
                type="number"
                value={settings.model.populationSize}
                onChange={(e) =>
                  updateSetting(
                    "model",
                    "populationSize",
                    parseInt(e.target.value) || 0
                  )
                }
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="iterations" className="text-white">
                Iterations
              </Label>
              <Input
                id="iterations"
                type="number"
                value={settings.model.iterations}
                onChange={(e) =>
                  updateSetting(
                    "model",
                    "iterations",
                    parseInt(e.target.value) || 0
                  )
                }
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="border-white/10 bg-[oklch(0.15_0_0)]/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Data Management</CardTitle>
            <CardDescription className="text-white/70">
              Manage your simulation data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              onClick={handleExport}
              className="w-full justify-start bg-transparent border-white/10 text-white/80 hover:text-white hover:bg-white/10"
            >
              <Download className="mr-2 h-4 w-4" />
              Export All Data
            </Button>
            <Button
              variant="outline"
              onClick={handleImport}
              className="w-full justify-start bg-transparent border-white/10 text-white/80 hover:text-white hover:bg-white/10"
            >
              <Upload className="mr-2 h-4 w-4" />
              Import Configuration
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent border-red-500/20 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear Simulation History
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-[oklch(0.15_0_0)] border-white/10 text-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear Simulation History?</AlertDialogTitle>
                  <AlertDialogDescription className="text-white/70">
                    This action cannot be undone. This will permanently delete all
                    your simulation history.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="border-white/10 text-white/80 hover:text-white hover:bg-white/10">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleClearHistory}
                    className="bg-red-500 text-white hover:bg-red-600"
                  >
                    Clear History
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    </>
  );
}