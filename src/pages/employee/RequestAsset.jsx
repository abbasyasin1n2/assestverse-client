import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FiShoppingCart,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiPackage,
  FiSend,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiInbox,
  FiAlertCircle,
  FiGrid,
  FiList,
} from "react-icons/fi";
import axiosInstance from "../../api/axiosInstance";
import Swal from "sweetalert2";

const assetCategories = [
  "All Categories",
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

const RequestAsset = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");
  const limit = 12;

  const queryClient = useQueryClient();

  // Fetch available assets from affiliated companies
  const {
    data: assetsData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["availableAssets", search, typeFilter, categoryFilter, page],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (typeFilter) params.append("type", typeFilter);
      if (categoryFilter && categoryFilter !== "All Categories") {
        params.append("category", categoryFilter);
      }
      params.append("page", page);
      params.append("limit", limit);

      const response = await axiosInstance.get(`/assets/available?${params.toString()}`);
      return response.data;
    },
  });

  // Request asset mutation
  const requestMutation = useMutation({
    mutationFn: async ({ assetId, message }) => {
      const response = await axiosInstance.post("/requests", {
        assetId,
        message,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["availableAssets"] });
      queryClient.invalidateQueries({ queryKey: ["myAssets"] });
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      Swal.fire({
        icon: "success",
        title: "Request Submitted!",
        text: "Your asset request has been sent to the HR manager for approval.",
        timer: 2500,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Request Failed",
        text: error.response?.data?.message || "Failed to submit request",
      });
    },
  });

  // Handle request
  const handleRequest = (asset) => {
    Swal.fire({
      title: `Request ${asset.name}?`,
      html: `
        <div class="text-left">
          <p class="mb-3">From: <strong>${asset.companyName || "Company"}</strong></p>
          <p class="text-sm text-gray-500">Add an optional message for the HR manager:</p>
        </div>
      `,
      input: "textarea",
      inputPlaceholder: "Why do you need this asset? (optional)",
      inputAttributes: {
        "aria-label": "Request message",
      },
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Submit Request",
      showLoaderOnConfirm: true,
      preConfirm: (message) => {
        return requestMutation.mutateAsync({
          assetId: asset._id,
          message: message || "",
        });
      },
      allowOutsideClick: () => !requestMutation.isPending,
    });
  };

  const assets = assetsData?.data || [];
  const totalPages = assetsData?.pagination?.totalPages || 1;
  const totalAssets = assetsData?.pagination?.total || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl">
            <FiShoppingCart className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Request Asset</h1>
            <p className="text-base-content/70">
              Browse and request assets ({totalAssets} available)
            </p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="join">
          <button
            className={`join-item btn btn-sm ${viewMode === "grid" ? "btn-active" : ""}`}
            onClick={() => setViewMode("grid")}
          >
            <FiGrid className="h-4 w-4" />
          </button>
          <button
            className={`join-item btn btn-sm ${viewMode === "list" ? "btn-active" : ""}`}
            onClick={() => setViewMode("list")}
          >
            <FiList className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="form-control flex-1">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
                <input
                  type="text"
                  placeholder="Search assets..."
                  className="input input-bordered w-full pl-10"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
            </div>

            {/* Type Filter */}
            <select
              className="select select-bordered w-full lg:w-40"
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Types</option>
              <option value="returnable">Returnable</option>
              <option value="non-returnable">Non-Returnable</option>
            </select>

            {/* Category Filter */}
            <select
              className="select select-bordered w-full lg:w-48"
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setPage(1);
              }}
            >
              {assetCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Refresh */}
            <button
              className="btn btn-ghost btn-square"
              onClick={() => refetch()}
              title="Refresh"
            >
              <FiRefreshCw className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="alert alert-error">
          <FiAlertCircle className="h-5 w-5" />
          <span>Failed to load assets. Please try again.</span>
          <button className="btn btn-sm" onClick={() => refetch()}>
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && assets.length === 0 && (
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body items-center text-center py-12">
            <FiInbox className="h-16 w-16 text-base-content/30 mb-4" />
            <h3 className="text-xl font-semibold">No Assets Available</h3>
            <p className="text-base-content/70 mb-4">
              {search || typeFilter || categoryFilter
                ? "No assets match your filters."
                : "No assets are currently available for request."}
            </p>
          </div>
        </div>
      )}

      {/* Grid View */}
      {!isLoading && !isError && assets.length > 0 && viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {assets.map((asset) => (
            <div key={asset._id} className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
              {/* Asset Image */}
              <figure className="h-40 bg-base-200">
                {asset.image ? (
                  <img
                    src={asset.image}
                    alt={asset.name}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <FiPackage className="h-12 w-12 text-base-content/30" />
                  </div>
                )}
              </figure>
              <div className="card-body p-4">
                <h3 className="card-title text-base line-clamp-1">{asset.name}</h3>
                <div className="flex flex-wrap gap-1 mb-2">
                  <span className={`badge badge-xs ${asset.type === "returnable" ? "badge-primary" : "badge-secondary"}`}>
                    {asset.type}
                  </span>
                  <span className="badge badge-xs badge-ghost">{asset.category}</span>
                </div>
                {asset.companyName && (
                  <p className="text-xs text-base-content/60 line-clamp-1">{asset.companyName}</p>
                )}
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-success font-medium flex items-center gap-1">
                    <FiCheck className="h-3 w-3" />
                    {asset.availableQuantity} available
                  </span>
                  <button
                    className="btn btn-primary btn-xs gap-1"
                    onClick={() => handleRequest(asset)}
                    disabled={requestMutation.isPending || asset.availableQuantity < 1}
                  >
                    <FiSend className="h-3 w-3" />
                    Request
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {!isLoading && !isError && assets.length > 0 && viewMode === "list" && (
        <div className="space-y-3">
          {assets.map((asset) => (
            <div key={asset._id} className="card bg-base-100 shadow-sm">
              <div className="card-body p-4">
                <div className="flex items-center gap-4">
                  {/* Image */}
                  <div className="avatar">
                    <div className="w-14 h-14 rounded-lg bg-base-200">
                      {asset.image ? (
                        <img src={asset.image} alt={asset.name} className="object-cover" />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full">
                          <FiPackage className="h-6 w-6 text-base-content/30" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold">{asset.name}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-base-content/70">
                      <span className={`badge badge-sm ${asset.type === "returnable" ? "badge-primary" : "badge-secondary"}`}>
                        {asset.type}
                      </span>
                      <span>{asset.category}</span>
                      {asset.companyName && (
                        <>
                          <span className="hidden sm:inline">•</span>
                          <span className="hidden sm:inline">{asset.companyName}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-success font-medium">
                      {asset.availableQuantity} available
                    </span>
                    <button
                      className="btn btn-primary btn-sm gap-1"
                      onClick={() => handleRequest(asset)}
                      disabled={requestMutation.isPending || asset.availableQuantity < 1}
                    >
                      <FiSend className="h-4 w-4" />
                      Request
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="flex justify-center">
          <div className="join">
            <button
              className="join-item btn"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <FiChevronLeft className="h-5 w-5" />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  className={`join-item btn ${page === pageNum ? "btn-active" : ""}`}
                  onClick={() => setPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              className="join-item btn"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              <FiChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestAsset;
