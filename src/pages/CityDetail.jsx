// CityDetail.js
import React from 'react';
import { Link } from 'react-router-dom';

const CityDetail = () => {
    return (
        <div className="min-h-screen bg-slate-500 flex flex-col items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full overflow-hidden text-center p-8">
                <h1 className="text-4xl font-bold mb-6">Under Construction</h1>
                <p className="text-xl mb-8">This page is currently under development.</p>
                <Link
                    to="/cities"
                    className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900 transition duration-300 text-lg inline-block"
                >
                    Back to Cities
                </Link>
            </div>
        </div>
    );
};

export default CityDetail;