import React, { useState } from 'react';
import { Building2, Stethoscope, Lock, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/CureNest_logo.svg"
const LoginPage = () => {
  const [userType, setUserType] = useState('org');
  const [formData, setFormData] = useState({ id: '', password: '', accessId: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const endpoint = userType === 'org' 
        ? `${import.meta.env.VITE_BACKEND_URL}/healthorg/signin`
        : `${import.meta.env.VITE_BACKEND_URL}/auth/doctor-signin`;
        
      const requestBody = userType === 'org'
        ? { id: formData.id, password: formData.password }
        : { accessId: formData.id, password: formData.password };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
        credentials: 'include'
      });

      console.log(response)

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Sign in failed');
      }

      const data = await response.json();
      console.log(data);

       if (userType === 'org') {
        navigate('/hospitaldash'); // Navigate to health organization dashboard
      } else {
        navigate('/doctordash'); // Navigate to doctor dashboard
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        
        <Card className="w-full bg-white shadow-xl border-teal-100">
          <CardHeader>
          <img
          src={logo}
          alt="Logo"
          className=" ml-10 h-50 w-80 object-contain"
        />
            <CardTitle className="text-2xl text-black text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center text-black">
              Sign in to access your dashboard
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {/* Toggle Buttons */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setUserType('org')}
                className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                  userType === 'org'
                    ? 'bg-teal-600 text-white shadow-lg'
                    : 'bg-teal-50 text-teal-700 hover:bg-teal-100'
                }`}
              >
                <Building2 size={20} />
                Organization
              </button>
              <button
                onClick={() => setUserType('doctor')}
                className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                  userType === 'doctor'
                    ? 'bg-teal-600 text-white shadow-lg'
                    : 'bg-teal-50 text-teal-700 hover:bg-teal-100'
                }`}
              >
                <Stethoscope size={20} />
                Doctor
              </button>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="text-sm font-medium text-black">
                  {userType === 'doctor' ? 'Access ID' : 'Organization ID'}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" size={20} />
                  <input
                    type="text"
                    value={formData.id}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder={userType === 'doctor' ? 'Enter your access ID' : 'Enter your organization ID'}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-black">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-500" size={20} />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {error && (
                <Alert variant="destructive" className="bg-red-50 text-red-700 border-red-200">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 focus:ring-4 focus:ring-teal-500 focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-teal-600 text-sm">
          Need help? Contact support@curnest.com
        </p>
      </div>
    </div>
  );
};

export default LoginPage;