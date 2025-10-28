import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  const [searchParams] = useSearchParams();
  const { showError } = useToast();
  // Keep a stable reference to showError to avoid effect re-runs
  const showErrorRef = useRef(showError);
  useEffect(() => {
    showErrorRef.current = showError;
  }, [showError]);
  
  // Local state for team members
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  
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
        
        // Handle paginated response structure
        const membersData = response?.data || response || [];
        setTeamMembers(Array.isArray(membersData) ? membersData : []);
        
        // Extract pagination metadata from API response
        if (response?.pagination) {
          setTotalResults(response.pagination.total_items || membersData.length);
        } else {
          setTotalResults(membersData.length);
        }
      } catch (error) {
        console.error('❌ Team members fetch error:', error);
        setError(error.response?.data?.message || error.message);
        showErrorRef.current('Failed to load team members. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 400)
  ).current;

  // Handle filter changes
  const handleFilterChange = useCallback((filters) => {
    console.log('🔍 Filter change received:', filters);
    // Convert filters to API parameters
    const params = {
      page: 1,
      limit: rowsPerPage,
    };
    
    if (filters.query) {
      params.search = filters.query;
    }
    
    if (filters.status && filters.status !== 'all') {
      params.status = filters.status === 'active' ? true : false;
    }
    
    // Handle date range - only add if both dates exist
    if (filters.start_date && filters.start_date !== '') {
      params.start_date = filters.start_date;
    }
    
    if (filters.end_date && filters.end_date !== '') {
      params.end_date = filters.end_date;
    }

    console.log('🔍 Converted params:', params);
    // Use debounced API call with params
    debouncedFetch(params);
    setPage(1); // Reset to first page
  }, [debouncedFetch, rowsPerPage]);

  // Handle pagination changes
  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(1);
  }, []);

  // Refresh immediately (used after actions)
  const refreshTeamMembers = useCallback(async () => {
    const params = {
      page: page,
      limit: rowsPerPage,
    };
    
    dispatch(showLoader({ text: 'Refreshing team members...', type: 'inline' }));
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.get('admin/team-members', params);
      
      // Handle paginated response structure
      const membersData = response?.data || response || [];
      setTeamMembers(Array.isArray(membersData) ? membersData : []);
      
      // Extract pagination metadata from API response
      if (response?.pagination) {
        setTotalResults(response.pagination.total_items || membersData.length);
      } else {
        setTotalResults(membersData.length);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      showError('Failed to refresh team members. Please try again.');
      console.error('Team members refresh error:', error);
    } finally {
      setLoading(false);
      dispatch(hideLoader());
    }
  }, [dispatch, page, rowsPerPage]);

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

  // Build params from URL search params
  const buildParamsFromUrl = useCallback(() => {
    const params = {
      page: page,
      limit: rowsPerPage,
    };
    const search = searchParams.get('query') || searchParams.get('search');
    const status = searchParams.get('status');
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');

    if (search) params.search = search;
    if (status && status !== 'all') params.status = status === 'active' ? true : false;
    if (startDate) params.start_date = startDate;
    if (endDate) params.end_date = endDate;

    return params;
  }, [searchParams, page, rowsPerPage]);

  // Fetch team members when page, rowsPerPage, or URL filters change
  useEffect(() => {
    const params = buildParamsFromUrl();
    debouncedFetch(params);
  }, [buildParamsFromUrl, debouncedFetch]);

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
          pagination={{
            current_page: page,
            total_items: totalResults,
            items_per_page: rowsPerPage,
            total_pages: Math.ceil(totalResults / rowsPerPage)
          }}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          page={page - 1}
          rowsPerPage={rowsPerPage}
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


