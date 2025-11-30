import React from 'react';

export default function Features() {
    return (
        <section className="py-20 bg-slate-50" id="features">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
                        <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-3xl">nature_people</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 font-display">The "Touch Grass" Economy</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Screen time isn't free. It's currency earned by outdoor activity. Our geofencing validates time spent in parks and backyards, converting 1 hour outside into 30 mins of digital access.
                        </p>
                        <div className="mt-6 pt-6 border-t border-slate-100">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                GPS Verified
                            </div>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
                        <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-3xl">diversity_3</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 font-display">Squad Mode</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Combating digital isolation. When your child is physically with approved friends (detected via proximity), screen time drains 50% slower, encouraging real-world socialization.
                        </p>
                        <div className="mt-6 pt-6 border-t border-slate-100">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase">
                                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                Proximity Active
                            </div>
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
                        <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-3xl">psychology</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 font-display">Agent Modules</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Install specific AI personas into your child's feed. "The Coach" for motivation, "The Tester" for resilience training, or "The Moderator" for privacy lessons. You design the curriculum.
                        </p>
                        <div className="mt-6 pt-6 border-t border-slate-100">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase">
                                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                AI Powered
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
