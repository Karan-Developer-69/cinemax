import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HorizontalScroll = ({ children, title, className = "" }) => {
    const scrollRef = useRef(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(true);

    const checkScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowLeft(scrollLeft > 0);
        setShowRight(scrollLeft < scrollWidth - clientWidth - 5);
    };

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', checkScroll);
            // Initial check
            checkScroll();
            // Re-check on window resize
            window.addEventListener('resize', checkScroll);

            // Check after content might have loaded
            const timer = setTimeout(checkScroll, 1000);

            return () => {
                scrollContainer.removeEventListener('scroll', checkScroll);
                window.removeEventListener('resize', checkScroll);
                clearTimeout(timer);
            };
        }
    }, [children]);

    const scroll = (direction) => {
        if (!scrollRef.current) return;
        const { clientWidth } = scrollRef.current;
        const scrollAmount = direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8;
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    return (
        <div className={`relative group ${className}`}>
            {title && (
                <h3 className="text-2xl font-bold mb-6 text-text-primary px-2">{title}</h3>
            )}

            <div className="relative">
                {/* Left Arrow */}
                {showLeft && (
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/60 text-white rounded-full hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center -ml-4 border border-white/10 backdrop-blur-sm"
                        aria-label="Scroll Left"
                    >
                        <ChevronLeft size={24} />
                    </button>
                )}

                {/* Scrollable Area */}
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-6 pb-4 custom-scrollbar scroll-smooth no-scrollbar"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {children}
                </div>

                {/* Right Arrow */}
                {showRight && (
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/60 text-white rounded-full hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center -mr-4 border border-white/10 backdrop-blur-sm"
                        aria-label="Scroll Right"
                    >
                        <ChevronRight size={24} />
                    </button>
                )}
            </div>

            <style jsx="true">{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </div>
    );
};

export default HorizontalScroll;
