import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight, LayoutDashboard } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Credenciales inválidas. Por favor verifique sus datos.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-purple-200/50 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-indigo-200/50 rounded-full blur-3xl pointer-events-none"></div>

      <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] w-full max-w-md border border-white relative z-10">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
             <div className="bg-slate-900 p-4 rounded-2xl shadow-xl shadow-slate-900/20">
                <LayoutDashboard className="h-10 w-10 text-white" />
             </div>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
            ENTERPRISE <span className="text-blue-600">PLATFORM</span>
          </h2>
          <p className="text-slate-500 font-medium text-sm tracking-wide">Transactional Management System</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 text-sm flex items-center animate-pulse">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="space-y-1">
            <label className="block text-gray-700 text-xs font-bold uppercase tracking-wide mb-1 ml-1" htmlFor="username">
              Username
            </label>
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium text-gray-800"
                    placeholder="Enter your username"
                    required
                />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-gray-700 text-xs font-bold uppercase tracking-wide mb-1 ml-1" htmlFor="password">
              Password
            </label>
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium text-gray-800"
                    placeholder="••••••••"
                    required
                />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white font-semibold py-4 px-4 rounded-xl hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-900/20 transform transition-all duration-300 shadow-[0_8px_20px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_25px_rgb(0,0,0,0.15)] hover:-translate-y-0.5 flex justify-center items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            <span className="tracking-wide">{loading ? 'Authenticating...' : 'Access System'}</span>
            {!loading && <ArrowRight className="w-5 h-5" />}
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-gray-100 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Developed by Ricardo Altamirano Sanchez. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;