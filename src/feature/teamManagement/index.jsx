import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import TeamRole from './components/TeamRole';
import TeamFilters from './components/TeamFilterSection';
import AddRoleModal from './components/AddRoleModal';
import { showLoader, hideLoader } from '../../store/slices/loaderSlice';
import { useToast } from '../../hooks/useToast';
import { apiService } from '../../services/apiClient';

// Simple debounce function
function debounce(fn, delay = 400) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

const TeamManagement = () => {
  const dispatch = useDispatch();
  const { showError } = useToast();
  
  // Local state for roles
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  // Debounced fetch function
  const debouncedFetch = useRef(
    debounce(async (params = {}) => {
      console.log('🔍 Fetching roles with params:', params);
      setLoading(true);
      setError(null);
      try {
        // Pass params as query parameters to the API
        const response = await apiService.get('admin/roles', params);
        console.log('✅ Roles response:', response);
        setRoles(response.data || response);
      } catch (error) {
        console.error('❌ Role fetch error:', error);
        setError(error.response?.data?.message || error.message);
        showError('Failed to load roles. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 400)
  ).current;

  // Handle filter changes
  const handleFilterChange = useCallback((filters) => {
    console.log('🔍 Filter change received:', filters);
    // Convert filters to API parameters
    const params = {};
    
    if (filters.query) {
      params.search = filters.query;
    }
    
    if (filters.status && filters.status !== 'all') {
      params.status = filters.status;
    }
    
    if (filters.date && filters.date !== 'any') {
      params.date = filters.date;
    }

    console.log('🔍 Converted params:', params);
    // Use debounced API call with params
    debouncedFetch(params);
  }, [debouncedFetch]);

  // Refresh immediately (used after actions)
  const refreshRoles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.get('admin/roles');
      setRoles(response.data || response);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      showError('Failed to refresh roles. Please try again.');
      console.error('Role refresh error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle edit role
  const handleEditRole = (role) => {
    setSelectedRole(role);
    setModalOpen(true);
  };

  // Handle add role
  const handleAddRole = () => {
    setSelectedRole(null);
    setModalOpen(true);
  };

  // Initial load
  useEffect(() => {
    const loadRoles = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiService.get('admin/roles');
        setRoles(response.data || response);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
        showError('Failed to load roles. Please try again.');
        console.error('Role initial load error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadRoles();
  }, []);

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <TeamFilters 
          onFilterChange={handleFilterChange}
          refreshRoles={refreshRoles}
          onAddRole={handleAddRole}
        />
      </div>
      
      <div className="mb-6">
        <TeamRole 
          roles={roles}
          loading={loading}
          error={error}
          onEdit={handleEditRole}
        />
      </div>

      <AddRoleModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedRole(null);
        }}
        onSave={refreshRoles}
        role={selectedRole}
        isEdit={!!selectedRole}
      />
    </div>
  );
};

export default TeamManagement;
