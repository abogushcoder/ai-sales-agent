import { useState } from 'react';

// Mock data for the chart
const data = [
    { name: 'Mon', calls: 40, conversions: 24 },
    { name: 'Tue', calls: 30, conversions: 13 },
    { name: 'Wed', calls: 20, conversions: 98 },
    { name: 'Thu', calls: 27, conversions: 39 },
    { name: 'Fri', calls: 18, conversions: 48 },
    { name: 'Sat', calls: 23, conversions: 38 },
    { name: 'Sun', calls: 34, conversions: 43 },
];

export default function AnalyticsPage() {
    const [timeRange, setTimeRange] = useState('7d');

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-100">Analytics Overview</h1>
                    <p className="text-slate-400 text-sm mt-1">Track your AI agents' performance metrics</p>
                </div>

                <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 self-start">
                    {['24h', '7d', '30d', '90d'].map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${timeRange === range
                                    ? 'bg-slate-800 text-white shadow-sm'
                                    : 'text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            {range}
                        </button>
                    ))}
                </div>
            </div>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { title: "Total Calls", value: "2,543", change: "+12.5%", trend: "up" },
                    { title: "Avg. Duration", value: "3m 42s", change: "-2.1%", trend: "down" },
                    { title: "Appointments", value: "142", change: "+8.4%", trend: "up" },
                    { title: "Cost per Lead", value: "$4.20", change: "-5.3%", trend: "good" },
                ].map((metric, idx) => (
                    <div key={idx} className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl backdrop-blur-sm">
                        <h3 className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">{metric.title}</h3>
                        <div className="flex items-end justify-between">
                            <span className="text-2xl font-bold text-white">{metric.value}</span>
                            <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${metric.trend === 'up' || metric.trend === 'good'
                                    ? 'bg-emerald-500/10 text-emerald-400'
                                    : 'bg-rose-500/10 text-rose-400'
                                }`}>
                                {metric.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Chart Area */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-slate-100">Call Volume vs. Conversions</h2>
                    <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-brand-500"></span>
                            <span className="text-slate-400">Calls</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                            <span className="text-slate-400">Conversions</span>
                        </div>
                    </div>
                </div>

                {/* Custom CSS Chart implementation */}
                <div className="h-64 w-full flex items-end justify-between gap-2 pt-8">
                    {data.map((item, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                            {/* Tooltip */}
                            <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-xs text-white p-2 rounded pointer-events-none whitespace-nowrap z-10 border border-slate-700">
                                {item.name}: {item.calls} calls, {item.conversions} conv.
                            </div>

                            <div className="w-full max-w-[40px] flex items-end gap-1 h-full">
                                <div
                                    className="w-1/2 bg-brand-500/80 hover:bg-brand-500 transition-colors rounded-t-sm"
                                    style={{ height: `${item.calls}%` }}
                                ></div>
                                <div
                                    className="w-1/2 bg-emerald-500/80 hover:bg-emerald-500 transition-colors rounded-t-sm"
                                    style={{ height: `${item.conversions}%` }}
                                ></div>
                            </div>
                            <span className="text-xs text-slate-500 font-medium">{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Logs Table */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden backdrop-blur-sm">
                <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-slate-100">Recent Call Logs</h2>
                    <button className="text-xs text-brand-400 hover:text-brand-300 font-medium">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-900/80 text-slate-400 uppercase text-xs font-medium">
                            <tr>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">Agent</th>
                                <th className="px-6 py-3">Duration</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {[1, 2, 3, 4, 5].map((row) => (
                                <tr key={row} className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4 font-mono text-slate-500">#C-849{row}</td>
                                    <td className="px-6 py-4 text-slate-200">Sales Bot Alpha</td>
                                    <td className="px-6 py-4 text-slate-400">2m 14s</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${row % 2 === 0
                                                ? 'bg-emerald-500/10 text-emerald-400'
                                                : 'bg-amber-500/10 text-amber-400'
                                            }`}>
                                            {row % 2 === 0 ? 'Converted' : 'Follow-up'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-400">Oct 24, 2024</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
