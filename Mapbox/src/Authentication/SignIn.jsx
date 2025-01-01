import React from "react";

const SignIn = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Sign in
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-green-600 hover:underline">
            Create now
          </a>
        </p>

        <form className="mt-6">
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

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                className="h-4 w-4 border-gray-300 rounded"
              />
              <span className="ml-2">Save account</span>
            </label>
            <a
              href="/forgot-password"
              className="text-sm text-green-600 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Sign in
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

export default SignIn;