import React from 'react';
import CustomSelect from '../../../components/CustomSelect';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import MenuItem from '@mui/material/MenuItem';
import DateRangePicker from '../../../components/DateRangePicker';
import { useUrlFilters } from '../../../hooks/useUrlFilters';

function TrainerFilter({ onSearch, onFilterChange, refreshTrainers, onAddTrainer }) {
  // Define default filters with start_date and end_date
  const defaultFilters = {
    query: '',
    status: 'all',
    start_date: '',
    end_date: ''
  };

  // Use URL filters hook
  const { filters, updateFilter, updateMultipleFilters, clearAllFilters, hasActiveFilters } = useUrlFilters(defaultFilters);

  // Notify parent component when filters change
  React.useEffect(() => {
    onFilterChange?.(filters);
  }, [filters, onFilterChange]);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex items-center gap-3">
      <div className="flex-1">
        <input
          value={filters.query}
          onChange={(e) => updateFilter('query', e.target.value)}
          placeholder="Search"
          className="w-full rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      </div>
      <div className="w-36">
        <CustomSelect
          size="small"
          value={filters.status}
          onChange={(e) => updateFilter('status', e.target.value)}
          SelectProps={{
            renderValue: (val) => (
              <span className="inline-flex items-center gap-1">
                {val === 'all' && <FilterAltOutlinedIcon sx={{ fontSize: 18, color: '#9ca3af' }} />}
                {val === 'all' ? 'All Filter' : val === 'active' ? 'Active' : 'Inactive'}
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
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
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
      <button className="rounded-2xl bg-white border border-gray-200 px-3 py-1 text-sm"><SummarizeOutlinedIcon style={{ color: "#D3D3D3" }} />Export</button>
      
      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <button 
          onClick={clearAllFilters}
          className="rounded-2xl bg-gray-100 border border-gray-200 px-3 py-1 text-sm hover:bg-gray-200"
        >
          Clear
        </button>
      )}
      
      <button onClick={onAddTrainer} className="bg-[#F6A5A5] text-black px-3 py-2 text-sm rounded-2xl">+ Add Trainer</button>
    </div>
  );
}

export default TrainerFilter;


