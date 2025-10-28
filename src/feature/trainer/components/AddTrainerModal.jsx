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
              <TextField
                label="Name *"
                name="name"
                fullWidth
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />

              {/* Email */}
              <TextField
                label="Email *"
                name="email"
                type="email"
                fullWidth
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />

              {/* Mobile */}
              <TextField
                label="Mobile Number *"
                name="mobile"
                fullWidth
                value={values.mobile}
                onChange={handleChange}
                error={touched.mobile && Boolean(errors.mobile)}
                helperText={touched.mobile && errors.mobile}
              />

              {/* Location */}
              <CustomSelect
                label="Location *"
                value={values.location_id}
                onChange={(e) => setFieldValue("location_id", e.target.value)}
                options={[{ label: "Select Location", value: "" }, ...locations.map(l => ({ label: l.name, value: l.location_id || l._id }))]}
              />

              {/* Shift */}
              <CustomSelect
                label="Shift *"
                value={values.shift_id}
                onChange={(e) => setFieldValue("shift_id", e.target.value)}
                options={[
                  { label: "Select Shift", value: "" },
                  ...shifts.map(s => ({ 
                    label: s.shift_title || s.shift_name || "", 
                    value: s.shift_id || ""
                  }))
                ]}
              />

              {/* Password fields only for new trainer */}
              {!isEdit && (
                <>
                  <TextField
                    label="Password *"
                    type="password"
                    name="password"
                    fullWidth
                    value={values.password}
                    onChange={handleChange}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                  <TextField
                    label="Confirm Password *"
                    type="password"
                    name="confirmPassword"
                    fullWidth
                    value={values.confirmPassword}
                    onChange={handleChange}
                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                  />
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


