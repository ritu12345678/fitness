import CustomModal from '../../../../components/CustomModal';
import { SubmitButton, CancelButton } from '../../../../components/ModalButtons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { apiService } from '../../../../services/apiClient';
import { useToast } from '../../../../hooks/useToast';

const bankSchema = Yup.object({
  holdername: Yup.string().required('Account holder name is required'),
  account_no: Yup.string().required('Account number is required'),
  bank_name: Yup.string().required('Bank name is required'),
  ifsc_code: Yup.string().required('IFSC code is required'),
  ISFC_code: Yup.string().nullable(),
  bankaddress: Yup.string().required('Branch location is required'),
});

function AddBankDetailModal({ open, onClose, onSave, initial = {}, userId }) {
  const { showSuccess, showError } = useToast();
console.log("userrriddd",userId)
  const initialValues = {
    holdername: initial.holdername || '',
    account_no: initial.account_no || '',
    bank_name: initial.bank_name || '',
    ifsc_code: initial.ifsc_code || '',
    ISFC_code: initial.ISFC_code || '',
    bankaddress: initial.bankaddress || '',
  };

  const submit = async (values, { setSubmitting, resetForm }) => {
    try {
      const payload = { ...values };
      const createRes = await apiService.post('master/bank-account', payload);
      console.log("bankkk",createRes)
      // Expecting AccountDetails_id in response
      const accountId = createRes?.AccountDetails_id
 ;
      if (accountId && userId) {
        await apiService.put('users/add-bank-account', {
          user_id: userId,
          BankAccount_id: accountId,
        });
      }
      showSuccess('Bank detail saved successfully');
      onSave?.({ ...payload, AccountDetails_id: accountId });
      resetForm();
      onClose?.();
    } catch (e) {
      showError(e?.response?.data?.message || 'Failed to save bank detail');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <CustomModal open={open} onClose={onClose} title="Add Bank Detail" maxWidth="sm" actionsAlign="center">
      <Formik initialValues={initialValues} validationSchema={bankSchema} onSubmit={submit} enableReinitialize>
        {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
              <input
                name="account_no"
                value={values.account_no}
                onChange={handleChange}
                placeholder="Enter Account Number"
                className="w-full rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              {touched.account_no && errors.account_no && <p className="text-xs text-red-600 mt-1">{errors.account_no}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Account Holder Name</label>
              <input
                name="holdername"
                value={values.holdername}
                onChange={handleChange}
                placeholder="Enter Account Holder Name"
                className="w-full rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              {touched.holdername && errors.holdername && <p className="text-xs text-red-600 mt-1">{errors.holdername}</p>}
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
              {touched.bank_name && errors.bank_name && <p className="text-xs text-red-600 mt-1">{errors.bank_name}</p>}
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
              {touched.ifsc_code && errors.ifsc_code && <p className="text-xs text-red-600 mt-1">{errors.ifsc_code}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ISFC Code</label>
              <input
                name="ISFC_code"
                value={values.ISFC_code}
                onChange={handleChange}
                placeholder="Enter ISFC Code"
                className="w-full rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Branch Location</label>
              <input
                name="bankaddress"
                value={values.bankaddress}
                onChange={handleChange}
                placeholder="Enter Branch Location"
                className="w-full rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              {touched.bankaddress && errors.bankaddress && <p className="text-xs text-red-600 mt-1">{errors.bankaddress}</p>}
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <CancelButton type="button" onClick={onClose} isSubmitting={isSubmitting} />
              <SubmitButton type="submit" isSubmitting={isSubmitting} loadingText="Saving...">
                Save
              </SubmitButton>
            </div>
          </form>
        )}
      </Formik>
    </CustomModal>
  );
}

export default AddBankDetailModal;


