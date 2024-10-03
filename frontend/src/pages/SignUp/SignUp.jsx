import React from "react";
import { Link } from "react-router-dom";
import { signUp } from "../../apis/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

    const [formData, setFormData] = React.useState({    
        username: "",
        email: "",
        gender: "",
        phoneNo: "",
        password: "",
        confirmPassword: "",
        birthday: "",
    });
    const navigate = useNavigate();


    const handleSubmit = async (e) => { 
        e.preventDefault();
        console.log("Data: ", formData);
        try {
            const data = await signUp(formData); 
            toast.success("User created. Please check your email to confirm your account");
            console.log("Signup successful:", data);
            navigate("/login");
        } catch (error) {
            console.error("Error during signup:", error);
            toast.error("An error occurred during registration");
        }

    }


  return (
    <div className="flex justify-end min-h-screen ">
      {/* Right-side Form Container */}
      <div className="w-full max-w-4xl flex justify-end items-center ">
        <div className="w-full md:w-2/3 p-8 bg-slate-700 rounded-tl-3xl shadow-lg flex flex-col justify-center space-y-6 min-h-screen">
          <h1 className="text-4xl font-bold text-center text-white mb-6">
            Sign Up
          </h1>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            {/* Left Column */}
            <div>
              {/* Username */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="input input-bordered w-full bg-gray-800 text-white"
                  required
                  value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
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
              {/* Gender */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Gender</span>
                </label>
                <select className="select select-bordered w-full bg-gray-800 text-white" required
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                >
                  <option value=" " disabled>
                    Select your gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>


              {/* Phone Number */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Phone Number</span>
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="input input-bordered w-full bg-gray-800 text-white"
                  required
                    value={formData.phoneNo}
                    onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}

                />
              </div>
            </div>

            {/* Right Column */}
            <div>
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

              {/* Confirm Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">
                    Confirm Password
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="input input-bordered w-full bg-gray-800 text-white"
                  required
                  value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
              </div>

              {/* Date of Birth */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Date of Birth</span>
                </label>
                <input
                  type="date"
                  className="input input-bordered w-full bg-gray-800 text-white"
                  required
                    value={formData.birthday}
                        onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                />
              </div>
            </div>
          </form>

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <button type="submit" className="btn btn-primary w-full md:w-1/2" onClick={handleSubmit}>
              Sign Up
            </button>
          </div>

          {/* Login Link */}
          <div className="mt-4 text-sm text-center text-white">
            <span>Already have an account? </span>
            <Link to="/login" className="text-primary">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
