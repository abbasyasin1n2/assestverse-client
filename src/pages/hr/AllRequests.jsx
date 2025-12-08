import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FiClipboard,
  FiSearch,
  FiFilter,
  FiCheck,
  FiX,
  FiClock,
  FiRefreshCw,
  FiUser,
  FiPackage,
  FiCalendar,
  FiMessageSquare,
  FiChevronLeft,
  FiChevronRight,
  FiInbox,
} from "react-icons/fi";
import axiosInstance from "../../api/axiosInstance";
import Swal from "sweetalert2";
import { format } from "date-fns";

const AllRequests = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const queryClient = useQueryClient();

  // Fetch requests
  const {
    data: requestsData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["requests", search, statusFilter, page],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (statusFilter) params.append("status", statusFilter);
      params.append("page", page);
      params.append("limit", limit);

      const response = await axiosInstance.get(`/requests?${params.toString()}`);
      return response.data;
    },
  });

  // Approve request mutation
  const approveMutation = useMutation({
    mutationFn: async (requestId) => {
      const response = await axiosInstance.patch(`/requests/${requestId}/approve`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      queryClient.invalidateQueries({ queryKey: ["assets"] });
      Swal.fire({
        icon: "success",
        title: "Request Approved",
        text: "The asset has been assigned to the employee",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Approval Failed",
        text: error.response?.data?.message || "Failed to approve request",
      });
    },
  });

  // Reject request mutation
  const rejectMutation = useMutation({
    mutationFn: async ({ requestId, rejectionReason }) => {
      const response = await axiosInstance.patch(`/requests/${requestId}/reject`, {
        rejectionReason,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      Swal.fire({
        icon: "success",
        title: "Request Rejected",
        text: "The request has been rejected",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Rejection Failed",
        text: error.response?.data?.message || "Failed to reject request",
      });
    },
  });

  // Handle approve
  const handleApprove = (request) => {
    Swal.fire({
      title: "Approve Request?",
      html: `
        <p>Approve <strong>${request.assetName}</strong> for <strong>${request.employeeName}</strong>?</p>
        <p class="text-sm text-gray-500 mt-2">This will assign the asset to the employee.</p>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, approve",
    }).then((result) => {
      if (result.isConfirmed) {
        approveMutation.mutate(request._id);
      }
    });
  };

  // Handle reject
  const handleReject = (request) => {
    Swal.fire({
      title: "Reject Request?",
      html: `
        <p>Reject <strong>${request.assetName}</strong> request from <strong>${request.employeeName}</strong>?</p>
      `,
      input: "textarea",
      inputLabel: "Reason for rejection (optional)",
      inputPlaceholder: "Enter reason...",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Reject",
    }).then((result) => {
      if (result.isConfirmed) {
        rejectMutation.mutate({
          requestId: request._id,
          rejectionReason: result.value || "",
        });
      }
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { class: "badge-warning", icon: FiClock, text: "Pending" },
      approved: { class: "badge-success", icon: FiCheck, text: "Approved" },
      rejected: { class: "badge-error", icon: FiX, text: "Rejected" },
      returned: { class: "badge-info", icon: FiRefreshCw, text: "Returned" },
      cancelled: { class: "badge-ghost", icon: FiX, text: "Cancelled" },
    };
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    return (
      <span className={`badge ${config.class} gap-1`}>
        <Icon className="h-3 w-3" />
        {config.text}
      </span>
    );
  };

  const requests = requestsData?.data || [];
  const totalPages = requestsData?.pagination?.totalPages || 1;
  const totalRequests = requestsData?.pagination?.total || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl">
            <FiClipboard className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">All Requests</h1>
            <p className="text-base-content/70">
              Manage employee asset requests ({totalRequests} total)
            </p>
          </div>
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
                  placeholder="Search by employee or asset name..."
                  className="input input-bordered w-full pl-10"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
            </div>

            {/* Status Filter */}
            <select
              className="select select-bordered w-full lg:w-48"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="returned">Returned</option>
              <option value="cancelled">Cancelled</option>
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
          <span>Failed to load requests. Please try again.</span>
          <button className="btn btn-sm" onClick={() => refetch()}>
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && requests.length === 0 && (
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body items-center text-center py-12">
            <FiInbox className="h-16 w-16 text-base-content/30 mb-4" />
            <h3 className="text-xl font-semibold">No Requests Found</h3>
            <p className="text-base-content/70 mb-4">
              {search || statusFilter
                ? "No requests match your filters. Try adjusting your search."
                : "No asset requests have been made yet."}
            </p>
          </div>
        </div>
      )}

      {/* Requests List */}
      {!isLoading && !isError && requests.length > 0 && (
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request._id} className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Asset Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="avatar">
                      <div className="w-16 h-16 rounded-lg bg-base-200">
                        {request.assetImage ? (
                          <img
                            src={request.assetImage}
                            alt={request.assetName}
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full">
                            <FiPackage className="h-8 w-8 text-base-content/30" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg">{request.assetName}</h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-base-content/70">
                        <span className="flex items-center gap-1">
                          <FiUser className="h-4 w-4" />
                          {request.employeeName}
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span className="flex items-center gap-1">
                          <FiCalendar className="h-4 w-4" />
                          {request.requestDate
                            ? format(new Date(request.requestDate), "MMM d, yyyy")
                            : "-"}
                        </span>
                      </div>
                      {request.message && (
                        <p className="text-sm text-base-content/60 mt-1 flex items-start gap-1">
                          <FiMessageSquare className="h-4 w-4 mt-0.5 shrink-0" />
                          <span className="truncate">{request.message}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex items-center gap-4">
                    {getStatusBadge(request.status)}
                    
                    {request.status === "pending" && (
                      <div className="flex gap-2">
                        <button
                          className="btn btn-success btn-sm gap-1"
                          onClick={() => handleApprove(request)}
                          disabled={approveMutation.isPending}
                        >
                          <FiCheck className="h-4 w-4" />
                          Approve
                        </button>
                        <button
                          className="btn btn-error btn-sm gap-1"
                          onClick={() => handleReject(request)}
                          disabled={rejectMutation.isPending}
                        >
                          <FiX className="h-4 w-4" />
                          Reject
                        </button>
                      </div>
                    )}

                    {request.status === "approved" && request.approvalDate && (
                      <span className="text-sm text-base-content/60">
                        Approved {format(new Date(request.approvalDate), "MMM d, yyyy")}
                      </span>
                    )}

                    {request.status === "rejected" && request.rejectionReason && (
                      <span className="text-sm text-error truncate max-w-48" title={request.rejectionReason}>
                        {request.rejectionReason}
                      </span>
                    )}
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

export default AllRequests;
