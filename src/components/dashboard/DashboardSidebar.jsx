import { NavLink } from "react-router";
import {
  FiBox,
  FiPlusSquare,
  FiClipboard,
  FiUsers,
  FiCreditCard,
  FiUser,
  FiHome,
} from "react-icons/fi";
import useAuth from "../../hooks/useAuth";

const DashboardSidebar = () => {
  const { user } = useAuth();
  const isHR = user?.role === "hr";

  const employeeLinks = [
    {
      to: "/dashboard/employee-home",
      icon: FiHome,
      label: "Dashboard",
    },
    {
      to: "/dashboard/my-assets",
      icon: FiBox,
      label: "My Assets",
    },
    {
      to: "/dashboard/request-asset",
      icon: FiClipboard,
      label: "Request Asset",
    },
    {
      to: "/dashboard/my-team",
      icon: FiUsers,
      label: "My Team",
    },
    {
      to: "/dashboard/employee-profile",
      icon: FiUser,
      label: "Profile",
    },
  ];

  const hrLinks = [
    {
      to: "/dashboard/hr-home",
      icon: FiHome,
      label: "Dashboard",
    },
    {
      to: "/dashboard/asset-list",
      icon: FiBox,
      label: "Asset List",
    },
    {
      to: "/dashboard/add-asset",
      icon: FiPlusSquare,
      label: "Add Asset",
    },
    {
      to: "/dashboard/all-requests",
      icon: FiClipboard,
      label: "All Requests",
    },
    {
      to: "/dashboard/employee-list",
      icon: FiUsers,
      label: "My Employees",
    },
    {
      to: "/dashboard/upgrade-package",
      icon: FiCreditCard,
      label: "Upgrade Package",
    },
    {
      to: "/dashboard/hr-profile",
      icon: FiUser,
      label: "Profile",
    },
  ];

  const links = isHR ? hrLinks : employeeLinks;

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-primary text-primary-content font-medium shadow-md"
        : "hover:bg-base-200 text-base-content"
    }`;

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-base-100 border-r border-base-200 hidden lg:block overflow-y-auto">
      <div className="p-4">
        {/* User Info Card */}
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="bg-primary text-primary-content flex items-center justify-center w-full h-full text-lg font-bold">
                    {user?.name?.[0]?.toUpperCase() ||
                      user?.displayName?.[0]?.toUpperCase() ||
                      user?.email?.[0]?.toUpperCase() ||
                      "U"}
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">
                {user?.name || user?.displayName || "User"}
              </p>
              <span
                className={`badge badge-sm ${
                  isHR ? "badge-secondary" : "badge-primary"
                }`}
              >
                {isHR ? "HR Manager" : "Employee"}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          <p className="text-xs font-semibold text-base-content/50 uppercase tracking-wider px-4 mb-2">
            Dashboard
          </p>
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClass}>
              <link.icon className="h-5 w-5 shrink-0" />
              <span>{link.label}</span>
            </NavLink>
          ))}

          <div className="divider my-4"></div>

          {/* Back to Home */}
          <NavLink
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-base-200 text-base-content transition-all duration-200"
          >
            <FiHome className="h-5 w-5" />
            <span>Back to Home</span>
          </NavLink>
        </nav>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
