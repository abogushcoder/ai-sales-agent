// src/components/AgentStatusCard.tsx
import { useEffect, useState } from "react";
import { api } from "../api";

export default function AgentStatusCard() {
    const [running, setRunning] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        (async () => {
            setLoading(true);
            try {
                const res = await api.getAgentStatus();
                if (mounted) setRunning(res.running);
            } catch (e: any) {
                if (mounted) setError(e.message || "Failed to load status");
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, []);

    async function toggle() {
        if (running === null) return;
        setSaving(true);
        setError(null);
        try {
            const res = await api.setAgentStatus(!running);
            setRunning(res.running);
        } catch (e: any) {
            setError(e.message || "Failed to update status");
        } finally {
            setSaving(false);
        }
    }

    const indicatorColor = running ? "bg-emerald-400" : "bg-red-500";
    const indicatorText = running ? "Running" : "Stopped";

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg">Agent status</h2>
                {loading && <span className="text-xs text-slate-400">Loading...</span>}
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${indicatorColor}`} />
                    <span className="text-sm">
                        {running === null ? "Unknown" : indicatorText}
                    </span>
                </div>
                <button
                    onClick={toggle}
                    disabled={running === null || saving}
                    className={`text-xs px-3 py-1 rounded-full border ${running
                            ? "border-red-400 text-red-200 hover:bg-red-500/10"
                            : "border-emerald-400 text-emerald-200 hover:bg-emerald-500/10"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    {saving ? "Saving..." : running ? "Stop agent" : "Start agent"}
                </button>
            </div>

            {error && <div className="text-xs text-red-400 mt-1">{error}</div>}

            <p className="text-xs text-slate-400">
                When running, the agent automatically answers calls and works assigned leads.
            </p>
        </div>
    );
}
