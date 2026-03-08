import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, Menu, X, Play, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../store/slices/themeSlice';
import clsx from 'clsx';

const Navbar = () => {
    const dispatch = useDispatch();
    const themeMode = useSelector((state) => state.theme.mode);
    const { user } = useSelector((state) => state.user);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: 'user/logout' });
        navigate('/login');
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Movies', path: '/movies' },
        { name: 'Series', path: '/tv-shows' },
        { name: 'Favorites', path: '/favorites' },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 pt-6 px-4 md:px-8 pointer-events-none flex justify-center">
            <div
                className={clsx(
                    'pointer-events-auto flex justify-between items-center transition-all duration-500 rounded-full',
                    isScrolled
                        ? 'w-full max-w-5xl py-3 px-8 glass-light shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-border-color'
                        : 'w-full max-w-[1400px] py-4 bg-transparent border-transparent'
                )}
            >
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center shadow-[0_0_15px_rgba(244,63,94,0.5)] group-hover:scale-110 transition-transform">
                        <Play size={14} fill="currentColor" className="ml-0.5 text-neutral-50" />
                    </div>
                    <span className="text-xl font-bold tracking-wider text-text-primary">CINEMA<span className="text-accent-gold">X</span></span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-1 items-center bg-black/20 p-1 rounded-full border border-white/5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={clsx(
                                'relative px-5 py-2 rounded-full font-medium text-sm transition-all duration-300',
                                location.pathname === link.path
                                    ? 'bg-text-secondary/20 text-text-primary shadow-sm'
                                    : 'text-text-secondary hover:text-text-primary hover:bg-text-secondary/10'
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                    {user?.role === 'admin' && (
                        <Link
                            to="/admin"
                            className={clsx(
                                'relative px-5 py-2 rounded-full font-bold text-sm transition-all duration-300',
                                location.pathname === '/admin'
                                    ? 'bg-accent-gold text-black shadow-sm'
                                    : 'text-accent-gold hover:bg-accent-gold/10'
                            )}
                        >
                            Admin Panel
                        </Link>
                    )}
                </nav>

                {/* Right Actions */}
                <div className="flex gap-3 md:gap-4 items-center flex-row">
                    <button
                        onClick={() => dispatch(toggleTheme())}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-text-secondary/20 transition-all duration-300"
                    >
                        {themeMode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                    {user ? (
                        <div className="hidden sm:flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full glass-light border border-border-color text-sm font-medium text-text-primary transition-all">
                            <div className="flex items-center gap-2 cursor-pointer group">
                                <div className="w-7 h-7 rounded-full bg-accent-gold flex items-center justify-center text-black font-bold shadow-[0_0_10px_rgba(255,215,0,0.5)]">
                                    {user.username?.charAt(0).toUpperCase()}
                                </div>
                                <span className="font-semibold">{user.username}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="ml-2 text-xs font-bold text-red-400 hover:text-red-300 transition-colors uppercase tracking-wider"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="hidden sm:flex items-center gap-2 pl-3 pr-4 py-2 rounded-full glass-light border border-border-color hover:border-accent-gold hover:text-text-primary transition-all text-sm font-medium text-text-secondary group">
                            <div className="w-6 h-6 rounded-full bg-text-secondary/20 flex items-center justify-center group-hover:bg-accent-gold transition-colors">
                                <User size={14} className="group-hover:text-black" />
                            </div>
                            Sign In
                        </Link>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-text-primary hover:bg-white/10 transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div
                className={clsx(
                    'md:hidden fixed inset-x-4 top-24 rounded-2xl glass-light border border-border-color flex flex-col transition-all duration-300 pointer-events-auto shadow-2xl overflow-hidden',
                    isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
                )}
            >
                <div className="p-4 flex flex-col gap-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={clsx(
                                'px-6 py-4 rounded-xl font-medium transition-colors text-center',
                                location.pathname === link.path ? 'bg-accent-gold/10 text-accent-gold' : 'text-text-primary hover:bg-text-secondary/10'
                            )}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    {user ? (
                        <>
                            {user.role === 'admin' && (
                                <Link
                                    to="/admin"
                                    className="mt-2 w-full px-6 py-4 rounded-xl bg-accent-gold/10 text-accent-gold border border-accent-gold/20 font-bold text-center"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Admin Dashboard
                                </Link>
                            )}
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="mt-2 w-full px-6 py-4 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 font-bold text-center"
                            >
                                Log Out
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="mt-4 px-6 py-4 rounded-xl bg-gradient-primary text-neutral-50 font-bold text-center"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Sign In to CinemaX
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
