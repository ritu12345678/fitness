import React from "react";
import { Formik } from "formik";
import TextField from "@mui/material/TextField";
import CustomModal from "../../../components/CustomModal";
import CustomSelect from "../../../components/CustomSelect";
import { apiService } from "../../../services/apiClient";
import { useToast } from "../../../hooks/useToast";
import { SubmitButton, CancelButton } from "../../../components/ModalButtons";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocations } from "../../../store/slices/locationSlice";
import { fetchShifts } from "../../../store/slices/shiftSlice";
import * as Yup from 'yup';

// Validation schemas
const trainerValidationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  mobile: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  location_id: Yup.string()
    .required('Location is required'),
  shift_id: Yup.string()
    .required('Shift is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .when('password', {
      is: (val) => val && val.length > 0,
      then: (schema) => schema.required('Please confirm your password'),
    }),
});

const trainerUpdateValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters'),
  email: Yup.string()
    .email('Invalid email format'),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  location_id: Yup.string(),
  shift_id: Yup.string(),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

function AddTrainerModal({ open, onClose, onSave, trainer = null, isEdit = false }) {
  const { showSuccess, showError } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const dispatch = useDispatch();

  const { locations } = useSelector((state) => state.location);
  const { shifts } = useSelector((state) => state.shift);

  const [formInitialized, setFormInitialized] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      dispatch(fetchLocations());
      dispatch(fetchShifts());
    }
  }, [open, dispatch]);

  // Update form when trainer data changes or modal opens
  React.useEffect(() => {
    if (open && trainer && locations.length > 0) {
      setFormInitialized(true);
    }
  }, [open, trainer, locations]);

  // Get location ID from various possible fields
  const getLocationId = () => {
    if (!trainer) return "";
    if (trainer?.location_id) return trainer?.location_id
    return "";
  };

  const initialValues = {
    role_id: 3, // Trainer role id
    profile: null,
    name: trainer?.name || "",
    email: trainer?.email || "",
    mobile: trainer?.mobile || "",
    dob: trainer?.dob || "",
    gender: trainer?.gender || "",
    address: trainer?.address || "",
    location_id: getLocationId(),
    shift_id: trainer?.shift_id  || "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = isEdit ? trainerUpdateValidationSchema : trainerValidationSchema;

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    
    try {
      const payload = {
        role_id: 3,
        name: values.name,
        email: values.email,
        mobile: values.mobile,
        DOB: values.dob,
        gender: values.gender,
        address: values.address,
        location_id: values.location_id,
        shift_id: values.shift_id,
      };

      if (!isEdit && values.password) {
        payload.password = values.password;
        payload.confirmPassword = values.confirmPassword;
      }

      if (isEdit) {
        await apiService.put(`users/profile`, { ...payload, id: trainer?.user_id });
        showSuccess("Trainer updated successfully!");
      } else {
        await apiService.post("users/register", payload);
        showSuccess("Trainer created successfully!");
      }

      resetForm();
      onClose();
      onSave?.();
    } catch (err) {
      showError(err?.response?.data?.message || "Failed to save trainer");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Trainer" : "Add Trainer"}
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
            <div className="grid grid-cols-1 gap-4">
              {/* Profile */}
              <div className="flex items-center gap-3">
                <TextField
                  fullWidth
                  value={values.profile ? values.profile.name : ""}
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
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setFieldValue("profile", file);
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
                  name="dob"
                  value={values.dob}
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  rows={2}
                  className="w-full rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>

              {/* Location */}
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

              {/* Shift */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Shift *</label>
                <select
                  value={values.shift_id}
                  onChange={(e) => setFieldValue("shift_id", e.target.value)}
                  className="w-full rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  <option value="">Select Shift</option>
                  {shifts.map(s => (
                    <option key={s.shift_id || s._id} value={s.shift_id || s._id}>{s.shift_title || s.shift_name || ""}</option>
                  ))}
                </select>
              </div>

              {/* Password fields only for new trainer */}
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
                    {touched.password && errors.password && (
                      <p className="text-xs text-red-600 mt-1">{errors.password}</p>
                    )}
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
                    {touched.confirmPassword && errors.confirmPassword && (
                      <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-3 mt-6">
              <CancelButton type="button" onClick={onClose} isSubmitting={isSubmitting} />
              <SubmitButton
                type="submit"
                isSubmitting={isSubmitting}
                loadingText={isEdit ? "Updating..." : "Creating..."}
              >
                {isEdit ? "Update Trainer" : "Create Trainer"}
              </SubmitButton>
            </div>
          </form>
        )}
      </Formik>
    </CustomModal>
  );
}

export default AddTrainerModal;


