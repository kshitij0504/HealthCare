import React, { useState } from 'react';
import { Building2, Stethoscope, Lock, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useNavigate } from 'react-router-dom';

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
        ? 'http://localhost:5000/healthorg/signin'
        : 'http://localhost:5000/auth/doctor-signin';

      // Prepare the request body based on user type
      const requestBody = userType === 'org'
        ? { id: formData.id, password: formData.password }
        : { accessId: formData.id, password: formData.password };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Sign in failed');
      }

      const data = await response.json();
      console.log(data);

       if (userType === 'org') {
        navigate('/healthorg/dashboard'); // Navigate to health organization dashboard
      } else {
        navigate('/doctor/dashboard'); // Navigate to doctor dashboard
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
        {/* Logo and Title */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-teal-700 mb-2">Curnest</h1>
          <p className="text-teal-600">Healthcare Management Platform</p>
        </div>

        <Card className="w-full bg-white shadow-xl border-teal-100">
          <CardHeader>
            <CardTitle className="text-2xl text-teal-800 text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center text-teal-600">
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
                <label className="text-sm font-medium text-teal-700">
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
                <label className="text-sm font-medium text-teal-700">Password</label>
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