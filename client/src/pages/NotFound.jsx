import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Film } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-primary-bg text-text-primary relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-gold/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-pink-600/5 rounded-full blur-3xl -z-10 animate-pulse delay-1000"></div>

            <div className="max-w-2xl w-full text-center z-10">
                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 rounded-3xl bg-gradient-primary flex items-center justify-center shadow-[0_0_30px_rgba(244,63,94,0.3)] animate-bounce">
                        <Film size={48} className="text-neutral-50" />
                    </div>
                </div>

                <h1 className="text-[clamp(6rem,15vw,12rem)] font-black leading-none tracking-tighter bg-gradient-to-br from-text-primary via-text-secondary to-accent-gold bg-clip-text text-transparent drop-shadow-lg mb-2">
                    404
                </h1>

                <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                    Lost in Space
                </h2>

                <p className="text-lg text-text-secondary mb-10 max-w-lg mx-auto leading-relaxed">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

                <Link
                    to="/"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 glass-primary border border-border-color text-text-primary hover:text-neutral-50 font-bold rounded-full hover:bg-accent-gold hover:border-accent-gold hover:scale-105 transition-all duration-300 text-lg shadow-[0_4px_20px_rgba(0,0,0,0.1)] group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Return to Mission Control
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
