// src/pages/PlanPage.tsx
import { useEffect, useState } from "react";
import { api } from "../api";
import type { PlanUsage } from "../api";

export default function PlanPage() {
    const [planUsage, setPlanUsage] = useState<PlanUsage | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        (async () => {
            setLoading(true);
            try {
                const res = await api.getPlanUsage();
                if (!mounted) return;
                setPlanUsage(res);
            } catch (e: any) {
                if (mounted) setError(e.message || "Failed to load plan usage");
            } finally {
                if (mounted) setLoading(false);
            }
        })();

        return () => {
            mounted = false;
        };
    }, []);

    return (
        <div className="flex flex-col gap-6">
            {error && (
                <div className="text-xs text-red-400 border border-red-500/40 rounded-lg px-3 py-2">
                    {error}
                </div>
            )}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-lg">Current Plan</h2>
                    {loading && <span className="text-xs text-slate-400">Loading...</span>}
                </div>

                {planUsage && (
                    <div className="text-sm text-slate-300">
                        <span className="font-semibold text-indigo-400">{planUsage.tier}</span> tier
                    </div>
                )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <UsageCard
                    label="Lead Usage"
                    value={
                        planUsage
                            ? `${planUsage.current_leads}/${planUsage.max_leads}`
                            : "-"
                    }
                    hint="Number of leads processed this month out of your plan's allocation"
                />
                <UsageCard
                    label="Conversation Minutes"
                    value={planUsage?.conversation_minutes ?? "-"}
                    hint="Total minutes of AI agent conversations this month"
                />
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3">
                <h2 className="font-semibold text-lg">Upgrade Plan</h2>
                <p className="text-xs text-slate-400">
                    Need more leads or conversation minutes? Upgrade your plan to access higher limits.
                </p>
                <button
                    className="self-start text-sm px-4 py-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
                >
                    Upgrade Plan
                </button>
            </div>
        </div>
    );
}

function UsageCard(props: {
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
