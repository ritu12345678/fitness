import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import BannerFilterSection from './components/BannerFilterSection';
import BannerGrid from './components/BannerGrid';
import PaginationBar from './components/PaginationBar';
import { showLoader, hideLoader } from '../../store/slices/loaderSlice';
import { apiService } from '../../services/apiClient';
import { useToast } from '../../hooks/useToast';

const Banner = () => {
  const dispatch = useDispatch();
  const { showError, showSuccess } = useToast();
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [totalResults, setTotalResults] = useState(0);

  // Simple fetch function - NO useCallback
  const fetchBanners = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 API CALL: Fetching banners with params:', { page, pageSize, ...params });
      
      const response = await apiService.get('admin/bannermanagements', {
        page,
        pageSize,
        ...params
      });
      
      console.log('✅ API RESPONSE:', response);
      
      const bannersData = response?.data?.banners || response?.banners || response?.data || response || [];
      setBanners(Array.isArray(bannersData) ? bannersData : []);
      
      if (response?.pagination) {
        setTotalResults(response.pagination.totalResults || bannersData.length);
      } else {
        setTotalResults(bannersData.length);
      }
      
    } catch (err) {
      console.error('❌ API ERROR:', err);
      setError(err.response?.data?.message || err.message || 'Failed to load banners');
      showError('Failed to load banners. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ONLY run once on mount - NO dependencies
  useEffect(() => {
    console.log('🚀 COMPONENT MOUNTED - Making initial API call');
    dispatch(showLoader({ text: 'Loading banners...', type: 'page' }));
    fetchBanners().finally(() => {
      dispatch(hideLoader());
    });
  }, []); // Empty array = run once only

  // Handle page change
  const handlePageChange = (newPage) => {
    console.log('📄 Page changed to:', newPage);
    setPage(newPage);
    fetchBanners(); // Direct call
  };

  // Handle page size change
  const handlePageSizeChange = (newPageSize) => {
    console.log('📊 Page size changed to:', newPageSize);
    setPageSize(newPageSize);
    setPage(1);
    fetchBanners(); // Direct call
  };

  // Handle banner toggle
  const handleToggle = async (id, active) => {
    try {
      await apiService.put(`admin/bannermanagements/${id}`, { active });
      
      setBanners(prevBanners => 
        prevBanners.map(banner => 
          banner.id === id ? { ...banner, active } : banner
        )
      );
      
      showSuccess(`Banner ${active ? 'activated' : 'deactivated'} successfully!`);
    } catch (error) {
      showError('Failed to update banner status. Please try again.');
      console.error('Banner toggle error:', error);
    }
  };

  // Handle banner edit
  const handleEdit = (id) => {
    console.log('Edit banner:', id);
  };

  // Handle filter change
  const handleFilterChange = (filters) => {
    console.log('🔍 Filter changed:', filters);
    fetchBanners(filters); // Direct call
  };

  const totalPages = Math.max(1, Math.ceil(totalResults / pageSize));

  if (error) {
    return (
      <div className="p-4">
        <div className="text-red-600 text-lg font-semibold">
          Error: {error}
        </div>
        <button 
          onClick={() => fetchBanners()}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <BannerFilterSection onFilterChange={handleFilterChange} />
      
      <BannerGrid 
        items={banners} 
        onToggle={handleToggle}
        onEdit={handleEdit}
        loading={loading}
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
};

export default Banner;







