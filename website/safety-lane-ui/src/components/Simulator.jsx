import React, { useState } from 'react';
import clsx from 'clsx';

const LearnerMode = () => (
    <div className="flex flex-col h-full bg-slate-50">
        <header className="bg-white p-4 flex items-center justify-between border-b border-slate-100 sticky top-0 z-10">
            <span className="font-bold text-lg">My Feed</span>
            <div className="bg-warning-100 text-warning-700 px-2 py-1 rounded text-xs font-bold">L-PLATE</div>
        </header>
        <div className="p-4 space-y-4">
            {/* User Post */}
            <div className="bg-white rounded-2xl shadow-sm p-3 border border-slate-100">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                    <span className="text-sm font-bold">Me</span>
                    <span className="text-xs text-slate-400">2m ago</span>
                </div>
                <img src="https://placehold.co/600x800/e2e8f0/1e293b?text=Clean+Bedroom" className="w-full h-48 object-cover rounded-xl mb-3" alt="Clean Bedroom" />
                <div className="flex items-center gap-2 bg-green-50 p-2 rounded-lg">
                    <span className="material-symbols-outlined text-green-600">check_circle</span>
                    <span className="text-xs text-green-700 font-bold">Chore Verified: Clean Room</span>
                </div>
            </div>
            {/* AI Response */}
            <div className="flex gap-3 animate-pulse">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                    <span className="material-symbols-outlined text-sm">smart_toy</span>
                </div>
                <div className="bg-purple-50 p-3 rounded-2xl rounded-tl-none text-sm text-purple-900 max-w-[80%]">
                    <span className="font-bold block mb-1">Hype-Man AI</span>
                    Great job! That's +50 XP and 30 mins of screen time banked! 🌟
                </div>
            </div>
        </div>
    </div>
);

const P1Mode = () => (
    <div className="flex flex-col h-full bg-slate-50">
        <header className="bg-white p-4 flex items-center justify-between border-b border-slate-100 sticky top-0 z-10">
            <span className="font-bold text-lg">My Feed</span>
            <div className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">P1-PLATE</div>
        </header>
        <div className="p-4 space-y-4">
            <div className="bg-white rounded-2xl shadow-sm p-4 border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                    <span className="text-sm font-bold">Me</span>
                </div>
                <p className="text-sm text-slate-800 mb-4">Just finished my art project! 🎨</p>

                {/* Simulation Interaction */}
                <div className="border-t border-slate-100 pt-3">
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                            <span className="material-symbols-outlined text-sm">person</span>
                        </div>
                        <div>
                            <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none text-sm text-gray-800">
                                <span className="font-bold block mb-1 text-xs text-gray-500">User_99 (AI Tester)</span>
                                It looks weird. Why did you use that color?
                            </div>
                            <div className="flex gap-2 mt-2">
                                <button onClick={() => alert('Correct! Ignoring mild negativity is a key skill. +20 Resilience XP')} className="text-xs bg-white border border-slate-200 px-2 py-1 rounded hover:bg-slate-50">Ignore</button>
                                <button onClick={() => alert('Try again! Getting angry feeds the trolls.')} className="text-xs bg-white border border-slate-200 px-2 py-1 rounded hover:bg-slate-50">Reply Angrily</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const P2Mode = () => (
    <div className="flex flex-col h-full bg-slate-50">
        <header className="bg-white p-4 flex items-center justify-between border-b border-slate-100 sticky top-0 z-10">
            <span className="font-bold text-lg">Direct Messages</span>
            <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">P2-PLATE</div>
        </header>
        <div className="p-4 space-y-4">
            <div className="text-center text-xs text-slate-400 my-4">Today 2:41 PM</div>

            {/* Scammer Message */}
            <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                    <span className="material-symbols-outlined text-sm">warning</span>
                </div>
                <div className="bg-white border border-slate-200 shadow-sm p-3 rounded-2xl rounded-tl-none text-sm text-slate-800 max-w-[85%]">
                    <span className="font-bold block mb-1 text-xs text-red-500">InstaSupport_Official (AI Scammer)</span>
                    Hey! We noticed suspicious activity on your account. Click here to verify your identity or you will be banned: <span className="text-blue-500 underline cursor-pointer">http://bit.ly/verify-safe-now</span>
                </div>
            </div>

            {/* User Choice */}
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl mt-8">
                <p className="text-sm font-bold text-blue-900 mb-3 text-center">What should you do?</p>
                <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => alert('Correct! Never click unknown links. You flagged the scammer! +100 XP')} className="bg-red-500 text-white py-2 rounded-lg text-sm font-bold hover:bg-red-600 transition">Report & Block</button>
                    <button onClick={() => alert('Simulation Failed! That link was phishing. Try again.')} className="bg-white text-blue-600 border border-blue-200 py-2 rounded-lg text-sm font-bold hover:bg-blue-50 transition">Click Link</button>
                </div>
            </div>
        </div>
    </div>
);

export default function Simulator() {
    const [mode, setMode] = useState('learner');

    const descriptions = {
        learner: (
            <>
                <strong className="block mb-2 text-blue-700 text-base">Current Mode: Learner</strong>
                The child posts real-world achievements (chores) to earn screen time. The only audience is parents and our supportive "Hype-Man" AI.
            </>
        ),
        p1: (
            <>
                <strong className="block mb-2 text-blue-700 text-base">Current Mode: P1 (Provisional)</strong>
                The child interacts with simulated "public" comments. AI agents create mild friction (e.g. "That looks weird") to teach emotional regulation without real risk.
            </>
        ),
        p2: (
            <>
                <strong className="block mb-2 text-blue-700 text-base">Current Mode: P2 (Advanced)</strong>
                Active threat simulation. The system sends fake phishing DMs and scam attempts. The child must identify and report them to pass the module.
            </>
        )
    };

    return (
        <section className="py-20 bg-white" id="simulator">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Social Media Flight Simulator</h2>
                    <p className="text-lg text-slate-600">Experience "Safe Failure". See how our Graduated Licensing System prepares your child for the digital world.</p>
                </div>

                {/* Simulator UI */}
                <div className="bg-slate-50 rounded-[2.5rem] p-4 md:p-12 shadow-2xl border border-slate-200">
                    <div className="grid lg:grid-cols-12 gap-12">
                        {/* Controls (Left) */}
                        <div className="lg:col-span-4 flex flex-col justify-center space-y-6">
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-slate-900">Select License Stage</h3>
                                <p className="text-sm text-slate-500">Click a level to preview the simulation.</p>
                            </div>

                            {/* Level Selectors */}
                            <div className="space-y-3">
                                <button
                                    className={clsx(
                                        "w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4",
                                        mode === 'learner' ? "border-warning-400 shadow-md scale-105 bg-white" : "border-transparent hover:bg-slate-100"
                                    )}
                                    onClick={() => setMode('learner')}
                                >
                                    <div className="w-10 h-10 rounded-full bg-warning-100 text-warning-600 flex items-center justify-center font-bold text-xl">L</div>
                                    <div>
                                        <div className="font-bold text-slate-900">Learner's Permit</div>
                                        <div className="text-xs text-slate-500">Closed Loop • Parent & AI Only</div>
                                    </div>
                                </button>

                                <button
                                    className={clsx(
                                        "w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4",
                                        mode === 'p1' ? "border-warning-400 shadow-md scale-105 bg-white" : "border-transparent hover:bg-slate-100"
                                    )}
                                    onClick={() => setMode('p1')}
                                >
                                    <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-xl">P1</div>
                                    <div>
                                        <div className="font-bold text-slate-900">Provisional 1</div>
                                        <div className="text-xs text-slate-500">Simulated Friction • Tester Agents</div>
                                    </div>
                                </button>

                                <button
                                    className={clsx(
                                        "w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4",
                                        mode === 'p2' ? "border-warning-400 shadow-md scale-105 bg-white" : "border-transparent hover:bg-slate-100"
                                    )}
                                    onClick={() => setMode('p2')}
                                >
                                    <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xl">P2</div>
                                    <div>
                                        <div className="font-bold text-slate-900">Provisional 2</div>
                                        <div className="text-xs text-slate-500">Threat Detection • Scammer Agents</div>
                                    </div>
                                </button>
                            </div>

                            {/* Description Box */}
                            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 text-blue-900 text-sm" id="sim-description">
                                {descriptions[mode]}
                            </div>
                        </div>

                        {/* Phone Display (Right/Center) */}
                        <div className="lg:col-span-8 flex items-center justify-center bg-slate-100 rounded-3xl p-8 relative overflow-hidden group">
                            {/* Phone Bezel */}
                            <div className="relative w-[320px] h-[640px] bg-slate-900 rounded-[3rem] border-8 border-slate-900 shadow-2xl overflow-hidden ring-4 ring-slate-200">
                                {/* Dynamic Content Container */}
                                <div className="w-full h-full bg-white overflow-y-auto hide-scrollbar relative" id="phone-screen">
                                    {mode === 'learner' && <LearnerMode />}
                                    {mode === 'p1' && <P1Mode />}
                                    {mode === 'p2' && <P2Mode />}
                                </div>

                                {/* Dynamic Action Overlay - Hidden for now as it was hidden in original HTML */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent pt-20 hidden" id="phone-overlay">
                                    <div className="flex gap-3 justify-center">
                                        <button className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg">Report</button>
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg">Ignore</button>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute top-1/2 -right-12 w-24 h-24 bg-safety-500/20 rounded-full blur-xl"></div>
                            <div className="absolute bottom-12 -left-12 w-32 h-32 bg-warning-500/20 rounded-full blur-xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
