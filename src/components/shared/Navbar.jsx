import { Link, NavLink, useNavigate } from "react-router";
import {
  FiMenu,
  FiX,
  FiLogOut,
  FiUser,
  FiBox,
  FiUsers,
  FiClipboard,
  FiGrid,
  FiPlusSquare,
  FiCreditCard,
  FiChevronDown,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useTheme } from "../../providers/ThemeProvider";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const { user, logout, loading } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest(".mobile-menu-container")) {
        setIsMenuOpen(false);
      }
      if (isResourcesOpen && !e.target.closest(".resources-dropdown")) {
        setIsResourcesOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen, isResourcesOpen]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const publicNavLinks = [
    { to: "/", label: "Home" },
    { to: "/assets", label: "Browse Assets" },
    { to: "/about", label: "About" },
    { to: "/join-as-employee", label: "Join as Employee" },
    { to: "/join-as-hr", label: "Join as HR Manager" },
  ];

  const resourceLinks = [
    { to: "/features", label: "Features" },
    { to: "/pricing", label: "Pricing" },
    { to: "/how-it-works", label: "How It Works" },
    { to: "/faq", label: "FAQ" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" },
  ];

  const employeeDropdownLinks = [
    { to: "/dashboard/my-assets", label: "My Assets", icon: FiBox },
    { to: "/dashboard/request-asset", label: "Request Asset", icon: FiClipboard },
    { to: "/dashboard/my-team", label: "My Team", icon: FiUsers },
    { to: "/dashboard/employee-profile", label: "Profile", icon: FiUser },
  ];

  const hrDropdownLinks = [
    { to: "/dashboard/asset-list", label: "Asset List", icon: FiBox },
    { to: "/dashboard/add-asset", label: "Add Asset", icon: FiPlusSquare },
    { to: "/dashboard/all-requests", label: "All Requests", icon: FiClipboard },
    { to: "/dashboard/employee-list", label: "My Employees", icon: FiUsers },
    { to: "/dashboard/upgrade-package", label: "Upgrade Package", icon: FiCreditCard },
    { to: "/dashboard/hr-profile", label: "Profile", icon: FiUser },
  ];

  const dropdownLinks = user?.role === "hr" ? hrDropdownLinks : employeeDropdownLinks;

  return (
    <nav
      className={`navbar fixed top-0 left-0 right-0 z-50 px-4 lg:px-8 transition-all duration-300 ${
        isScrolled
          ? "bg-base-100/95 backdrop-blur-md shadow-md"
          : "bg-base-100 shadow-sm"
      }`}
    >
      <div className="navbar-start">
        {/* Mobile Menu Button */}
        <div className="lg:hidden mobile-menu-container">
          <button
            className="btn btn-ghost btn-circle"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <FiX className="h-5 w-5" />
            ) : (
              <FiMenu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Logo */}
        <Link
          to="/"
          className="btn btn-ghost gap-2 text-xl font-bold text-primary hover:bg-primary/10"
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <FiBox className="h-5 w-5 text-primary-content" />
          </div>
          <span className="hidden sm:inline">AssetVerse</span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="navbar-center hidden lg:flex">
        {!user ? (
          <ul className="menu menu-horizontal px-1 gap-1">
            {publicNavLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "text-primary bg-primary/10"
                        : "hover:bg-base-200"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            {/* Resources Dropdown */}
            <li 
              className="resources-dropdown relative"
              onMouseEnter={() => setIsResourcesOpen(true)}
              onMouseLeave={() => setIsResourcesOpen(false)}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsResourcesOpen(!isResourcesOpen);
                }}
                className={`font-medium px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-1 ${
                  isResourcesOpen ? "bg-base-200" : "hover:bg-base-200"
                }`}
              >
                Resources
                <FiChevronDown className={`w-4 h-4 transition-transform duration-200 ${isResourcesOpen ? "rotate-180" : ""}`} />
              </button>
              {isResourcesOpen && (
                <ul
                  className="absolute top-full left-0 z-50 menu p-2 shadow-xl bg-base-100 rounded-xl w-52 border border-base-200"
                >
                  {resourceLinks.map((link) => (
                    <li key={link.to}>
                      <NavLink
                        to={link.to}
                        onClick={() => setIsResourcesOpen(false)}
                        className={({ isActive }) =>
                          `rounded-lg ${isActive ? "text-primary bg-primary/10" : ""}`
                        }
                      >
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to={user.role === "hr" ? "/dashboard/asset-list" : "/dashboard/my-assets"}
              className="btn btn-ghost btn-sm gap-2"
            >
              <FiGrid className="h-4 w-4" />
              Dashboard
            </Link>
          </div>
        )}
      </div>

      <div className="navbar-end gap-2">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? (
            <FiSun className="h-5 w-5 text-yellow-400" />
          ) : (
            <FiMoon className="h-5 w-5 text-slate-600" />
          )}
        </button>

        {loading ? (
          <span className="loading loading-spinner loading-sm text-primary"></span>
        ) : user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost gap-2 pl-2 pr-3"
            >
              <div className="avatar">
                <div className="w-8 h-8 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-1">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="bg-gradient-to-br from-primary to-secondary text-primary-content flex items-center justify-center w-full h-full text-sm font-bold">
                      {user.displayName?.[0]?.toUpperCase() ||
                        user.email?.[0]?.toUpperCase() ||
                        "U"}
                    </div>
                  )}
                </div>
              </div>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium leading-tight">
                  {user.displayName?.split(" ")[0] || "User"}
                </span>
                <span className="text-xs text-base-content/60 leading-tight">
                  {user.role === "hr" ? "HR Manager" : "Employee"}
                </span>
              </div>
              <FiChevronDown className="h-4 w-4 text-base-content/60" />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100 rounded-xl w-56 border border-base-200"
            >
              {/* User Info Header */}
              <li className="px-3 py-2">
                <div className="flex flex-col gap-1 hover:bg-transparent cursor-default">
                  <span className="font-semibold text-sm">
                    {user.displayName || "User"}
                  </span>
                  <span className="text-xs text-base-content/60 truncate">
                    {user.email}
                  </span>
                  <span
                    className={`badge badge-sm mt-1 ${
                      user.role === "hr" ? "badge-secondary" : "badge-primary"
                    }`}
                  >
                    {user.role === "hr" ? "HR Manager" : "Employee"}
                  </span>
                </div>
              </li>
              <div className="divider my-1 px-3"></div>

              {/* Navigation Links */}
              {dropdownLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg ${
                        isActive ? "bg-primary/10 text-primary" : ""
                      }`
                    }
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </NavLink>
                </li>
              ))}

              <div className="divider my-1 px-3"></div>

              {/* Logout */}
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 text-error hover:bg-error/10 rounded-lg"
                >
                  <FiLogOut className="h-4 w-4" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="btn btn-ghost btn-sm hidden sm:flex"
            >
              Login
            </Link>
            <Link
              to="/join-as-hr"
              className="btn btn-primary btn-sm"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-x-0 top-16 bg-base-100 shadow-lg border-t border-base-200 transition-all duration-300 mobile-menu-container ${
          isMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <ul className="menu p-4 gap-1">
          {!user ? (
            <>
              {publicNavLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `font-medium py-3 rounded-lg ${
                        isActive ? "text-primary bg-primary/10" : ""
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <div className="divider my-1"></div>
              <li className="menu-title text-xs uppercase text-base-content/50">Resources</li>
              {resourceLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `font-medium py-3 rounded-lg ${
                        isActive ? "text-primary bg-primary/10" : ""
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <div className="divider my-2"></div>
              <li>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn btn-outline btn-primary justify-center"
                >
                  Login
                </Link>
              </li>
              <div className="divider my-1"></div>
              {/* Theme Toggle in Mobile Menu */}
              <li>
                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-between py-3 rounded-lg"
                >
                  <span className="flex items-center gap-2">
                    {isDark ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
                    {isDark ? "Light Mode" : "Dark Mode"}
                  </span>
                  <div className={`w-12 h-6 rounded-full relative ${isDark ? 'bg-primary' : 'bg-base-300'}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${isDark ? 'left-7' : 'left-1'}`}></div>
                  </div>
                </button>
              </li>
            </>
          ) : (
            <>
              {/* User Info */}
              <li className="px-3 py-2 mb-2">
                <div className="flex items-center gap-3 hover:bg-transparent cursor-default">
                  <div className="avatar">
                    <div className="w-10 h-10 rounded-full ring-2 ring-primary">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName || "User"}
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="bg-gradient-to-br from-primary to-secondary text-primary-content flex items-center justify-center w-full h-full font-bold">
                          {user.displayName?.[0]?.toUpperCase() ||
                            user.email?.[0]?.toUpperCase() ||
                            "U"}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">{user.displayName || "User"}</p>
                    <span
                      className={`badge badge-sm ${
                        user.role === "hr" ? "badge-secondary" : "badge-primary"
                      }`}
                    >
                      {user.role === "hr" ? "HR Manager" : "Employee"}
                    </span>
                  </div>
                </div>
              </li>
              <div className="divider my-1"></div>

              {/* Dashboard Link */}
              <li>
                <Link
                  to={user.role === "hr" ? "/dashboard/asset-list" : "/dashboard/my-assets"}
                  onClick={() => setIsMenuOpen(false)}
                  className="font-medium py-3 rounded-lg"
                >
                  <FiGrid className="h-5 w-5" />
                  Go to Dashboard
                </Link>
              </li>

              <div className="divider my-1"></div>

              {/* Quick Links */}
              {dropdownLinks.slice(0, 3).map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `py-3 rounded-lg ${isActive ? "text-primary bg-primary/10" : ""}`
                    }
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </NavLink>
                </li>
              ))}

              <div className="divider my-1"></div>

              {/* Theme Toggle for Logged In Users */}
              <li>
                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-between py-3 rounded-lg"
                >
                  <span className="flex items-center gap-2">
                    {isDark ? <FiSun className="h-5 w-5 text-yellow-400" /> : <FiMoon className="h-5 w-5" />}
                    {isDark ? "Light Mode" : "Dark Mode"}
                  </span>
                  <div className={`w-12 h-6 rounded-full relative ${isDark ? 'bg-primary' : 'bg-base-300'}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${isDark ? 'left-7' : 'left-1'}`}></div>
                  </div>
                </button>
              </li>

              <div className="divider my-1"></div>

              {/* Logout */}
              <li>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogout();
                  }}
                  className="text-error py-3 rounded-lg hover:bg-error/10"
                >
                  <FiLogOut className="h-5 w-5" />
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Backdrop for mobile menu */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 z-[-1] top-16"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
