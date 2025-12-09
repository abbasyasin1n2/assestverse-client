import { useQuery } from "@tanstack/react-query";
import {
  FiPackage,
  FiUsers,
  FiClipboard,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
  FiAlertCircle,
  FiPieChart,
  FiArrowRight,
  FiSmile,
} from "react-icons/fi";
import { Link } from "react-router";
import Chart from "react-apexcharts";
import axiosInstance from "../../api/axiosInstance";
import useAuth from "../../hooks/useAuth";

const HRDashboard = () => {
  const { user } = useAuth();

  // Fetch dashboard stats
  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ["hrDashboardStats"],
    queryFn: async () => {
      const response = await axiosInstance.get("/stats/hr");
      return response.data;
    },
  });

  // Fetch recent requests
  const { data: recentRequestsData } = useQuery({
    queryKey: ["recentRequests"],
    queryFn: async () => {
      const response = await axiosInstance.get("/requests?limit=5");
      return response.data;
    },
  });

  const stats = statsData?.data || {};
  const recentRequests = recentRequestsData?.data || [];

  // Chart options for asset types
  const assetTypeChartOptions = {
    chart: {
      type: "donut",
      fontFamily: "inherit",
    },
    labels: ["Returnable", "Non-Returnable"],
    colors: ["#6366f1", "#f59e0b"],
    legend: {
      position: "bottom",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: { width: 280 },
          legend: { position: "bottom" },
        },
      },
    ],
  };

  const assetTypeSeries = [
    stats.returnableAssets || 0,
    stats.nonReturnableAssets || 0,
  ];

  // Chart options for request status
  const requestStatusChartOptions = {
    chart: {
      type: "bar",
      fontFamily: "inherit",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        horizontal: false,
        columnWidth: "50%",
      },
    },
    colors: ["#22c55e", "#eab308", "#ef4444"],
    xaxis: {
      categories: ["Approved", "Pending", "Rejected"],
    },
    legend: { show: false },
  };

  const requestStatusSeries = [
    {
      name: "Requests",
      data: [
        stats.approvedRequests || 0,
        stats.pendingRequests || 0,
        stats.rejectedRequests || 0,
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome back, {user?.name?.split(" ")[0] || "HR Manager"}! <FiSmile className="inline" />
          </h1>
          <p className="text-base-content/70">
            Here's what's happening with your company assets today.
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/dashboard/add-asset" className="btn btn-primary gap-2">
            <FiPackage className="h-4 w-4" />
            Add Asset
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/70">Total Assets</p>
                <p className="text-3xl font-bold">{stats.totalAssets || 0}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-xl">
                <FiPackage className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="text-xs text-base-content/60 mt-2">
              {stats.availableAssets || 0} available
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/70">Employees</p>
                <p className="text-3xl font-bold">{stats.totalEmployees || 0}</p>
              </div>
              <div className="p-3 bg-success/10 rounded-xl">
                <FiUsers className="h-6 w-6 text-success" />
              </div>
            </div>
            <div className="text-xs text-base-content/60 mt-2">
              {user?.packageLimit || 5} max capacity
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/70">Pending Requests</p>
                <p className="text-3xl font-bold text-warning">
                  {stats.pendingRequests || 0}
                </p>
              </div>
              <div className="p-3 bg-warning/10 rounded-xl">
                <FiClock className="h-6 w-6 text-warning" />
              </div>
            </div>
            <Link
              to="/dashboard/all-requests"
              className="text-xs text-primary mt-2 flex items-center gap-1 hover:underline"
            >
              View all <FiArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/70">Total Requests</p>
                <p className="text-3xl font-bold">{stats.totalRequests || 0}</p>
              </div>
              <div className="p-3 bg-info/10 rounded-xl">
                <FiClipboard className="h-6 w-6 text-info" />
              </div>
            </div>
            <div className="text-xs text-success mt-2">
              {stats.approvedRequests || 0} approved
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asset Types Chart */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h3 className="card-title text-lg">
              <FiPieChart className="h-5 w-5" />
              Asset Types
            </h3>
            {statsLoading ? (
              <div className="flex justify-center py-8">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : assetTypeSeries.some((v) => v > 0) ? (
              <Chart
                options={assetTypeChartOptions}
                series={assetTypeSeries}
                type="donut"
                height={280}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-base-content/50">
                <FiPackage className="h-12 w-12 mb-2" />
                <p>No assets yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Request Status Chart */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h3 className="card-title text-lg">
              <FiTrendingUp className="h-5 w-5" />
              Request Status
            </h3>
            {statsLoading ? (
              <div className="flex justify-center py-8">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : requestStatusSeries[0].data.some((v) => v > 0) ? (
              <Chart
                options={requestStatusChartOptions}
                series={requestStatusSeries}
                type="bar"
                height={280}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-base-content/50">
                <FiClipboard className="h-12 w-12 mb-2" />
                <p>No requests yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Requests */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex items-center justify-between mb-4">
            <h3 className="card-title text-lg">
              <FiClipboard className="h-5 w-5" />
              Recent Requests
            </h3>
            <Link
              to="/dashboard/all-requests"
              className="btn btn-ghost btn-sm gap-1"
            >
              View All <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {recentRequests.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Asset</th>
                    <th>Employee</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRequests.map((request) => (
                    <tr key={request._id} className="hover">
                      <td className="font-medium">{request.assetName}</td>
                      <td>{request.employeeName}</td>
                      <td>
                        <span
                          className={`badge badge-sm ${
                            request.status === "approved"
                              ? "badge-success"
                              : request.status === "pending"
                              ? "badge-warning"
                              : request.status === "rejected"
                              ? "badge-error"
                              : "badge-ghost"
                          }`}
                        >
                          {request.status}
                        </span>
                      </td>
                      <td className="text-sm text-base-content/70">
                        {request.requestDate
                          ? new Date(request.requestDate).toLocaleDateString()
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-base-content/50">
              <FiClipboard className="h-12 w-12 mx-auto mb-2" />
              <p>No requests yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card bg-gradient-to-r from-primary to-secondary text-primary-content">
        <div className="card-body">
          <h3 className="card-title">Quick Actions</h3>
          <p className="opacity-80">Manage your company assets efficiently</p>
          <div className="card-actions justify-end mt-4">
            <Link to="/dashboard/add-asset" className="btn btn-ghost">
              Add Asset
            </Link>
            <Link to="/dashboard/employee-list" className="btn bg-white/20 hover:bg-white/30 border-0">
              Manage Employees
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;
