import React from "react";
import { Formik } from "formik";
import TextField from "@mui/material/TextField";
import CustomModal from "../../../components/CustomModal";
import CustomSelect from "../../../components/CustomSelect";
import { registerValidationSchema, userUpdateValidationSchema } from "../../../validationSchemas";
import { apiService } from "../../../services/apiClient";
import { useToast } from "../../../hooks/useToast";
import { SubmitButton, CancelButton } from "../../../components/ModalButtons";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocations } from "../../../store/slices/locationSlice";
import { fetchCategories } from "../../../store/slices/categorySlice";

function AddUserModal({ open, onClose, onSave, user = null, isEdit = false }) {
  const { showSuccess, showError } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const dispatch = useDispatch();

  const { locations } = useSelector((state) => state.location);
  const { categories } = useSelector((state) => state.category);

  React.useEffect(() => {
    if (open) {
      dispatch(fetchLocations());
      dispatch(fetchCategories());
    }
  }, [open, dispatch]);

  const initialValues = {
    role_id:2,
    profile: null,
    name: user?.name || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
    DOB: user?.DOB || "",
    gender: user?.gender || "",
    address: user?.address || "",
    password: "",
    confirmPassword: "",
    location_id: user?.location?._id || user?.location_id || "",
    category_id: user?.category?._id || user?.category_id || "",
    studio: user?.studio || "",
    pkg: user?.pkg || "",
    paid_amount: user?.paid_amount || "",
    remainingAmount: user?.remainingAmount || "",
  };

  const validationSchema = isEdit ? userUpdateValidationSchema : registerValidationSchema;

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    
    try {
      const payload = {
        ...values,
        paid_amount: Number(values.paid_amount || 0),
        remainingAmount: Number(values.remainingAmount || 0),
        gender: values.gender,
        address: values.address,
        DOB: values.DOB,
      };

      if (!isEdit) {
        payload.password = values.password;
        payload.confirmPassword = values.confirmPassword;
      }

      if (isEdit) {
       
        await apiService.put(`users/profile`, {...payload,id:user?.user_id});
        showSuccess("User updated successfully!");
      } else {
        await apiService.post("users/register", payload);
        showSuccess("User created successfully!");
      }

      resetForm();
      onClose();
      onSave?.();
    } catch (err) {
      console.error("❌ ERROR SAVING USER:", err);
      showError(err?.response?.data?.message || "Failed to save user");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit User" : "Add User"}
      maxWidth="sm"
      actionsAlign="center"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, handleChange, setFieldValue, handleSubmit: formikSubmit, errors, touched }) => (
          <form onSubmit={formikSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Profile Image */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profile *</label>
                <div className="flex items-center gap-3">
                  <TextField
                    fullWidth
                    value={values.profile || ""}
                    placeholder="No file selected"
                    InputProps={{ readOnly: true }}
                    error={touched.profile && Boolean(errors.profile)}
                    helperText={touched.profile && errors.profile}
                  />
                  <label className="px-3 py-2 rounded-md bg-blue-600 text-white cursor-pointer hover:bg-blue-700">
                    Select
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setFieldValue("profile", e.target.files?.[0] || null)}
                    />
                  </label>
                </div>
              </div> */}
 <div className="flex items-center gap-3">
    {/* TextField showing file name */}
    <TextField
      fullWidth
      value={values.profile ? values.profile.name : ""}
      placeholder="No file selected"
      InputProps={{ readOnly: true }}
      error={touched.profile && Boolean(errors.profile)}
      helperText={touched.profile && errors.profile}
    />

    {/* Upload button */}
    <label className="px-3 py-2 rounded-md bg-blue-600 text-white cursor-pointer hover:bg-blue-700">
      Select
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setFieldValue("profile", file); // ✅ store file object in Formik
          }
        }}
      />
    </label>
  </div>
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                {touched.name && errors.name && (
                  <p className="text-xs text-red-600 mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                {touched.email && errors.email && (
                  <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number *</label>
                <input
                  name="mobile"
                  value={values.mobile}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                {touched.mobile && errors.mobile && (
                  <p className="text-xs text-red-600 mt-1">{errors.mobile}</p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  name="DOB"
                  value={values.DOB}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  name="gender"
                  value={values.gender}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  rows={2}
                  className="w-full rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>

              {!isEdit && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                    <input
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                <select
                  value={values.location_id}
                  onChange={(e) => setFieldValue("location_id", e.target.value)}
                  className="w-full rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  <option value="">Select Location</option>
                  {locations.map(l => (
                    <option key={l.location_id || l._id} value={l.location_id || l._id}>{l.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  value={values.category_id}
                  onChange={(e) => setFieldValue("category_id", e.target.value)}
                  className="w-full rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  <option value="">Select Category</option>
                  {categories.map(c => (
                    <option key={c.category_id || c._id} value={c.category_id || c._id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Paid Amount</label>
                <input
                  type="number"
                  name="paid_amount"
                  value={values.paid_amount}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remaining Amount</label>
                <input
                  type="number"
                  name="remainingAmount"
                  value={values.remainingAmount}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>
            </div>

            {/* ✅ Same Button Section as Before */}
            <div className="flex justify-center gap-3 mt-6">
              <CancelButton type="button" onClick={onClose} isSubmitting={isSubmitting} />
              <SubmitButton
                type="submit"
                onClick={formikSubmit}
                isSubmitting={isSubmitting}
                loadingText={isEdit ? "Updating..." : "Creating..."}
              >
                {isEdit ? "Update User" : "Create User"}
              </SubmitButton>
            </div>
          </form>
        )}
      </Formik>
    </CustomModal>
  );
}

export default AddUserModal;
