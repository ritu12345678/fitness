import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StudioFilter from './components/StudioFilter';
import StudioGrid from './components/StudioGrid';
import StudioModal from './components/StudioModal';
import { fetchStudios } from '../../../store/slices/studioSlice';
import { showLoader, hideLoader } from '../../../store/slices/loaderSlice';
import { useToast } from '../../../hooks/useToast';
import { useUrlFilters } from '../../../hooks/useUrlFilters';

// Simple debounce function
function debounce(fn, delay = 400) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

const Studio = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudio, setSelectedStudio] = useState(null);

  const dispatch = useDispatch();
  const { studios, loading, error } = useSelector((state) => state.studio);
  const { showError } = useToast();
  
  // URL filters
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(9);
  const [totalResults, setTotalResults] = useState(0);
  
  const { filters, updateFilter, updateMultipleFilters, clearAllFilters } = useUrlFilters({
    query: '',
    status: 'all',
    start_date: '',
    end_date: ''
  });

  // Debounced fetch function
  const debouncedFetch = useRef(
    debounce(async (params = {}) => {
      dispatch(showLoader({ text: 'Loading studios...', type: 'page' }));
      try {
        const response = await dispatch(fetchStudios(params)).unwrap();
        
        // Extract pagination metadata from API response
        if (response?.pagination) {
          setTotalResults(response.pagination.total_items || studios.length);
        } else {
          setTotalResults(studios.length);
        }
      } catch (error) {
        showError('Failed to load studios. Please try again.');
        console.error('Studio fetch error:', error);
      } finally {
        dispatch(hideLoader());
      }
    }, 400)
  ).current;

  // Handle filter changes
  const handleFilterChange = useCallback((currentFilters) => {
    // Convert filters to API parameters
    const params = {
      page: 1,
      limit: rowsPerPage,
    };
    
    if (currentFilters.query) {
      params.search = currentFilters.query;
    }
    
    if (currentFilters.status && currentFilters.status !== 'all') {
      params.status = currentFilters.status === 'active' ? true : false;
    }
    
    // Handle date range - only add if both dates exist
    if (currentFilters.start_date && currentFilters.start_date !== '') {
      params.start_date = currentFilters.start_date;
    }
    
    if (currentFilters.end_date && currentFilters.end_date !== '') {
      params.end_date = currentFilters.end_date;
    }

    // Use debounced API call
    debouncedFetch(params);
    setPage(1); // Reset to first page
  }, [debouncedFetch, rowsPerPage]);

  const handleAddStudio = () => {
    setSelectedStudio(null);
    setModalOpen(true);
  };

  // Handle pagination
  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(1);
  }, []);

  // Refresh immediately (used after add/edit)
  const refreshStudios = useCallback(async () => {
    const params = {
      page,
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
    
    dispatch(showLoader({ text: 'Refreshing studios...', type: 'inline' }));
    try {
      const response = await dispatch(fetchStudios(params)).unwrap();
      
      // Extract pagination metadata from API response
      if (response?.pagination) {
        setTotalResults(response.pagination.total_items || studios.length);
      } else {
        setTotalResults(studios.length);
      }
    } catch (error) {
      showError('Failed to refresh studios. Please try again.');
      console.error('Studio refresh error:', error);
    } finally {
      dispatch(hideLoader());
    }
  }, [dispatch, showError, page, rowsPerPage, filters]);

  // Open modal for edit
  const handleEditStudio = (studio) => {
    setSelectedStudio(studio);
    setModalOpen(true);
  };

  // Initial load
  useEffect(() => {
    const loadStudios = async () => {
      dispatch(showLoader({ text: 'Loading studios...', type: 'page' }));
      try {
        await dispatch(fetchStudios()).unwrap();
      } catch (error) {
        showError('Failed to load studios. Please try again.');
        console.error('Studio initial load error:', error);
      } finally {
        dispatch(hideLoader());
      }
    };
    
    loadStudios();
  }, [dispatch]);

  return (
    <div className="space-y-4">
      <StudioFilter 
        refreshStudios={refreshStudios}
        filters={filters}
        updateFilter={updateFilter}
        updateMultipleFilters={updateMultipleFilters}
        clearFilters={clearAllFilters}
        onFilterChange={handleFilterChange}
      />
      <StudioGrid 
        studios={studios}
        loading={loading}
        error={error}
        onEdit={handleEditStudio}
      />
      <StudioModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedStudio(null);
        }}
        onSave={refreshStudios}
        studio={selectedStudio}
        isEdit={!!selectedStudio}
      />
    </div>
  );
};

export default Studio;













