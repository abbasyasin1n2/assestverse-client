import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FiUsers,
  FiSearch,
  FiRefreshCw,
  FiMail,
  FiCalendar,
  FiUserX,
  FiChevronLeft,
  FiChevronRight,
  FiInbox,
  FiAlertCircle,
  FiUser,
  FiPackage,
} from "react-icons/fi";
import axiosInstance from "../../api/axiosInstance";
import Swal from "sweetalert2";
import { format } from "date-fns";

const EmployeeList = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const queryClient = useQueryClient();

  // Fetch employees affiliated with this HR's company
  const {
    data: employeesData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["employees", search, page],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      params.append("page", page);
      params.append("limit", limit);

      const response = await axiosInstance.get(`/affiliations/employees?${params.toString()}`);
      return response.data;
    },
  });

  // Remove employee mutation
  const removeMutation = useMutation({
    mutationFn: async (employeeEmail) => {
      const response = await axiosInstance.delete(`/affiliations/${encodeURIComponent(employeeEmail)}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      Swal.fire({
        icon: "success",
        title: "Employee Removed",
        text: "The employee has been removed from your team",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Removal Failed",
        text: error.response?.data?.message || "Failed to remove employee",
      });
    },
  });

  // Handle remove employee
  const handleRemove = (employee) => {
    Swal.fire({
      title: "Remove Employee?",
      html: `
        <p>Are you sure you want to remove <strong>${employee.employeeName}</strong> from your team?</p>
        <p class="text-sm text-gray-500 mt-2">They will no longer have access to company assets.</p>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, remove",
    }).then((result) => {
      if (result.isConfirmed) {
        removeMutation.mutate(employee.employeeEmail);
      }
    });
  };

  const employees = employeesData?.data || [];
  const totalPages = employeesData?.pagination?.totalPages || 1;
  const totalEmployees = employeesData?.pagination?.total || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl">
            <FiUsers className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">My Employees</h1>
            <p className="text-base-content/70">
              Manage your team members ({totalEmployees} employees)
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="form-control flex-1">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  className="input input-bordered w-full pl-10"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
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
          <FiAlertCircle className="h-5 w-5" />
          <span>Failed to load employees. Please try again.</span>
          <button className="btn btn-sm" onClick={() => refetch()}>
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && employees.length === 0 && (
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body items-center text-center py-12">
            <FiInbox className="h-16 w-16 text-base-content/30 mb-4" />
            <h3 className="text-xl font-semibold">No Employees Yet</h3>
            <p className="text-base-content/70 mb-4">
              {search
                ? "No employees match your search."
                : "Employees will appear here when they request and get approved for your company's assets."}
            </p>
          </div>
        </div>
      )}

      {/* Employee Table */}
      {!isLoading && !isError && employees.length > 0 && (
        <div className="card bg-base-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Email</th>
                  <th>Affiliated Since</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee._id} className="hover">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-10 h-10 rounded-full bg-base-200">
                            {employee.employeeDetails?.profileImage ? (
                              <img
                                src={employee.employeeDetails.profileImage}
                                alt={employee.employeeName}
                              />
                            ) : (
                              <div className="flex items-center justify-center w-full h-full">
                                <FiUser className="h-5 w-5 text-base-content/30" />
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium">{employee.employeeName}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1 text-sm">
                        <FiMail className="h-4 w-4 text-base-content/50" />
                        {employee.employeeEmail}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1 text-sm">
                        <FiCalendar className="h-4 w-4 text-base-content/50" />
                        {employee.affiliatedAt
                          ? format(new Date(employee.affiliatedAt), "MMM d, yyyy")
                          : "-"}
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${employee.status === "active" ? "badge-success" : "badge-ghost"} badge-sm`}>
                        {employee.status || "active"}
                      </span>
                    </td>
                    <td className="text-right">
                      <button
                        className="btn btn-ghost btn-sm text-error gap-1"
                        onClick={() => handleRemove(employee)}
                        disabled={removeMutation.isPending}
                      >
                        <FiUserX className="h-4 w-4" />
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

export default EmployeeList;
