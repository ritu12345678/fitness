import React from 'react';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import AddPageModal from './PageModal';

function PageFilter() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex items-center gap-3">
      <div className="flex-1">
        <input
          placeholder="Search"
          className="w-full rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      </div>
      <button className="rounded-2xl bg-white border border-gray-200 px-3 py-1 text-sm"><SummarizeOutlinedIcon style={{ color: '#D3D3D3' }} />Export</button>
      <button onClick={() => setOpen(true)} className="bg-[#F6A5A5] text-black px-3 py-2 text-sm rounded-2xl">+ Add Page</button>
      <AddPageModal open={open} onClose={() => setOpen(false)} onSave={() => setOpen(false)} />
    </div>
  );
}

export default PageFilter;


