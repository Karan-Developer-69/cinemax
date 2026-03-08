import React from 'react';
import { Film } from 'lucide-react';

const AppLoader = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-primary-bg relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-gold/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-pink-600/5 rounded-full blur-3xl -z-10 animate-pulse delay-1000"></div>

            <div className="flex flex-col items-center z-10">
                <div className="w-24 h-24 rounded-3xl bg-gradient-primary flex items-center justify-center shadow-[0_0_30px_rgba(244,63,94,0.3)] animate-bounce mb-6">
                    <Film size={48} className="text-neutral-50" />
                </div>
                <h2 className="text-2xl font-bold tracking-widest text-text-primary animate-pulse">CINEMA<span className="text-accent-gold">X</span></h2>
                <div className="mt-4 flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-accent-gold animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-3 h-3 rounded-full bg-accent-gold animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-3 h-3 rounded-full bg-accent-gold animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
            </div>
        </div>
    );
};

export default AppLoader;
