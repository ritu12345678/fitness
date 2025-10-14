import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CustomModal from '../../../components/CustomModal';
import CustomSelect from '../../../components/CustomSelect';

function AddBatchModal({ open, onClose, onSave }) {
  const [form, setForm] = React.useState({
    studioName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    from: '',
    to: '',
    startingAmount: '',
    featureImage: null,
    video: null,
  });

  const handleChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleFile = (key) => (e) => {
    const file = e.target.files && e.target.files[0];
    setForm((prev) => ({ ...prev, [key]: file || null }));
  };

  const actions = (
    <>

      <button onClick={onClose} className="bg-[#EBEFF4] text-[#64748B] px-3 py-2 text-sm rounded-2xl">Cancel</button>

      <button onClick={() => onSave?.(form)} className="bg-[#F6A5A5] text-black px-3 py-2 text-sm rounded-2xl">Save</button>
    </>
  );

  return (
    <CustomModal open={open} onClose={onClose} title="Add Batch" maxWidth="sm" actions={actions} actionsAlign="center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-gray-700 mb-1">Studio Name</label>
          <TextField fullWidth placeholder="Enter Studio Name" value={form.studioName} onChange={handleChange('studioName')} />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Address Line 1</label>
          <TextField fullWidth placeholder="Enter Address Line 1" value={form.address1} onChange={handleChange('address1')} />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Address Line 2</label>
          <TextField fullWidth placeholder="Enter Address Line 2" value={form.address2} onChange={handleChange('address2')} />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">City</label>
          <CustomSelect
            value={form.city}
            onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
            options={[{ label: 'Select City', value: '' }, { label: 'Mumbai', value: 'mumbai' }, { label: 'Pune', value: 'pune' }]}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">State</label>
          <CustomSelect
            value={form.state}
            onChange={(e) => setForm((p) => ({ ...p, state: e.target.value }))}
            options={[{ label: 'Select State', value: '' }, { label: 'Maharashtra', value: 'maharashtra' }]}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">From</label>
          <TextField
            fullWidth
            placeholder="Opening Time"
            value={form.from}
            onChange={handleChange('from')}
            InputProps={{ endAdornment: (<InputAdornment position="end"><AccessTimeIcon sx={{ fontSize: 18, color: '#94a3b8' }} /></InputAdornment>) }}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">To</label>
          <TextField
            fullWidth
            placeholder="Closing Time"
            value={form.to}
            onChange={handleChange('to')}
            InputProps={{ endAdornment: (<InputAdornment position="end"><AccessTimeIcon sx={{ fontSize: 18, color: '#94a3b8' }} /></InputAdornment>) }}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-gray-700 mb-1">Starting Amount</label>
          <TextField fullWidth placeholder="₹" value={form.startingAmount} onChange={handleChange('startingAmount')} />
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-700 mb-1">Feature Image</label>
              <TextField fullWidth value={form.featureImage?.name || ''} placeholder="" InputProps={{ readOnly: true }} />
            </div>
            <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-600 text-white cursor-pointer">
              <CloudUploadIcon sx={{ fontSize: 18 }} />
              <span>Upload</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleFile('featureImage')} />
            </label>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-700 mb-1">Video</label>
              <TextField fullWidth value={form.video?.name || ''} placeholder="" InputProps={{ readOnly: true }} />
            </div>
            <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-600 text-white cursor-pointer">
              <CloudUploadIcon sx={{ fontSize: 18 }} />
              <span>Upload</span>
              <input type="file" accept="video/*" className="hidden" onChange={handleFile('video')} />
            </label>
          </div>
        </div>
      </div>
    </CustomModal>
  );
}

export default AddBatchModal;


