import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { useForm } from "react-hook-form";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiAlertCircle,
  FiArrowRight,
  FiBox,
  FiUser,
  FiBriefcase,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import axiosInstance from "../../api/axiosInstance";
import Swal from "sweetalert2";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [googleUser, setGoogleUser] = useState(null);

  const { signIn, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirect path from location state or default to dashboard
  const from = location.state?.from?.pathname || "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle email/password login
  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      await signIn(data.email, data.password);

      // Get user data from database to determine role
      const { data: userData } = await axiosInstance.get(
        `/users/${encodeURIComponent(data.email)}`
      );

      Swal.fire({
        icon: "success",
        title: "Welcome back!",
        text: `Logged in as ${userData.name}`,
        timer: 1500,
        showConfirmButton: false,
      });

      // Redirect based on role
      if (userData.role === "hr") {
        navigate("/dashboard/asset-list", { replace: true });
      } else {
        navigate("/dashboard/my-assets", { replace: true });
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message || "Invalid email or password",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      const user = result.user;

      // Check if user exists in database
      try {
        const { data: existingUser } = await axiosInstance.get(
          `/users/${encodeURIComponent(user.email)}`
        );
        
        if (existingUser) {
          // Existing user - redirect to appropriate dashboard
          Swal.fire({
            icon: "success",
            title: "Welcome back!",
            text: `Logged in as ${existingUser.name}`,
            timer: 1500,
            showConfirmButton: false,
          });

          if (existingUser.role === "hr") {
            navigate("/dashboard/asset-list", { replace: true });
          } else {
            navigate("/dashboard/my-assets", { replace: true });
          }
        }
      } catch {
        // User doesn't exist - show role selection modal
        setGoogleUser({
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
        setShowRoleModal(true);
      }
    } catch (error) {
      console.error("Google sign in error:", error);
      Swal.fire({
        icon: "error",
        title: "Sign In Failed",
        text: error.message || "Failed to sign in with Google",
      });
    }
  };

  // Handle role selection for new Google users
  const handleRoleSelection = (role) => {
    setShowRoleModal(false);
    
    if (role === "hr") {
      // HR needs to provide company details - redirect to HR registration
      // Pass Google user info via state
      navigate("/join-as-hr", { 
        state: { 
          googleUser: googleUser,
          message: "Please complete your company details to register as HR Manager"
        } 
      });
    } else {
      // Employee can be created directly with Google info
      createGoogleEmployee();
    }
  };

  // Create employee account from Google Sign In
  const createGoogleEmployee = async () => {
    try {
      const userData = {
        name: googleUser.name,
        email: googleUser.email,
        profileImage: googleUser.photoURL,
        role: "employee",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await axiosInstance.post("/users", userData);

      Swal.fire({
        icon: "success",
        title: "Welcome to AssetVerse!",
        text: "Your employee account has been created. Start requesting assets!",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/dashboard/request-asset", { replace: true });
    } catch (error) {
      console.error("Error creating employee:", error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message || "Failed to create account",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body p-8">
            {/* Logo & Header */}
            <div className="text-center mb-6">
              <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold text-primary mb-2">
                <FiBox className="h-8 w-8" />
                AssetVerse
              </Link>
              <h1 className="text-2xl font-bold">Welcome Back</h1>
              <p className="text-base-content/60 mt-1">
                Sign in to manage your assets
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email Address</span>
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={`input input-bordered w-full pl-10 ${
                      errors.email ? "input-error" : ""
                    }`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <label className="label">
                    <span className="label-text-alt text-error flex items-center gap-1">
                      <FiAlertCircle className="h-3 w-3" />
                      {errors.email.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                  <Link to="/forgot-password" className="label-text-alt link link-primary">
                    Forgot password?
                  </Link>
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`input input-bordered w-full pl-10 pr-10 ${
                      errors.password ? "input-error" : ""
                    }`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content"
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5" />
                    ) : (
                      <FiEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <label className="label">
                    <span className="label-text-alt text-error flex items-center gap-1">
                      <FiAlertCircle className="h-3 w-3" />
                      {errors.password.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Remember Me */}
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary checkbox-sm"
                  />
                  <span className="label-text">Remember me</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <FiArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="divider text-sm text-base-content/50">OR</div>

            {/* Google Sign In */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn btn-outline w-full gap-2"
            >
              <FcGoogle className="h-5 w-5" />
              Continue with Google
            </button>

            {/* Register Links */}
            <div className="text-center mt-6 space-y-2">
              <p className="text-sm text-base-content/70">
                Don't have an account?
              </p>
              <div className="flex gap-2 justify-center">
                <Link to="/join-as-employee" className="btn btn-sm btn-ghost">
                  <FiUser className="h-4 w-4" />
                  Join as Employee
                </Link>
                <Link to="/join-as-hr" className="btn btn-sm btn-ghost">
                  <FiBriefcase className="h-4 w-4" />
                  Join as HR
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-sm text-base-content/50 mt-6">
          By signing in, you agree to our{" "}
          <Link to="/terms" className="link link-primary">
            Terms
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="link link-primary">
            Privacy Policy
          </Link>
        </p>
      </div>

      {/* Role Selection Modal for New Google Users */}
      {showRoleModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-xl mb-2">Welcome to AssetVerse!</h3>
            <p className="text-base-content/70 mb-6">
              It looks like you're new here. Please select how you'd like to use AssetVerse:
            </p>

            {/* User Info Display */}
            {googleUser && (
              <div className="flex items-center gap-3 p-4 bg-base-200 rounded-lg mb-6">
                {googleUser.photoURL ? (
                  <img
                    src={googleUser.photoURL}
                    alt={googleUser.name}
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-content font-bold">
                    {googleUser.name?.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-medium">{googleUser.name}</p>
                  <p className="text-sm text-base-content/60">{googleUser.email}</p>
                </div>
              </div>
            )}

            {/* Role Options */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleRoleSelection("employee")}
                className="btn btn-outline h-auto py-6 flex-col gap-2 hover:btn-secondary"
              >
                <FiUser className="h-8 w-8" />
                <span className="font-semibold">Employee</span>
                <span className="text-xs text-base-content/60 font-normal">
                  Request & manage assets
                </span>
              </button>

              <button
                onClick={() => handleRoleSelection("hr")}
                className="btn btn-outline h-auto py-6 flex-col gap-2 hover:btn-primary"
              >
                <FiBriefcase className="h-8 w-8" />
                <span className="font-semibold">HR Manager</span>
                <span className="text-xs text-base-content/60 font-normal">
                  Manage company & assets
                </span>
              </button>
            </div>

            {/* Close Button */}
            <div className="modal-action">
              <button
                onClick={() => {
                  setShowRoleModal(false);
                  setGoogleUser(null);
                }}
                className="btn btn-ghost btn-sm"
              >
                Cancel
              </button>
            </div>
          </div>
          <div 
            className="modal-backdrop bg-black/50" 
            onClick={() => {
              setShowRoleModal(false);
              setGoogleUser(null);
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Login;
