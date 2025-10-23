import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { resetPassword, clearForgotPasswordState } from '../../../store/slices/authSlice';
import { resetPasswordValidationSchema } from '../../../validationSchemas';
import { useToast } from '../../../hooks/useToast';

function ResetPassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const { loading, error, resetPasswordSuccess } = useSelector((state) => state.auth);
    const { showSuccess, showError } = useToast();
    
    const token = searchParams.get('token');

    useEffect(() => {
        if (!token) {
            showError('Invalid or missing reset token');
            navigate('/forgot-password');
        }
    }, [token, navigate, showError]);

    const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
        try {
            await dispatch(resetPassword({ token, password: values.password })).unwrap();
            showSuccess('Password reset successfully! You can now login with your new password.');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            showError(error || 'Failed to reset password. Please try again.');
            
            if (error.includes('password')) {
                setFieldError('password', error);
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleBackToLogin = () => {
        dispatch(clearForgotPasswordState());
        navigate('/login');
    };

    if (resetPasswordSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#e6edf5]">
                <div className="w-full sm:w-[90%] md:w-[75%] max-w-[1000px] grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                    <div className="hidden md:flex items-center justify-center">
                        <div className="w-[220px] h-[220px] rounded-full bg-[#c6ced9]" />
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="w-full max-w-[420px] bg-white border border-gray-200 shadow-md rounded-lg p-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">Password Reset Successful!</h2>
                                <p className="text-sm text-gray-600 mb-6">
                                    Your password has been successfully reset. You can now login with your new password.
                                </p>

                                <button
                                    onClick={handleBackToLogin}
                                    className="w-full bg-[#c43d3d] hover:bg-[#b73737] text-white rounded-md py-2 text-sm font-medium"
                                >
                                    Go to Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#e6edf5]">
            <div className="w-full sm:w-[90%] md:w-[75%] max-w-[1000px] grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                <div className="hidden md:flex items-center justify-center">
                    <div className="w-[220px] h-[220px] rounded-full bg-[#c6ced9]" />
                </div>

                <div className="flex items-center justify-center">
                    <div className="w-full max-w-[420px] bg-white border border-gray-200 shadow-md rounded-lg p-6">
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold text-gray-900 mb-2">Reset Your Password</h2>
                            <p className="text-sm text-gray-600">
                                Enter your new password below.
                            </p>
                        </div>

                        {error && (
                            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
                                {error}
                            </div>
                        )}

                        <Formik
                            initialValues={{
                                password: '',
                                confirmPassword: '',
                            }}
                            validationSchema={resetPasswordValidationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, errors, touched }) => (
                                <Form>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-blue-700 mb-1">
                                            New Password
                                        </label>
                                        <Field
                                            type="password"
                                            name="password"
                                            placeholder="Enter new password"
                                            className={`w-full rounded-md border px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 ${
                                                errors.password && touched.password
                                                    ? 'border-red-500 bg-red-50 focus:ring-red-400'
                                                    : 'border-gray-200 bg-gray-50 focus:ring-red-400'
                                            }`}
                                        />
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            className="text-red-500 text-xs mt-1"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-blue-700 mb-1">
                                            Confirm New Password
                                        </label>
                                        <Field
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="Confirm new password"
                                            className={`w-full rounded-md border px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 ${
                                                errors.confirmPassword && touched.confirmPassword
                                                    ? 'border-red-500 bg-red-50 focus:ring-red-400'
                                                    : 'border-gray-200 bg-gray-50 focus:ring-red-400'
                                            }`}
                                        />
                                        <ErrorMessage
                                            name="confirmPassword"
                                            component="div"
                                            className="text-red-500 text-xs mt-1"
                                        />
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting || loading}
                                        className="w-full bg-[#c43d3d] hover:bg-[#b73737] text-white rounded-md py-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mb-4"
                                    >
                                        {isSubmitting || loading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Resetting...
                                            </>
                                        ) : (
                                            'Reset Password'
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleBackToLogin}
                                        className="w-full text-gray-600 hover:text-gray-800 text-sm font-medium"
                                    >
                                        ← Back to Login
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;

