import React from 'react';
import clsx from 'clsx';

export default function WaitlistModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100]" id="waitlist-modal">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl animate-fade-in-up">
                <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-display font-bold">Secure Your Spot</h3>
                    <button className="text-slate-400 hover:text-slate-900" onClick={onClose}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <p className="text-slate-600 mb-6">Join the pilot program before the December 10 ban. First 5,000 families get 6 months of "Agent Store" credits free.</p>
                <form className="space-y-4" onSubmit={(e) => {
                    e.preventDefault();
                    alert('Thank you! You are on the list.');
                    onClose();
                }}>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                        <input className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-safety-500 focus:border-safety-500 outline-none transition-all" placeholder="parent@example.com" required type="email" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Child's Age Group</label>
                        <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-safety-500 outline-none bg-white">
                            <option>10-12 years</option>
                            <option>13-15 years (Affected by Ban)</option>
                            <option>Under 10</option>
                        </select>
                    </div>
                    <button className="w-full bg-safety-600 hover:bg-safety-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-safety-500/30 transition-all" type="submit">
                        Join Waitlist
                    </button>
                </form>
            </div>
        </div>
    );
}
