import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { login, clearError } from '../../../store/slices/authSlice';
import { loginValidationSchema } from '../../../validationSchemas';
import { useToast } from '../../../hooks/useToast';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
    const { showSuccess, showError } = useToast();
    
    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
        try {
            await dispatch(login(values)).unwrap();
            showSuccess('Login successful! Welcome back.');
            // Navigation will happen automatically via useEffect
        } catch (error) {
            showError(error || 'Login failed. Please try again.');
            
            // Set field-specific errors if available
            if (error.includes('email')) {
                setFieldError('email', error);
            } else if (error.includes('password')) {
                setFieldError('password', error);
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleClearError = () => {
        dispatch(clearError());
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#e6edf5]">
            <div className="w-full sm:w-[90%] md:w-[75%] max-w-[1000px] grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                <div className="hidden md:flex items-center justify-center">
                    <div className="w-[220px] h-[220px] rounded-full bg-[#c6ced9]" />
                </div>

                <div className="flex items-center justify-center">
                    <div className="w-full max-w-[420px] bg-white border border-gray-200 shadow-md rounded-lg p-6">
                        <p className="text-sm font-semibold mb-4">Welcome Back</p>

                        {error && (
                            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
                                {error}
                                <button 
                                    onClick={handleClearError}
                                    className="ml-2 text-red-500 hover:text-red-700"
                                >
                                    ×
                                </button>
                            </div>
                        )}

                        <Formik
                            initialValues={{
                                email: '',
                                password: '',
                            }}
                            validationSchema={loginValidationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, errors, touched }) => (
                                <Form>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-blue-700 mb-1">
                                            User Name
                                        </label>
                                        <Field
                                            type="email"
                                            name="email"
                                            placeholder="name@gmail.com"
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

                                    <div className="mb-3">
                                        <label className="block text-sm font-medium text-blue-700 mb-1">
                                            Password
                                        </label>
                                        <Field
                                            type="password"
                                            name="password"
                                            placeholder="Password123"
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

                                    <div className="flex items-center justify-between mb-4">
                                        <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                                            <input type="checkbox" defaultChecked className="size-4 accent-red-500" />
                                            Remember me
                                        </label>
                                        <button 
                                            type="button"
                                            onClick={() => navigate('/forgot-password')}
                                            className="text-sm text-gray-600 hover:text-gray-800"
                                        >
                                            Forgot Password?
                                        </button>
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting || loading}
                                        className="w-full bg-[#c43d3d] hover:bg-[#b73737] text-white rounded-md py-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                    >
                                        {isSubmitting || loading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Logging in...
                                            </>
                                        ) : (
                                            'LOG IN'
                                        )}
                                    </button>
                                </Form>
                            )}
                        </Formik>

                        <div className="mt-4 p-3 bg-gray-100 rounded-md text-xs text-gray-600">
                            <strong>Demo Credentials:</strong><br />
                            Email: admin@fitness.com<br />
                            Password: password123
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;


