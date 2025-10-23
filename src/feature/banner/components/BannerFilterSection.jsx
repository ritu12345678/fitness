import React from 'react';
import CustomSelect from '../../../components/CustomSelect';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import MenuItem from '@mui/material/MenuItem';
import AddBannerModal from './AddBannerModal';
import { useUrlFilters } from '../../../hooks/useUrlFilters';

function BannerFilterSection({ onBannerCreated }) {
  // Define default filters
  const defaultFilters = {
    query: '',
    filter: 'all',
    date: 'any'
  };

  // Use URL filters hook
  const { filters, updateFilter, clearAllFilters, hasActiveFilters } = useUrlFilters(defaultFilters);

  const [openAdd, setOpenAdd] = React.useState(false);

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
          value={filters.filter}
          onChange={(e) => updateFilter('filter', e.target.value)}
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
      
      <div className="w-28">
        <CustomSelect
          size="small"
          value={filters.date}
          onChange={(e) => updateFilter('date', e.target.value)}
          options={[
            { label: 'Date', value: 'any' }, 
            { label: 'Today', value: 'today' }, 
            { label: 'This week', value: 'week' }
          ]}
        />
      </div>
      
      {/* Clear filters button - only show when filters are active */}
      {hasActiveFilters && (
        <button 
          onClick={clearAllFilters}
          className="rounded-2xl bg-gray-100 border border-gray-200 px-3 py-1 text-sm hover:bg-gray-200"
        >
          Clear
        </button>
      )}
      
      <button className="rounded-2xl bg-white border border-gray-200 px-3 py-1 text-sm">
        <SummarizeOutlinedIcon style={{ color: "#D3D3D3" }} />
        Export
      </button>
      
      <button 
        onClick={() => setOpenAdd(true)} 
        className="bg-[#F6A5A5] text-black px-3 py-2 text-sm rounded-2xl"
      >
        + Add Banner
      </button>
      
      <AddBannerModal 
        open={openAdd} 
        onClose={() => setOpenAdd(false)} 
        onSave={(bannerData) => {
          setOpenAdd(false);
          onBannerCreated?.(bannerData);
        }} 
      />
    </div>
  );
}

export default BannerFilterSection;


