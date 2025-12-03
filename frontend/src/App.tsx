import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import PlanPage from "./pages/PlanPage";
import LandingPage from "./pages/LandingPage";

export default function App() {
    const location = useLocation();
    const isLandingPage = location.pathname === "/";

    if (isLandingPage) {
        return (
            <Routes>
                <Route path="/" element={<LandingPage />} />
            </Routes>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-brand-500/30">
            <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(14,165,233,0.4)]">
                            X
                        </div>
                        <div>
                            <div className="font-bold text-lg tracking-tight leading-none">X1 System</div>
                            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mt-0.5">
                                Intelligence Console
                            </div>
                        </div>
                    </div>
                    <nav className="flex gap-1 bg-slate-900/50 p-1 rounded-full border border-slate-800">
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                `px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${isActive
                                    ? "bg-brand-600 text-white shadow-lg shadow-brand-500/20"
                                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                                }`
                            }
                        >
                            Dashboard
                        </NavLink>
                        <NavLink
                            to="/analytics"
                            className={({ isActive }) =>
                                `px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${isActive
                                    ? "bg-brand-600 text-white shadow-lg shadow-brand-500/20"
                                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                                }`
                            }
                        >
                            Analytics
                        </NavLink>
                        <NavLink
                            to="/plan"
                            className={({ isActive }) =>
                                `px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${isActive
                                    ? "bg-brand-600 text-white shadow-lg shadow-brand-500/20"
                                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                                }`
                            }
                        >
                            Plan
                        </NavLink>
                    </nav>
                </div>
            </header>

            <main className="flex-1 relative">
                {/* Subtle background gradient for app pages */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-950 pointer-events-none -z-10" />

                <div className="max-w-7xl mx-auto px-6 py-8">
                    <Routes>
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/analytics" element={<AnalyticsPage />} />
                        <Route path="/plan" element={<PlanPage />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
}
