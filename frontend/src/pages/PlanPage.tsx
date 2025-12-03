import React, { useState } from 'react';

export default function PlanPage() {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = (e: React.FormEvent) => {
        e.preventDefault();
        setIsGenerating(true);
        // Simulate API call
        setTimeout(() => setIsGenerating(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-slate-100">Agent Configuration</h1>
                <p className="text-slate-400">Define your agent's behavior and objectives using natural language.</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-1 backdrop-blur-sm shadow-2xl">
                <form onSubmit={handleGenerate} className="bg-slate-950/50 rounded-lg p-6 space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="prompt" className="block text-sm font-medium text-slate-300">
                            Agent Instructions
                        </label>
                        <div className="relative">
                            <textarea
                                id="prompt"
                                rows={6}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none resize-none transition-all"
                                placeholder="e.g. You are a helpful sales assistant for a Toyota dealership. Your goal is to schedule test drives for the new Camry..."
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                            />
                            <div className="absolute bottom-3 right-3 text-xs text-slate-500">
                                {prompt.length} chars
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <div className="flex gap-2">
                            {['Polite', 'Aggressive', 'Consultative'].map((tone) => (
                                <button
                                    key={tone}
                                    type="button"
                                    className="px-3 py-1.5 text-xs font-medium bg-slate-800 text-slate-300 rounded-md hover:bg-slate-700 border border-slate-700 transition-colors"
                                >
                                    {tone}
                                </button>
                            ))}
                        </div>
                        <button
                            type="submit"
                            disabled={!prompt || isGenerating}
                            className={`px-6 py-2.5 rounded-lg font-medium text-white transition-all flex items-center gap-2 ${!prompt || isGenerating
                                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                    : 'bg-brand-600 hover:bg-brand-500 shadow-lg shadow-brand-500/20'
                                }`}
                        >
                            {isGenerating ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <span>Generate Plan</span>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-slate-900/30 border border-slate-800 border-dashed flex flex-col items-center justify-center text-center min-h-[200px] group hover:bg-slate-900/50 transition-colors cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 text-slate-400 group-hover:text-brand-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                    </div>
                    <h3 className="text-slate-200 font-medium">Test Voice Agent</h3>
                    <p className="text-sm text-slate-500 mt-1">Simulate a call with your configured agent</p>
                </div>

                <div className="p-6 rounded-xl bg-slate-900/30 border border-slate-800 border-dashed flex flex-col items-center justify-center text-center min-h-[200px] group hover:bg-slate-900/50 transition-colors cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 text-slate-400 group-hover:text-brand-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h3 className="text-slate-200 font-medium">View Script</h3>
                    <p className="text-sm text-slate-500 mt-1">Review and edit the generated conversation flow</p>
                </div>
            </div>
        </div>
    );
}
