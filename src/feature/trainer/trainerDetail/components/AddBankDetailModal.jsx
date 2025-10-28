import React from 'react';
import CustomModal from '../../../../components/CustomModal';
import { SubmitButton, CancelButton } from '../../../../components/ModalButtons';

function AddBankDetailModal({ open, onClose, onSave, initial = {} }) {
  const [values, setValues] = React.useState({
    account_number: initial.account_number || '',
    account_holder: initial.account_holder || '',
    bank_name: initial.bank_name || '',
    ifsc_code: initial.ifsc_code || '',
    branch_location: initial.branch_location || '',
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setValues({
        account_number: initial.account_number || '',
        account_holder: initial.account_holder || '',
        bank_name: initial.bank_name || '',
        ifsc_code: initial.ifsc_code || '',
        branch_location: initial.branch_location || '',
      });
    }
  }, [open, initial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSave?.(values);
      onClose?.();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CustomModal open={open} onClose={onClose} title="Add Bank Detail" maxWidth="sm" actionsAlign="center">
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
          <input
            name="account_number"
            value={values.account_number}
            onChange={handleChange}
            placeholder="Enter Account Number"
            className="w-full rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Account Holder Name</label>
          <input
            name="account_holder"
            value={values.account_holder}
            onChange={handleChange}
            placeholder="Enter Account Holder Name"
            className="w-full rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
          <select
            name="bank_name"
            value={values.bank_name}
            onChange={handleChange}
            className="w-full rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <option value="">Enter Bank Name</option>
            <option value="SBI">SBI</option>
            <option value="HDFC">HDFC</option>
            <option value="ICICI">ICICI</option>
            <option value="AXIS">AXIS</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
          <input
            name="ifsc_code"
            value={values.ifsc_code}
            onChange={handleChange}
            placeholder="Enter IFSC Code"
            className="w-full rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Branch Location</label>
          <input
            name="branch_location"
            value={values.branch_location}
            onChange={handleChange}
            placeholder="Enter Branch Location"
            className="w-full rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
        <div className="flex justify-center gap-3 pt-2">
          <CancelButton type="button" onClick={onClose} isSubmitting={isSubmitting} />
          <SubmitButton type="button" onClick={handleSubmit} isSubmitting={isSubmitting} loadingText="Saving...">
            Save
          </SubmitButton>
        </div>
      </div>
    </CustomModal>
  );
}

export default AddBankDetailModal;


