import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DetailHeader from './components/DetailHeader';
import DetailTabs from './components/DetailTabs';
import AddUserModal from '../components/AddUserModal';
import { showLoader, hideLoader } from '../../../store/slices/loaderSlice';
import { apiService } from '../../../services/apiClient';
import { useToast } from '../../../hooks/useToast';

function UserDetailPage() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { showError, showSuccess } = useToast();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const hasFetched = useRef(false);

  useEffect(() => {
    // Prevent multiple API calls for the same userId
    if (!userId || hasFetched.current) return;

    hasFetched.current = true;

    const fetchUserDetail = async () => {
      try {
        // Show loader
        dispatch(showLoader({
          text: 'Loading user details...',
          type: 'page'
        }));

        // Call API directly in component
        const response = await apiService.get(`users/${userId}`);

        // Debug: Log the full API response to see subscription data structure
        console.log('🔍 Full User Detail API Response:', response);
        console.log('🔍 User Data:', response?.data);
        console.log('🔍 Subscription Data (packageMapUsers):', response?.data?.packageMapUsers);
        console.log('🔍 All Available Fields:', Object.keys(response?.data || {}));

        // Set user data
        setUser(response?.data);
        setError(null);

      } catch (err) {
        console.error('Error fetching user detail:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load user details');
        showError('Failed to load user details');
      } finally {
        // Hide loader
        dispatch(hideLoader());
      }
    };

    fetchUserDetail();
  }, [userId]); // Only depend on userId

  // Reset hasFetched when userId changes
  useEffect(() => {
    hasFetched.current = false;
  }, [userId]);

  const handleEdit = () => {
    setOpenEditModal(true);
  };

  const handleEditSave = async (updatedUser) => {
    try {
      // Refresh user data after successful update
      const response = await apiService.get(`users/${userId}`);
      setUser(response?.data);
      setOpenEditModal(false);
      showSuccess('User updated successfully!');
    } catch (error) {
      console.error('Error refreshing user data:', error);
      showError('Failed to refresh user data');
    }
  };

  if (error) {
    return (
      <div className="p-4">
        <div className="text-red-600 text-lg font-semibold">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // GlobalLoader will handle the loading state
  }

  return (
    <div className="space-y-4 bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <DetailHeader user={user?.user || user} onEdit={handleEdit} />
      <DetailTabs user={user} />
      
      {/* Edit User Modal */}
      <AddUserModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        onSave={handleEditSave}
        user={user?.user || user}
        isEdit={true}
      />
    </div>
  );
}

export default UserDetailPage;

