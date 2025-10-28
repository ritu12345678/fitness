import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';

/**
 * Simple custom hook for URL-based filters
 * @param {Object} defaultFilters - Default filter values
 * @returns {Object} - Filter state and control functions
 */
export const useUrlFilters = (defaultFilters = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Get filters from URL or use defaults
  const getFiltersFromUrl = () => {
    const filters = {};
    Object.keys(defaultFilters).forEach(key => {
      const value = searchParams.get(key);
      filters[key] = value || defaultFilters[key];
    });
    return filters;
  };

  const [filters, setFilters] = useState(getFiltersFromUrl);

  // Update URL when filters change
  const updateUrl = (newFilters) => {
    const newSearchParams = new URLSearchParams();
    
    Object.keys(newFilters).forEach(key => {
      const value = newFilters[key];
      // Skip empty strings and only add values that differ from defaults
      if (value && value !== '' && value !== defaultFilters[key]) {
        newSearchParams.set(key, value);
      }
    });

    const newUrl = `${location.pathname}?${newSearchParams.toString()}`;
    navigate(newUrl, { replace: true });
  };

  // Update a single filter
  const updateFilter = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    updateUrl(newFilters);
  };

  // Update multiple filters at once (to prevent race conditions)
  const updateMultipleFilters = (updates) => {
    const newFilters = { ...filters, ...updates };
    setFilters(newFilters);
    updateUrl(newFilters);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters(defaultFilters);
    navigate(location.pathname, { replace: true });
  };

  // Check if any filter is active
  const hasActiveFilters = Object.keys(filters).some(key => 
    filters[key] !== defaultFilters[key]
  );

  // Sync with URL changes
  useEffect(() => {
    setFilters(getFiltersFromUrl());
  }, [searchParams]);

  return {
    filters,
    updateFilter,
    updateMultipleFilters,
    clearAllFilters,
    hasActiveFilters
  };
};

export default useUrlFilters;
