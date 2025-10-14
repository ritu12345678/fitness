import React from 'react';
import TextField from '@mui/material/TextField';
import CustomModal from '../../../components/CustomModal';
import CustomSelect from '../../../components/CustomSelect';

function AddUserModal({ open, onClose, onSave }) {
  const [form, setForm] = React.useState({
    profile: null,
    name: '',
    email: '',
    phone: '',
    location: '',
    category: '',
    studio: '',
    pkg: '',
    paidAmount: '',
    remainingAmount: '',
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
    <CustomModal open={open} onClose={onClose} title="Add User" maxWidth="sm" actions={actions} actionsAlign="center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
        {/* Phone */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
          <TextField fullWidth placeholder="Enter Phone Number" value={form.phone} onChange={handleChange('phone')} />
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
          <CustomSelect
            value={form.location}
            onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
            options={[{ label: 'Select Location', value: '' }, { label: 'Weston', value: 'weston' }, { label: 'Rajkot', value: 'rajkot' }]}
          />
        </div>
        {/* Category */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
          <CustomSelect
            value={form.category}
            onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
            options={[{ label: 'Select Category', value: '' }, { label: 'Beginner', value: 'beginner' }, { label: 'Advance', value: 'advance' }]}
          />
        </div>

        {/* Package */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Package</label>
          <CustomSelect
            value={form.pkg}
            onChange={(e) => setForm((p) => ({ ...p, pkg: e.target.value }))}
            options={[{ label: 'Select Category', value: '' }, { label: 'Monthly', value: 'monthly' }, { label: 'Quarterly', value: 'quarterly' }]}
          />
        </div>
        {/* Studio Name */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Studio Name</label>
          <CustomSelect
            value={form.studio}
            onChange={(e) => setForm((p) => ({ ...p, studio: e.target.value }))}
            options={[{ label: 'Select Studio Name', value: '' }, { label: 'Studio A', value: 'a' }, { label: 'Studio B', value: 'b' }]}
          />
        </div>

        {/* Paid Amount */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Paid Amount</label>
          <TextField fullWidth placeholder="Enter Paid Amount" value={form.paidAmount} onChange={handleChange('paidAmount')} />
        </div>
        {/* Remaining Amount */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Remaining Amount</label>
          <TextField fullWidth placeholder="Enter Remaining Amount" value={form.remainingAmount} onChange={handleChange('remainingAmount')} />
        </div>
      </div>
    </CustomModal>
  );
}

export default AddUserModal;


