// src/App.tsx
import { NavLink, Route, Routes, Navigate } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import PlanPage from "./pages/PlanPage";

export default function App() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
            <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur">
                <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-sm font-bold">
                            A
                        </div>
                        <div>
                            <div className="font-semibold">Autocall AI</div>
                            <div className="text-xs text-slate-400">
                                Sales agents for modern dealerships
                            </div>
                        </div>
                    </div>
                    <nav className="flex gap-4 text-sm">
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                `px-3 py-1 rounded-full ${isActive ? "bg-indigo-500 text-white" : "text-slate-300 hover:bg-slate-800"
                                }`
                            }
                        >
                            Dashboard
                        </NavLink>
                        <NavLink
                            to="/analytics"
                            className={({ isActive }) =>
                                `px-3 py-1 rounded-full ${isActive ? "bg-indigo-500 text-white" : "text-slate-300 hover:bg-slate-800"
                                }`
                            }
                        >
                            Analytics
                        </NavLink>
                        <NavLink
                            to="/plan"
                            className={({ isActive }) =>
                                `px-3 py-1 rounded-full ${isActive ? "bg-indigo-500 text-white" : "text-slate-300 hover:bg-slate-800"
                                }`
                            }
                        >
                            Plan
                        </NavLink>
                    </nav>
                </div>
            </header>

            <main className="flex-1">
                <div className="max-w-6xl mx-auto px-4 py-6">
                    <Routes>
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/analytics" element={<AnalyticsPage />} />
                        <Route path="/plan" element={<PlanPage />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
}
