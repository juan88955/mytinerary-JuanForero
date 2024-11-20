import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../store/slices/authSlice';

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector(state => state.auth);

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        photo: '',
        country: ''
    });

    const [errors, setErrors] = useState({});

    const countries = [
        "Argentina", "Brasil", "Chile", "Colombia", "España",
        "Estados Unidos", "México", "Perú", "Uruguay", "Venezuela"
    ];

    const handleGoogleSignUp = () => {
        const frontendURL = 'http://localhost:5173';
        const callbackURL = `${frontendURL}/auth/google/callback`;
        window.location.href = `http://localhost:8080/api/auth/signin/google`;
    };

    const validateStep1 = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        } else if (!/(?=.*[A-Z])/.test(formData.password)) {
            newErrors.password = 'Password must contain at least one uppercase letter';
        } else if (!/(?=.*[0-9])/.test(formData.password)) {
            newErrors.password = 'Password must contain at least one number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.lastname.trim()) {
            newErrors.lastname = 'Last name is required';
        }

        if (formData.photo && !isValidUrl(formData.photo)) {
            newErrors.photo = 'Please enter a valid URL';
        }

        if (!formData.country) {
            newErrors.country = 'Please select a country';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (step === 1) {
            if (validateStep1()) {
                setStep(2);
            }
        } else {
            if (validateStep2()) {
                try {
                    await dispatch(signUp(formData));
                    navigate('/dashboard');
                } catch (error) {
                    setErrors(prev => ({
                        ...prev,
                        submit: error.message || 'Registration failed. Please try again.'
                    }));
                }
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed"
            style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1600670897969-3e34829b3218?q=80&w=1974&auto=format&fit=crop")',
            }}>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl w-96 relative z-10">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Sign Up</h2>

                {errors.submit && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded text-red-500 text-sm text-center">
                        {errors.submit}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {step === 1 ? (
                        <>
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 rounded-lg bg-white/5 text-white border focus:outline-none focus:ring-2 focus:ring-white/20 ${errors.email ? 'border-red-500' : 'border-white/10'
                                        }`}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                                )}
                            </div>
                            <div>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 rounded-lg bg-white/5 text-white border focus:outline-none focus:ring-2 focus:ring-white/20 ${errors.password ? 'border-red-500' : 'border-white/10'
                                        }`}
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg transition duration-300 flex items-center justify-center gap-2 border border-white/20"
                            >
                                Continue
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 rounded-lg bg-white/5 text-white border focus:outline-none focus:ring-2 focus:ring-white/20 ${errors.name ? 'border-red-500' : 'border-white/10'
                                            }`}
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                                    )}
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="lastname"
                                        placeholder="Last name"
                                        value={formData.lastname}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 rounded-lg bg-white/5 text-white border focus:outline-none focus:ring-2 focus:ring-white/20 ${errors.lastname ? 'border-red-500' : 'border-white/10'
                                            }`}
                                    />
                                    {errors.lastname && (
                                        <p className="mt-1 text-sm text-red-500">{errors.lastname}</p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <input
                                    type="url"
                                    name="photo"
                                    placeholder="https://example.com/photo.jpg"
                                    value={formData.photo}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 rounded-lg bg-white/5 text-white border focus:outline-none focus:ring-2 focus:ring-white/20 ${errors.photo ? 'border-red-500' : 'border-white/10'
                                        }`}
                                />
                                {errors.photo && (
                                    <p className="mt-1 text-sm text-red-500">{errors.photo}</p>
                                )}
                            </div>
                            <div>
                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 rounded-lg bg-white/5 text-white border focus:outline-none focus:ring-2 focus:ring-white/20 ${errors.country ? 'border-red-500' : 'border-white/10'
                                        }`}
                                >
                                    <option value="" className="text-black">Select a country</option>
                                    {countries.map(country => (
                                        <option key={country} value={country} className="text-black">
                                            {country}
                                        </option>
                                    ))}
                                </select>
                                {errors.country && (
                                    <p className="mt-1 text-sm text-red-500">{errors.country}</p>
                                )}
                            </div>
                            <div className="flex justify-between gap-4">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg transition duration-300 flex items-center justify-center gap-2 border border-white/20"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg transition duration-300 flex items-center justify-center gap-2 border border-white/20"
                                >
                                    {loading ? 'Creating Account...' : 'Create Account'}
                                </button>
                            </div>
                        </>
                    )}
                </form>

                {step === 1 && (
                    <>
                        <div className="relative py-4 mt-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-400"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 text-gray-400 bg-transparent">Or</span>
                            </div>
                        </div>

                        <button
                            onClick={handleGoogleSignUp}
                            type="button"
                            className="w-full bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2 border border-white/20"
                        >
                            <img
                                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                                alt="Google logo"
                                className="w-5 h-5"
                            />
                            Sign up with Google
                        </button>
                    </>
                )}

                <p className="mt-4 text-center text-sm text-gray-400">
                    Already have an account?{' '}
                    <Link to="/signin" className="text-white hover:text-gray-300 transition duration-300">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;