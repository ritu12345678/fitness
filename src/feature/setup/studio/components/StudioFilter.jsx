import React from 'react';
import CustomSelect from '../../../../components/CustomSelect';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import MenuItem from '@mui/material/MenuItem';
import StudioModal from './StudioModal';
import DateRangePicker from '../../../../components/DateRangePicker';

const StudioFilter = ({ refreshStudios, filters, updateFilter, updateMultipleFilters, clearFilters, onFilterChange }) => {
  const [openAdd, setOpenAdd] = React.useState(false);

  // Notify parent component when filters change
  React.useEffect(() => {
    onFilterChange?.(filters);
  }, [filters, onFilterChange]);

  const hasActiveFilters = filters.query || (filters.status && filters.status !== 'all') || (filters.start_date && filters.end_date);

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex items-center gap-3">
        <div className="flex-1">
          <input
            value={filters.query || ''}
            onChange={(e) => updateFilter('query', e.target.value)}
            placeholder="Search studios..."
            className="w-full rounded-full bg-gray-50 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
        <div className="w-36">
          <CustomSelect
            size="small"
            value={filters.status || 'all'}
            onChange={(e) => updateFilter('status', e.target.value)}
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
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
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
        <button className="rounded-2xl bg-white border border-gray-200 px-3 py-1 text-sm">
          <SummarizeOutlinedIcon style={{ color: '#D3D3D3' }} />
          Export
        </button>
        <button 
          onClick={() => setOpenAdd(true)} 
          className="bg-[#F6A5A5] text-black px-3 py-2 text-sm rounded-2xl"
        >
          + Add Studio
        </button>
        {hasActiveFilters && (
          <button 
            onClick={clearFilters}
            className="bg-gray-500 text-white px-3 py-2 text-sm rounded-2xl"
          >
            Clear
          </button>
        )}
      </div>
      <StudioModal 
        open={openAdd} 
        onClose={() => setOpenAdd(false)} 
        onSave={() => {
          setOpenAdd(false);
          refreshStudios?.();
        }} 
      />
    </>
  );
};

export default StudioFilter;













