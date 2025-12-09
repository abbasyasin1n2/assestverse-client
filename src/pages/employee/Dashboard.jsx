import { useQuery } from "@tanstack/react-query";
import {
  FiPackage,
  FiUsers,
  FiClock,
  FiCheckCircle,
  FiShoppingCart,
  FiArrowRight,
  FiBriefcase,
  FiCalendar,
  FiSmile,
} from "react-icons/fi";
import { Link } from "react-router";
import Chart from "react-apexcharts";
import axiosInstance from "../../api/axiosInstance";
import useAuth from "../../hooks/useAuth";
import { format } from "date-fns";

const EmployeeDashboard = () => {
  const { user } = useAuth();

  // Fetch dashboard stats
  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ["employeeDashboardStats"],
    queryFn: async () => {
      const response = await axiosInstance.get("/stats/employee");
      return response.data;
    },
  });

  // Fetch my assets (recent)
  const { data: myAssetsData } = useQuery({
    queryKey: ["myRecentAssets"],
    queryFn: async () => {
      const response = await axiosInstance.get("/my-assets?limit=5");
      return response.data;
    },
  });

  // Fetch pending requests
  const { data: pendingData } = useQuery({
    queryKey: ["myPendingRequests"],
    queryFn: async () => {
      const response = await axiosInstance.get("/requests?status=pending&limit=5");
      return response.data;
    },
  });

  const stats = statsData?.data || {};
  const myAssets = myAssetsData?.data || [];
  const pendingRequests = pendingData?.data || [];

  // Chart for asset status
  const assetStatusChartOptions = {
    chart: {
      type: "donut",
      fontFamily: "inherit",
    },
    labels: ["In Use", "Returned", "Pending"],
    colors: ["#22c55e", "#6366f1", "#eab308"],
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

  const assetStatusSeries = [
    stats.inUseAssets || 0,
    stats.returnedAssets || 0,
    stats.pendingRequests || 0,
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome back, {user?.name?.split(" ")[0] || "Employee"}! <FiSmile className="inline" />
          </h1>
          <p className="text-base-content/70">
            Here's an overview of your assets and requests.
          </p>
        </div>
        <Link to="/dashboard/request-asset" className="btn btn-secondary gap-2">
          <FiShoppingCart className="h-4 w-4" />
          Request Asset
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/70">My Assets</p>
                <p className="text-3xl font-bold">{stats.totalAssets || 0}</p>
              </div>
              <div className="p-3 bg-success/10 rounded-xl">
                <FiPackage className="h-6 w-6 text-success" />
              </div>
            </div>
            <Link
              to="/dashboard/my-assets"
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
                <p className="text-sm text-base-content/70">Pending Requests</p>
                <p className="text-3xl font-bold text-warning">
                  {stats.pendingRequests || 0}
                </p>
              </div>
              <div className="p-3 bg-warning/10 rounded-xl">
                <FiClock className="h-6 w-6 text-warning" />
              </div>
            </div>
            <p className="text-xs text-base-content/60 mt-2">
              Awaiting HR approval
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/70">Affiliated Companies</p>
                <p className="text-3xl font-bold">{stats.affiliatedCompanies || 0}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-xl">
                <FiBriefcase className="h-6 w-6 text-primary" />
              </div>
            </div>
            <Link
              to="/dashboard/my-team"
              className="text-xs text-primary mt-2 flex items-center gap-1 hover:underline"
            >
              View team <FiArrowRight className="h-3 w-3" />
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
                <FiCheckCircle className="h-6 w-6 text-info" />
              </div>
            </div>
            <div className="text-xs text-success mt-2">
              {stats.approvedRequests || 0} approved
            </div>
          </div>
        </div>
      </div>

      {/* Content Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Asset Status Chart */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h3 className="card-title text-lg">Asset Status</h3>
            {statsLoading ? (
              <div className="flex justify-center py-8">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : assetStatusSeries.some((v) => v > 0) ? (
              <Chart
                options={assetStatusChartOptions}
                series={assetStatusSeries}
                type="donut"
                height={250}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-base-content/50">
                <FiPackage className="h-12 w-12 mb-2" />
                <p>No assets yet</p>
                <Link
                  to="/dashboard/request-asset"
                  className="btn btn-sm btn-primary mt-3"
                >
                  Request an Asset
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* My Assets */}
        <div className="card bg-base-100 shadow-sm lg:col-span-2">
          <div className="card-body">
            <div className="flex items-center justify-between mb-2">
              <h3 className="card-title text-lg">My Recent Assets</h3>
              <Link
                to="/dashboard/my-assets"
                className="btn btn-ghost btn-sm gap-1"
              >
                View All <FiArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {myAssets.length > 0 ? (
              <div className="space-y-3">
                {myAssets.map((asset) => (
                  <div
                    key={asset._id}
                    className="flex items-center gap-3 p-3 bg-base-200 rounded-lg"
                  >
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-lg bg-base-300">
                        {asset.assetImage ? (
                          <img src={asset.assetImage} alt={asset.assetName} />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full">
                            <FiPackage className="h-6 w-6 text-base-content/30" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{asset.assetName}</p>
                      <p className="text-xs text-base-content/60">
                        {asset.companyName}
                      </p>
                    </div>
                    <span
                      className={`badge ${
                        asset.status === "approved"
                          ? "badge-success"
                          : asset.status === "returned"
                          ? "badge-info"
                          : "badge-ghost"
                      }`}
                    >
                      {asset.status === "approved" ? "In Use" : asset.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-base-content/50">
                <FiPackage className="h-12 w-12 mx-auto mb-2" />
                <p>No assets assigned yet</p>
                <Link
                  to="/dashboard/request-asset"
                  className="btn btn-sm btn-secondary mt-3"
                >
                  Request an Asset
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h3 className="card-title text-lg">
              <FiClock className="h-5 w-5 text-warning" />
              Pending Requests
            </h3>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Asset</th>
                    <th>Company</th>
                    <th>Requested On</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingRequests.map((request) => (
                    <tr key={request._id} className="hover">
                      <td className="font-medium">{request.assetName}</td>
                      <td>{request.companyName}</td>
                      <td className="text-sm text-base-content/70">
                        {request.requestDate
                          ? format(new Date(request.requestDate), "MMM d, yyyy")
                          : "-"}
                      </td>
                      <td>
                        <span className="badge badge-warning badge-sm">
                          Pending
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="card bg-gradient-to-r from-secondary to-accent text-secondary-content">
        <div className="card-body">
          <h3 className="card-title">Need Something?</h3>
          <p className="opacity-80">
            Browse available assets from your affiliated companies
          </p>
          <div className="card-actions justify-end mt-4">
            <Link to="/dashboard/my-team" className="btn btn-ghost">
              View Team
            </Link>
            <Link
              to="/dashboard/request-asset"
              className="btn bg-white/20 hover:bg-white/30 border-0"
            >
              Browse Assets
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
