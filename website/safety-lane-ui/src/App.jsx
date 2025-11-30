import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import Simulator from './components/Simulator';
import Features from './components/Features';
import Investors from './components/Investors';
import Footer from './components/Footer';
import WaitlistModal from './components/WaitlistModal';

function App() {
    const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

    return (
        <div className="min-h-screen">
            <Navbar onOpenWaitlist={() => setIsWaitlistOpen(true)} />
            <Hero />
            <ProblemSection />
            <Simulator />
            <Features />
            <Investors />
            <Footer />
            <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
        </div>
    );
}

export default App;
