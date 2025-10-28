import React from 'react';
import CustomSelect from '../../../../components/CustomSelect';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import MenuItem from '@mui/material/MenuItem';
import DateRangePicker from '../../../../components/DateRangePicker';

const StudioPackageFilter = ({ filters, updateFilter, updateMultipleFilters, clearAllFilters, refreshPackages, onAddPackage }) => {

  // Check if any filters are active
  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== null && value !== '' && value !== 'all' && value !== 'any'
  );

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex items-center gap-3">
        <div className="flex-1">
          <input
            value={filters.search || ''}
            onChange={(e) => updateFilter('search', e.target.value)}
            placeholder="Search packages..."
            className="w-full rounded-full bg-gray-50 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
        <div className="w-36">
          <CustomSelect
            size="small"
            value={filters.category || 'all'}
            onChange={(e) => updateFilter('category', e.target.value)}
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
            <MenuItem value="Beginner">Beginner</MenuItem>
            <MenuItem value="Intermediate">Intermediate</MenuItem>
            <MenuItem value="Advanced">Advanced</MenuItem>
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
        <button className="rounded-2xl bg-white border border-gray-200 px-3 py-1 text-sm"><SummarizeOutlinedIcon style={{ color: '#D3D3D3' }} />Export</button>
        {hasActiveFilters && (
          <button 
            onClick={clearAllFilters}
            className="rounded-2xl bg-gray-100 border border-gray-200 px-3 py-1 text-sm text-gray-600 hover:bg-gray-200"
          >
            Clear
          </button>
        )}
        <button onClick={onAddPackage} className=" bg-[#F6A5A5] text-black px-3 py-2 text-sm rounded-2xl">+ Add Studio Packages</button>
      </div>
    </>
  );
};

export default StudioPackageFilter;













