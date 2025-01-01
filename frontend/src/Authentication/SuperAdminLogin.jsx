import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Lock, Mail, ShieldCheck } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useDispatch } from "react-redux";
import {
  signinStart,
  signinSuccess,
  signinFailure,
} from "../redux/user/userSlice";
import axios from "axios";

const SuperAdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    dispatch(signinStart());

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      dispatch(signinSuccess({ user: response.data }));
      console.log(response.data.data.role)
      // Check user role and redirect accordingly
      if (response.data.data.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        setError("Access denied. Admin privileges required.");
        dispatch(signinFailure("Insufficient privileges"));
      }
    } catch (error) {
        console.log(error)
      dispatch(signinFailure(error.response?.data?.message));
      if (error.response) {
        setError(
          error.response.data.message || "An error occurred during sign-in"
        );
      } else if (error.request) {
        setError("No response received from server");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-teal-100 p-4">
      <div className="w-full max-w-md">
        {/* Logo/Icon Section */}
        <div className="flex justify-center mb-6">
          <div className="bg-teal-600 p-4 rounded-full shadow-lg">
            <ShieldCheck className="h-12 w-12 text-white" />
          </div>
        </div>

        <Card className="border-none shadow-2xl backdrop-blur-sm bg-white/90">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-teal-800">
              Super Admin Portal
            </CardTitle>
            <CardDescription className="text-center text-teal-600">
              Welcome back to Curenest Management
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-teal-700 font-medium">
                  Email Address
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-teal-500 transition-colors group-hover:text-teal-600" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@curenest.com"
                    className="pl-10 h-12 border-teal-200 focus:border-teal-500 focus:ring-teal-500 transition-all duration-300"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-teal-700 font-medium">
                  Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-teal-500 transition-colors group-hover:text-teal-600" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 h-12 border-teal-200 focus:border-teal-500 focus:ring-teal-500 transition-all duration-300"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="rounded border-teal-300 text-teal-600 focus:ring-teal-500"
                  />
                  <label htmlFor="remember" className="text-teal-600">
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-teal-600 hover:text-teal-800 transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className={`w-full h-12 bg-teal-600 hover:bg-teal-700 text-white transition-all duration-300 transform hover:scale-[1.02] ${
                  isLoading ? "opacity-80 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>

              {/* Security Note */}
              <div className="text-center text-sm text-teal-600 mt-4">
                <div className="flex items-center justify-center space-x-1">
                  <Lock className="h-4 w-4" />
                  <span>Secure authentication powered by Curenest</span>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminLogin;
