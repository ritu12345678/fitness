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
    password: "",
    confirmPassword: "",
    location: user?.location?._id || user?.location || "",
    category: user?.category?._id || user?.category || "",
    studio: user?.studio || "",
    pkg: user?.pkg || "",
    paidAmount: user?.paidAmount || "",
    remainingAmount: user?.remainingAmount || "",
  };

  const validationSchema = isEdit ? userUpdateValidationSchema : registerValidationSchema;

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    
    try {
      const payload = {
        ...values,
        paidAmount: Number(values.paidAmount || 0),
        remainingAmount: Number(values.remainingAmount || 0),
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

              {!isEdit && (
                <>
                  <TextField
                    label="Password *"
                    type="password"
                    name="password"
                    fullWidth
                    value={values.password}
                    onChange={handleChange}
                  />
                  <TextField
                    label="Confirm Password *"
                    type="password"
                    name="confirmPassword"
                    fullWidth
                    value={values.confirmPassword}
                    onChange={handleChange}
                  />
                </>
              )}

              <CustomSelect
                label="Location *"
                value={values.location}
                onChange={(e) => setFieldValue("location", e.target.value)}
                options={[{ label: "Select Location", value: "" }, ...locations.map(l => ({ label: l.name, value: l._id }))]}
              />

              <CustomSelect
                label="Category *"
                value={values.category}
                onChange={(e) => setFieldValue("category", e.target.value)}
                options={[{ label: "Select Category", value: "" }, ...categories.map(c => ({ label: c.name, value: c._id }))]}
              />

              <TextField
                label="Paid Amount"
                name="paidAmount"
                type="number"
                fullWidth
                value={values.paidAmount}
                onChange={handleChange}
              />

              <TextField
                label="Remaining Amount"
                name="remainingAmount"
                type="number"
                fullWidth
                value={values.remainingAmount}
                onChange={handleChange}
              />
            </div>

            {/* ✅ Same Button Section as Before */}
            <div className="flex justify-center gap-3 mt-6">
              <CancelButton type="button" onClick={onClose} isSubmitting={isSubmitting} />
              <SubmitButton
                type="submit"
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
