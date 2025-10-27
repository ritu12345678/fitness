import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import TeamMemberTable from './components/TeamMemberTable';
import TeamMemberFilters from './components/TeamMemberFilters';
import AddTeamMemberModal from './components/AddTeamMemberModal';
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

const TeamList = () => {
  const dispatch = useDispatch();
  const { showError } = useToast();
  
  // Local state for team members
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // Debounced fetch function
  const debouncedFetch = useRef(
    debounce(async (params = {}) => {
      console.log('🔍 Fetching team members with params:', params);
      setLoading(true);
      setError(null);
      try {
        // Pass params as query parameters to the API
        const response = await apiService.get('admin/team-members', params);
        console.log('✅ Team members response:', response);
        setTeamMembers(response.data || response);
      } catch (error) {
        console.error('❌ Team members fetch error:', error);
        setError(error.response?.data?.message || error.message);
        showError('Failed to load team members. Please try again.');
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
  const refreshTeamMembers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.get('admin/team-members');
      setTeamMembers(response.data || response);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      showError('Failed to refresh team members. Please try again.');
      console.error('Team members refresh error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle edit team member
  const handleEditMember = (member) => {
    setSelectedMember(member);
    setModalOpen(true);
  };

  // Handle add team member
  const handleAddMember = () => {
    setSelectedMember(null);
    setModalOpen(true);
  };

  // Initial load
  useEffect(() => {
    const loadTeamMembers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiService.get('admin/team-members');
        setTeamMembers(response.data || response);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
        showError('Failed to load team members. Please try again.');
        console.error('Team members initial load error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadTeamMembers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <TeamMemberFilters 
          onFilterChange={handleFilterChange}
          refreshTeamMembers={refreshTeamMembers}
          onAddMember={handleAddMember}
        />
      </div>
      
      <div className="mb-6">
        <TeamMemberTable 
          teamMembers={teamMembers}
          loading={loading}
          error={error}
          onEdit={handleEditMember}
        />
      </div>

      <AddTeamMemberModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedMember(null);
        }}
        onSave={refreshTeamMembers}
        member={selectedMember}
        isEdit={!!selectedMember}
      />
    </div>
  );
};

export default TeamList;
