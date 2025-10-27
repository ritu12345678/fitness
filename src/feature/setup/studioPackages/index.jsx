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
  
  // URL filters
  const { filters, updateFilter, clearAllFilters } = useUrlFilters();
  
  // Debounced fetch function
  const debouncedFetchRef = useRef(null);
  
  const fetchPackagesWithFilters = useCallback(async () => {
    dispatch(showLoader({ text: 'Loading packages...', type: 'page' }));
    try {
      await dispatch(fetchPackages(filters)).unwrap();
    } catch (error) {
      console.error('Failed to fetch packages:', error);
    } finally {
      dispatch(hideLoader());
    }
  }, [dispatch, filters]);
  
  // Set up debounced fetch
  useEffect(() => {
    if (debouncedFetchRef.current) {
      clearTimeout(debouncedFetchRef.current);
    }
    
    debouncedFetchRef.current = setTimeout(() => {
      fetchPackagesWithFilters();
    }, 300);
    
    return () => {
      if (debouncedFetchRef.current) {
        clearTimeout(debouncedFetchRef.current);
      }
    };
  }, [fetchPackagesWithFilters]);
  
  // Initial fetch
  useEffect(() => {
    fetchPackagesWithFilters();
  }, []);
  
  // Refresh function for immediate updates
  const refreshPackages = useCallback(async () => {
    dispatch(showLoader({ text: 'Refreshing packages...', type: 'inline' }));
    try {
      await dispatch(fetchPackages(filters)).unwrap();
    } catch (error) {
      console.error('Failed to refresh packages:', error);
    } finally {
      dispatch(hideLoader());
    }
  }, [dispatch, filters]);

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
        clearAllFilters={clearAllFilters}
        refreshPackages={refreshPackages}
        onAddPackage={handleAddPackage}
      />
      <StudioPackageTable 
        packages={packages}
        onEdit={handleEditPackage}
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


