// src/pages/DashboardPage.tsx

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-100">Dashboard</h1>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium transition-colors border border-slate-700">
                        Filter View
                    </button>
                    <button className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-brand-500/20">
                        New Campaign
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Active Agents", value: "12", change: "+2", trend: "up" },
                    { label: "Calls Made", value: "1,432", change: "+15%", trend: "up" },
                    { label: "Conversion Rate", value: "24.8%", change: "+1.2%", trend: "up" },
                ].map((stat, i) => (
                    <div key={i} className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
                        <div className="text-sm text-slate-400 mb-2">{stat.label}</div>
                        <div className="flex items-end justify-between">
                            <div className="text-3xl font-bold text-slate-100">{stat.value}</div>
                            <div className="text-sm font-medium text-emerald-400 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                </svg>
                                {stat.change}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm min-h-[300px]">
                    <h2 className="text-lg font-semibold text-slate-100 mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-800">
                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-brand-400">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-slate-200">Call completed with Lead #492{i}</div>
                                    <div className="text-xs text-slate-500">2 minutes ago • Duration: 4m 12s</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm min-h-[300px]">
                    <h2 className="text-lg font-semibold text-slate-100 mb-4">Agent Performance</h2>
                    <div className="space-y-6">
                        {["Sales Bot Alpha", "Follow-up Agent", "Appointment Setter"].map((agent, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-slate-300">{agent}</span>
                                    <span className="text-slate-400">{(85 - i * 5)}% Success</span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-brand-500 rounded-full"
                                        style={{ width: `${85 - i * 5}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
