import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import {
  FiUser,
  FiMail,
  FiCalendar,
  FiEdit2,
  FiSave,
  FiX,
  FiUpload,
  FiCamera,
  FiBriefcase,
  FiPackage,
  FiUsers,
  FiShield,
} from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import axiosInstance from "../../api/axiosInstance";
import Swal from "sweetalert2";
import { format } from "date-fns";

const HRProfile = () => {
  const { user, refreshUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  // Pre-fill form with user data
  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        dateOfBirth: user.dateOfBirth || "",
        companyName: user.companyName || "",
      });
      setImagePreview(user.profileImage || user.companyLogo || null);
    }
  }, [user, reset]);

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        Swal.fire({
          icon: "error",
          title: "File too large",
          text: "Image must be less than 2MB",
        });
        return;
      }
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Upload image to Cloudinary
  const uploadImage = async (file) => {
    const reader = new FileReader();
    const base64Promise = new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
    reader.readAsDataURL(file);
    const base64Data = await base64Promise;

    const response = await axiosInstance.post("/cloudinary/upload", {
      file: base64Data,
      folder: "assetverse/profiles",
    });

    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to upload image");
    }
    return response.data.url;
  };

  // Handle form submission
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      let imageUrl = user.profileImage;

      // Upload new image if selected
      if (profileImage) {
        imageUrl = await uploadImage(profileImage);
      }

      // Update user profile
      await axiosInstance.patch(`/users/${encodeURIComponent(user.email)}`, {
        name: data.name,
        dateOfBirth: data.dateOfBirth,
        companyName: data.companyName,
        profileImage: imageUrl,
      });

      // Refresh user data
      await refreshUser();
      queryClient.invalidateQueries({ queryKey: ["user"] });

      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile has been updated successfully",
        timer: 2000,
        showConfirmButton: false,
      });

      setIsEditing(false);
      setProfileImage(null);
    } catch (error) {
      console.error("Profile update error:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.response?.data?.message || "Failed to update profile",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setIsEditing(false);
    setProfileImage(null);
    setImagePreview(user.profileImage || user.companyLogo || null);
    reset({
      name: user.name || "",
      dateOfBirth: user.dateOfBirth || "",
      companyName: user.companyName || "",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl">
            <FiUser className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">My Profile</h1>
            <p className="text-base-content/70">Manage your account information</p>
          </div>
        </div>
        {!isEditing && (
          <button
            className="btn btn-primary gap-2"
            onClick={() => setIsEditing(true)}
          >
            <FiEdit2 className="h-4 w-4" />
            Edit Profile
          </button>
        )}
      </div>

      {/* Profile Card */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Image */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="avatar">
                    <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      {imagePreview ? (
                        <img src={imagePreview} alt={user?.name} className="object-cover" />
                      ) : (
                        <div className="bg-base-200 flex items-center justify-center w-full h-full">
                          <FiUser className="h-12 w-12 text-base-content/30" />
                        </div>
                      )}
                    </div>
                  </div>
                  {isEditing && (
                    <label className="btn btn-circle btn-primary btn-sm absolute bottom-0 right-0 cursor-pointer">
                      <FiCamera className="h-4 w-4" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <div className="mt-4 text-center">
                  <span className="badge badge-primary badge-lg gap-1">
                    <FiShield className="h-4 w-4" />
                    HR Manager
                  </span>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-4">
                {/* Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Full Name</span>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      className={`input input-bordered ${errors.name ? "input-error" : ""}`}
                      {...register("name", { required: "Name is required" })}
                    />
                  ) : (
                    <p className="text-lg">{user?.name || "-"}</p>
                  )}
                  {errors.name && (
                    <span className="text-error text-sm mt-1">{errors.name.message}</span>
                  )}
                </div>

                {/* Email (Read-only) */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Email</span>
                  </label>
                  <div className="flex items-center gap-2 text-lg">
                    <FiMail className="h-5 w-5 text-base-content/50" />
                    {user?.email || "-"}
                  </div>
                </div>

                {/* Company Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Company Name</span>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="input input-bordered"
                      {...register("companyName")}
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-lg">
                      <FiBriefcase className="h-5 w-5 text-base-content/50" />
                      {user?.companyName || "-"}
                    </div>
                  )}
                </div>

                {/* Date of Birth */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Date of Birth</span>
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      className="input input-bordered"
                      {...register("dateOfBirth")}
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-lg">
                      <FiCalendar className="h-5 w-5 text-base-content/50" />
                      {user?.dateOfBirth
                        ? format(new Date(user.dateOfBirth), "MMMM d, yyyy")
                        : "-"}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                <button
                  type="button"
                  className="btn btn-ghost gap-2"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  <FiX className="h-4 w-4" />
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <FiSave className="h-4 w-4" />
                  )}
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-info/10 rounded-lg">
                <FiPackage className="h-6 w-6 text-info" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Package Limit</p>
                <p className="text-2xl font-bold">{user?.packageLimit || 5}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-success/10 rounded-lg">
                <FiUsers className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Current Employees</p>
                <p className="text-2xl font-bold">{user?.currentEmployees || 0}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <FiShield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Subscription</p>
                <p className="text-2xl font-bold capitalize">{user?.subscription || "Basic"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRProfile;
