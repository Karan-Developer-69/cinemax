const AdminUsersSkeleton = () => {
    return (
        <div className="bg-secondary-bg/50 rounded-xl border border-border-color p-6 overflow-x-auto">
            <div className="animate-pulse">
                <h2 className="text-2xl font-bold mb-6 bg-text-secondary/10 rounded w-48 h-8"></h2>
                <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                        <tr className="border-b border-border-color text-text-secondary text-sm">
                            <th className="pb-3 px-4 w-[20%]">Username</th>
                            <th className="pb-3 px-4 w-[30%]">Email</th>
                            <th className="pb-3 px-4 w-[15%]">Role</th>
                            <th className="pb-3 px-4">Status</th>
                            <th className="pb-3 px-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <tr key={i} className="border-b border-border-color">
                                <td className="py-4 px-4"><div className="h-5 bg-text-secondary/10 rounded w-32"></div></td>
                                <td className="py-4 px-4"><div className="h-5 bg-text-secondary/10 rounded w-48"></div></td>
                                <td className="py-4 px-4"><div className="h-6 bg-text-secondary/10 rounded-full w-16"></div></td>
                                <td className="py-4 px-4"><div className="h-5 bg-text-secondary/10 rounded w-20"></div></td>
                                <td className="py-4 px-4 flex justify-end gap-3">
                                    <div className="w-8 h-8 bg-text-secondary/10 rounded-full"></div>
                                    <div className="w-8 h-8 bg-text-secondary/10 rounded-full"></div>
                                    <div className="w-8 h-8 bg-text-secondary/10 rounded-full"></div>
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