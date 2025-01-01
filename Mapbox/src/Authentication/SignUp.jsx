import React from "react";

const Signup = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Create Account
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/signin" className="text-green-600 hover:underline">
            Sign in
          </a>
        </p>

        <form className="mt-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <div className="flex">
              <select className="w-1/4 px-2 py-2 border-r border-gray-300 bg-gray-50 text-sm text-gray-600 rounded-l-md focus:ring-2 focus:ring-green-500">
                <option value="+1">+1</option>
                <option value="+91">+91</option>
                <option value="+44">+44</option>
              </select>
              <input
                type="tel"
                placeholder="Phone number"
                className="w-3/4 px-4 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Sign Up
          </button>
        </form>

        <div className="flex items-center my-6">
          <span className="flex-1 h-px bg-gray-300"></span>
          <span className="mx-2 text-sm text-gray-500">OR</span>
          <span className="flex-1 h-px bg-gray-300"></span>
        </div>

        <div className="space-y-4">
          <button className="w-full py-2 px-4 flex items-center justify-center text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </button>
          <button className="w-full py-2 px-4 flex items-center justify-center text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
              alt="Facebook"
              className="w-5 h-5 mr-2"
            />
            Continue with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;