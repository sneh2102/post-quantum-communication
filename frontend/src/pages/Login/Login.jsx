import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { loginHandler, loading } = useAuth();
  const [formData, setFormData] = React.useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginHandler(formData);
    await navigate("/");
  };

  return (
    <div className="flex justify-end items-center min-h-screen">
      {/* Form Container */}
      <div className="w-1/3 p-8 bg-slate-700 rounded-tl-3xl shadow-lg min-h-screen flex items-center justify-center">
        <div>
          <h1 className="text-4xl font-bold text-center text-white mb-6">
            Login
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full bg-gray-800 text-white"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full bg-gray-800 text-white"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="text-white">
              <label className="flex items-center justify-between">
                Remember me
                <input type="checkbox" className="checkbox checkbox-primary mr-2" />
              </label>
              <a href="#" className="text-primary">Forgot password?</a>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Login
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center text-white">
            <span>Don't have an account? </span>
            <Link to="/signup" className="text-primary">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
