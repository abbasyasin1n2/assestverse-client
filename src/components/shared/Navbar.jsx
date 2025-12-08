import { Link, NavLink } from "react-router";
import { FiMenu, FiX, FiLogOut, FiUser, FiBox, FiUsers, FiClipboard, FiSettings } from "react-icons/fi";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const publicNavLinks = [
    { to: "/", label: "Home" },
    { to: "/join-as-employee", label: "Join as Employee" },
    { to: "/join-as-hr", label: "Join as HR Manager" },
  ];

  const employeeDropdownLinks = [
    { to: "/dashboard/my-assets", label: "My Assets", icon: FiBox },
    { to: "/dashboard/my-team", label: "My Team", icon: FiUsers },
    { to: "/dashboard/request-asset", label: "Request Asset", icon: FiClipboard },
    { to: "/dashboard/employee-profile", label: "Profile", icon: FiUser },
  ];

  const hrDropdownLinks = [
    { to: "/dashboard/asset-list", label: "Asset List", icon: FiBox },
    { to: "/dashboard/add-asset", label: "Add Asset", icon: FiClipboard },
    { to: "/dashboard/all-requests", label: "All Requests", icon: FiClipboard },
    { to: "/dashboard/employee-list", label: "Employee List", icon: FiUsers },
    { to: "/dashboard/hr-profile", label: "Profile", icon: FiUser },
  ];

  const dropdownLinks = user?.role === "hr" ? hrDropdownLinks : employeeDropdownLinks;

  return (
    <nav className="navbar bg-base-100 shadow-sm sticky top-0 z-50 px-4 lg:px-8">
      <div className="navbar-start">
        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>
        </div>

        {/* Logo */}
        <Link to="/" className="btn btn-ghost text-xl font-bold text-primary">
          <FiBox className="h-6 w-6" />
          <span className="hidden sm:inline">AssetVerse</span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="navbar-center hidden lg:flex">
        {!user && (
          <ul className="menu menu-horizontal px-1 gap-1">
            {publicNavLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `font-medium ${isActive ? "text-primary bg-primary/10" : ""}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="navbar-end gap-2">
        {loading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="bg-primary text-primary-content flex items-center justify-center w-full h-full text-lg font-bold">
                    {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "U"}
                  </div>
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-200"
            >
              <li className="menu-title">
                <span className="text-xs text-base-content/70">
                  {user.displayName || user.email}
                </span>
              </li>
              <div className="divider my-1"></div>
              {dropdownLinks.map((link) => (
                <li key={link.to}>
                  <NavLink to={link.to} className="flex items-center gap-2">
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <div className="divider my-1"></div>
              <li>
                <button onClick={handleLogout} className="text-error">
                  <FiLogOut className="h-4 w-4" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary btn-sm">
            Login
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-base-100 shadow-lg border-t border-base-200">
          <ul className="menu p-4">
            {publicNavLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `font-medium ${isActive ? "text-primary bg-primary/10" : ""}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
