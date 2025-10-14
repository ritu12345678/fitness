import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CustomModal from '../../../components/CustomModal';

function AddBannerModal({ open, onClose, onSave }) {
  const [form, setForm] = React.useState({ from: '', to: '', content: '', image: null });
  const handleChange = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));
  const handleFile = (e) => {
    const f = e.target.files && e.target.files[0];
    setForm((p) => ({ ...p, image: f || null }));
  };

  const actions = (
    <>
      <button onClick={onClose} className="bg-[#EBEFF4] text-[#64748B] px-3 py-2 text-sm rounded-2xl">Cancel</button>
      <button onClick={() => onSave?.(form)} className="bg-[#F6A5A5] text-black px-3 py-2 text-sm rounded-2xl">Save</button>
    </>
  );

  return (
    <CustomModal open={open} onClose={onClose} title="Add Banner" maxWidth="sm" actions={actions} actionsAlign="center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">From</label>
          <TextField fullWidth placeholder="dd-mm-yyyy" value={form.from} onChange={handleChange('from')} InputProps={{ endAdornment: (<InputAdornment position="end"><CalendarMonthIcon sx={{ fontSize: 18, color: '#94a3b8' }} /></InputAdornment>) }} />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">To</label>
          <TextField fullWidth placeholder="dd-mm-yyyy" value={form.to} onChange={handleChange('to')} InputProps={{ endAdornment: (<InputAdornment position="end"><CalendarMonthIcon sx={{ fontSize: 18, color: '#94a3b8' }} /></InputAdornment>) }} />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-gray-700 mb-1">Content</label>
          <TextField fullWidth placeholder="" value={form.content} onChange={handleChange('content')} />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-gray-700 mb-1">Feature Image</label>
          <div className="flex items-center gap-3">
            <TextField fullWidth value={form.image?.name || ''} placeholder="" InputProps={{ readOnly: true }} />
            <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-600 text-white cursor-pointer">
              <CloudUploadIcon sx={{ fontSize: 18 }} />
              <span>Select</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
            </label>
          </div>
        </div>
      </div>
    </CustomModal>
  );
}

export default AddBannerModal;


