import { useState, useEffect } from "react";
import AdminUsersTab from "../components/admin/AdminUsersTab";
import AdminMediaTab from "../components/admin/AdminMediaTab";
import { Users, Film, Tv } from "lucide-react";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("users");

    return (
        <div className="pt-32 pb-20 max-w-[1400px] mx-auto px-6 md:px-8 min-h-screen flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full md:w-64 shrink-0">
                <div className="bg-secondary-bg/50 rounded-2xl border border-border-color p-4 sticky top-32">
                    <h1 className="text-xl font-bold text-text-primary mb-6 uppercase tracking-wider px-2">Admin Panel</h1>
                    <nav className="flex flex-col gap-2">
                        <button
                            onClick={() => setActiveTab('users')}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'users' ? 'bg-accent-gold text-primary-bg shadow-[0_0_20px_rgba(244,63,94,0.3)]' : 'text-text-secondary hover:bg-border-color hover:text-text-primary'}`}
                        >
                            <Users size={20} /> Users
                        </button>
                        <button
                            onClick={() => setActiveTab('movies')}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'movies' ? 'bg-accent-gold text-primary-bg shadow-[0_0_20px_rgba(244,63,94,0.3)]' : 'text-text-secondary hover:bg-border-color hover:text-text-primary'}`}
                        >
                            <Film size={20} /> custom Movies
                        </button>
                        <button
                            onClick={() => setActiveTab('tv')}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'tv' ? 'bg-accent-gold text-primary-bg shadow-[0_0_20px_rgba(244,63,94,0.3)]' : 'text-text-secondary hover:bg-border-color hover:text-text-primary'}`}
                        >
                            <Tv size={20} /> custom TV Shows
                        </button>
                    </nav>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1">
                {activeTab === 'users' && <AdminUsersTab />}
                {activeTab === 'movies' && <AdminMediaTab type="movies" />}
                {activeTab === 'tv' && <AdminMediaTab type="tv" />}
            </main>
        </div>
    );
};

export default AdminDashboard;
