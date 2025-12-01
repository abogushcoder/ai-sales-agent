// src/components/LeadAllocationCard.tsx
import { useEffect, useState } from "react";
import { api } from "../api";

const STEPS = [0, 25, 50, 75, 100];

export default function LeadAllocationCard() {
    const [value, setValue] = useState<number>(50);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const res = await api.getLeadAllocation();
                if (mounted) setValue(res.percentage);
            } catch (e: any) {
                if (mounted) setError(e.message || "Failed to load lead allocation");
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, []);

    function handleSliderChange(ev: React.ChangeEvent<HTMLInputElement>) {
        // Snap to allowed step
        const raw = Number(ev.target.value);
        const nearest = STEPS.reduce((prev, curr) =>
            Math.abs(curr - raw) < Math.abs(prev - raw) ? curr : prev
        );
        setValue(nearest);
    }

    async function save() {
        setSaving(true);
        setError(null);
        try {
            await api.setLeadAllocation(value);
        } catch (e: any) {
            setError(e.message || "Failed to save lead allocation");
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg">Lead allocation</h2>
                {loading && <span className="text-xs text-slate-400">Loading...</span>}
            </div>

            <p className="text-xs text-slate-400">
                Choose what percentage of new leads the AI agent should handle. The rest stay with your human team.
            </p>

            <div className="mt-2">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>0%</span>
                    <span>25%</span>
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                </div>
                <input
                    type="range"
                    min={0}
                    max={100}
                    step={25}
                    value={value}
                    onChange={handleSliderChange}
                    className="w-full accent-indigo-500"
                />
                <div className="mt-2 text-sm">
                    AI handles <span className="font-semibold">{value}%</span> of leads.
                </div>
            </div>

            <div className="flex items-center gap-2 mt-2">
                <button
                    onClick={save}
                    disabled={saving}
                    className="text-xs px-3 py-1 rounded-full bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50"
                >
                    {saving ? "Saving..." : "Save"}
                </button>
                {error && <div className="text-xs text-red-400">{error}</div>}
            </div>
        </div>
    );
}
