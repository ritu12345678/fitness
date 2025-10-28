import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TrainerFilter from './components/TrainerFilter';
import TrainerTable from './components/TrainerTable';
import AddTrainerModal from './components/AddTrainerModal';
import { fetchUsersByRole } from '../../store/slices/roleSlice';
import { showLoader, hideLoader } from '../../store/slices/loaderSlice';
import { useToast } from '../../hooks/useToast';
import { getTrainerRoleId } from '../../utils/roleHelpers';

// Simple debounce function
function debounce(fn, delay = 400) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

function Trainer() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const dispatch = useDispatch();
  const { trainers, loading, error, roles, rolesLoaded, pagination } = useSelector((state) => state.role);
  const { showError } = useToast();

  // Debounced fetch function
  const debouncedFetch = useRef(
    debounce(async (params = {}) => {
      const trainerRoleId = getTrainerRoleId(roles);
      if (trainerRoleId) {
        dispatch(fetchUsersByRole({ roleId: trainerRoleId, params }));
      }
    }, 400)
  ).current;

  // Handle pagination
  const handlePageChange = useCallback((event, newPage) => {
    setPage(newPage + 1); // MUI uses 0-based, API uses 1-based
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(1);
  }, []);

  // Handle filter changes (search, status, etc.)
  const handleFilterChange = useCallback((filters) => {
    console.log('🔍 handleFilterChange received filters:', filters);
    
    // Convert filters to API parameters
    const params = {
      page: 1, // Reset to first page when filters change
      limit: rowsPerPage,
    };
    
    if (filters.query) {
      params.search = filters.query;
    }
    
    if (filters.status && filters.status !== 'all') {
      params.status = filters.status;
    }
    
    // Handle date range - only add if both dates exist
    if (filters.start_date && filters.start_date !== '') {
      params.start_date = filters.start_date;
    }
    
    if (filters.end_date && filters.end_date !== '') {
      params.end_date = filters.end_date;
    }
    
    console.log('📤 Calling debouncedFetch with params:', params);
    
    // Use debounced API call
    debouncedFetch(params);
    setPage(1); // Reset to first page
  }, [debouncedFetch, rowsPerPage]);

  const handleAddTrainer = () => {
    setSelectedTrainer(null);
    setModalOpen(true);
  };

  // Refresh immediately (used after add/edit)
  const refreshTrainers = useCallback(() => {
    const trainerRoleId = getTrainerRoleId(roles);
    if (trainerRoleId) {
      const params = {
        page: page,
        limit: rowsPerPage,
      };
      dispatch(fetchUsersByRole({ roleId: trainerRoleId, params }));
    }
  }, [dispatch, roles, page, rowsPerPage]);

  // Open modal for edit
  const handleEditTrainer = (trainer) => {
    setSelectedTrainer(trainer);
    setModalOpen(true);
  };

  // Build params from URL search params
  const buildParamsFromUrl = useCallback(() => {
    const params = {
      page: page,
      limit: rowsPerPage,
    };
    
    // Add any additional filters if needed
    return params;
  }, [page, rowsPerPage]);

  // Fetch trainers when roles are loaded, page changes, or rowsPerPage changes
  useEffect(() => {
    if (rolesLoaded && roles.length > 0) {
      const trainerRoleId = getTrainerRoleId(roles);
      if (trainerRoleId) {
        const params = buildParamsFromUrl();
        console.log('🔄 Fetch with params:', params);
        dispatch(fetchUsersByRole({ roleId: trainerRoleId, params }));
      }
    }
  }, [rolesLoaded, roles, dispatch, buildParamsFromUrl, page, rowsPerPage]);

  return (
    <div className="space-y-4">
      <TrainerFilter 
        onFilterChange={handleFilterChange} 
        refreshTrainers={refreshTrainers} 
        onAddTrainer={handleAddTrainer}
      />
      <TrainerTable 
        trainers={trainers} 
        loading={loading} 
        error={error} 
        onEdit={handleEditTrainer}
        pagination={pagination}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        page={page - 1}
        rowsPerPage={rowsPerPage}
      />
      <AddTrainerModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedTrainer(null);
        }}
        onSave={refreshTrainers}
        trainer={selectedTrainer}
        isEdit={!!selectedTrainer}
      />
    </div>
  );
}
export default Trainer;

