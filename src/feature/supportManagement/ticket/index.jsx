import React, { useEffect, useState, useCallback, useRef } from 'react';
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
  const { showError } = useToast();
  
  // Local state for tickets
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);

  // Debounced fetch function - using same pattern as user component
  const debouncedFetch = useRef(
    debounce(async (params = {}) => {
 
      setLoading(true);
      setError(null);
      try {
        // Pass params as query parameters to the API
        const response = await apiService.get('admin/tickets', params);
        console.log('✅ Tickets response:', response);
        
        // Handle response - check if it's an array or object with data property
        const ticketsData = Array.isArray(response) ? response : (response.data || response);
        setTickets(ticketsData);
        setTotalResults(ticketsData.length);
      } catch (error) {
        console.error('❌ Tickets fetch error:', error);
        setError(error.response?.data?.message || error.message);
        showError('Failed to load tickets. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 400)
  ).current;

  // Handle filter changes (search, status, etc.)
  const handleFilterChange = useCallback((filters) => {
  
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


    // Use debounced API call with params
    debouncedFetch(params);
  }, [debouncedFetch]);

  // Refresh immediately (used after actions)
  const refreshTickets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.get('admin/tickets');
      const ticketsData = Array.isArray(response) ? response : (response.data || response);
      setTickets(ticketsData);
      setTotalResults(ticketsData.length);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      showError('Failed to refresh tickets. Please try again.');
      console.error('Tickets refresh error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    const loadTickets = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiService.get('admin/tickets');
        
        const ticketsData = response?.data
        setTickets(ticketsData);
        setTotalResults(ticketsData.length);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
        showError('Failed to load tickets. Please try again.');
        console.error('Tickets initial load error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadTickets();
  }, []); // Empty dependency array - similar to user component to avoid infinite calls

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <TicketFilter onFilterChange={handleFilterChange} refreshTickets={refreshTickets} />
      </div>
      <div className="mb-6">
        <TicketTable tickets={tickets} loading={loading} error={error} totalResults={totalResults} />
      </div>
    </div>
  );
};

export default Ticket;














