import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import {
  FiUser,
  FiMail,
  FiLock,
  FiCalendar,
  FiUpload,
  FiX,
  FiEye,
  FiEyeOff,
  FiCheck,
  FiAlertCircle,
  FiSearch,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import axiosInstance from "../../api/axiosInstance";
import Swal from "sweetalert2";

const RegisterEmployee = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [loadingCompanies, setLoadingCompanies] = useState(true);

  const { createUser, updateUserProfile, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  const password = watch("password", "");

  // Fetch companies on mount
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const { data } = await axiosInstance.get("/companies");
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
        // Use empty array if API fails
        setCompanies([]);
      } finally {
        setLoadingCompanies(false);
      }
    };
    fetchCompanies();
  }, []);

  // Filter companies based on search
  const filteredCompanies = companies.filter((company) =>
    company.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  // Handle photo file selection
  const handlePhotoChange = (e) => {
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
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove photo
  const removePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  // Upload photo to Cloudinary
  const uploadToCloudinary = async (file) => {
    try {
      const { data: signatureData } = await axiosInstance.post("/cloudinary/signature", {
        folder: "assetverse/employees",
      });

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", signatureData.apiKey);
      formData.append("timestamp", signatureData.timestamp);
      formData.append("signature", signatureData.signature);
      formData.append("folder", "assetverse/employees");

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
      throw new Error("Failed to upload photo");
    }
  };

  // Handle company selection
  const handleSelectCompany = (company) => {
    setSelectedCompany(company);
    setSearchTerm(company.companyName);
    setShowDropdown(false);
    setValue("companyId", company._id);
  };

  // Handle form submission
  const onSubmit = async (data) => {
    if (!selectedCompany) {
      Swal.fire({
        icon: "warning",
        title: "Company Required",
        text: "Please select your company from the list",
      });
      return;
    }

    // Check if company has available slots
    if (selectedCompany.currentEmployees >= selectedCompany.packageLimit) {
      Swal.fire({
        icon: "error",
        title: "Company Full",
        text: "This company has reached its employee limit. Please contact your HR manager.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload photo if provided
      let photoUrl = "";
      if (photoFile) {
        setIsUploading(true);
        photoUrl = await uploadToCloudinary(photoFile);
        setIsUploading(false);
      }

      // Create user in Firebase
      await createUser(data.email, data.password);

      // Update profile with name and photo
      await updateUserProfile(data.name, photoUrl || null);

      // Save user to database
      const userData = {
        name: data.name,
        email: data.email,
        dateOfBirth: data.dateOfBirth,
        profileImage: photoUrl,
        role: "employee",
        companyId: selectedCompany._id,
        companyName: selectedCompany.companyName,
        companyLogo: selectedCompany.companyLogo,
        hrEmail: selectedCompany.email,
        status: "active",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await axiosInstance.post("/users", userData);

      // Update company employee count
      await axiosInstance.patch(`/companies/${selectedCompany._id}/increment-employees`);

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: `Welcome to ${selectedCompany.companyName}. You can now request company assets.`,
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/dashboard/my-assets");
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

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    if (!selectedCompany) {
      Swal.fire({
        icon: "warning",
        title: "Company Required",
        text: "Please select your company first before signing in with Google",
      });
      return;
    }

    try {
      const result = await googleSignIn();
      const user = result.user;

      // Check if user exists in database
      const { data: existingUser } = await axiosInstance.get(`/users/${user.email}`);

      if (existingUser) {
        navigate(existingUser.role === "hr" ? "/dashboard/asset-list" : "/dashboard/my-assets");
      } else {
        // New user - create employee account
        const userData = {
          name: user.displayName,
          email: user.email,
          profileImage: user.photoURL,
          role: "employee",
          companyId: selectedCompany._id,
          companyName: selectedCompany.companyName,
          companyLogo: selectedCompany.companyLogo,
          hrEmail: selectedCompany.email,
          status: "active",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        await axiosInstance.post("/users", userData);
        await axiosInstance.patch(`/companies/${selectedCompany._id}/increment-employees`);

        Swal.fire({
          icon: "success",
          title: "Welcome!",
          text: `You've joined ${selectedCompany.companyName}`,
          timer: 2000,
          showConfirmButton: false,
        });

        navigate("/dashboard/my-assets");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl">
        <div className="card bg-base-100 shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-5">
            {/* Left Side - Branding */}
            <div className="lg:col-span-2 bg-gradient-to-br from-secondary to-accent p-8 lg:p-10 text-secondary-content flex flex-col justify-center">
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold">Join Your Team</h1>
                  <p className="text-secondary-content/80 mt-2">
                    as an Employee
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary-content/20 flex items-center justify-center shrink-0 mt-0.5">
                      <FiCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Request Assets</h3>
                      <p className="text-sm text-secondary-content/70">
                        Request laptops, equipment, and more
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary-content/20 flex items-center justify-center shrink-0 mt-0.5">
                      <FiCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Track Your Assets</h3>
                      <p className="text-sm text-secondary-content/70">
                        Monitor all assets assigned to you
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary-content/20 flex items-center justify-center shrink-0 mt-0.5">
                      <FiCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Team Collaboration</h3>
                      <p className="text-sm text-secondary-content/70">
                        Connect with your team members
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <p className="text-sm text-secondary-content/70">
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
                <h2 className="text-2xl font-bold mb-6">Create Employee Account</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Profile Photo Upload */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Profile Photo (Optional)</span>
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        {photoPreview ? (
                          <div className="relative">
                            <img
                              src={photoPreview}
                              alt="Photo preview"
                              className="w-20 h-20 rounded-full object-cover border-2 border-secondary"
                            />
                            <button
                              type="button"
                              onClick={removePhoto}
                              className="absolute -top-2 -right-2 btn btn-circle btn-error btn-xs"
                            >
                              <FiX className="h-3 w-3" />
                            </button>
                          </div>
                        ) : (
                          <label className="w-20 h-20 rounded-full border-2 border-dashed border-base-300 hover:border-secondary flex flex-col items-center justify-center cursor-pointer transition-colors">
                            <FiUpload className="h-6 w-6 text-base-content/50" />
                            <span className="text-xs text-base-content/50 mt-1">Photo</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handlePhotoChange}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                      <div className="text-sm text-base-content/70">
                        <p>Upload your photo</p>
                        <p className="text-xs">PNG, JPG up to 2MB</p>
                      </div>
                    </div>
                  </div>

                  {/* Company Selection */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Select Your Company *</span>
                    </label>
                    <div className="relative">
                      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
                      <input
                        type="text"
                        placeholder={loadingCompanies ? "Loading companies..." : "Search for your company"}
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setShowDropdown(true);
                          if (selectedCompany?.companyName !== e.target.value) {
                            setSelectedCompany(null);
                          }
                        }}
                        onFocus={() => setShowDropdown(true)}
                        className={`input input-bordered w-full pl-10 ${
                          !selectedCompany && searchTerm ? "input-warning" : ""
                        }`}
                        disabled={loadingCompanies}
                      />
                      <input type="hidden" {...register("companyId")} />

                      {/* Dropdown */}
                      {showDropdown && filteredCompanies.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-base-100 border border-base-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                          {filteredCompanies.map((company) => (
                            <button
                              type="button"
                              key={company._id}
                              onClick={() => handleSelectCompany(company)}
                              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-base-200 transition-colors text-left"
                            >
                              {company.companyLogo ? (
                                <img
                                  src={company.companyLogo}
                                  alt={company.companyName}
                                  className="w-10 h-10 rounded-lg object-cover"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                                  <span className="text-secondary font-bold">
                                    {company.companyName.charAt(0)}
                                  </span>
                                </div>
                              )}
                              <div>
                                <p className="font-medium">{company.companyName}</p>
                                <p className="text-xs text-base-content/50">
                                  {company.currentEmployees}/{company.packageLimit} employees
                                </p>
                              </div>
                              {company.currentEmployees >= company.packageLimit && (
                                <span className="ml-auto badge badge-error badge-sm">Full</span>
                              )}
                            </button>
                          ))}
                        </div>
                      )}

                      {showDropdown && searchTerm && filteredCompanies.length === 0 && !loadingCompanies && (
                        <div className="absolute z-10 w-full mt-1 bg-base-100 border border-base-300 rounded-lg shadow-lg p-4 text-center text-base-content/70">
                          No companies found. Ask your HR to register first.
                        </div>
                      )}
                    </div>
                    {selectedCompany && (
                      <label className="label">
                        <span className="label-text-alt text-success flex items-center gap-1">
                          <FiCheck className="h-3 w-3" />
                          Selected: {selectedCompany.companyName}
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
                        placeholder="employee@email.com"
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
                        className="checkbox checkbox-secondary checkbox-sm"
                        {...register("terms", {
                          required: "You must accept the terms and conditions",
                        })}
                      />
                      <span className="label-text text-sm">
                        I agree to the{" "}
                        <Link to="/terms" className="link link-secondary">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="link link-secondary">
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
                    className="btn btn-secondary w-full"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        {isUploading ? "Uploading Photo..." : "Creating Account..."}
                      </>
                    ) : (
                      "Join Company"
                    )}
                  </button>

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

                  {/* HR Link */}
                  <p className="text-center text-sm text-base-content/70 mt-4">
                    Want to register your company?{" "}
                    <Link to="/join-as-hr" className="link link-secondary font-medium">
                      Register as HR
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

export default RegisterEmployee;
