import React from 'react';

export default function Footer() {
    const handleDownload = () => {
        alert("Backup functionality is not implemented in this version.");
    };

    return (
        <footer className="bg-slate-50 py-12 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="bg-slate-900 text-white p-1 rounded">
                        <span className="material-symbols-outlined text-lg">verified_user</span>
                    </div>
                    <span className="font-bold text-slate-900">Safety Lane</span>
                </div>
                <p className="text-slate-500 text-sm">© 2025 Australia Safety Lane. Built with Safety by Design.</p>
                <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-slate-500 hover:text-safety-600 transition-colors text-sm font-medium" onClick={handleDownload}>
                        <span className="material-symbols-outlined">save_alt</span>
                        <span>Save Backup</span>
                    </button>
                    <div className="h-4 w-px bg-slate-300 hidden md:block"></div>
                    <a className="text-slate-400 hover:text-slate-900" href="#"><span className="material-symbols-outlined">mail</span></a>
                    <a className="text-slate-400 hover:text-slate-900" href="#"><span className="material-symbols-outlined">description</span></a>
                </div>
            </div>
        </footer>
    );
}
