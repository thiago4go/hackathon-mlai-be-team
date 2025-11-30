import React from 'react';

export default function Navbar({ onOpenWaitlist }) {
    return (
        <nav className="fixed w-full z-50 top-0 transition-all duration-300 glass-panel" id="navbar">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center gap-2">
                        <div className="bg-safety-500 text-white p-1.5 rounded-lg">
                            <span className="material-symbols-outlined text-2xl">verified_user</span>
                        </div>
                        <span className="font-display font-bold text-xl tracking-tight text-slate-900">Safety Lane</span>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <a className="text-sm font-medium text-slate-600 hover:text-safety-600 transition-colors" href="#problem">The Problem</a>
                        <a className="text-sm font-medium text-slate-600 hover:text-safety-600 transition-colors" href="#simulator">The Simulator</a>
                        <a className="text-sm font-medium text-slate-600 hover:text-safety-600 transition-colors" href="#features">Features</a>
                        <a className="text-sm font-medium text-slate-600 hover:text-safety-600 transition-colors" href="#investors">Investors</a>
                    </div>
                    <button
                        className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all transform hover:scale-105 shadow-lg shadow-safety-500/20"
                        onClick={onOpenWaitlist}
                    >
                        Join Waitlist
                    </button>
                </div>
            </div>
        </nav>
    );
}
