import React, { useState } from 'react';
import { loginWithEmail, registerWithEmail } from '../lib/usePortfolio';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';

export const AuthModal = ({ onSuccess, onClose }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let result;
      if (isRegister) {
        result = await registerWithEmail(email, password);
      } else {
        result = await loginWithEmail(email, password);
      }

      if (result.error) {
        setError(result.error);
      } else {
        onSuccess(result.user);
      }
    } catch (err) {
      setError('Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-8 rounded-2xl w-full max-w-sm">
        <div className="flex justify-center mb-4 text-[#4834d4]">
          <Lock size={32} />
        </div>
        
        <h3 className="text-2xl font-bold text-center mb-6">
          {isRegister ? 'Daftar Akun' : 'Masuk'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4834d4]"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4834d4]"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4834d4] text-white py-3 rounded-lg font-bold hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {loading ? 'Memproses...' : isRegister ? 'Daftar' : 'Masuk'}
          </button>
        </form>

        {/* Toggle Register/Login */}
        <p className="text-center text-sm text-gray-600 mt-4">
          {isRegister ? 'Sudah punya akun? ' : 'Belum punya akun? '}
          <button
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
            }}
            className="text-[#4834d4] font-bold hover:underline"
          >
            {isRegister ? 'Masuk' : 'Daftar'}
          </button>
        </p>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full mt-4 text-gray-400 text-sm hover:text-gray-600"
        >
          Batal
        </button>
      </div>
    </div>
  );
};
