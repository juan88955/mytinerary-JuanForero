import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { processGoogleResponse } from '../store/slices/authSlice';

const GoogleCallback = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const processAuth = () => {
            try {
                const encodedData = searchParams.get('data');
                if (!encodedData) {
                    throw new Error('No authentication data received');
                }

                const data = JSON.parse(decodeURIComponent(encodedData));
                console.log('Received data in callback:', data);

                if (data.success) {
                    dispatch(processGoogleResponse(data));
                    navigate('/dashboard', { replace: true });
                } else {
                    throw new Error(data.message || 'Authentication failed');
                }
            } catch (error) {
                console.error('Error processing authentication:', error);
                navigate('/signin', { replace: true });
            }
        };

        processAuth();
    }, [searchParams, dispatch, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
                <p className="mt-4 text-lg text-gray-600">Processing authentication...</p>
            </div>
        </div>
    );
};

export default GoogleCallback;