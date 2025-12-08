import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import {
  FiUser,
  FiBriefcase,
  FiMail,
  FiLock,
  FiCalendar,
  FiUpload,
  FiX,
  FiEye,
  FiEyeOff,
  FiCheck,
  FiAlertCircle,
} from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import axiosInstance from "../../api/axiosInstance";
import Swal from "sweetalert2";

const RegisterHR = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password", "");

  // Password strength checker
  const getPasswordStrength = (pass) => {
    if (!pass) return { strength: 0, label: "", color: "" };
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.length >= 8) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;

    const levels = [
      { label: "Very Weak", color: "bg-error" },
      { label: "Weak", color: "bg-warning" },
      { label: "Fair", color: "bg-warning" },
      { label: "Good", color: "bg-info" },
      { label: "Strong", color: "bg-success" },
    ];

    return { strength, ...levels[Math.min(strength, 4)] };
  };

  const passwordStrength = getPasswordStrength(password);

  // Handle logo file selection
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        Swal.fire({
          icon: "error",
          title: "File too large",
          text: "Please select an image under 2MB",
        });
        return;
      }
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove logo
  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
  };

  // Upload logo to Cloudinary
  const uploadToCloudinary = async (file) => {
    try {
      // Get signature from backend
      const { data: signatureData } = await axiosInstance.post("/cloudinary/signature", {
        folder: "assetverse/companies",
      });

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", signatureData.apiKey);
      formData.append("timestamp", signatureData.timestamp);
      formData.append("signature", signatureData.signature);
      formData.append("folder", "assetverse/companies");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      return result.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw new Error("Failed to upload logo");
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    if (!logoFile) {
      Swal.fire({
        icon: "warning",
        title: "Logo Required",
        text: "Please upload your company logo",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload logo to Cloudinary
      setIsUploading(true);
      const logoUrl = await uploadToCloudinary(logoFile);
      setIsUploading(false);

      // Create user in Firebase
      const result = await createUser(data.email, data.password);

      // Update profile with name
      await updateUserProfile(data.name, logoUrl);

      // Save user to database (matches users collection schema)
      const userData = {
        name: data.name,
        email: data.email,
        role: "hr",
        // HR-specific fields:
        companyName: data.companyName,
        companyLogo: logoUrl,
        packageLimit: 5,
        currentEmployees: 0,
        subscription: "basic",
        // Common fields:
        dateOfBirth: data.dateOfBirth,
        profileImage: null, // HR can upload separate profile image later
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await axiosInstance.post("/users", userData);

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Welcome to AssetVerse. You can now manage your company assets.",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/dashboard/asset-list");
    } catch (error) {
      console.error("Registration error:", error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl">
        <div className="card bg-base-100 shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-5">
            {/* Left Side - Branding */}
            <div className="lg:col-span-2 bg-gradient-to-br from-primary to-secondary p-8 lg:p-10 text-primary-content flex flex-col justify-center">
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold">Join AssetVerse</h1>
                  <p className="text-primary-content/80 mt-2">
                    as an HR Manager
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-content/20 flex items-center justify-center shrink-0 mt-0.5">
                      <FiCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Free Basic Package</h3>
                      <p className="text-sm text-primary-content/70">
                        Start with 5 employee slots at no cost
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-content/20 flex items-center justify-center shrink-0 mt-0.5">
                      <FiCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Asset Tracking</h3>
                      <p className="text-sm text-primary-content/70">
                        Manage and track all company assets
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-content/20 flex items-center justify-center shrink-0 mt-0.5">
                      <FiCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Employee Management</h3>
                      <p className="text-sm text-primary-content/70">
                        Easily manage your team and assignments
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <p className="text-sm text-primary-content/70">
                    Already have an account?{" "}
                    <Link to="/login" className="font-semibold underline hover:no-underline">
                      Login here
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="lg:col-span-3 p-8 lg:p-10">
              <div className="max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-6">Create HR Account</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Company Logo Upload */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Company Logo *</span>
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        {logoPreview ? (
                          <div className="relative">
                            <img
                              src={logoPreview}
                              alt="Logo preview"
                              className="w-20 h-20 rounded-lg object-cover border-2 border-primary"
                            />
                            <button
                              type="button"
                              onClick={removeLogo}
                              className="absolute -top-2 -right-2 btn btn-circle btn-error btn-xs"
                            >
                              <FiX className="h-3 w-3" />
                            </button>
                          </div>
                        ) : (
                          <label className="w-20 h-20 rounded-lg border-2 border-dashed border-base-300 hover:border-primary flex flex-col items-center justify-center cursor-pointer transition-colors">
                            <FiUpload className="h-6 w-6 text-base-content/50" />
                            <span className="text-xs text-base-content/50 mt-1">Upload</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleLogoChange}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                      <div className="text-sm text-base-content/70">
                        <p>Upload your company logo</p>
                        <p className="text-xs">PNG, JPG up to 2MB</p>
                      </div>
                    </div>
                  </div>

                  {/* Company Name */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Company Name *</span>
                    </label>
                    <div className="relative">
                      <FiBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
                      <input
                        type="text"
                        placeholder="Enter company name"
                        className={`input input-bordered w-full pl-10 ${
                          errors.companyName ? "input-error" : ""
                        }`}
                        {...register("companyName", {
                          required: "Company name is required",
                          minLength: {
                            value: 2,
                            message: "Company name must be at least 2 characters",
                          },
                        })}
                      />
                    </div>
                    {errors.companyName && (
                      <label className="label">
                        <span className="label-text-alt text-error flex items-center gap-1">
                          <FiAlertCircle className="h-3 w-3" />
                          {errors.companyName.message}
                        </span>
                      </label>
                    )}
                  </div>

                  {/* Full Name */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Your Full Name *</span>
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        className={`input input-bordered w-full pl-10 ${
                          errors.name ? "input-error" : ""
                        }`}
                        {...register("name", {
                          required: "Full name is required",
                          minLength: {
                            value: 2,
                            message: "Name must be at least 2 characters",
                          },
                        })}
                      />
                    </div>
                    {errors.name && (
                      <label className="label">
                        <span className="label-text-alt text-error flex items-center gap-1">
                          <FiAlertCircle className="h-3 w-3" />
                          {errors.name.message}
                        </span>
                      </label>
                    )}
                  </div>

                  {/* Email */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Email Address *</span>
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
                      <input
                        type="email"
                        placeholder="hr@company.com"
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

                  {/* Date of Birth */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Date of Birth *</span>
                    </label>
                    <div className="relative">
                      <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
                      <input
                        type="date"
                        className={`input input-bordered w-full pl-10 ${
                          errors.dateOfBirth ? "input-error" : ""
                        }`}
                        {...register("dateOfBirth", {
                          required: "Date of birth is required",
                        })}
                      />
                    </div>
                    {errors.dateOfBirth && (
                      <label className="label">
                        <span className="label-text-alt text-error flex items-center gap-1">
                          <FiAlertCircle className="h-3 w-3" />
                          {errors.dateOfBirth.message}
                        </span>
                      </label>
                    )}
                  </div>

                  {/* Password */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Password *</span>
                    </label>
                    <div className="relative">
                      <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
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
                    {/* Password strength indicator */}
                    {password && (
                      <div className="mt-2">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <div
                              key={level}
                              className={`h-1 flex-1 rounded-full transition-colors ${
                                level <= passwordStrength.strength
                                  ? passwordStrength.color
                                  : "bg-base-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs mt-1 text-base-content/70">
                          Password strength: {passwordStrength.label}
                        </p>
                      </div>
                    )}
                    {errors.password && (
                      <label className="label">
                        <span className="label-text-alt text-error flex items-center gap-1">
                          <FiAlertCircle className="h-3 w-3" />
                          {errors.password.message}
                        </span>
                      </label>
                    )}
                  </div>

                  {/* Terms Checkbox */}
                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-3">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary checkbox-sm"
                        {...register("terms", {
                          required: "You must accept the terms and conditions",
                        })}
                      />
                      <span className="label-text text-sm">
                        I agree to the{" "}
                        <Link to="/terms" className="link link-primary">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="link link-primary">
                          Privacy Policy
                        </Link>
                      </span>
                    </label>
                    {errors.terms && (
                      <label className="label pt-0">
                        <span className="label-text-alt text-error flex items-center gap-1">
                          <FiAlertCircle className="h-3 w-3" />
                          {errors.terms.message}
                        </span>
                      </label>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-full"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        {isUploading ? "Uploading Logo..." : "Creating Account..."}
                      </>
                    ) : (
                      "Create HR Account"
                    )}
                  </button>

                  {/* Employee Link */}
                  <p className="text-center text-sm text-base-content/70 mt-4">
                    Want to join as an employee?{" "}
                    <Link to="/join-as-employee" className="link link-primary font-medium">
                      Register here
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterHR;
