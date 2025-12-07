import { Button } from "@/components/ui/button";
import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";

function DashboardHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
      <div className="relative w-64">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search policies..."
          className="pl-9 bg-background"
        />
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-accent" />
        </Button>

        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}

export default DashboardHeader;
