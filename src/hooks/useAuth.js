import { useSelector, useDispatch } from 'react-redux';
import { logout, getCurrentUser } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const refreshUser = async () => {
    try {
      await dispatch(getCurrentUser()).unwrap();
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  };

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    logout: handleLogout,
    refreshUser,
  };
};






