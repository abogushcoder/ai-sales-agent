// src/pages/AnalyticsPage.tsx
import { useEffect, useState } from "react";
import { api, AnalyticsSummary, NurtureLead } from "../api";

export default function AnalyticsPage() {
    const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
    const [leads, setLeads] = useState<NurtureLead[]>([]);
    const [loading, setLoading] = useState(true);
    const [removingIds, setRemovingIds] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        (async () => {
            setLoading(true);
            try {
                const [summaryRes, leadsRes] = await Promise.all([
                    api.getAnalyticsSummary(),
                    api.getNurtureLeads(),
                ]);
                if (!mounted) return;
                setSummary(summaryRes);
                setLeads(leadsRes);
            } catch (e: any) {
                if (mounted) setError(e.message || "Failed to load analytics");
            } finally {
                if (mounted) setLoading(false);
            }
        })();

        return () => {
            mounted = false;
        };
    }, []);

    async function removeLead(id: string) {
        setRemovingIds((prev) => [...prev, id]);
        setError(null);
        try {
            await api.removeNurtureLead(id);
            setLeads((prev) => prev.filter((l) => l.id != id));
            setSummary((prev) =>
                prev ? { ...prev, nurture_count: prev.nurture_count - 1 } : prev
            );
        } catch (e: any) {
            setError(e.message || "Failed to remove from nurture");
        } finally {
            setRemovingIds((prev) => prev.filter((x) => x != id));
        }
    }

    return (
        <div className="flex flex-col gap-6">
            {error && (
                <div className="text-xs text-red-400 border border-red-500/40 rounded-lg px-3 py-2">
                    {error}
                </div>
            )}

            <div className="grid gap-4 md:grid-cols-3">
                <AnalyticsCard
                    label="Total calls"
                    value={summary?.total_calls ?? "-"}
                    hint="Calls handled by the AI agent in the selected period"
                />
                <AnalyticsCard
                    label="Successful calls"
                    value={summary?.successful_calls ?? "-"}
                    hint="Calls that reached the lead and completed the main goal"
                />
                <AnalyticsCard
                    label="In nurture"
                    value={summary?.nurture_count ?? "-"}
                    hint="Leads currently in the nurture sequence"
                />
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-semibold text-lg">Nurture cycle</h2>
                    {loading && (
                        <span className="text-xs text-slate-400">Loading...</span>
                    )}
                </div>
                <p className="text-xs text-slate-400 mb-4">
                    These leads are in the ongoing follow up sequence. You can manually remove a lead at any time.
                </p>

                {leads.length === 0 && !loading ? (
                    <div className="text-sm text-slate-400">No leads in nurture right now.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-xs text-slate-400 border-b border-slate-800">
                                    <th className="py-2 pr-4">Name</th>
                                    <th className="py-2 pr-4">Phone</th>
                                    <th className="py-2 pr-4">Stage</th>
                                    <th className="py-2 pr-4">Last contacted</th>
                                    <th className="py-2 pr-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leads.map((lead) => {
                                    const removing = removingIds.includes(lead.id);
                                    return (
                                        <tr
                                            key={lead.id}
                                            className="border-b border-slate-850 last:border-none"
                                        >
                                            <td className="py-2 pr-4">{lead.name}</td>
                                            <td className="py-2 pr-4 text-slate-300">
                                                {lead.phone}
                                            </td>
                                            <td className="py-2 pr-4 text-slate-300">
                                                {lead.stage}
                                            </td>
                                            <td className="py-2 pr-4 text-slate-300">
                                                {lead.last_contacted}
                                            </td>
                                            <td className="py-2 pr-4 text-right">
                                                <button
                                                    onClick={() => removeLead(lead.id)}
                                                    disabled={removing}
                                                    className="text-xs px-3 py-1 rounded-full border border-amber-400 text-amber-200 hover:bg-amber-500/10 disabled:opacity-50"
                                                >
                                                    {removing ? "Removing..." : "Remove from nurture"}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

function AnalyticsCard(props: {
    label: string;
    value: number | string;
    hint?: string;
}) {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-1">
            <div className="text-xs text-slate-400">{props.label}</div>
            <div className="text-2xl font-semibold">{props.value}</div>
            {props.hint && (
                <div className="text-[11px] text-slate-500 mt-1">{props.hint}</div>
            )}
        </div>
    );
}
