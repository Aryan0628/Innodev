import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import LandingPage from "./pages/Landing";
import Dashboard from "./pages/dashbaord.jsx";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/dashboard"
        element={
          <div className="min-h-screen bg-black text-white">
            <Navbar />
            <Dashboard />
          </div>
        }
      />
    </Routes>
  );
}

export default App;
