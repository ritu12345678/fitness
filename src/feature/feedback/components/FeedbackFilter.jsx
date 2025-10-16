import React from 'react';
import CustomSelect from '../../../components/CustomSelect';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import MenuItem from '@mui/material/MenuItem';

function FeedbackFilter() {
  const [query, setQuery] = React.useState('');
  const [filter, setFilter] = React.useState('all');

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex items-center gap-3">
      <div className="flex-1">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className="w-full rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      </div>
      <div className="w-36">
        <CustomSelect
          size="small"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          SelectProps={{
            renderValue: (val) => (
              <span className="inline-flex items-center gap-1">
                {val === 'all' && <FilterAltOutlinedIcon sx={{ fontSize: 18, color: '#9ca3af' }} />}
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
          <MenuItem value="New">New</MenuItem>
          <MenuItem value="Seen">Seen</MenuItem>
        </CustomSelect>
      </div>
      <button className="rounded-2xl bg-white border border-gray-200 px-3 py-1 text-sm"><SummarizeOutlinedIcon style={{ color: '#D3D3D3' }} />Export</button>
    </div>
  );
}

export default FeedbackFilter;






