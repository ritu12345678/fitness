import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import BannerFilterSection from './components/BannerFilterSection';
import BannerGrid from './components/BannerGrid';
import PaginationBar from './components/PaginationBar';
import AddBannerModal from './components/AddBannerModal';
import { showLoader, hideLoader } from '../../store/slices/loaderSlice';
import { apiService } from '../../services/apiClient';
import { useToast } from '../../hooks/useToast';
import { useUrlFilters } from '../../hooks/useUrlFilters';

const Banner = () => {
  const dispatch = useDispatch();
  const { showError, showSuccess } = useToast();
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [totalResults, setTotalResults] = useState(0);
  const [editingBanner, setEditingBanner] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  // Define default filters for URL
  const defaultFilters = {
    query: '',
    filter: 'all',
    date: 'any'
  };

  // Use URL filters hook
  const { filters } = useUrlFilters(defaultFilters);

  // Use ref to store debounced function to prevent recreation
  const debouncedFetchBannersRef = useRef(
    debounce(async (params) => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 API CALL: Fetching banners with params:', params);
        
        const response = await apiService.get('admin/bannermanagements', params);
        
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
    }, 500)
  );

  // Handle filter changes based on URL filters
  const handleFilterChange = useCallback(() => {
    const params = {
      page: 1, // Reset to first page when filtering
      pageSize: pageSize
    };
    
    // Add filter parameters to API call
    if (filters.query) {
      params.search = filters.query;
    }
    
    if (filters.filter && filters.filter !== 'all') {
      params.status = filters.filter;
    }
    
    if (filters.date && filters.date !== 'any') {
      params.date = filters.date;
    }

    // Reset page to 1 when filtering
    setPage(1);
    
    console.log('🔄 Filter changed, calling API with params:', params);
    debouncedFetchBannersRef.current(params);
  }, [filters, pageSize]);

  // Watch for filter changes and trigger API call
  useEffect(() => {
    handleFilterChange();
  }, [handleFilterChange]);

  // Initial load on component mount - only run once
  useEffect(() => {
    const loadBanners = async () => {
      try {
        dispatch(showLoader({ text: 'Loading banners...', type: 'page' }));
        
        const response = await apiService.get('admin/bannermanagements', {
          page: 1,
          pageSize: pageSize
        });
        
        const bannersData = response?.data?.banners || response?.banners || response?.data || response || [];
        setBanners(Array.isArray(bannersData) ? bannersData : []);
        
        if (response?.pagination) {
          setTotalResults(response.pagination.totalResults || bannersData.length);
        } else {
          setTotalResults(bannersData.length);
        }
        
      } catch (error) {
        setError(error.response?.data?.message || error.message || 'Failed to load banners');
        showError('Failed to load banners. Please try again.');
        console.error('Banner fetch error:', error);
      } finally {
        dispatch(hideLoader());
      }
    };

    loadBanners();
  }, []); // Empty dependency array - only run once

  // Handle page change
  const handlePageChange = (newPage) => {
    console.log('📄 Page changed to:', newPage);
    setPage(newPage);
    debouncedFetchBannersRef.current({ page: newPage, pageSize });
  };

  // Handle page size change
  const handlePageSizeChange = (newPageSize) => {
    console.log('📊 Page size changed to:', newPageSize);
    setPageSize(newPageSize);
    setPage(1);
    debouncedFetchBannersRef.current({ page: 1, pageSize: newPageSize });
  };

  // Handle banner toggle
  const handleToggle = async (bannerId, status) => {
    try {
      console.log('🔍 Original bannerId:', bannerId, 'Type:', typeof bannerId);
      
      // Try to find the numeric ID from the banner object
      const banner = banners.find(b => b._id === bannerId || b.id === bannerId);
      console.log('🔍 Found banner:', banner);
      
      // Use numeric ID if available, otherwise try to parse the string
      let numericBannerId;
      if (banner?.id && typeof banner.id === 'number') {
        numericBannerId = banner.id;
      } else if (banner?.banner_id && typeof banner.banner_id === 'number') {
        numericBannerId = banner.banner_id;
      } else {
        // Try to extract numeric part from ObjectId or use as-is
        numericBannerId = typeof bannerId === 'string' ? parseInt(bannerId, 10) : bannerId;
      }
      
      console.log('🔄 Toggling banner status:', { banner_id: numericBannerId, status });
      
      // Call API with numeric banner_id and status
      await apiService.put('admin/bannermanagements', { 
        banner_id: numericBannerId, 
        status: status 
      });
      
      // Update local state - use the same field name as the API response
      setBanners(prevBanners => {
        console.log('🔍 Current banners:', prevBanners.map(b => ({ id: b.id, _id: b._id, status: b.status })));
        console.log('🔍 Looking for bannerId:', bannerId);
        
        const updatedBanners = prevBanners.map(banner => {
          const matches = banner.id === bannerId || banner._id === bannerId;
          console.log('🔍 Banner', banner._id || banner.id, 'matches:', matches);
          
          if (matches) {
            console.log('🔄 Updating banner:', banner._id || banner.id, 'from status:', banner.status, 'to:', status);
            return { ...banner, status: status };
          }
          return banner;
        });
        
        console.log('✅ Updated banners state:', updatedBanners);
        return updatedBanners;
      });
      
      showSuccess(`Banner ${status ? 'activated' : 'deactivated'} successfully!`);
    } catch (error) {
      console.error('❌ Banner toggle error:', error);
      showError('Failed to update banner status. Please try again.');
    }
  };

  // Handle banner edit
  const handleEdit = (banner) => {
    console.log('Edit banner:', banner);
    setEditingBanner(banner);
    setOpenEditModal(true);
  };

  // Handle banner creation - refresh the banner list
  const handleBannerCreated = useCallback(async (bannerData) => {
    try {
      // Refresh the banner list after successful creation
      debouncedFetchBannersRef.current({ page: 1, pageSize });
    } catch (error) {
      showError('Failed to refresh banner list. Please try again.');
      console.error('Banner refresh error:', error);
    }
  }, [pageSize, showError]);

  const totalPages = Math.max(1, Math.ceil(totalResults / pageSize));

  if (error) {
    return (
      <div className="p-4">
        <div className="text-red-600 text-lg font-semibold">
          Error: {error}
        </div>
        <button 
          onClick={() => debouncedFetchBannersRef.current({ page: 1, pageSize })}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <BannerFilterSection onBannerCreated={handleBannerCreated} />
      
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

      {/* Edit Banner Modal */}
      <AddBannerModal
        open={openEditModal}
        onClose={() => {
          setOpenEditModal(false);
          setEditingBanner(null);
        }}
        onSave={handleBannerCreated}
        banner={editingBanner}
        isEdit={true}
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

export default Banner;