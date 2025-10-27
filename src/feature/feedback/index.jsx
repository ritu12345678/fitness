import React, { useEffect, useState, useCallback, useRef } from 'react';
import FeedbackFilter from './components/FeedbackFilter';
import FeedbackTable from './components/FeedbackTable';
import PaginationBar from '../banner/components/PaginationBar';
import { apiService } from '../../services/apiClient';
import { useToast } from '../../hooks/useToast';
import { showLoader, hideLoader } from '../../store/slices/loaderSlice';
import { useDispatch } from 'react-redux';

// Simple debounce function
function debounce(fn, delay = 400) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

function FeedbackFeature() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  
  const dispatch = useDispatch();
  const { showError } = useToast();
  
  const totalPages = Math.max(1, Math.ceil(totalResults / pageSize));

  // Debounced fetch function
  const debouncedFetch = useRef(
    debounce(async (params = {}) => {
      dispatch(showLoader({ text: 'Loading feedbacks...', type: 'page' }));
      try {
        const response = await apiService.get('admin/feedbacks/getallfeedback', params);
        console.log(response  )
        const feedbacksData = response?.data|| [];
        setFeedbacks(Array.isArray(feedbacksData) ? feedbacksData : []);
        
        // Update pagination if provided
        if (response?.pagination) {
          setTotalResults(response.pagination.totalResults || feedbacksData.length);
        } else {
          setTotalResults(feedbacksData.length);
        }
      } catch (error) {
        showError('Failed to load feedbacks. Please try again.');
        console.error('Feedback fetch error:', error);
        setError(error.message);
      } finally {
        dispatch(hideLoader());
      }
    }, 400)
  ).current;
      console.log("response",feedbacks  )
  // Handle filter changes
  const handleFilterChange = useCallback((filters) => {
    // Convert filters to API parameters
    const params = {
      page: 1,
      pageSize: pageSize,
      ...filters
    };
    
    if (filters.query) {
      params.search = filters.query;
    }
    
    if (filters.status && filters.status !== 'all') {
      params.status = filters.status;
    }
    
    if (filters.date && filters.date !== 'any') {
      params.date = filters.date;
    }

    // Use debounced API call
    debouncedFetch(params);
    setPage(1); // Reset to first page when filtering
  }, [debouncedFetch, pageSize]);

  // Refresh immediately (used after actions)
  const refreshFeedbacks = useCallback(async () => {
    dispatch(showLoader({ text: 'Refreshing feedbacks...', type: 'inline' }));
    try {
      const response = await apiService.get('admin/feedbacks/getallfeedback', {
        page,
        pageSize
      });
      const feedbacksData = response?.data?.feedbacks || response?.feedbacks || response || [];
      setFeedbacks(Array.isArray(feedbacksData) ? feedbacksData : []);
      
      if (response?.pagination) {
        setTotalResults(response.pagination.totalResults || feedbacksData.length);
      } else {
        setTotalResults(feedbacksData.length);
      }
    } catch (error) {
      showError('Failed to refresh feedbacks. Please try again.');
      console.error('Feedback refresh error:', error);
    } finally {
      dispatch(hideLoader());
    }
  }, [dispatch, showError, page, pageSize]);

  // Handle page change
  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
    debouncedFetch({ page: newPage, pageSize });
  }, [debouncedFetch, pageSize]);

  // Handle page size change
  const handlePageSizeChange = useCallback((newPageSize) => {
    setPageSize(newPageSize);
    setPage(1);
    debouncedFetch({ page: 1, pageSize: newPageSize });
  }, [debouncedFetch]);

  // Initial load
  useEffect(() => {
    const loadFeedbacks = async () => {
      dispatch(showLoader({ text: 'Loading feedbacks...', type: 'page' }));
      try {
        const response = await apiService.get('admin/feedbacks/getallfeedback', {
          page,
          pageSize
        });
        const feedbacksData = response?.data?.feedbacks || response?.feedbacks || response || [];
        setFeedbacks(Array.isArray(feedbacksData) ? feedbacksData : []);
        
        if (response?.pagination) {
          setTotalResults(response.pagination.totalResults || feedbacksData.length);
        } else {
          setTotalResults(feedbacksData.length);
        }
      } catch (error) {
        showError('Failed to load feedbacks. Please try again.');
        console.error('Feedback initial load error:', error);
        setError(error.message);
      } finally {
        dispatch(hideLoader());
      }
    };
    
    loadFeedbacks();
  }, [dispatch]);

  return (
    <div className='space-y-6'>
      <FeedbackFilter 
        onFilterChange={handleFilterChange}
        refreshFeedbacks={refreshFeedbacks}
      />
      <FeedbackTable 
        feedbacks={feedbacks}
        loading={loading}
        error={error}
      />
      <PaginationBar
        currentPage={page}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        totalResults={totalResults}
      />
    </div>
  );
}

export default FeedbackFeature














