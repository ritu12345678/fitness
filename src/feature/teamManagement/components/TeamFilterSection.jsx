import React from 'react';
import CustomSelect from '../../../components/CustomSelect';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import MenuItem from '@mui/material/MenuItem';
import AddRoleModal from './AddRoleModal';


function TeamFilters({ onSearch, onFilterChange }) {
  const [query, setQuery] = React.useState('');
  const [filter, setFilter] = React.useState('all');
  const [date, setDate] = React.useState('any');

  React.useEffect(() => {
    onFilterChange?.({ filter, date, query });
  }, [filter, date, query, onFilterChange]);

  const [openAdd, setOpenAdd] = React.useState(false);
  const [openAddMember, setOpenAddMember] = React.useState(false);

  const handleSaveRole = (roleData) => {
    console.log('New role saved:', roleData);
    // Add logic to save the role here
  };

  return (
    <>
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
            value={date}
            onChange={(e) => setDate(e.target.value)}
            options={[{ label: 'Date', value: 'any' }, { label: 'Today', value: 'today' }, { label: 'This week', value: 'week' }]}
          />
        </div>
        <button className="rounded-2xl bg-white border border-gray-200 px-3 py-1 text-sm"><SummarizeOutlinedIcon style={{ color: "#D3D3D3" }} />Export</button>
     
        <button onClick={() => setOpenAdd(true)} className=" bg-white border border-gray-200 text-black px-3 py-2 text-sm rounded-2xl">+ Add Role</button>
      </div>
      
      <AddRoleModal 
        open={openAdd} 
        onClose={() => setOpenAdd(false)} 
        onSave={handleSaveRole}
      />
    
    </>
  );
}

export default TeamFilters;


