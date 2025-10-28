import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import TicketFilter from './components/TicketFilter';
import TicketTable from './components/TicketTable';
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

const Ticket = () => {
  const dispatch = useDispatch();
  const { showError } = useToast();
  const [searchParams] = useSearchParams();
  
  // Local state for tickets
  const [tickets, setTickets] = useState([]);
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
        // Pass params as query parameters to the API
        const response = await apiService.get('admin/tickets', params);
        console.log('✅ Tickets response:', response);
        
        // Handle paginated response structure
        const ticketsData = response?.data || response || [];
        setTickets(Array.isArray(ticketsData) ? ticketsData : []);
        
        // Extract pagination metadata from API response
        if (response?.pagination) {
          setTotalResults(response.pagination.total_items || ticketsData.length);
        } else {
          setTotalResults(Array.isArray(ticketsData) ? ticketsData.length : 0);
        }
      } catch (error) {
        console.error('❌ Tickets fetch error:', error);
        setError(error.response?.data?.message || error.message);
        showError('Failed to load tickets. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 400)
  ).current;

  // Handle pagination changes
  const handlePageChange = useCallback((event, newPage) => {
    setPage(newPage + 1); // MUI uses 0-based, API uses 1-based
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(1); // Reset to first page when changing rows per page
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

  // Refresh immediately (used after actions)
  const refreshTickets = useCallback(async () => {
    const params = {
      page: page,
      limit: rowsPerPage,
    };
    
    dispatch(showLoader({ text: 'Refreshing tickets...', type: 'inline' }));
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.get('admin/tickets', params);
      
      // Handle paginated response structure
      const ticketsData = response?.data || response || [];
      setTickets(Array.isArray(ticketsData) ? ticketsData : []);
      
      // Extract pagination metadata from API response
      if (response?.pagination) {
        setTotalResults(response.pagination.total_items || ticketsData.length);
      } else {
        setTotalResults(Array.isArray(ticketsData) ? ticketsData.length : 0);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      showError('Failed to refresh tickets. Please try again.');
      console.error('Tickets refresh error:', error);
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
    const status = searchParams.get('status');
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');

    if (search) params.search = search;
    if (status && status !== 'all') params.status = status;
    if (startDate) params.start_date = startDate;
    if (endDate) params.end_date = endDate;

    return params;
  }, [searchParams, page, rowsPerPage]);

  // Fetch tickets when page, rowsPerPage, or URL filters change
  useEffect(() => {
    const params = buildParamsFromUrl();
    console.log('🔄 Fetch with params:', params);
    debouncedFetch(params);
  }, [buildParamsFromUrl, debouncedFetch]);

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <TicketFilter onFilterChange={handleFilterChange} refreshTickets={refreshTickets} />
      </div>
      <div className="mb-6">
        <TicketTable 
          tickets={tickets} 
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

export default Ticket;














