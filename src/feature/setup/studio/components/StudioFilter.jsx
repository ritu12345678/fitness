import React from 'react';
import CustomSelect from '../../../../components/CustomSelect';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import MenuItem from '@mui/material/MenuItem';
import StudioModal from './StudioModal';

const StudioFilter = ({ refreshStudios, filters, updateFilter, clearFilters, onFilterChange }) => {
  const [openAdd, setOpenAdd] = React.useState(false);

  // Notify parent component when filters change
  React.useEffect(() => {
    onFilterChange?.(filters);
  }, [filters, onFilterChange]);

  const hasActiveFilters = filters.query || (filters.status && filters.status !== 'all') || (filters.date && filters.date !== 'any');

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
        <div className="w-28">
          <CustomSelect
            size="small"
            value={filters.date || 'any'}
            onChange={(e) => updateFilter('date', e.target.value)}
            options={[
              { label: 'Date', value: 'any' }, 
              { label: 'Today', value: 'today' }, 
              { label: 'This week', value: 'week' }
            ]}
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













