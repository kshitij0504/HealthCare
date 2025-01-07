import React, { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";
import OAuth from "./OAuth";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    contact: "",
    age: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    otp: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Username validation
    if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Password must be at least 8 characters long and contain both letters and numbers";
    }

    // Contact validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.contact)) {
      newErrors.contact = "Please enter a valid 10-digit phone number";
    }

    // Age validation
    const age = parseInt(formData.age);
    if (isNaN(age) || age < 1 || age > 120) {
      newErrors.age = "Please enter a valid age between 1 and 120";
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = "Please select a gender";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleGenderChange = (value) => {
    setFormData({ ...formData, gender: value });
    if (errors.gender) {
      setErrors({ ...errors, gender: "" });
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/auth/register", formData);
      setStep(2);
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || "Registration failed" });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/auth/verify-otp", {
        email: formData.email,
        otp: formData.otp,
      });
      
      const userId = response.data.userId;
      if (userId) {
        navigate("/patientform", { state: { userId } });
      } else {
        setErrors({ submit: "User ID not received from server." });
      }
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || "OTP verification failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50 p-4 font-inter">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <img
            src="../../assets/CureNest_logo.svg"
            alt="CureNest Logo"
            className="mx-auto h-15 w-25"
          />
          <CardTitle className="text-3xl text-center font-bold">Join CureNest</CardTitle>
          <p className="text-center text-gray-600 mt-2">Begin your healthcare journey</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {errors.submit && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.submit}</AlertDescription>
            </Alert>
          )}

          {step === 1 ? (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <Label>Username</Label>
                <Input
                  type="text"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  className={`mt-1 ${errors.username ? 'border-red-500' : ''}`}
                />
                {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
              </div>

              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`mt-1 ${errors.password ? 'border-red-500' : ''}`}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div>
                <Label>Phone Number</Label>
                <Input
                  type="tel"
                  name="contact"
                  required
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className={`mt-1 ${errors.contact ? 'border-red-500' : ''}`}
                />
                {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
              </div>

              <div>
                <Label>Gender</Label>
                <Select name="gender" value={formData.gender} onValueChange={handleGenderChange}>
                  <SelectTrigger className={`mt-1 ${errors.gender ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
              </div>

              <div>
                <Label>Age</Label>
                <Input
                  type="number"
                  name="age"
                  required
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter your age"
                  min="1"
                  max="120"
                  className={`mt-1 ${errors.age ? 'border-red-500' : ''}`}
                />
                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
              </div>

              <div>
                <Label>Address</Label>
                <Input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your street address"
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>City</Label>
                  <Input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>State</Label>
                  <Input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label>ZIP Code</Label>
                <Input
                  type="text"
                  name="zipCode"
                  required
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="ZIP Code"
                  className={`mt-1 ${errors.zipCode ? 'border-red-500' : ''}`}
                />
                {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-teal-600 hover:bg-teal-700 mt-6" 
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div>

              <OAuth />
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div>
                <Label>Enter OTP</Label>
                <Input
                  type="text"
                  name="otp"
                  required
                  value={formData.otp}
                  onChange={handleChange}
                  placeholder="Enter 6-digit OTP"
                  className="mt-1"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Please check your email for the verification code
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-teal-600 hover:bg-teal-700" 
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
            </form>
          )}

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/signin" className="font-medium text-teal-600 hover:text-teal-500">
              Sign in
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;