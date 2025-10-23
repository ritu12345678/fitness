import React from 'react';
import AddPageModal from './PageModal';

function PageFilter({ onPageCreated, disableFilters = true }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className=" flex items-center gap-3">
      {!disableFilters && (
        <div className="flex-1">
          <input
            placeholder="Search"
            className="w-full rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
      )}
      <div className="flex-1" />
      <button onClick={() => setOpen(true)} className="bg-[#F6A5A5] text-black px-3 py-2 text-sm rounded-2xl">+ Add Page</button>
      <AddPageModal 
        open={open} 
        onClose={() => setOpen(false)} 
        onSave={() => {
          setOpen(false);
          onPageCreated?.();
        }} 
      />
    </div>
  );
}

export default PageFilter;


