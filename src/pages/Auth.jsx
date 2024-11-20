import React from 'react';
import { useParams } from 'react-router-dom';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

const Auth = () => {
    const { action } = useParams();

    return (
            <div className="min-h-screen flex items-center justify-center bg-slate-500">
                {action === 'signup' ? <SignUp /> : <SignIn />}
            </div>
    );
};

export default Auth;