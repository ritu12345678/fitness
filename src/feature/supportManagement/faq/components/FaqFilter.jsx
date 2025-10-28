import React from 'react';
import CustomSelect from '../../../../components/CustomSelect';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import MenuItem from '@mui/material/MenuItem';
import DateRangePicker from '../../../../components/DateRangePicker';
import { useUrlFilters } from '../../../../hooks/useUrlFilters';

const FaqFilter = ({ onFilterChange, refreshFaqs, onAddFaq }) => {

  // Define default filters with start_date and end_date
  const defaultFilters = {
    query: '',
    filter: 'all',
    start_date: '',
    end_date: ''
  };

  // Use URL filters hook
  const { filters, updateFilter, updateMultipleFilters, clearAllFilters, hasActiveFilters } = useUrlFilters(defaultFilters);

  // Notify parent component when filters change
  React.useEffect(() => {
    console.log('🔍 FaqFilter - filters changed:', filters);
    onFilterChange?.(filters);
  }, [filters, onFilterChange]);

  const handleExport = () => {
    console.log('Export FAQs');
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex items-center gap-3">
        <div className="flex-1">
          <input
            value={filters.query}
            onChange={(e) => updateFilter('query', e.target.value)}
            placeholder="Search FAQs..."
            className="w-full rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
        <div className="w-36">
          <CustomSelect
            size="small"
            value={filters.filter}
            onChange={(e) => updateFilter('filter', e.target.value)}
            SelectProps={{
              renderValue: (val) => (
                <span className="inline-flex items-center gap-1">
                  <FilterAltOutlinedIcon sx={{ fontSize: 18, color: '#9ca3af' }} />
                  {val === 'all' ? 'All Filter' : val}
                </span>
              ),
            }}
          >
            <MenuItem value="all">
              <span className="inline-flex items-center gap-2">
                <FilterAltOutlinedIcon sx={{ fontSize: 18, color: '#9ca3af' }} />
                All Filter
              </span>
            </MenuItem>
            <MenuItem value="General">General</MenuItem>
            <MenuItem value="Technical">Technical</MenuItem>
            <MenuItem value="Billing">Billing</MenuItem>
          </CustomSelect>
        </div>
        {/* Date Range Filter */}
        <div>
          <DateRangePicker
            startDate={filters.start_date}
            endDate={filters.end_date}
            onChange={(startDate, endDate) => {
              console.log('🎯 Received dates from DateRangePicker:', { startDate, endDate });
              
              // Update both dates in a single batch to avoid race conditions
              updateMultipleFilters({
                start_date: startDate,
                end_date: endDate
              });
              
              console.log('✅ Updated filters - start_date:', startDate, 'end_date:', endDate);
            }}
            onClear={() => {
              updateFilter('start_date', '');
              updateFilter('end_date', '');
            }}
          />
        </div>
        <button 
          onClick={handleExport}
          className="rounded-2xl bg-white border border-gray-200 px-3 py-1 text-sm hover:bg-gray-50"
        >
          <SummarizeOutlinedIcon style={{ color: '#D3D3D3' }} />
          Export
        </button>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button 
            onClick={clearAllFilters}
            className="rounded-2xl bg-red-50 border border-red-200 text-red-600 px-3 py-1 text-sm hover:bg-red-100"
          >
            Clear Filters
          </button>
        )}

        <button 
          onClick={onAddFaq} 
          className="bg-[#F6A5A5] text-black px-3 py-2 text-sm rounded-2xl hover:bg-[#f5a0a0]"
        >
          + Add FAQ
        </button>
      </div>
    </>
  );
};

export default FaqFilter;









