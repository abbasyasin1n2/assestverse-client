import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  FiUser,
  FiMail,
  FiCalendar,
  FiEdit2,
  FiSave,
  FiX,
  FiCamera,
  FiBriefcase,
  FiPackage,
  FiCheckCircle,
} from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import axiosInstance from "../../api/axiosInstance";
import Swal from "sweetalert2";
import { format } from "date-fns";

const EmployeeProfile = () => {
  const { user, refreshUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const queryClient = useQueryClient();

  // Fetch affiliations
  const { data: affiliationsData } = useQuery({
    queryKey: ["myAffiliations"],
    queryFn: async () => {
      const response = await axiosInstance.get("/affiliations/my-companies");
      return response.data;
    },
  });

  // Fetch my assets count
  const { data: assetsData } = useQuery({
    queryKey: ["myAssetsCount"],
    queryFn: async () => {
      const response = await axiosInstance.get("/my-assets?limit=1");
      return response.data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Pre-fill form with user data
  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        dateOfBirth: user.dateOfBirth || "",
      });
      setImagePreview(user.profileImage || null);
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
    setImagePreview(user.profileImage || null);
    reset({
      name: user.name || "",
      dateOfBirth: user.dateOfBirth || "",
    });
  };

  const affiliations = affiliationsData?.data || [];
  const totalAssets = assetsData?.pagination?.total || 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-secondary/10 rounded-xl">
            <FiUser className="h-8 w-8 text-secondary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">My Profile</h1>
            <p className="text-base-content/70">Manage your account information</p>
          </div>
        </div>
        {!isEditing && (
          <button
            className="btn btn-secondary gap-2"
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
                    <div className="w-32 h-32 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
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
                    <label className="btn btn-circle btn-secondary btn-sm absolute bottom-0 right-0 cursor-pointer">
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
                  <span className="badge badge-secondary badge-lg">Employee</span>
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
                  className="btn btn-secondary gap-2"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-info/10 rounded-lg">
                <FiBriefcase className="h-6 w-6 text-info" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Affiliated Companies</p>
                <p className="text-2xl font-bold">{affiliations.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-success/10 rounded-lg">
                <FiPackage className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Assets Assigned</p>
                <p className="text-2xl font-bold">{totalAssets}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Affiliated Companies */}
      {affiliations.length > 0 && (
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h3 className="font-semibold text-lg mb-4">Affiliated Companies</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {affiliations.map((aff) => (
                <div
                  key={aff._id}
                  className="flex items-center gap-3 p-3 bg-base-200 rounded-lg"
                >
                  <div className="avatar">
                    <div className="w-10 h-10 rounded-lg bg-base-300">
                      {aff.companyLogo ? (
                        <img src={aff.companyLogo} alt={aff.companyName} />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full">
                          <FiBriefcase className="h-5 w-5 text-base-content/30" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{aff.companyName}</p>
                    <p className="text-xs text-base-content/60">
                      {aff.affiliatedAt
                        ? `Since ${format(new Date(aff.affiliatedAt), "MMM yyyy")}`
                        : "Active"}
                    </p>
                  </div>
                  <FiCheckCircle className="h-5 w-5 text-success shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeProfile;
