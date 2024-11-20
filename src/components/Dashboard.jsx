import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsAuthenticated, selectUser, signOut } from '../store/slices/authSlice.js';
import { FaHeart, FaComment, FaRoute, FaMapMarkerAlt, FaSignOutAlt } from 'react-icons/fa';

const Dashboard = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/signin');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="min-h-screen bg-slate-500">
            <div className="h-[400px] relative bg-cover bg-center"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop')`,
                    backgroundRepeat: 'no-repeat'
                }}>
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        {user?.photo ? (
                            <img
                                src={user.photo}
                                alt="Perfil"
                                className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-emerald-500/20 object-cover"
                            />
                        ) : (
                            <div className="w-32 h-32 rounded-full mx-auto mb-6 bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center text-5xl font-bold text-white">
                                {user?.name?.[0]?.toUpperCase()}
                            </div>
                        )}
                        <h2 className="text-3xl font-bold text-white mb-4">
                            {user?.name} {user?.lastname}
                        </h2>
                        <div className="flex flex-col items-center justify-center gap-2 text-gray-300 mb-6">
                            <div className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-emerald-400" />
                                <p>{user?.country}</p>
                            </div>
                            <p className="text-sm">{user?.email}</p>
                        </div>

                        <div className="flex justify-center items-center gap-8 mb-6">
                            <div className="text-center group cursor-pointer">
                                <div className="flex items-center gap-2">
                                    <FaHeart className="text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                                    <span className="text-white font-bold">0</span>
                                </div>
                                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Likes</p>
                            </div>
                            <div className="text-center group cursor-pointer">
                                <div className="flex items-center gap-2">
                                    <FaComment className="text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                                    <span className="text-white font-bold">0</span>
                                </div>
                                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Comments</p>
                            </div>
                            <div className="text-center group cursor-pointer">
                                <div className="flex items-center gap-2">
                                    <FaRoute className="text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                                    <span className="text-white font-bold">0</span>
                                </div>
                                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Itineraries</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gray-800 rounded-xl shadow-xl hover:transform hover:scale-105 transition-all duration-300">
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
                                <FaHeart className="text-emerald-400" />
                                My likes
                            </h3>
                            <div className="border-t border-emerald-500/20 mb-4"></div>
                            <p className="text-gray-400 text-center">No likes yet</p>
                        </div>
                    </div>

                    <div className="bg-gray-800 rounded-xl shadow-xl hover:transform hover:scale-105 transition-all duration-300">
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
                                <FaComment className="text-emerald-400" />
                                My comments
                            </h3>
                            <div className="border-t border-emerald-500/20 mb-4"></div>
                            <p className="text-gray-400 text-center">No comments yet</p>
                        </div>
                    </div>

                    <div className="bg-gray-800 rounded-xl shadow-xl hover:transform hover:scale-105 transition-all duration-300">
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
                                <FaRoute className="text-emerald-400" />
                                My created itineraries
                            </h3>
                            <div className="border-t border-emerald-500/20 mb-4"></div>
                            <p className="text-gray-400 text-center">No itineraries created yet</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;