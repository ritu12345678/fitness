import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { forgotPassword, clearForgotPasswordState } from '../../../store/slices/authSlice';
import { forgotPasswordValidationSchema } from '../../../validationSchemas';
import { useToast } from '../../../hooks/useToast';

function ForgotPassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, forgotPasswordSent } = useSelector((state) => state.auth);
    const { showSuccess, showError } = useToast();

    const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
        try {
            await dispatch(forgotPassword(values.email)).unwrap();
            showSuccess('Password reset email sent! Please check your inbox.');
        } catch (error) {
            // Handle different types of errors
            if (error.includes('SMTP') || error.includes('smtp') || error.includes('email server')) {
                showError('Email service is temporarily unavailable. Please try again later or contact support.');
            } else if (error.includes('email not found') || error.includes('user not found')) {
                showError('No account found with this email address.');
                setFieldError('email', 'Email address not found');
            } else if (error.includes('rate limit') || error.includes('too many requests')) {
                showError('Too many requests. Please wait a few minutes before trying again.');
            } else {
                showError(error || 'Failed to send reset email. Please try again.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleBackToLogin = () => {
        dispatch(clearForgotPasswordState());
        navigate('/login');
    };

    const handleResendEmail = () => {
        dispatch(clearForgotPasswordState());
    };

    if (forgotPasswordSent) {
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
                                
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">Check Your Email</h2>
                                <p className="text-sm text-gray-600 mb-6">
                                    We've sent a password reset link to your email address. 
                                    Please check your inbox and follow the instructions to reset your password.
                                </p>

                                <div className="space-y-3">
                                    <button
                                        onClick={handleResendEmail}
                                        className="w-full bg-[#c43d3d] hover:bg-[#b73737] text-white rounded-md py-2 text-sm font-medium"
                                    >
                                        Resend Email
                                    </button>
                                    
                                    <button
                                        onClick={handleBackToLogin}
                                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md py-2 text-sm font-medium"
                                    >
                                        Back to Login
                                    </button>
                                </div>

                                <p className="text-xs text-gray-500 mt-4">
                                    Didn't receive the email? Check your spam folder or contact support.
                                </p>
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
                            <h2 className="text-lg font-semibold text-gray-900 mb-2">Forgot Password?</h2>
                            <p className="text-sm text-gray-600">
                                Enter your email address and we'll send you a link to reset your password.
                            </p>
                        </div>

                        <Formik
                            initialValues={{
                                email: '',
                            }}
                            validationSchema={forgotPasswordValidationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, errors, touched }) => (
                                <Form>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-blue-700 mb-1">
                                            Email Address
                                        </label>
                                        <Field
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email address"
                                            className={`w-full rounded-md border px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 ${
                                                errors.email && touched.email
                                                    ? 'border-red-500 bg-red-50 focus:ring-red-400'
                                                    : 'border-gray-200 bg-gray-50 focus:ring-red-400'
                                            }`}
                                        />
                                        <ErrorMessage
                                            name="email"
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
                                                Sending...
                                            </>
                                        ) : (
                                            'Send Reset Link'
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

export default ForgotPassword;
