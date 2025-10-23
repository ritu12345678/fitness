import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import BatchFilter from './components/BatchFilter';
import BatchTable from './components/BatchTable';
import AddBatchModal from './components/AddBatchModal';
import { showLoader, hideLoader } from '../../store/slices/loaderSlice';
import { apiService } from '../../services/apiClient';
import { useToast } from '../../hooks/useToast';
import { useUrlFilters } from '../../hooks/useUrlFilters';

const Batch = () => {
  const dispatch = useDispatch();
  const { showError, showSuccess } = useToast();
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);

  // Define default filters for URL
  const defaultFilters = {
    query: '',
    filter: 'all',
    date: 'any'
  };

  // Use URL filters hook
  const { filters } = useUrlFilters(defaultFilters);

  // Use ref to store debounced function to prevent recreation
  const debouncedFetchBatchesRef = useRef(
    debounce(async (params) => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiService.get('admin/batches', params);

        const batchesData = response?.data?.batches || response?.batches || response?.data || response || [];
        const safeBatchesData = Array.isArray(batchesData) ? batchesData : [];
        setBatches(safeBatchesData);

        if (response?.pagination) {
          setTotalResults(response.pagination.totalResults || safeBatchesData.length);
        } else {
          setTotalResults(safeBatchesData.length);
        }

      } catch (err) {
        console.error('❌ API ERROR:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load batches');
        showError('Failed to load batches. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 500)
  );

  // Handle filter changes based on URL filters
  const handleFilterChange = useCallback(() => {
    const params = {
      page: 1,
      pageSize: pageSize
    };

    if (filters.query) {
      params.search = filters.query;
    }

    if (filters.filter && filters.filter !== 'all') {
      params.status = filters.filter;
    }

    if (filters.date && filters.date !== 'any') {
      params.date = filters.date;
    }

    setPage(1);
    debouncedFetchBatchesRef.current(params);
  }, [filters, pageSize]);

  // Watch for filter changes and trigger API call
  useEffect(() => {
    handleFilterChange();
  }, [handleFilterChange]);

  // Initial load - runs once on mount
  useEffect(() => {
    const loadBatches = async () => {
      try {
        dispatch(showLoader({ text: 'Loading batches...', type: 'page' }));

        const response = await apiService.get('admin/batches', {
          page: 1,
          pageSize: pageSize
        });

        const batchesData = response?.data?.batches || response?.batches || response?.data || response || [];
        setBatches(Array.isArray(batchesData) ? batchesData : []);

        if (response?.pagination) {
          setTotalResults(response?.pagination?.totalResults || batchesData.length);
        } else {
          setTotalResults(batchesData.length);
        }

      } catch (error) {
        setError(error.response?.data?.message || error.message || 'Failed to load batches');
        showError('Failed to load batches. Please try again.');
        console.error('Batch fetch error:', error);
      } finally {
        dispatch(hideLoader());
      }
    };

    loadBatches();
  }, []);

  // Handle pagination changes - separate useEffect
  useEffect(() => {
    if (page > 1) {
      debouncedFetchBatchesRef.current({ page, pageSize });
    }
  }, [page, pageSize]);

  const handlePageChange = (newPage) => {
    console.log('📄 Page changed to:', newPage);
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize) => {
    console.log('📊 Page size changed to:', newPageSize);
    setPageSize(newPageSize);
    setPage(1);
  };

  const handleBatchCreated = useCallback(async (batchData) => {
    try {
      // Refresh the batch list after successful creation
      debouncedFetchBatchesRef.current({ page: 1, pageSize });
    } catch (error) {
      showError('Failed to refresh batch list. Please try again.');
      console.error('Batch refresh error:', error);
    }
  }, [pageSize, showError]);

  const handleEditBatch = useCallback((batch) => {
    setSelectedBatch(batch);
    setEditModalOpen(true);
  }, []);

  const handleEditModalClose = useCallback(() => {
    setEditModalOpen(false);
    setSelectedBatch(null);
  }, []);

  const handleBatchUpdated = useCallback(async (batchData) => {
    try {
      // Refresh the batch list after successful update
      debouncedFetchBatchesRef.current({ page, pageSize });
      setEditModalOpen(false);
      setSelectedBatch(null);
    } catch (error) {
      showError('Failed to refresh batch list. Please try again.');
      console.error('Batch refresh error:', error);
    }
  }, [page, pageSize, showError]);

  const totalPages = Math.max(1, Math.ceil(totalResults / pageSize));

  if (error) {
    return (
      <div className="p-4">
        <div className="text-red-600 text-lg font-semibold">
          Error: {error}
        </div>
        <button
          onClick={() => debouncedFetchBatchesRef.current({ page: 1, pageSize })}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <BatchFilter onBatchCreated={handleBatchCreated} />
      <BatchTable
        data={batches}
        loading={loading}
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
        totalResults={totalResults}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onEdit={handleEditBatch}
      />
      <AddBatchModal
        open={editModalOpen}
        onClose={handleEditModalClose}
        onSave={handleBatchUpdated}
        batch={selectedBatch}
      />
    </div>
  );
};

// Simple debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default Batch;

