import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../store/slices/authSlice';

const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector(state => state.auth);
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await dispatch(signIn(formData));
            if (response.payload.success) {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleGoogleLogin = () => {
        const frontendURL = 'http://localhost:5173';
        const callbackURL = `${frontendURL}/auth/google/callback`;

        window.location.href = `http://localhost:8080/api/auth/signin/google?callbackUrl=${encodeURIComponent(callbackURL)}`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed"
            style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop")',
            }}>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl w-96 relative z-10">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Sign In</h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded text-red-500 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg bg-white/5 text-white border focus:outline-none focus:ring-2 focus:ring-white/20 border-white/10"
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg bg-white/5 text-white border focus:outline-none focus:ring-2 focus:ring-white/20 border-white/10"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg transition duration-300 flex items-center justify-center gap-2 border border-white/20"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Signing in...</span>
                            </>
                        ) : (
                            <>
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                                <span>Sign In</span>
                            </>
                        )}
                    </button>
                </form>

                <div className="relative py-4 mt-4">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-400"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 text-gray-400 bg-transparent">Or</span>
                    </div>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    type="button"
                    className="w-full bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2 border border-white/20"
                >
                    <img
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                        alt="Google logo"
                        className="w-5 h-5"
                    />
                    Continue with Google
                </button>

                <p className="mt-4 text-center text-sm text-gray-400">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-white hover:text-gray-300 transition duration-300">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignIn;