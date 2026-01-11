import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import {
  FiPackage,
  FiSearch,
  FiFilter,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiRefreshCw,
  FiBox,
  FiGrid,
  FiList,
  FiImage,
  FiUserPlus,
  FiEye,
} from "react-icons/fi";
import axiosInstance from "../../api/axiosInstance";
import Swal from "sweetalert2";
import { format } from "date-fns";
import AssetDetailsModal from "../../components/shared/AssetDetailsModal";

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

const AssetList = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState("table"); // table or grid
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [assignAsset, setAssignAsset] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [assignNotes, setAssignNotes] = useState("");
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const limit = 10;

  const queryClient = useQueryClient();

  // Fetch assets
  const {
    data: assetsData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["assets", search, typeFilter, categoryFilter, statusFilter, sortBy, page],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (typeFilter) params.append("type", typeFilter);
      if (categoryFilter && categoryFilter !== "All Categories") {
        params.append("category", categoryFilter);
      }
      if (statusFilter) params.append("status", statusFilter);
      if (sortBy) params.append("sort", sortBy);
      params.append("page", page);
      params.append("limit", limit);

      const response = await axiosInstance.get(`/assets?${params.toString()}`);
      return response.data;
    },
  });

  // Fetch employees for assignment (affiliated)
  const { data: assignEmployeesData, isLoading: employeesLoading } = useQuery({
    queryKey: ["employees-for-assign"],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("limit", 200);
      const response = await axiosInstance.get(`/affiliations/employees?${params.toString()}`);
      return response.data?.data || [];
    },
    staleTime: 5 * 60 * 1000,
  });

  // Assign asset mutation
  const assignMutation = useMutation({
    mutationFn: async ({ assetId, employeeEmail, notes }) => {
      const response = await axiosInstance.post(`/assets/${assetId}/assign`, {
        employeeEmail,
        notes,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["assets"]);
      setAssignModalOpen(false);
      setSelectedEmployee("");
      setAssignNotes("");
      Swal.fire({
        icon: "success",
        title: "Asset Assigned",
        text: "The asset has been assigned to the employee",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Assignment Failed",
        text: error.response?.data?.message || "Failed to assign asset",
      });
    },
  });

  const openAssignModal = (asset) => {
    setAssignAsset(asset);
    setAssignModalOpen(true);
  };

  // Delete asset mutation
  const deleteMutation = useMutation({
    mutationFn: async (assetId) => {
      const response = await axiosInstance.delete(`/assets/${assetId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["assets"]);
      Swal.fire({
        icon: "success",
        title: "Asset Deleted",
        text: "The asset has been removed from inventory",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: error.response?.data?.message || "Failed to delete asset",
      });
    },
  });

  // Handle delete
  const handleDelete = (asset) => {
    Swal.fire({
      title: "Delete Asset?",
      text: `Are you sure you want to delete "${asset.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(asset._id);
      }
    });
  };

  // Handle search with debounce
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
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
            <FiPackage className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Asset List</h1>
            <p className="text-base-content/70">
              Manage your company assets ({totalAssets} total)
            </p>
          </div>
        </div>
        <Link to="/dashboard/add-asset" className="btn btn-primary gap-2">
          <FiPlus className="h-5 w-5" />
          Add Asset
        </Link>
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
                  placeholder="Search assets by name..."
                  className="input input-bordered w-full pl-10"
                  value={search}
                  onChange={handleSearchChange}
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

            {/* Status Filter */}
            <select
              className="select select-bordered w-full lg:w-40"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Status</option>
              <option value="available">Available</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>

            {/* Sort */}
            <select
              className="select select-bordered w-full lg:w-40"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setPage(1);
              }}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="quantity-high">Qty High-Low</option>
              <option value="quantity-low">Qty Low-High</option>
            </select>

            {/* View Mode Toggle */}
            <div className="join">
              <button
                className={`btn join-item ${viewMode === "table" ? "btn-active" : ""}`}
                onClick={() => setViewMode("table")}
              >
                <FiList className="h-5 w-5" />
              </button>
              <button
                className={`btn join-item ${viewMode === "grid" ? "btn-active" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                <FiGrid className="h-5 w-5" />
              </button>
            </div>

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
            <FiBox className="h-16 w-16 text-base-content/30 mb-4" />
            <h3 className="text-xl font-semibold">No Assets Found</h3>
            <p className="text-base-content/70 mb-4">
              {search || typeFilter || categoryFilter || statusFilter
                ? "No assets match your filters. Try adjusting your search."
                : "Start by adding your first asset to the inventory."}
            </p>
            <Link to="/dashboard/add-asset" className="btn btn-primary gap-2">
              <FiPlus className="h-5 w-5" />
              Add First Asset
            </Link>
          </div>
        </div>
      )}

      {/* Table View */}
      {!isLoading && !isError && assets.length > 0 && viewMode === "table" && (
        <div className="card bg-base-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="bg-base-200">
                  <th>Asset</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Available</th>
                  <th>Status</th>
                  <th>Added</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset) => (
                  <tr key={asset._id} className="hover">
                    <td>
                      <div className="flex items-center gap-3">
                        {asset.image ? (
                          <img
                            src={asset.image}
                            alt={asset.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-base-200 flex items-center justify-center">
                            <FiImage className="h-6 w-6 text-base-content/30" />
                          </div>
                        )}
                        <div>
                          <div className="font-medium">{asset.name}</div>
                          {asset.description && (
                            <div className="text-sm text-base-content/60 truncate max-w-48">
                              {asset.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`badge badge-sm whitespace-nowrap ${
                          asset.type === "returnable"
                            ? "badge-primary"
                            : "badge-secondary"
                        }`}
                      >
                        {asset.type === "returnable" ? "Returnable" : "Non-Returnable"}
                      </span>
                    </td>
                    <td>{asset.category || "-"}</td>
                    <td className="font-medium">{asset.quantity}</td>
                    <td>
                      <span
                        className={`font-medium ${
                          asset.availableQuantity === 0
                            ? "text-error"
                            : asset.availableQuantity < asset.quantity
                            ? "text-warning"
                            : "text-success"
                        }`}
                      >
                        {asset.availableQuantity}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge badge-sm whitespace-nowrap ${
                          asset.availableQuantity > 0
                            ? "badge-success"
                            : "badge-error"
                        }`}
                      >
                        {asset.availableQuantity > 0 ? "Available" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="text-sm text-base-content/70">
                      {asset.createdAt
                        ? format(new Date(asset.createdAt), "MMM d, yyyy")
                        : "-"}
                    </td>
                    <td>
                      <div className="flex gap-1">
                        <button
                          className="btn btn-ghost btn-sm btn-square"
                          title="View Details"
                          onClick={() => {
                            setSelectedAsset(asset);
                            setDetailsModalOpen(true);
                          }}
                        >
                          <FiEye className="h-4 w-4" />
                        </button>
                        <Link
                          to={`/dashboard/update-asset/${asset._id}`}
                          className="btn btn-ghost btn-sm btn-square"
                          title="Edit"
                        >
                          <FiEdit2 className="h-4 w-4" />
                        </Link>
                        <button
                          className="btn btn-ghost btn-sm btn-square"
                          title="Assign"
                          onClick={() => openAssignModal(asset)}
                          disabled={asset.availableQuantity < 1}
                        >
                          <FiUserPlus className="h-4 w-4" />
                        </button>
                        <button
                          className="btn btn-ghost btn-sm btn-square text-error"
                          onClick={() => handleDelete(asset)}
                          title="Delete"
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Grid View */}
      {!isLoading && !isError && assets.length > 0 && viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {assets.map((asset) => (
            <div key={asset._id} className="card bg-base-100 shadow-sm">
              <figure className="h-48 bg-base-200">
                {asset.image ? (
                  <img
                    src={asset.image}
                    alt={asset.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <FiImage className="h-12 w-12 text-base-content/20" />
                  </div>
                )}
              </figure>
              <div className="card-body p-4">
                <h3 className="card-title text-base">{asset.name}</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  <span
                    className={`badge badge-sm ${
                      asset.type === "returnable"
                        ? "badge-primary badge-outline"
                        : "badge-secondary badge-outline"
                    }`}
                  >
                    {asset.type}
                  </span>
                  <span className="badge badge-sm badge-ghost">
                    {asset.category}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-3 text-sm">
                  <span className="text-base-content/70">
                    Qty: <span className="font-medium">{asset.quantity}</span>
                  </span>
                  <span
                    className={`badge badge-sm ${
                      asset.availableQuantity > 0 ? "badge-success" : "badge-error"
                    }`}
                  >
                    {asset.availableQuantity} available
                  </span>
                </div>
                <div className="card-actions justify-end mt-3">
                  <button
                    className="btn btn-ghost btn-sm gap-1"
                    onClick={() => {
                      setSelectedAsset(asset);
                      setDetailsModalOpen(true);
                    }}
                  >
                    <FiEye className="h-4 w-4" />
                    View
                  </button>
                  <Link
                    to={`/dashboard/update-asset/${asset._id}`}
                    className="btn btn-ghost btn-sm gap-1"
                  >
                    <FiEdit2 className="h-4 w-4" />
                    Edit
                  </Link>
                    <button
                      className="btn btn-ghost btn-sm gap-1"
                      onClick={() => openAssignModal(asset)}
                      disabled={asset.availableQuantity < 1}
                    >
                      <FiUserPlus className="h-4 w-4" />
                      Assign
                    </button>
                  <button
                    className="btn btn-ghost btn-sm text-error gap-1"
                    onClick={() => handleDelete(asset)}
                  >
                    <FiTrash2 className="h-4 w-4" />
                    Delete
                  </button>
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

      {/* Assign Modal */}
      {assignModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-2">Assign Asset</h3>
            <p className="text-sm text-base-content/70 mb-4">
              {assignAsset?.name} • {assignAsset?.availableQuantity} available
            </p>

            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Select Employee</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                disabled={employeesLoading}
              >
                <option value="">Choose an employee</option>
                {(assignEmployeesData || []).map((emp) => (
                  <option key={emp._id} value={emp.employeeEmail}>
                    {emp.employeeName} ({emp.employeeEmail})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Notes (optional)</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                rows={2}
                value={assignNotes}
                onChange={(e) => setAssignNotes(e.target.value)}
                placeholder="Add a note"
              />
            </div>

            <div className="modal-action">
              <button
                className="btn btn-ghost"
                onClick={() => {
                  setAssignModalOpen(false);
                  setSelectedEmployee("");
                  setAssignNotes("");
                }}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                disabled={!selectedEmployee || assignMutation.isPending}
                onClick={() =>
                  assignMutation.mutate({
                    assetId: assignAsset._id,
                    employeeEmail: selectedEmployee,
                    notes: assignNotes,
                  })
                }
              >
                {assignMutation.isPending ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Assign"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Asset Details Modal */}
      <AssetDetailsModal
        asset={selectedAsset}
        isOpen={detailsModalOpen}
        onClose={() => {
          setDetailsModalOpen(false);
          setSelectedAsset(null);
        }}
        showActions={true}
        onAction={
          selectedAsset && (
            <div className="flex gap-2 w-full">
              <Link
                to={`/dashboard/update-asset/${selectedAsset._id}`}
                className="btn btn-primary btn-sm flex-1"
              >
                <FiEdit2 className="h-4 w-4" />
                Edit
              </Link>
              <button
                className="btn btn-info btn-sm flex-1"
                onClick={() => {
                  setDetailsModalOpen(false);
                  openAssignModal(selectedAsset);
                }}
                disabled={selectedAsset.availableQuantity < 1}
              >
                <FiUserPlus className="h-4 w-4" />
                Assign
              </button>
              <button
                className="btn btn-error btn-sm"
                onClick={() => {
                  setDetailsModalOpen(false);
                  handleDelete(selectedAsset);
                }}
              >
                <FiTrash2 className="h-4 w-4" />
              </button>
            </div>
          )
        }
      />
    </div>
  );
};

export default AssetList;
