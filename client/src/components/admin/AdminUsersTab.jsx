import { useEffect, useState } from 'react';
import { fetchAllUsers, toggleUserBan, toggleUserRole, deleteUser } from '../../utils/adminApi';
import toast from 'react-hot-toast';
import { Trash2, Shield, ShieldOff, Ban, CheckCircle } from 'lucide-react';
import AdminUsersSkeleton from '../ui/AdminUsersSkeleton';

const AdminUsersTab = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const data = await fetchAllUsers();
            setUsers(data);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleToggleRole = async (id) => {
        try {
            await toggleUserRole(id);
            toast.success("User role updated");
            // Update local state instead of re-fetching
            setUsers(prev => prev.map(user =>
                user._id === id
                    ? { ...user, role: user.role === 'admin' ? 'user' : 'admin' }
                    : user
            ));
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update role");
        }
    };

    const handleToggleBan = async (id) => {
        try {
            await toggleUserBan(id);
            toast.success("User ban status updated");
            // Update local state instead of re-fetching
            setUsers(prev => prev.map(user =>
                user._id === id
                    ? { ...user, isBanned: !user.isBanned }
                    : user
            ));
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update ban status");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await deleteUser(id);
            toast.success("User deleted");
            // Update local state instead of re-fetching
            setUsers(prev => prev.filter(user => user._id !== id));
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete user");
        }
    };

    if (loading) return <AdminUsersSkeleton />;

    return (
        <div className="bg-white/5 rounded-xl border border-white/10 p-6 overflow-x-auto">
            <h2 className="text-2xl font-bold mb-6 text-white">Registered Users</h2>
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
                    {users.map(u => (
                        <tr key={u._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="py-4 px-4 font-medium text-white">{u.username}</td>
                            <td className="py-4 px-4 text-white/70">{u.email}</td>
                            <td className="py-4 px-4">
                                <span className={`px-2 py-1 rounded text-xs font-bold ${u.role === 'admin' ? 'bg-accent-gold/20 text-accent-gold' : 'bg-white/10 text-white'}`}>
                                    {u.role.toUpperCase()}
                                </span>
                            </td>
                            <td className="py-4 px-4">
                                {u.isBanned ? (
                                    <span className="flex items-center gap-1 text-red-500 text-sm font-medium"><Ban size={14} /> Banned</span>
                                ) : (
                                    <span className="flex items-center gap-1 text-green-500 text-sm font-medium"><CheckCircle size={14} /> Active</span>
                                )}
                            </td>
                            <td className="py-4 px-4 flex items-center justify-end gap-3">
                                <button
                                    onClick={() => handleToggleRole(u._id)}
                                    title={u.role === 'admin' ? "Remove Admin" : "Make Admin"}
                                    className="p-2 glass-light rounded-full hover:bg-white/20 text-blue-400 transition-colors"
                                >
                                    {u.role === 'admin' ? <ShieldOff size={16} /> : <Shield size={16} />}
                                </button>
                                <button
                                    onClick={() => handleToggleBan(u._id)}
                                    title={u.isBanned ? "Unban User" : "Ban User"}
                                    className="p-2 glass-light rounded-full hover:bg-white/20 text-orange-400 transition-colors"
                                >
                                    <Ban size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(u._id)}
                                    title="Delete User"
                                    className="p-2 glass-light rounded-full hover:bg-red-500/20 text-red-500 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    {users.length === 0 && (
                        <tr><td colSpan="5" className="py-8 text-center text-white/50">No users found.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUsersTab;
