import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import {
  FiPlusSquare,
  FiPackage,
  FiTag,
  FiHash,
  FiImage,
  FiFileText,
  FiCalendar,
  FiDollarSign,
  FiUpload,
  FiX,
  FiAlertCircle,
  FiCheck,
} from "react-icons/fi";
import axiosInstance from "../../api/axiosInstance";
import Swal from "sweetalert2";

const assetCategories = [
  "Laptop",
  "Desktop",
  "Monitor",
  "Phone",
  "Tablet",
  "Keyboard",
  "Mouse",
  "Headphones",
  "Chair",
  "Desk",
  "Furniture",
  "Stationery",
  "Software License",
  "Other",
];

const AddAsset = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      type: "returnable",
      quantity: 1,
      category: "",
    },
  });

  const assetType = watch("type");

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          icon: "error",
          title: "File too large",
          text: "Image must be less than 5MB",
        });
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove selected image
  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  // Upload image to Cloudinary via server
  const uploadToCloudinary = async (file) => {
    // Convert file to base64
    const reader = new FileReader();
    const base64Promise = new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
    reader.readAsDataURL(file);
    const base64Data = await base64Promise;

    // Upload via server endpoint
    const response = await axiosInstance.post("/cloudinary/upload", {
      file: base64Data,
      folder: "assetverse/assets",
    });

    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to upload image");
    }

    return response.data.url;
  };

  // Handle form submission
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      let imageUrl = null;

      // Upload image if selected
      if (imageFile) {
        setUploadProgress(30);
        imageUrl = await uploadToCloudinary(imageFile);
        setUploadProgress(60);
      }

      // Prepare asset data
      const assetData = {
        name: data.name,
        type: data.type,
        category: data.category,
        quantity: parseInt(data.quantity),
        availableQuantity: parseInt(data.quantity),
        image: imageUrl,
        description: data.description || "",
        purchaseDate: data.purchaseDate || null,
        purchasePrice: data.purchasePrice ? parseFloat(data.purchasePrice) : null,
        currency: "BDT",
        status: "available",
      };

      setUploadProgress(80);

      // Send to server
      const response = await axiosInstance.post("/assets", assetData);

      setUploadProgress(100);

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Asset Added!",
          text: `${data.name} has been added to your inventory`,
          timer: 2000,
          showConfirmButton: false,
        });

        // Reset form
        reset();
        setImageFile(null);
        setImagePreview(null);

        // Navigate to asset list
        navigate("/dashboard/asset-list");
      }
    } catch (error) {
      console.error("Error adding asset:", error);
      console.error("Error response:", error.response);
      console.error("Error status:", error.response?.status);
      console.error("Error data:", error.response?.data);
      
      const errorMessage = error.response?.data?.message 
        || error.response?.data?.error 
        || error.message 
        || "Something went wrong";
      
      Swal.fire({
        icon: "error",
        title: "Failed to Add Asset",
        text: `${errorMessage} (Status: ${error.response?.status || 'unknown'})`,
      });
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-primary/10 rounded-xl">
          <FiPlusSquare className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Add New Asset</h1>
          <p className="text-base-content/70">Add a new asset to your company inventory</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title text-lg mb-4">Asset Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Asset Name */}
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-medium">Asset Name *</span>
                </label>
                <div className="relative">
                  <FiPackage className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
                  <input
                    type="text"
                    placeholder="e.g., MacBook Pro 14-inch"
                    className={`input input-bordered w-full pl-10 ${
                      errors.name ? "input-error" : ""
                    }`}
                    {...register("name", {
                      required: "Asset name is required",
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

              {/* Asset Type */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Asset Type *</span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="returnable"
                      className="radio radio-primary"
                      {...register("type", { required: true })}
                    />
                    <span className="label-text">Returnable</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="non-returnable"
                      className="radio radio-secondary"
                      {...register("type", { required: true })}
                    />
                    <span className="label-text">Non-Returnable</span>
                  </label>
                </div>
                <p className="text-xs text-base-content/60 mt-1">
                  {assetType === "returnable"
                    ? "Asset can be returned after use (e.g., laptop, monitor)"
                    : "Asset cannot be returned (e.g., stationery, consumables)"}
                </p>
              </div>

              {/* Category */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Category *</span>
                </label>
                <div className="relative">
                  <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50 z-10" />
                  <select
                    className={`select select-bordered w-full pl-10 ${
                      errors.category ? "select-error" : ""
                    }`}
                    {...register("category", {
                      required: "Please select a category",
                    })}
                  >
                    <option value="">Select category</option>
                    {assetCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.category && (
                  <label className="label">
                    <span className="label-text-alt text-error flex items-center gap-1">
                      <FiAlertCircle className="h-3 w-3" />
                      {errors.category.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Quantity */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Quantity *</span>
                </label>
                <div className="relative">
                  <FiHash className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
                  <input
                    type="number"
                    min="1"
                    placeholder="1"
                    className={`input input-bordered w-full pl-10 ${
                      errors.quantity ? "input-error" : ""
                    }`}
                    {...register("quantity", {
                      required: "Quantity is required",
                      min: {
                        value: 1,
                        message: "Quantity must be at least 1",
                      },
                    })}
                  />
                </div>
                {errors.quantity && (
                  <label className="label">
                    <span className="label-text-alt text-error flex items-center gap-1">
                      <FiAlertCircle className="h-3 w-3" />
                      {errors.quantity.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Purchase Date */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Purchase Date</span>
                  <span className="label-text-alt">Optional</span>
                </label>
                <div className="relative">
                  <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
                  <input
                    type="date"
                    className="input input-bordered w-full pl-10"
                    {...register("purchaseDate")}
                  />
                </div>
              </div>

              {/* Purchase Price */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Purchase Price (BDT)</span>
                  <span className="label-text-alt">Optional</span>
                </label>
                <div className="relative">
                  <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className="input input-bordered w-full pl-10"
                    {...register("purchasePrice")}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-medium">Description</span>
                  <span className="label-text-alt">Optional</span>
                </label>
                <div className="relative">
                  <FiFileText className="absolute left-3 top-3 text-base-content/50" />
                  <textarea
                    placeholder="Enter asset description, specifications, or notes..."
                    className="textarea textarea-bordered w-full pl-10 min-h-24"
                    {...register("description")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title text-lg mb-4">
              <FiImage className="h-5 w-5" />
              Asset Image
            </h2>

            {!imagePreview ? (
              <div className="border-2 border-dashed border-base-300 rounded-xl p-8 text-center hover:border-primary transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="asset-image"
                />
                <label
                  htmlFor="asset-image"
                  className="cursor-pointer flex flex-col items-center gap-3"
                >
                  <div className="p-4 bg-base-200 rounded-full">
                    <FiUpload className="h-8 w-8 text-base-content/50" />
                  </div>
                  <div>
                    <p className="font-medium">Click to upload image</p>
                    <p className="text-sm text-base-content/60">
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                </label>
              </div>
            ) : (
              <div className="relative inline-block">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-64 rounded-xl object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="btn btn-circle btn-sm btn-error absolute -top-2 -right-2"
                >
                  <FiX className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={() => navigate("/dashboard/asset-list")}
            className="btn btn-ghost"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                {uploadProgress > 0 && uploadProgress < 100
                  ? `Uploading... ${uploadProgress}%`
                  : "Saving..."}
              </>
            ) : (
              <>
                <FiCheck className="h-5 w-5" />
                Add Asset
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAsset;
