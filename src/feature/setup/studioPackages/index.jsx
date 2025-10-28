import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPackages } from '../../../store/slices/packageSlice';
import { showLoader, hideLoader } from '../../../store/slices/loaderSlice';
import { useUrlFilters } from '../../../hooks/useUrlFilters';
import StudioPackageTable from './components/StudioPackageTable';
import StudioPackageFilter from './components/StudioPackageFilter';
import AddStudioPackageModal from './components/AddStudioPackageModal';

const StudioPackage = () => {
  const dispatch = useDispatch();
  const { packages, loading, error } = useSelector((state) => state.package);
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  
  // URL filters with pagination
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const { filters, updateFilter, updateMultipleFilters, clearAllFilters } = useUrlFilters({
    search: '',
    category: 'all',
    start_date: '',
    end_date: ''
  });
  
  // Debounced fetch function
  const debouncedFetchRef = useRef(null);
  
  const fetchPackagesWithFilters = useCallback(async () => {
    const params = {
      page,
      limit: rowsPerPage,
    };
    
    // Add filter parameters
    if (filters.search) {
      params.search = filters.search;
    }
    
    if (filters.category && filters.category !== 'all') {
      params.category = filters.category;
    }
    
    // Handle date range - only add if both dates exist
    if (filters.start_date && filters.start_date !== '') {
      params.start_date = filters.start_date;
    }
    
    if (filters.end_date && filters.end_date !== '') {
      params.end_date = filters.end_date;
    }
    
    dispatch(showLoader({ text: 'Loading packages...', type: 'page' }));
    try {
      const response = await dispatch(fetchPackages(params)).unwrap();
      console.log('✅ Packages response:', response);
    } catch (error) {
      console.error('Failed to fetch packages:', error);
    } finally {
      dispatch(hideLoader());
    }
  }, [dispatch, filters, page, rowsPerPage]);
  
  // Fetch packages when filters, page, or rowsPerPage changes
  useEffect(() => {
    fetchPackagesWithFilters();
  }, [fetchPackagesWithFilters]);
  
  // Handle pagination
  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
    // fetchPackagesWithFilters will be called via useEffect
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(1);
    // fetchPackagesWithFilters will be called via useEffect
  }, []);

  // Refresh function for immediate updates
  const refreshPackages = useCallback(async () => {
    const params = {
      page,
      limit: rowsPerPage,
    };
    
    // Add filter parameters
    if (filters.search) {
      params.search = filters.search;
    }
    
    if (filters.category && filters.category !== 'all') {
      params.category = filters.category;
    }
    
    // Handle date range - only add if both dates exist
    if (filters.start_date && filters.start_date !== '') {
      params.start_date = filters.start_date;
    }
    
    if (filters.end_date && filters.end_date !== '') {
      params.end_date = filters.end_date;
    }
    
    dispatch(showLoader({ text: 'Refreshing packages...', type: 'inline' }));
    try {
      await dispatch(fetchPackages(params)).unwrap();
    } catch (error) {
      console.error('Failed to refresh packages:', error);
    } finally {
      dispatch(hideLoader());
    }
  }, [dispatch, filters, page, rowsPerPage]);

  // Handle edit package
  const handleEditPackage = (packageData) => {
    setSelectedPackage(packageData);
    setModalOpen(true);
  };

  // Handle add package
  const handleAddPackage = () => {
    setSelectedPackage(null);
    setModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <StudioPackageFilter 
        filters={filters}
        updateFilter={updateFilter}
        updateMultipleFilters={updateMultipleFilters}
        clearAllFilters={clearAllFilters}
        refreshPackages={refreshPackages}
        onAddPackage={handleAddPackage}
      />
      <StudioPackageTable 
        packages={packages}
        onEdit={handleEditPackage}
        pagination={{}}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        page={page - 1}
        rowsPerPage={rowsPerPage}
      />
      <AddStudioPackageModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedPackage(null);
        }}
        onSave={refreshPackages}
        packageId={selectedPackage?.id || selectedPackage?.package_id}
        isEdit={!!selectedPackage}
      />
    </div>
  );
};

export default StudioPackage;


