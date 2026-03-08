const AdminMediaSkeleton = () => {
    return (
        <div className="bg-white/5 rounded-xl border border-white/10 p-6">
            <div className="animate-pulse">
                <div className="flex justify-between items-center mb-6">
                    <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-48"></div>
                    <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="aspect-[2/3] bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminMediaSkeleton;