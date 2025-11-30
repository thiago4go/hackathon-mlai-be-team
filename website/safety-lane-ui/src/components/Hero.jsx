import React from 'react';


export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-safety-100 rounded-full blur-3xl opacity-50 mix-blend-multiply filter animate-pulse-slow"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl opacity-50 mix-blend-multiply filter"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    {/* Hero Content */}
                    <div className="space-y-8 animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-warning-400/10 border border-warning-400/20 text-warning-600 text-xs font-bold uppercase tracking-wide">
                            <span className="w-2 h-2 rounded-full bg-warning-500 animate-pulse"></span>
                            Pre-Release Access
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-display font-bold leading-[1.1] tracking-tight">
                            Don't just ban it. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-safety-600 to-safety-400 typing-effect">Teach it.</span>
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                            Australia is banning social media for under-16s. But prohibition without preparation creates digital tourists, not natives. Meet the world's first <strong>Flight Simulator for Social Media</strong>.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                className="bg-safety-600 hover:bg-safety-700 text-white px-8 py-4 rounded-full font-semibold transition-all shadow-xl shadow-safety-500/30 flex items-center justify-center gap-2 group"
                                onClick={() => document.getElementById('simulator').scrollIntoView({ behavior: 'smooth' })}
                            >
                                Try the Simulator
                                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </button>
                            <button
                                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-semibold transition-all flex items-center justify-center gap-2"
                                onClick={() => window.open('https://www.esafety.gov.au/industry/safety-by-design', '_blank')}
                            >
                                <span className="material-symbols-outlined text-safety-600">shield</span>
                                Safety by Design
                            </button>
                        </div>
                        <div className="pt-6 flex items-center gap-4 text-sm text-slate-500">
                            <div className="flex -space-x-2">
                                <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-bold">JD</div>
                                <div className="w-8 h-8 rounded-full bg-slate-300 border-2 border-white flex items-center justify-center text-xs font-bold">AS</div>
                                <div className="w-8 h-8 rounded-full bg-slate-400 border-2 border-white flex items-center justify-center text-xs font-bold">MK</div>
                            </div>
                            <p>Join <span className="font-bold text-slate-900">2,400+ parents</span> on the waitlist</p>
                        </div>
                    </div>

                    {/* Hero Visual */}
                    <div className="relative lg:h-[600px] w-full flex items-center justify-center">
                        {/* Main Floating Card */}
                        <div className="relative z-20 w-full max-w-md animate-float">
                            <div className="glass-panel rounded-3xl p-2 shadow-2xl overflow-hidden">
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-auto rounded-2xl object-cover"
                                    poster="https://placehold.co/600x400/e2e8f0/1e293b?text=Digital+License+Interface"
                                    aria-label="Digital Driver's License Interface demonstration"
                                >
                                    <source src="http://10.0.19.224:8000/storage/v1/object/public/assets/videos/ddl-commercial.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>

                                {/* Floating UI Elements */}
                                <div className="absolute -right-8 top-12 glass-panel p-4 rounded-2xl shadow-lg flex items-center gap-3 animate-pulse-slow max-w-[200px]">
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        <span className="material-symbols-outlined">check_circle</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-medium">Digital License</p>
                                        <p className="text-sm font-bold text-slate-900">Approved: L-Plate</p>
                                    </div>
                                </div>

                                <div className="absolute -left-6 bottom-20 glass-panel p-4 rounded-2xl shadow-lg flex items-center gap-3 max-w-[220px]">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <span className="material-symbols-outlined">timer</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-medium">Screen Time Earned</p>
                                        <p className="text-sm font-bold text-slate-900">+45 Mins (Room Cleaned)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
