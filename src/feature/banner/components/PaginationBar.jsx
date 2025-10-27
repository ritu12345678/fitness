import React from 'react';

function PageButton({ disabled, active, children, onClick }) {
  const base = 'w-7 h-7 rounded-full flex items-center justify-center text-xs';
  const cls = active
    ? base + ' bg-rose-300 text-white'
    : base + ' hover:bg-gray-100 text-gray-700';
  return (
    <button disabled={disabled} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

function PaginationBar({ currentPage, totalPages, pageSize, onPageChange, onPageSizeChange, totalResults }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 7); // simple window
  return (
    <div className="mt-6 bg-white/60 rounded-full px-3 py-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <PageButton disabled={currentPage === 1} onClick={() => onPageChange(1)}>{'<<'}</PageButton>
        <PageButton disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>{'<'}</PageButton>
        {pages.map((p) => (
          <PageButton key={p} active={p === currentPage} onClick={() => onPageChange(p)}>{p}</PageButton>
        ))}
        <PageButton disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>{'>'}</PageButton>
        <PageButton disabled={currentPage === totalPages} onClick={() => onPageChange(totalPages)}>{'>>'}</PageButton>
      </div>
      <div className="flex items-center gap-2">
        <select value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value))} className="px-2 py-1 rounded-2xl bg-rose-200 text-gray-800 text-xs">
          {[5, 9, 12].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
        <span className="text-xs text-gray-600">of {totalResults} results</span>
      </div>
    </div>
  );
}

export default PaginationBar;















