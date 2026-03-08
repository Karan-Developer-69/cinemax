import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Play } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../store/slices/userSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, user } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(clearError());
        if (user) {
            navigate('/');
        }
    }, [user, navigate, dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    return (
        <div className="min-h-screen pt-20 flex items-center justify-center p-6 relative overflow-hidden bg-primary-bg">
            {/* Background Orbs */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent-gold/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-[30rem] h-[30rem] bg-accent-purple/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-md glass-light border border-white/10 rounded-3xl p-8 md:p-10 relative z-10 shadow-2xl animate-fade-in-up">
                <div className="flex justify-center mb-8">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-[0_0_20px_rgba(244,63,94,0.5)]">
                            <Play size={18} fill="white" className="ml-1 text-white" />
                        </div>
                        <span className="text-2xl font-bold tracking-wider text-white">CINEMA<span className="text-accent-gold">X</span></span>
                    </Link>
                </div>

                <h2 className="text-3xl font-extrabold text-center mb-2 tracking-tight">Welcome Back</h2>
                <p className="text-text-secondary text-center mb-8 font-medium">Sign in to continue to CinemaX</p>

                {error && (
                    <div className={`mb-6 p-4 rounded-xl border text-sm font-medium text-center shadow-lg ${error.toLowerCase().includes('banned')
                            ? 'bg-red-900/40 border-red-500 text-red-100 flex flex-col items-center gap-2 animate-pulse'
                            : 'bg-red-500/10 border-red-500/50 text-red-500'
                        }`}>
                        {error.toLowerCase().includes('banned') && (
                            <span className="bg-red-500 text-white text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-1">Account Suspended</span>
                        )}
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-text-secondary mb-2" htmlFor="email">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-secondary">
                                <Mail size={18} />
                            </div>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-11 pr-4 py-3.5 bg-black/40 border border-border-color rounded-xl focus:outline-none focus:border-accent-gold text-white placeholder:text-text-secondary/50 font-medium transition-colors"
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-semibold text-text-secondary" htmlFor="password">Password</label>
                            <a href="#" className="text-xs font-semibold text-accent-gold hover:text-white transition-colors">Forgot Password?</a>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-secondary">
                                <Lock size={18} />
                            </div>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-11 pr-4 py-3.5 bg-black/40 border border-border-color rounded-xl focus:outline-none focus:border-accent-gold text-white placeholder:text-text-secondary/50 font-medium transition-colors"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 mt-4 bg-white text-black font-extrabold rounded-xl hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-[1.02] transition-all disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm font-medium text-text-secondary">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-white hover:text-accent-gold font-bold transition-colors">
                        Create account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
