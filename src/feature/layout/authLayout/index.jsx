import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#e6edf5]">
            <div className="w-full sm:w-[90%] md:w-[75%] max-w-[1000px] grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                <div className="hidden md:flex items-center justify-center">
                    <div className="w-[220px] h-[220px] rounded-full bg-[#c6ced9]" />
                </div>

                <div className="flex items-center justify-center">
                    <div className="w-full max-w-[420px] bg-white border border-gray-200 shadow-md rounded-lg p-6">
                        <p className="text-sm font-semibold mb-4">Welcome Back</p>

                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-blue-700 mb-1">User Name</label>
                                <input
                                    type="email"
                                    placeholder="name@gmail.com"
                                    className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="block text-sm font-medium text-blue-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    placeholder="Password123"
                                    className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400"
                                />
                            </div>

                            <div className="flex items-center justify-between mb-4">
                                <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                                    <input type="checkbox" defaultChecked className="size-4 accent-red-500" />
                                    Remember me
                                </label>
                                <a href="#" className="text-sm text-gray-600 hover:text-gray-800">Forgot Password?</a>
                            </div>

                            <button type="submit" className="w-full bg-[#c43d3d] hover:bg-[#b73737] text-white rounded-md py-2 text-sm font-medium" onClick={() => navigate("/dashboard")}>LOG IN</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;


