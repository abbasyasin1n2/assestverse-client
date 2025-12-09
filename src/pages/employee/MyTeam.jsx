import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FiUsers,
  FiSearch,
  FiRefreshCw,
  FiMail,
  FiBriefcase,
  FiChevronLeft,
  FiChevronRight,
  FiInbox,
  FiAlertCircle,
  FiUser,
  FiHome,
  FiGift,
} from "react-icons/fi";
import axiosInstance from "../../api/axiosInstance";

const MyTeam = () => {
  const [search, setSearch] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [page, setPage] = useState(1);
  const limit = 12;

  // Fetch team members from affiliated companies
  const {
    data: teamData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["myTeam", search, companyFilter, page],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (companyFilter) params.append("company", companyFilter);
      params.append("page", page);
      params.append("limit", limit);

      const response = await axiosInstance.get(`/affiliations/my-team?${params.toString()}`);
      return response.data;
    },
  });

  // Fetch affiliated companies for filter
  const { data: affiliationsData } = useQuery({
    queryKey: ["affiliations"],
    queryFn: async () => {
      const response = await axiosInstance.get("/affiliations/my-companies");
      return response.data;
    },
  });

  const teamMembers = teamData?.data || [];
  const totalPages = teamData?.pagination?.totalPages || 1;
  const totalMembers = teamData?.pagination?.total || 0;
  const companies = affiliationsData?.data || [];

  const currentMonth = new Date().getMonth();
  const birthdays = teamMembers
    .filter((member) => member.dateOfBirth && new Date(member.dateOfBirth).getMonth() === currentMonth)
    .map((member) => ({
      ...member,
      day: new Date(member.dateOfBirth).getDate(),
    }))
    .sort((a, b) => a.day - b.day)
    .slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl">
            <FiUsers className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">My Team</h1>
            <p className="text-base-content/70">
              Team members from affiliated companies ({totalMembers} members)
            </p>
          </div>
        </div>
      </div>

      {/* Upcoming Birthdays */}
      {!isLoading && !isError && birthdays.length > 0 && (
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiUsers className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Upcoming Birthdays (this month)</h3>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {birthdays.map((member) => (
                <div key={member._id} className="p-4 rounded-lg bg-base-200/60 flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-12 rounded-full bg-base-300">
                      {member.profileImage ? (
                        <img src={member.profileImage} alt={member.name} className="object-cover" />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full">
                          <FiUser className="h-5 w-5 text-base-content/50" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{member.name}</p>
                    <p className="text-sm text-base-content/60 truncate">{member.companyName || "Team Member"}</p>
                    <p className="text-xs text-base-content/60"><FiGift className="inline mr-1" /> {member.day} {new Date().toLocaleString('default',{ month:'short'})}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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

            {/* Company Filter */}
            {companies.length > 0 && (
              <select
                className="select select-bordered w-full lg:w-56"
                value={companyFilter}
                onChange={(e) => {
                  setCompanyFilter(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All Companies</option>
                {companies.map((company) => (
                  <option key={company._id} value={company.companyEmail}>
                    {company.companyName}
                  </option>
                ))}
              </select>
            )}

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
          <span>Failed to load team members. Please try again.</span>
          <button className="btn btn-sm" onClick={() => refetch()}>
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && teamMembers.length === 0 && (
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body items-center text-center py-12">
            <FiInbox className="h-16 w-16 text-base-content/30 mb-4" />
            <h3 className="text-xl font-semibold">No Team Members Found</h3>
            <p className="text-base-content/70 mb-4">
              {search || companyFilter
                ? "No team members match your filters."
                : "You are not affiliated with any company yet. Request assets to become affiliated!"}
            </p>
          </div>
        </div>
      )}

      {/* Team Grid */}
      {!isLoading && !isError && teamMembers.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {teamMembers.map((member) => (
            <div key={member._id} className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="card-body items-center text-center p-5">
                {/* Avatar */}
                <div className="avatar mb-3">
                  <div className="w-20 h-20 rounded-full bg-base-200 ring ring-base-300 ring-offset-base-100 ring-offset-2">
                    {member.profileImage ? (
                      <img
                        src={member.profileImage}
                        alt={member.name}
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        <FiUser className="h-10 w-10 text-base-content/30" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Info */}
                <h3 className="font-semibold text-lg">{member.name}</h3>
                
                {/* Role Badge */}
                <span className={`badge ${member.role === "hr" ? "badge-primary" : "badge-ghost"} badge-sm`}>
                  {member.role === "hr" ? "HR Manager" : "Employee"}
                </span>

                {/* Details */}
                <div className="w-full mt-3 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-base-content/70 justify-center">
                    <FiMail className="h-4 w-4 shrink-0" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  {member.companyName && (
                    <div className="flex items-center gap-2 text-sm text-base-content/70 justify-center">
                      <FiHome className="h-4 w-4 shrink-0" />
                      <span className="truncate">{member.companyName}</span>
                    </div>
                  )}
                  {member.designation && (
                    <div className="flex items-center gap-2 text-sm text-base-content/70 justify-center">
                      <FiBriefcase className="h-4 w-4 shrink-0" />
                      <span className="truncate">{member.designation}</span>
                    </div>
                  )}
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

export default MyTeam;
