import React, { useState, useEffect } from 'react';

export default function ProblemSection() {
    const [timeLeft, setTimeLeft] = useState({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00'
    });

    useEffect(() => {
        const targetDate = new Date('2025-12-10T00:00:00').getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft({
                days: days < 10 ? "0" + days : days.toString(),
                hours: hours < 10 ? "0" + hours : hours.toString(),
                minutes: minutes < 10 ? "0" + minutes : minutes.toString(),
                seconds: seconds < 10 ? "0" + seconds : seconds.toString()
            });
        };

        const interval = setInterval(updateCountdown, 1000);
        updateCountdown();

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="bg-slate-900 text-white py-20 relative overflow-hidden" id="problem">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-sm font-bold text-safety-500 uppercase tracking-widest mb-2">The Regulatory Cliff Edge</h2>
                        <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">December 10, 2025: <br />The Ban Begins.</h3>
                        <p className="text-slate-400 text-lg mb-8">
                            The Australian government will implement a world-first ban on social media for under-16s.
                            While well-intentioned, prohibition creates a dangerous vacuum.
                            Currently, 63% of parents feel controls are "too easy to bypass".
                            We are building the bridge across this gap.
                        </p>
                        {/* Countdown Timer */}
                        <div className="grid grid-cols-4 gap-4 text-center max-w-md">
                            <div className="bg-slate-800 rounded-xl p-3 border border-slate-700">
                                <span className="block text-3xl font-bold font-display text-white">{timeLeft.days}</span>
                                <span className="text-xs text-slate-400 uppercase">Days</span>
                            </div>
                            <div className="bg-slate-800 rounded-xl p-3 border border-slate-700">
                                <span className="block text-3xl font-bold font-display text-white">{timeLeft.hours}</span>
                                <span className="text-xs text-slate-400 uppercase">Hours</span>
                            </div>
                            <div className="bg-slate-800 rounded-xl p-3 border border-slate-700">
                                <span className="block text-3xl font-bold font-display text-white">{timeLeft.minutes}</span>
                                <span className="text-xs text-slate-400 uppercase">Mins</span>
                            </div>
                            <div className="bg-slate-800 rounded-xl p-3 border border-slate-700">
                                <span className="block text-3xl font-bold font-display text-safety-500">{timeLeft.seconds}</span>
                                <span className="text-xs text-slate-400 uppercase">Secs</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
                        <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-warning-400">warning</span>
                            The "Protection Paradox"
                        </h4>
                        <div className="space-y-6">
                            <div className="group">
                                <div className="flex justify-between text-sm mb-2 text-slate-300">
                                    <span>Prohibition Strategy (Current)</span>
                                    <span className="text-red-400">High Risk of Evasion</span>
                                </div>
                                <div className="w-full bg-slate-700 rounded-full h-2">
                                    <div className="bg-red-500 h-2 rounded-full w-[20%]"></div>
                                </div>
                                <p className="text-xs text-slate-500 mt-1">Focuses on restriction, leading to underground usage.</p>
                            </div>
                            <div className="group">
                                <div className="flex justify-between text-sm mb-2 text-slate-300">
                                    <span>Preparation Strategy (Safety Lane)</span>
                                    <span className="text-safety-500">High Resilience</span>
                                </div>
                                <div className="w-full bg-slate-700 rounded-full h-2">
                                    <div className="bg-safety-500 h-2 rounded-full w-[85%]"></div>
                                </div>
                                <p className="text-xs text-slate-500 mt-1">Focuses on skill-building and graduated autonomy.</p>
                            </div>
                        </div>
                        <div className="mt-8 p-4 bg-slate-700/50 rounded-xl border border-slate-600">
                            <p className="italic text-slate-300 text-sm">"The goal is not a world without risks, but children with the resilience to navigate them."</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
