import React, { useState } from 'react';
import { supabase } from '../config/supabase';

export default function WaitlistModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        email: '',
        childrenAges: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const ipResponse = await fetch('https://api.ipify.org?format=json').catch(() => ({ json: () => ({ ip: null }) }));
            const ipData = await ipResponse.json();

            const { error: supabaseError } = await supabase
                .from('safety_lane_waitlist')
                .insert([
                    {
                        email: formData.email,
                        user_type: 'parent',
                        parent_children_ages: formData.childrenAges,
                        consent_communications: true,
                        consent_data_processing: true,
                        ip_address: ipData.ip,
                        user_agent: navigator.userAgent
                    }
                ]);

            if (supabaseError) {
                if (supabaseError.code === '23505') {
                    setError('This email is already registered!');
                } else {
                    setError('Something went wrong. Please try again.');
                }
            } else {
                setSuccess(true);
                setTimeout(() => {
                    onClose();
                    setSuccess(false);
                    setFormData({ email: '', childrenAges: '' });
                }, 2000);
            }
        } catch (err) {
            setError('Network error. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

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

                {success ? (
                    <div className="text-center py-8">
                        <div className="text-6xl mb-4">✅</div>
                        <h4 className="text-xl font-bold text-safety-600 mb-2">You're on the list!</h4>
                        <p className="text-slate-600">Check your email for next steps.</p>
                    </div>
                ) : (
                    <>
                        <p className="text-slate-600 mb-6">Join the pilot program before the December 10 ban. First 5,000 families get 6 months of "Agent Store" credits free.</p>
                        
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                                {error}
                            </div>
                        )}

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                <input 
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-safety-500 focus:border-safety-500 outline-none transition-all" 
                                    placeholder="parent@example.com" 
                                    required 
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    disabled={loading}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Child's Age Group</label>
                                <select 
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-safety-500 outline-none bg-white"
                                    value={formData.childrenAges}
                                    onChange={(e) => setFormData({ ...formData, childrenAges: e.target.value })}
                                    disabled={loading}
                                    required
                                >
                                    <option value="">Select age group</option>
                                    <option value="under-10">Under 10</option>
                                    <option value="10-12">10-12 years</option>
                                    <option value="13-15">13-15 years (Affected by Ban)</option>
                                    <option value="16+">16+ years</option>
                                </select>
                            </div>

                            <button 
                                className="w-full bg-safety-600 hover:bg-safety-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-safety-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed" 
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Joining...' : 'Join Waitlist'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
