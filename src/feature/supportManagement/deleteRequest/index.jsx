import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DeleteRequestFilter from './components/DeleteRequestFilter';
import DeleteRequestTable from './components/DeleteRequestTable';
import { showLoader, hideLoader } from '../../../store/slices/loaderSlice';
import { useToast } from '../../../hooks/useToast';
import { apiService } from '../../../services/apiClient';

// Simple debounce function
function debounce(fn, delay = 400) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

const DeleteRequest = () => {
  const dispatch = useDispatch();
  const { showError } = useToast();
  const [searchParams] = useSearchParams();
  
  // Local state for delete requests
  const [deleteRequests, setDeleteRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Debounced fetch function - using same pattern as user component
  const debouncedFetch = useRef(
    debounce(async (params = {}) => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiService.get('admin/account-delete-requests', params);
        const requestsData = response?.data || response || [];
        setDeleteRequests(Array.isArray(requestsData) ? requestsData : []);
        
        if (response?.pagination) {
          setTotalResults(response.pagination.total_items || requestsData.length);
        } else {
          setTotalResults(Array.isArray(requestsData) ? requestsData.length : 0);
        }
      } catch (error) {
        console.error('❌ Delete requests fetch error:', error);
        setError(error.response?.data?.message || error.message);
        showError('Failed to load delete requests. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 400)
  ).current;

  // Pagination handlers
  const handlePageChange = useCallback((event, newPage) => {
    setPage(newPage + 1); // MUI uses 0-based, API uses 1-based
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(1);
  }, []);

  // Handle filter changes (search, filter, etc.)
  const handleFilterChange = useCallback((filters) => {
    const params = {
      page: 1,
      limit: rowsPerPage,
    };
    
    if (filters.query) {
      params.search = filters.query;
    }
    
    if (filters.filter && filters.filter !== 'all') {
      params.status = filters.filter;
    }
    
    if (filters.start_date && filters.start_date !== '') {
      params.start_date = filters.start_date;
    }
    
    if (filters.end_date && filters.end_date !== '') {
      params.end_date = filters.end_date;
    }

    debouncedFetch(params);
    setPage(1);
  }, [debouncedFetch, rowsPerPage]);

  // Refresh immediately (used after actions)
  const refreshDeleteRequests = useCallback(async () => {
    const params = {
      page: page,
      limit: rowsPerPage,
    };
    
    dispatch(showLoader({ text: 'Refreshing delete requests...', type: 'inline' }));
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.get('admin/account-delete-requests', params);
      const requestsData = response?.data || response || [];
      setDeleteRequests(Array.isArray(requestsData) ? requestsData : []);
      
      if (response?.pagination) {
        setTotalResults(response.pagination.total_items || requestsData.length);
      } else {
        setTotalResults(Array.isArray(requestsData) ? requestsData.length : 0);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      showError('Failed to refresh delete requests. Please try again.');
      console.error('Delete requests refresh error:', error);
    } finally {
      setLoading(false);
      dispatch(hideLoader());
    }
  }, [dispatch, showError, page, rowsPerPage]);

  // Build params from URL search params
  const buildParamsFromUrl = useCallback(() => {
    const params = {
      page: page,
      limit: rowsPerPage,
    };
    const search = searchParams.get('query') || searchParams.get('search');
    const status = searchParams.get('status') || searchParams.get('filter');
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');

    if (search) params.search = search;
    if (status && status !== 'all') params.status = status;
    if (startDate) params.start_date = startDate;
    if (endDate) params.end_date = endDate;

    return params;
  }, [searchParams, page, rowsPerPage]);

  // Fetch delete requests when page, rowsPerPage, or URL filters change
  useEffect(() => {
    const params = buildParamsFromUrl();
    debouncedFetch(params);
  }, [buildParamsFromUrl, debouncedFetch]);

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <DeleteRequestFilter onFilterChange={handleFilterChange} refreshDeleteRequests={refreshDeleteRequests} />
      </div>
      <div className="mb-6">
        <DeleteRequestTable 
          deleteRequests={deleteRequests} 
          loading={loading} 
          error={error} 
          totalResults={totalResults}
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
    </div>
  );
};

export default DeleteRequest;











