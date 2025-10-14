import React from 'react';
import TextField from '@mui/material/TextField';
import CustomModal from '../../../components/CustomModal';
import CustomSelect from '../../../components/CustomSelect';

function AddTrainerModal({ open, onClose, onSave }) {
  const [form, setForm] = React.useState({
    profile: null,
    name: '',
    email: '',
    phone: '',
    location: '',
    shift: '',
  });

  const handleChange = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));
  const handleFile = (e) => {
    const file = e.target.files && e.target.files[0];
    setForm((p) => ({ ...p, profile: file || null }));
  };

  const actions = (
    <>
      <button onClick={onClose} className="bg-[#EBEFF4] text-[#64748B] px-3 py-2 text-sm rounded-2xl">Cancel</button>
      <button onClick={() => onSave?.(form)} className="bg-[#F6A5A5] text-black px-3 py-2 text-sm rounded-2xl">Save</button>
    </>
  );

  return (
    <CustomModal open={open} onClose={onClose} title="Add Trainer Detail" maxWidth="sm" actions={actions} actionsAlign="center">
      <div className="grid grid-cols-1 gap-3">
        {/* Profile */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Profile</label>
          <div className="flex items-center gap-3">
            <TextField fullWidth value={form.profile?.name || ''} placeholder="" InputProps={{ readOnly: true }} />
            <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-600 text-white cursor-pointer">
              <span>Select</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
            </label>
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
          <TextField fullWidth placeholder="Enter Name" value={form.name} onChange={handleChange('name')} />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
          <TextField fullWidth placeholder="Enter Email Address" value={form.email} onChange={handleChange('email')} />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
          <TextField fullWidth placeholder="Enter Phone Number" value={form.phone} onChange={handleChange('phone')} />
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
          <TextField fullWidth placeholder="Select Location" value={form.location} onChange={handleChange('location')} />
        </div>

        {/* Shift */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Shift</label>
          <CustomSelect
            value={form.shift}
            onChange={(e) => setForm((p) => ({ ...p, shift: e.target.value }))}
            options={[{ label: 'Select Shift', value: '' }, { label: 'Morning', value: 'morning' }, { label: 'Evening', value: 'evening' }]}
          />
        </div>
      </div>
    </CustomModal>
  );
}

export default AddTrainerModal;


