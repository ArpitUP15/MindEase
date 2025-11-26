import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import logo from '../assets/images/logo.png';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { useAuth } from '@/context/AuthContext.jsx';

const SignupComponent = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isCounselor, setIsCounselor] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      setLoading(false);
      return;
    }

    try {
      await register({ username, email, password, isCounselor });
      toast.success('Account created successfully');
      navigate('/');
    } catch (err) {
      console.error('Failed to register', err);
      const message = err?.response?.data?.message || 'Failed to sign up. Please try again.';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-sm bg-white rounded-lg border-2 p-4">
        <form onSubmit={handleSignUp}>
            <div className="text-center mb-8">
              <div className="flex items-center justify-center">
                <div className="text-pink-500 text-2xl mr-2"><img src={logo} alt="" /></div>
                <h1 className="text-4xl font-bold text-blue-500">
                  <i>MindEase</i>
                </h1>
              </div>
              <p className="text-gray-600 font-bold">
                Start your journey to a calmer mind.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <div className="space-y-3">
              {/* Name */}
              <div>
                <label className="block text-[12px] font-medium text-gray-700 mb-1">
                  Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 top-1 pl-3 flex items-center pointer-events-none">
                    <MdDriveFileRenameOutline className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your name"
                    required
                    className="w-full pl-10 pr-3 text-sm py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={isCounselor ? 'counselor' : 'student'}
                  onChange={(e) => setIsCounselor(e.target.value === 'counselor')}
                  className="w-full px-3 py-1 border border-gray-300 rounded-md text-sm"
                >
                  <option value="student">Student</option>
                  <option value="counselor">Counselor</option>
                </select>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[12px] font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 top-1 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="w-full pl-10 pr-3 text-sm py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[12px] font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full pl-3 text-sm pr-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-[12px] font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full pl-3 text-sm pr-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-4 rounded-md transition duration-200 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </div>
          </form>
        
        {/* Login Link */}
        <div className="text-center mt-4">
          <span className="text-gray-600 text-sm">
            Already have an account?{" "}
          </span>
          <a
            href="/authenticate/login"
            className="text-blue-500 hover:text-blue-600 text-sm font-medium"
          >
            Login
          </a>
        </div>
      </div>

    </div>
  );
};

export default SignupComponent;
