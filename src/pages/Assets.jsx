import { useState } from "react";
import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import {
  FiSearch,
  FiFilter,
  FiPackage,
  FiGrid,
  FiList,
  FiChevronLeft,
  FiChevronRight,
  FiBox,
  FiArrowRight,
  FiBriefcase,
  FiTag,
  FiRefreshCw,
  FiEye,
  FiX,
} from "react-icons/fi";
import axiosInstance from "../api/axiosInstance";
import useAuth from "../hooks/useAuth";

const Assets = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [companyFilter, setCompanyFilter] = useState("");
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const limit = 12;

  // Fetch public assets
  const {
    data: assetsData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["publicAssets", search, typeFilter, categoryFilter, companyFilter, page],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (typeFilter && typeFilter !== "all") params.append("type", typeFilter);
      if (categoryFilter && categoryFilter !== "all") params.append("category", categoryFilter);
      if (companyFilter) params.append("company", companyFilter);
      params.append("page", page.toString());
      params.append("limit", limit.toString());

      const response = await axiosInstance.get(`/assets/public/browse?${params.toString()}`);
      return response.data;
    },
    placeholderData: (previousData) => previousData,
    staleTime: 30000, // 30 seconds
  });

  // Fetch asset details
  const { data: assetDetails, isLoading: detailsLoading } = useQuery({
    queryKey: ["publicAssetDetails", selectedAsset?._id],
    queryFn: async () => {
      if (!selectedAsset?._id) return null;
      const response = await axiosInstance.get(`/assets/public/${selectedAsset._id}`);
      return response.data;
    },
    enabled: !!selectedAsset?._id,
  });

  const handleAssetClick = (asset) => {
    setSelectedAsset(asset);
    setIsModalOpen(true);
  };

  const handleGetStarted = () => {
    if (user) {
      // Redirect based on role
      if (user.role === "hr") {
        navigate("/dashboard/asset-list");
      } else {
        navigate("/dashboard/request-asset");
      }
    } else {
      navigate("/login");
    }
  };

  const assets = assetsData?.data || [];
  const filters = assetsData?.filters || { companies: [], categories: [] };
  const totalPages = assetsData?.pagination?.totalPages || 1;
  const totalAssets = assetsData?.pagination?.total || 0;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              <FiPackage className="h-4 w-4" />
              Browse Assets
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Discover Available <span className="text-primary">Corporate Assets</span>
            </h1>
            <p className="text-lg text-base-content/70 mb-8">
              Explore assets from various companies on our platform. Sign up as an employee 
              to request assets or as an HR manager to list your company's equipment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-16 bg-base-100">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card bg-base-200/50 shadow-sm mb-8"
          >
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
                  className="select select-bordered w-full lg:w-44"
                  value={typeFilter}
                  onChange={(e) => {
                    setTypeFilter(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="all">All Types</option>
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
                  <option value="all">All Categories</option>
                  {filters.categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                {/* View Mode Toggle */}
                <div className="join">
                  <button
                    className={`btn join-item ${viewMode === "grid" ? "btn-active" : ""}`}
                    onClick={() => setViewMode("grid")}
                  >
                    <FiGrid className="h-5 w-5" />
                  </button>
                  <button
                    className={`btn join-item ${viewMode === "list" ? "btn-active" : ""}`}
                    onClick={() => setViewMode("list")}
                  >
                    <FiList className="h-5 w-5" />
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

              {/* Results Count */}
              <div className="text-sm text-base-content/60 mt-2">
                Showing {assets.length} of {totalAssets} assets
              </div>
            </div>
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center py-16">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="alert alert-error mb-8">
              <span>Failed to load assets. Please try again.</span>
              <button className="btn btn-sm" onClick={() => refetch()}>
                Retry
              </button>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !isError && assets.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <FiBox className="h-20 w-20 text-base-content/20 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold mb-2">No Assets Found</h3>
              <p className="text-base-content/70 mb-6">
                {search || typeFilter !== "all" || categoryFilter !== "all"
                  ? "Try adjusting your filters to find more assets."
                  : "There are no assets listed yet. Be the first HR to add assets!"}
              </p>
              <Link to="/join-as-hr" className="btn btn-primary gap-2">
                List Your Assets
                <FiArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          )}

          {/* Assets Grid */}
          {!isLoading && !isError && assets.length > 0 && (
            <>
              <div
                className={
                  viewMode === "grid"
                    ? "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "space-y-4"
                }
              >
                {assets.map((asset, index) => (
                  <motion.div
                    key={asset._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                    className={`card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group ${
                      viewMode === "list" ? "card-side" : ""
                    }`}
                    onClick={() => handleAssetClick(asset)}
                  >
                    {/* Asset Image */}
                    <figure className={`relative ${viewMode === "list" ? "w-48 shrink-0" : "h-48"}`}>
                      {asset.image ? (
                        <img
                          src={asset.image}
                          alt={asset.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-base-200 flex items-center justify-center">
                          <FiPackage className="h-16 w-16 text-base-content/20" />
                        </div>
                      )}
                      {/* Type Badge */}
                      <div className="absolute top-3 right-3">
                        <span className={`badge ${asset.type === "returnable" ? "badge-primary" : "badge-secondary"}`}>
                          {asset.type === "returnable" ? "Returnable" : "Non-returnable"}
                        </span>
                      </div>
                      {/* View Overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="btn btn-circle btn-primary">
                          <FiEye className="h-5 w-5" />
                        </div>
                      </div>
                    </figure>

                    <div className="card-body p-4">
                      {/* Category */}
                      {asset.category && (
                        <div className="flex items-center gap-1 text-xs text-base-content/60">
                          <FiTag className="h-3 w-3" />
                          {asset.category}
                        </div>
                      )}

                      {/* Name */}
                      <h3 className="card-title text-base line-clamp-1">{asset.name}</h3>

                      {/* Company */}
                      <div className="flex items-center gap-2 text-sm text-base-content/70">
                        <FiBriefcase className="h-4 w-4" />
                        <span className="line-clamp-1">{asset.companyName || "Unknown Company"}</span>
                      </div>

                      {/* Availability */}
                      <div className="mt-2">
                        <span className="badge badge-success badge-sm">
                          {asset.availableQuantity || asset.quantity || 0} Available
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <div className="join">
                    <button
                      className="join-item btn"
                      disabled={page === 1}
                      onClick={() => setPage(page - 1)}
                    >
                      <FiChevronLeft className="h-5 w-5" />
                    </button>
                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
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
                      disabled={page === totalPages}
                      onClick={() => setPage(page + 1)}
                    >
                      <FiChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-base-200/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-base-content/70 mb-8">
              {user
                ? "Head to your dashboard to manage or request assets."
                : "Join as an employee to request assets or as an HR manager to list your company's equipment."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <button onClick={handleGetStarted} className="btn btn-primary gap-2">
                  Go to Dashboard
                  <FiArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <>
                  <Link to="/join-as-employee" className="btn btn-primary gap-2">
                    Join as Employee
                    <FiArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/join-as-hr" className="btn btn-outline gap-2">
                    Join as HR Manager
                    <FiArrowRight className="h-4 w-4" />
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Asset Details Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="modal-box max-w-3xl"
          >
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                setIsModalOpen(false);
                setSelectedAsset(null);
              }}
            >
              <FiX className="h-5 w-5" />
            </button>

            {detailsLoading ? (
              <div className="flex justify-center py-12">
                <span className="loading loading-spinner loading-lg text-primary"></span>
              </div>
            ) : assetDetails?.data ? (
              <div>
                {/* Asset Header */}
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Image */}
                  <div className="w-full md:w-1/2">
                    <figure className="rounded-xl overflow-hidden bg-base-200 aspect-video">
                      {assetDetails.data.image ? (
                        <img
                          src={assetDetails.data.image}
                          alt={assetDetails.data.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FiPackage className="h-20 w-20 text-base-content/20" />
                        </div>
                      )}
                    </figure>
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`badge ${assetDetails.data.type === "returnable" ? "badge-primary" : "badge-secondary"}`}>
                        {assetDetails.data.type === "returnable" ? "Returnable" : "Non-returnable"}
                      </span>
                      {assetDetails.data.category && (
                        <span className="badge badge-ghost">{assetDetails.data.category}</span>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold mb-3">{assetDetails.data.name}</h2>
                    
                    {/* Company Info */}
                    <div className="flex items-center gap-3 mb-4 p-3 bg-base-200/50 rounded-lg">
                      <div className="avatar">
                        <div className="w-10 h-10 rounded-lg bg-base-300">
                          {assetDetails.data.companyLogo ? (
                            <img src={assetDetails.data.companyLogo} alt={assetDetails.data.companyName} />
                          ) : (
                            <div className="flex items-center justify-center w-full h-full">
                              <FiBriefcase className="h-5 w-5 text-base-content/50" />
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-base-content/60">Company</p>
                        <p className="font-medium">{assetDetails.data.companyName || "Unknown"}</p>
                      </div>
                    </div>

                    {/* Availability */}
                    <div className="mb-4">
                      <span className="badge badge-success badge-lg">
                        {assetDetails.data.availableQuantity || assetDetails.data.quantity || 0} Available
                      </span>
                    </div>

                    {/* Description */}
                    {assetDetails.data.description && (
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">Description</h4>
                        <p className="text-base-content/70">{assetDetails.data.description}</p>
                      </div>
                    )}

                    {/* CTA */}
                    <div className="mt-6">
                      {user ? (
                        <button
                          onClick={handleGetStarted}
                          className="btn btn-primary w-full gap-2"
                        >
                          {user.role === "hr" ? "Manage Assets" : "Request This Asset"}
                          <FiArrowRight className="h-4 w-4" />
                        </button>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-sm text-base-content/60 text-center mb-3">
                            Sign in to request this asset
                          </p>
                          <div className="flex gap-2">
                            <Link to="/login" className="btn btn-primary flex-1">
                              Login
                            </Link>
                            <Link to="/join-as-employee" className="btn btn-outline flex-1">
                              Sign Up
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Related Assets */}
                {assetDetails.relatedAssets?.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-base-200">
                    <h3 className="font-semibold mb-4">More from {assetDetails.data.companyName}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {assetDetails.relatedAssets.map((related) => (
                        <div
                          key={related._id}
                          className="card bg-base-200/50 cursor-pointer hover:bg-base-200 transition-colors"
                          onClick={() => setSelectedAsset(related)}
                        >
                          <figure className="h-24">
                            {related.image ? (
                              <img
                                src={related.image}
                                alt={related.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-base-300 flex items-center justify-center">
                                <FiPackage className="h-8 w-8 text-base-content/20" />
                              </div>
                            )}
                          </figure>
                          <div className="p-2">
                            <p className="text-sm font-medium line-clamp-1">{related.name}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-base-content/70">Failed to load asset details</p>
              </div>
            )}
          </motion.div>
          <div
            className="modal-backdrop bg-black/50"
            onClick={() => {
              setIsModalOpen(false);
              setSelectedAsset(null);
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Assets;
