import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FiPackage,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiCalendar,
  FiClock,
  FiCheck,
  FiX,
  FiRotateCcw,
  FiPrinter,
  FiChevronLeft,
  FiChevronRight,
  FiInbox,
  FiAlertCircle,
} from "react-icons/fi";
import axiosInstance from "../../api/axiosInstance";
import Swal from "sweetalert2";
import { format } from "date-fns";

const MyAssets = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const queryClient = useQueryClient();

  // Fetch my assets (requests that have been approved)
  const {
    data: assetsData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["myAssets", search, typeFilter, statusFilter, page],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (typeFilter) params.append("type", typeFilter);
      if (statusFilter) params.append("status", statusFilter);
      params.append("page", page);
      params.append("limit", limit);

      const response = await axiosInstance.get(`/my-assets?${params.toString()}`);
      return response.data;
    },
  });

  // Return asset mutation
  const returnMutation = useMutation({
    mutationFn: async (requestId) => {
      const response = await axiosInstance.patch(`/requests/${requestId}/return`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myAssets"] });
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      Swal.fire({
        icon: "success",
        title: "Return Requested",
        text: "Your return request has been submitted",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Return Failed",
        text: error.response?.data?.message || "Failed to submit return request",
      });
    },
  });

  // Handle return
  const handleReturn = (asset) => {
    if (asset.assetType === "non-returnable") {
      Swal.fire({
        icon: "info",
        title: "Non-Returnable Asset",
        text: "This asset is non-returnable and cannot be returned.",
      });
      return;
    }

    Swal.fire({
      title: "Return Asset?",
      html: `<p>Request to return <strong>${asset.assetName}</strong>?</p>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, return it",
    }).then((result) => {
      if (result.isConfirmed) {
        returnMutation.mutate(asset._id);
      }
    });
  };

  // Handle print
  const handlePrint = (asset) => {
    const printContent = `
      <html>
        <head>
          <title>Asset Details - ${asset.assetName}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #333; border-bottom: 2px solid #333; padding-bottom: 10px; }
            .detail { margin: 10px 0; }
            .label { font-weight: bold; color: #666; }
            .value { margin-left: 10px; }
            .footer { margin-top: 30px; font-size: 12px; color: #999; }
          </style>
        </head>
        <body>
          <h1>Asset Assignment Details</h1>
          <div class="detail"><span class="label">Asset Name:</span><span class="value">${asset.assetName}</span></div>
          <div class="detail"><span class="label">Asset Type:</span><span class="value">${asset.assetType}</span></div>
          <div class="detail"><span class="label">Category:</span><span class="value">${asset.assetCategory || "N/A"}</span></div>
          <div class="detail"><span class="label">Company:</span><span class="value">${asset.companyName || "N/A"}</span></div>
          <div class="detail"><span class="label">Request Date:</span><span class="value">${asset.requestDate ? format(new Date(asset.requestDate), "MMMM d, yyyy") : "N/A"}</span></div>
          <div class="detail"><span class="label">Approval Date:</span><span class="value">${asset.approvalDate ? format(new Date(asset.approvalDate), "MMMM d, yyyy") : "N/A"}</span></div>
          <div class="detail"><span class="label">Status:</span><span class="value">${asset.status}</span></div>
          <div class="footer">Printed on ${format(new Date(), "MMMM d, yyyy 'at' h:mm a")}</div>
        </body>
      </html>
    `;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  const getStatusBadge = (status, type) => {
    const statusConfig = {
      pending: { class: "badge-warning", icon: FiClock, text: "Pending" },
      approved: { class: "badge-success", icon: FiCheck, text: "In Use" },
      rejected: { class: "badge-error", icon: FiX, text: "Rejected" },
      returned: { class: "badge-info", icon: FiRotateCcw, text: "Returned" },
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
            <h1 className="text-2xl font-bold">My Assets</h1>
            <p className="text-base-content/70">
              Assets assigned to you ({totalAssets} total)
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
              <option value="pending">Pending</option>
              <option value="approved">In Use</option>
              <option value="returned">Returned</option>
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
            <h3 className="text-xl font-semibold">No Assets Found</h3>
            <p className="text-base-content/70 mb-4">
              {search || typeFilter || statusFilter
                ? "No assets match your filters."
                : "You don't have any assigned assets yet."}
            </p>
          </div>
        </div>
      )}

      {/* Assets List */}
      {!isLoading && !isError && assets.length > 0 && (
        <div className="space-y-4">
          {assets.map((asset) => (
            <div key={asset._id} className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Asset Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="avatar">
                      <div className="w-16 h-16 rounded-lg bg-base-200">
                        {asset.assetImage ? (
                          <img
                            src={asset.assetImage}
                            alt={asset.assetName}
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
                      <h3 className="font-semibold text-lg">{asset.assetName}</h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-base-content/70">
                        <span className={`badge badge-sm ${asset.assetType === "returnable" ? "badge-primary" : "badge-secondary"}`}>
                          {asset.assetType}
                        </span>
                        {asset.assetCategory && (
                          <>
                            <span className="hidden sm:inline">•</span>
                            <span>{asset.assetCategory}</span>
                          </>
                        )}
                        <span className="hidden sm:inline">•</span>
                        <span className="flex items-center gap-1">
                          <FiCalendar className="h-4 w-4" />
                          {asset.requestDate
                            ? format(new Date(asset.requestDate), "MMM d, yyyy")
                            : "-"}
                        </span>
                      </div>
                      {asset.companyName && (
                        <p className="text-sm text-base-content/60 mt-1">
                          From: {asset.companyName}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex items-center gap-3">
                    {getStatusBadge(asset.status, asset.assetType)}
                    
                    {/* Print button for approved assets */}
                    {asset.status === "approved" && (
                      <button
                        className="btn btn-ghost btn-sm gap-1"
                        onClick={() => handlePrint(asset)}
                        title="Print details"
                      >
                        <FiPrinter className="h-4 w-4" />
                        <span className="hidden sm:inline">Print</span>
                      </button>
                    )}

                    {/* Return button for returnable approved assets */}
                    {asset.status === "approved" && asset.assetType === "returnable" && (
                      <button
                        className="btn btn-info btn-sm gap-1"
                        onClick={() => handleReturn(asset)}
                        disabled={returnMutation.isPending}
                      >
                        <FiRotateCcw className="h-4 w-4" />
                        Return
                      </button>
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

export default MyAssets;
