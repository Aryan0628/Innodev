import { LogOut as LogOutIcon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import { Input } from "@/components/ui/input";
import { useAuth0 } from "@auth0/auth0-react";

function DashboardHeader() {
  const { logout } = useAuth0();   // ← hook must be here
=======
import { Bell, Search, User, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

function DashboardHeader() {
  const { logout } = useAuth0();
  const navigate = useNavigate();
>>>>>>> fd893ca051d5fb29a6d5cacd96dbd1e429a3d52a

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
<<<<<<< HEAD
    });å
=======
    });
    navigate("/");
>>>>>>> fd893ca051d5fb29a6d5cacd96dbd1e429a3d52a
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
      <div className="relative w-64">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search policies..." className="pl-9 bg-background" />
      </div>

      <div className="flex items-center gap-4">
        <Button 
        className="gap-2"
          onClick={handleLogout}>
          <LogOutIcon className="h-4 w-4" />
          Logout
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="gap-2"
        >
          <LogOut className="h-4 w-4" />
          Log Out
        </Button>
      </div>
    </header>
  );
}

export default DashboardHeader;
