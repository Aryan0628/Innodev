import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import HeroSection from "./components/HeroSection.jsx";
import Dashboard from "./pages/dashbaord.jsx";
import TestDashboard from "./pages/TestDashboard.jsx";

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/test-dashboard" element={<TestDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
