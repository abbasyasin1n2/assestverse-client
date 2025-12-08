import { Link } from "react-router";
import { FiMenu, FiBox, FiLogOut, FiBell, FiHome } from "react-icons/fi";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import MobileSidebar from "./MobileSidebar";

const DashboardNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <nav className="navbar bg-base-100 shadow-sm fixed top-0 left-0 right-0 z-50 px-4 lg:px-8">
        <div className="navbar-start">
          {/* Mobile Menu Button */}
          <button
            className="btn btn-ghost btn-circle lg:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <FiMenu className="h-5 w-5" />
          </button>

          {/* Logo */}
          <Link to="/" className="btn btn-ghost text-xl font-bold text-primary">
            <FiBox className="h-6 w-6" />
            <span className="hidden sm:inline">AssetVerse</span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <span className="text-sm font-medium text-base-content/70">
            Dashboard
          </span>
        </div>

        <div className="navbar-end gap-2">
          {/* Back to Home */}
          <Link
            to="/"
            className="btn btn-ghost btn-sm gap-2 hidden sm:flex"
          >
            <FiHome className="h-4 w-4" />
            Home
          </Link>

          {/* Notifications */}
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <FiBell className="h-5 w-5" />
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>

          {/* User Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user?.displayName || "User"}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="bg-primary text-primary-content flex items-center justify-center w-full h-full text-lg font-bold">
                    {user?.displayName?.[0]?.toUpperCase() ||
                      user?.email?.[0]?.toUpperCase() ||
                      "U"}
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
                  {user?.displayName || user?.email}
                </span>
              </li>
              <div className="divider my-1"></div>
              <li>
                <button onClick={handleLogout} className="text-error">
                  <FiLogOut className="h-4 w-4" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default DashboardNavbar;
