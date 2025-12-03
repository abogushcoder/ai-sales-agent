import { Link } from 'react-router-dom';
import MatrixBackground from '../components/MatrixBackground';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-brand-500/30 overflow-x-hidden">
            <MatrixBackground />

            {/* Navigation */}
            <nav className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-brand-600 flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(14,165,233,0.5)]">
                        X
                    </div>
                    <span className="font-bold text-xl tracking-tight text-slate-100">X1</span>
                </div>
                <div className="flex gap-6">
                    <Link to="/dashboard" className="text-sm font-medium text-slate-400 hover:text-brand-400 transition-colors">
                        Sign In
                    </Link>
                    <Link
                        to="/dashboard"
                        className="text-sm font-medium bg-slate-100 text-slate-950 px-4 py-2 rounded hover:bg-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                    >
                        Launch X1
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 flex flex-col items-center justify-center pt-20 pb-32 px-6 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-800 text-xs font-medium text-brand-400 mb-8 animate-fade-in-up">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                    </span>
                    System Online v2.0
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500 max-w-4xl mx-auto leading-tight">
                    The Future of <br />
                    <span className="text-white">Dealership Intelligence</span>
                </h1>

                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    X1 provides advanced AI sales agents that integrate seamlessly with your workflow.
                    Automate outreach, analyze performance, and close more deals.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <Link
                        to="/dashboard"
                        className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-brand-600 rounded-lg overflow-hidden transition-all hover:bg-brand-500 shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]"
                    >
                        <span className="relative z-10">Get Started Now</span>
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 ease-in-out skew-x-12"></div>
                    </Link>
                    <a
                        href="#features"
                        className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-slate-300 bg-slate-900/50 border border-slate-800 rounded-lg hover:bg-slate-800 hover:text-white transition-all"
                    >
                        View Features
                    </a>
                </div>

                {/* Abstract UI Preview / Graphic */}
                <div className="mt-20 relative w-full max-w-5xl mx-auto rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-2xl overflow-hidden aspect-[16/9] group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                    {/* Mock UI Elements */}
                    <div className="absolute top-0 left-0 right-0 h-10 bg-slate-900 border-b border-slate-800 flex items-center px-4 gap-2">
                        <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                        <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                        <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                    </div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                        <div className="text-brand-500 text-6xl font-mono opacity-20 font-bold tracking-widest">X1 SYSTEM</div>
                    </div>
                </div>
            </main>

            {/* Features Section */}
            <section id="features" className="py-24 bg-slate-950 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Advanced Capabilities</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Built for speed, precision, and scale. X1 empowers your team with tools that feel like they're from the future.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "AI-Powered Outreach",
                                description: "Automated calling and messaging agents that sound human and convert leads 24/7.",
                                icon: (
                                    <svg className="w-6 h-6 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Real-time Analytics",
                                description: "Deep insights into agent performance, call metrics, and conversion rates visualized instantly.",
                                icon: (
                                    <svg className="w-6 h-6 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Seamless Integration",
                                description: "Connects effortlessly with your existing CRM and dealership management systems.",
                                icon: (
                                    <svg className="w-6 h-6 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                )
                            }
                        ].map((feature, idx) => (
                            <div key={idx} className="p-8 rounded-2xl bg-slate-900/30 border border-slate-800 hover:border-brand-500/30 transition-colors group">
                                <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-6 group-hover:bg-brand-500/10 transition-colors">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-3 text-slate-100">{feature.title}</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-slate-900 bg-slate-950 relative z-10">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-xs text-slate-400 font-bold">
                            X
                        </div>
                        <span className="text-slate-500 font-semibold">X1 Systems</span>
                    </div>
                    <div className="flex gap-8 text-sm text-slate-500">
                        <a href="#" className="hover:text-slate-300 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-slate-300 transition-colors">Terms</a>
                        <a href="#" className="hover:text-slate-300 transition-colors">Contact</a>
                    </div>
                    <div className="text-sm text-slate-600">
                        © 2024 X1 Inc. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
