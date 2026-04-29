import { useState, useEffect, useRef } from 'react';
import {
    FiLock,
    FiMail,
    FiLogIn,
    FiAlertCircle,
    FiEye,
    FiEyeOff
} from 'react-icons/fi';
import { LuSparkles } from 'react-icons/lu';
import BlogManager from 'components/BlogManager';
import gsap from 'gsap';
import { adminLogin, adminLogout } from '../api/adminApi';

const AdminLogin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const loginCardRef = useRef(null);
    const errorRef = useRef(null);
    const spinnerRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem('admin_token');

        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (loginCardRef.current && !isAuthenticated) {
            gsap.fromTo(
                loginCardRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
            );
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (error && errorRef.current) {
            gsap.fromTo(
                errorRef.current,
                { opacity: 0, y: -10 },
                { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
            );
        }
    }, [error]);

    useEffect(() => {
        if (isLoading && spinnerRef.current) {
            gsap.to(spinnerRef.current, {
                rotation: 360,
                duration: 1,
                repeat: -1,
                ease: 'linear'
            });
        }
    }, [isLoading]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setError('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setError('');

        try {
            const result = await adminLogin(formData.email, formData.password);

            // The API response embeds the token inside result.data
            const token = result.data?.token || result.token;
            const adminUser = result.data?.admin || result.admin;

            if (token) {
                localStorage.setItem('admin_token', token);
                localStorage.setItem('admin_data', JSON.stringify(adminUser || { email: formData.email, role: 'admin' }));
                setIsAuthenticated(true);
            } else {
                setError('Invalid response from server.');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(
                err.response?.data?.message ||
                err.response?.data?.error ||
                'Invalid credentials. Please check your email and password.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await adminLogout();
        } catch (err) {
            // Ignore backend errors, always logout locally
        } finally {
            localStorage.removeItem('admin_token');
            localStorage.removeItem('admin_data');

            setIsAuthenticated(false);
            setFormData({ email: '', password: '' });
        }
    };

    if (isAuthenticated) {
        return (
            <div className="min-h-screen bg-white">
                <div className="bg-gradient-to-r from-gray-900 to-black text-white border-b border-gray-800">
                    <div className="max-w-7xl mx-auto px-4 py-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <LuSparkles className="text-2xl text-white" />
                                <span className="text-xl">
                                    Admin Dashboard
                                </span>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm flex items-center border border-gray-700"
                            >
                                <FiLock className="mr-2" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                <BlogManager />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage:
                        'radial-gradient(circle at 1px 1px, #000000 1px, transparent 0)',
                    backgroundSize: '30px 30px'
                }}
            />

            <div
                ref={loginCardRef}
                className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 border border-gray-200"
            >
                <div className="absolute -top-3 -right-3 w-20 h-20 bg-gray-900/5 rounded-full blur-2xl" />
                <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-gray-800/5 rounded-full blur-2xl" />

                <div className="text-center mb-8">
                    <div className="inline-block p-3 bg-gradient-to-br from-gray-900/5 to-gray-600/5 rounded-2xl mb-4 border border-gray-100">
                        <LuSparkles className="text-3xl text-gray-900" />
                    </div>

                    <h1 className="text-3xl text-gray-900 mb-2">
                        Admin <span className="text-gray-500">Access</span>
                    </h1>

                    <p className="text-gray-500 text-sm">
                        Enter your credentials to manage blog posts
                    </p>
                </div>

                {error && (
                    <div
                        ref={errorRef}
                        className="mb-6 p-3 bg-gray-100 border border-gray-200 rounded-lg flex items-center text-gray-800 text-sm"
                    >
                        <FiAlertCircle className="mr-2 flex-shrink-0 text-gray-700" />
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Email
                        </label>

                        <div className="relative">
                            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="admin@example.com"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors bg-white text-gray-900 placeholder-gray-400"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Password
                        </label>

                        <div className="relative">
                            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="••••••••"
                                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors bg-white text-gray-900 placeholder-gray-400"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? (
                                    <FiEyeOff size={18} />
                                ) : (
                                    <FiEye size={18} />
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed border border-gray-800"
                    >
                        {isLoading ? (
                            <div
                                ref={spinnerRef}
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                        ) : (
                            <>
                                <FiLogIn className="mr-2" />
                                Sign In
                            </>
                        )}
                    </button>
                </form>

                <p className="text-center text-xs text-gray-400 mt-6">
                    © {new Date().getFullYear()} RidenTech.
                    All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;