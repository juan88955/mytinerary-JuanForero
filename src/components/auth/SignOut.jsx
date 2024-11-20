import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOut, selectAuthError, selectAuthLoading, selectAuthSuccess } from '../../store/slices/authSlice';

const SignOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const success = useSelector(selectAuthSuccess);

  const handleSignOut = async () => {
    await dispatch(signOut());
    if (!error) {
      navigate('/');
    }
  };

  return (
    <div>
      <button
        onClick={handleSignOut}
        className="text-white hover:text-gray-300 transition duration-300 flex items-center gap-2"
        disabled={loading}
      >
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
        {loading ? 'Signing Out...' : 'Sign Out'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </div>
  );
};

export default SignOut;
