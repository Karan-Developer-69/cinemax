import React from 'react';

const MovieDetailsSkeleton = () => {
    return (
        <div className="w-full bg-primary-bg min-h-screen text-text-primary animate-pulse">
            {/* Hero Section Skeleton */}
            <div className="relative w-full h-[60vh] md:h-[80vh] bg-secondary-bg/50">
                <div className="absolute inset-0 bg-gradient-to-t from-primary-bg via-primary-bg/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 max-w-[1400px] mx-auto px-6 md:px-8 pb-12 z-10">
                    <div className="w-1/3 h-10 md:h-16 bg-border-color rounded-lg mb-4"></div>
                    <div className="flex flex-wrap items-center gap-4 text-sm md:text-base font-medium mb-6">
                        <div className="w-16 h-6 bg-border-color rounded-full"></div>
                        <div className="w-12 h-6 bg-border-color rounded-full"></div>
                        <div className="w-20 h-6 bg-border-color rounded-full"></div>
                    </div>
                    <div className="w-full md:w-2/3 max-w-3xl space-y-3 mb-8">
                        <div className="w-full h-4 bg-border-color rounded"></div>
                        <div className="w-full h-4 bg-border-color rounded"></div>
                        <div className="w-3/4 h-4 bg-border-color rounded"></div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="w-32 h-12 bg-border-color rounded-full"></div>
                        <div className="w-40 h-12 bg-border-color rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* Poster and Details Skeleton */}
            <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-12">
                <div className="flex flex-col md:flex-row gap-10">
                    <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
                        <div className="w-full aspect-[2/3] bg-secondary-bg rounded-2xl shadow-xl"></div>
                    </div>
                    <div className="w-full md:w-2/3 lg:w-3/4">
                        <div className="w-48 h-8 bg-border-color rounded-lg mb-6"></div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-border-color rounded-full"></div>
                            <div>
                                <div className="w-24 h-4 bg-border-color rounded mb-2"></div>
                                <div className="w-32 h-3 bg-border-color rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailsSkeleton;
