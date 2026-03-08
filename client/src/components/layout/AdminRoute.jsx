import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
    const { user, loading } = useSelector((state) => state.user);

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-primary-bg">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-gold"></div>
            </div>
        );
    }

    // Check if user exists and has the admin role
    if (!user || user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return <Outlet />; // Render child routes if admin
};

export default AdminRoute;
