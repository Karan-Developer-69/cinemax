const AdminUsersSkeleton = () => {
    return (
        <div className="bg-white/5 rounded-xl border border-white/10 p-6 overflow-x-auto">
            <div className="animate-pulse">
                <h2 className="text-2xl font-bold mb-6 bg-gray-300 dark:bg-gray-700 rounded w-48 h-8"></h2>
                <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                        <tr className="border-b border-white/10 text-white/50 text-sm">
                            <th className="pb-3 px-4">Username</th>
                            <th className="pb-3 px-4">Email</th>
                            <th className="pb-3 px-4">Role</th>
                            <th className="pb-3 px-4">Status</th>
                            <th className="pb-3 px-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <tr key={index} className="border-b border-white/5">
                                <td className="py-4 px-4">
                                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
                                </td>
                                <td className="py-4 px-4">
                                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
                                </td>
                                <td className="py-4 px-4">
                                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
                                </td>
                                <td className="py-4 px-4">
                                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
                                </td>
                                <td className="py-4 px-4 flex items-center justify-end gap-3">
                                    <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                                    <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                                    <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsersSkeleton;