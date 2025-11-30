import React from 'react';

export default function Investors() {
    return (
        <section className="py-20 bg-white border-t border-slate-200" id="investors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-3xl font-display font-bold mb-6">For Investors</h2>
                        <p className="text-lg text-slate-600 mb-8">
                            We are seeking $750k in pre-seed funding to capture the urgent market gap created by the Australian social media ban.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                <div className="bg-slate-200 p-2 rounded-lg text-slate-700">
                                    <span className="material-symbols-outlined">trending_up</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Immediate Market Need</h4>
                                    <p className="text-sm text-slate-600">Ban starts Dec 10, 2025. 60% of parents are actively seeking guidance. We have the solution ready.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                <div className="bg-slate-200 p-2 rounded-lg text-slate-700">
                                    <span className="material-symbols-outlined">architecture</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">De-Risked Tech Stack</h4>
                                    <p className="text-sm text-slate-600">
                                        Built on a fork of <strong>Pixelfed</strong> (open-source PHP/Laravel) for transparency, orchestrated with <strong>n8n</strong> for scalable AI logic. MVP is shovel-ready.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                <div className="bg-slate-200 p-2 rounded-lg text-slate-700">
                                    <span className="material-symbols-outlined">verified</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Regulatory Alignment</h4>
                                    <p className="text-sm text-slate-600">Designed strictly on the eSafety Commissioner's "Safety by Design" framework (4 Cs). We are not fighting the regulation; we are the answer to it.</p>
                                </div>
                            </div>
                        </div>
                        <a 
                            href="https://storage.projects.hitl.cloud/storage/v1/object/public/assets/documents/pitch-deck.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-8 text-safety-600 font-bold inline-flex items-center gap-2 hover:underline"
                        >
                            Download Pitch Deck <span className="material-symbols-outlined">download</span>
                        </a>
                    </div>

                    <div className="relative h-full min-h-[400px] bg-slate-900 rounded-3xl p-8 text-white overflow-hidden flex flex-col justify-between">
                        <div className="absolute top-0 right-0 p-32 bg-safety-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
                        <div>
                            <h3 className="text-2xl font-display font-bold mb-2">The Roadmap</h3>
                            <div className="space-y-6 mt-8 relative pl-4 border-l border-slate-700">
                                <div className="relative">
                                    <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-safety-500"></div>
                                    <p className="text-xs text-safety-500 font-bold uppercase mb-1">Q4 2025</p>
                                    <h4 className="font-bold text-lg">MVP Launch</h4>
                                    <p className="text-sm text-slate-400">Closed Loop "Learner" Mode & Chore Verification</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-slate-600"></div>
                                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">Q1 2026</p>
                                    <h4 className="font-bold text-lg">Agent Store Beta</h4>
                                    <p className="text-sm text-slate-400">Launch of "Tester" and "Scammer" AI Modules</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-slate-600"></div>
                                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">Q3 2026</p>
                                    <h4 className="font-bold text-lg">Integration</h4>
                                    <p className="text-sm text-slate-400">ConnectID Age Verification & School Rollout</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 p-4 bg-slate-800 rounded-xl border border-slate-700">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs uppercase text-slate-400">Funding Goal</span>
                                <span className="font-bold text-safety-500">$750,000</span>
                            </div>
                            <div className="w-full bg-slate-900 rounded-full h-2">
                                <div className="bg-gradient-to-r from-safety-600 to-safety-400 h-2 rounded-full w-[35%]"></div>
                            </div>
                            <p className="text-xs text-slate-500 mt-2">35% Committed (Soft Circle)</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
