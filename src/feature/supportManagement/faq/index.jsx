import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FaqFilter from './components/FaqFilter';
import FaqList from './components/FaqList';
import AddFaqModal from './components/AddFaqModal';
import ViewFaqModal from './components/ViewFaqModal';
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

const Faq = () => {
  const dispatch = useDispatch();
  const { showError } = useToast();
  const [searchParams] = useSearchParams();
  
  // Local state for faqs
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewingFaq, setViewingFaq] = useState(null);

  // Handle edit FAQ
  const handleEditFaq = (faq) => {
    setSelectedFaq(faq);
    setModalOpen(true);
  };

  // Handle view FAQ
  const handleViewFaq = (faq) => {
    setViewingFaq(faq);
    setViewModalOpen(true);
  };

  // Debounced fetch function
  const debouncedFetch = useRef(
    debounce(async (params = {}) => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiService.get('admin/faqs', params);
        const faqsData = response?.data || response || [];
        setFaqs(Array.isArray(faqsData) ? faqsData : []);
        
        // Extract pagination metadata from API response
        if (response?.pagination) {
          setTotalResults(response.pagination.total_items || faqsData.length);
        } else {
          setTotalResults(Array.isArray(faqsData) ? faqsData.length : 0);
        }
      } catch (error) {
        console.error('❌ FAQs fetch error:', error);
        setError(error.response?.data?.message || error.message);
        showError('Failed to load FAQs. Please try again.');
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

  // Handle filter changes
  const handleFilterChange = useCallback((filters) => {
    console.log('🔍 handleFilterChange received filters:', filters);
    
    const params = {
      page: 1,
      limit: rowsPerPage,
    };
    
    if (filters.query) {
      params.search = filters.query;
    }
    
    if (filters.filter && filters.filter !== 'all') {
      params.category = filters.filter;
    }
    
    if (filters.start_date && filters.start_date !== '') {
      params.start_date = filters.start_date;
    }
    
    if (filters.end_date && filters.end_date !== '') {
      params.end_date = filters.end_date;
    }

    console.log('📤 Calling debouncedFetch with params:', params);
    debouncedFetch(params);
    setPage(1);
  }, [debouncedFetch, rowsPerPage]);

  // Refresh immediately (used after actions)
  const refreshFaqs = useCallback(async () => {
    const params = {
      page: page,
      limit: rowsPerPage,
    };
    
    dispatch(showLoader({ text: 'Refreshing FAQs...', type: 'inline' }));
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.get('admin/faqs', params);
      const faqsData = response?.data || response || [];
      setFaqs(Array.isArray(faqsData) ? faqsData : []);
      
      if (response?.pagination) {
        setTotalResults(response.pagination.total_items || faqsData.length);
      } else {
        setTotalResults(Array.isArray(faqsData) ? faqsData.length : 0);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      showError('Failed to refresh FAQs. Please try again.');
      console.error('FAQs refresh error:', error);
    } finally {
      setLoading(false);
      dispatch(hideLoader());
    }
  }, [dispatch, showError, page, rowsPerPage]);

  // Handle add FAQ
  const handleAddFaq = () => {
    setSelectedFaq(null);
    setModalOpen(true);
  };

  // Build params from URL search params
  const buildParamsFromUrl = useCallback(() => {
    const params = {
      page: page,
      limit: rowsPerPage,
    };
    const search = searchParams.get('query') || searchParams.get('search');
    const category = searchParams.get('category');
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');

    if (search) params.search = search;
    if (category && category !== 'all') params.category = category;
    if (startDate) params.start_date = startDate;
    if (endDate) params.end_date = endDate;

    return params;
  }, [searchParams, page, rowsPerPage]);

  // Fetch FAQs when page, rowsPerPage, or URL filters change
  useEffect(() => {
    const params = buildParamsFromUrl();
    console.log('🔄 Fetch with params:', params);
    debouncedFetch(params);
  }, [buildParamsFromUrl, debouncedFetch]);

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <FaqFilter onFilterChange={handleFilterChange} refreshFaqs={refreshFaqs} onAddFaq={handleAddFaq} />
      </div>
      <div className="mb-6">
        <FaqList 
          faqs={faqs} 
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
          onView={handleViewFaq}
          onEdit={handleEditFaq}
        />
      </div>

      <AddFaqModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedFaq(null);
        }}
        onSave={refreshFaqs}
        faq={selectedFaq}
        isEdit={!!selectedFaq}
      />

      <ViewFaqModal
        open={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setViewingFaq(null);
        }}
        faq={viewingFaq}
      />
    </div>
  );
};

export default Faq;
