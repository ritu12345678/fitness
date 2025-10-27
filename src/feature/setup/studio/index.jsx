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
  const { filters, updateFilter, clearAllFilters } = useUrlFilters({
    query: '',
    status: 'all',
    date: 'any'
  });

  // Debounced fetch function
  const debouncedFetch = useRef(
    debounce(async (params = {}) => {
      dispatch(showLoader({ text: 'Loading studios...', type: 'page' }));
      try {
        await dispatch(fetchStudios(params)).unwrap();
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
    const params = {};
    
    if (currentFilters.query) {
      params.search = currentFilters.query;
    }
    
    if (currentFilters.status && currentFilters.status !== 'all') {
      params.status = currentFilters.status;
    }
    
    if (currentFilters.date && currentFilters.date !== 'any') {
      params.date = currentFilters.date;
    }

    // Use debounced API call
    debouncedFetch(params);
  }, [debouncedFetch]);

  const handleAddStudio = () => {
    setSelectedStudio(null);
    setModalOpen(true);
  };

  // Refresh immediately (used after add/edit)
  const refreshStudios = useCallback(async () => {
    dispatch(showLoader({ text: 'Refreshing studios...', type: 'inline' }));
    try {
      await dispatch(fetchStudios()).unwrap();
    } catch (error) {
      showError('Failed to refresh studios. Please try again.');
      console.error('Studio refresh error:', error);
    } finally {
      dispatch(hideLoader());
    }
  }, [dispatch]);

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













