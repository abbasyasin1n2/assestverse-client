import { Outlet, useNavigate, useLocation } from "react-router";
import { useEffect } from "react";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!loading && !user) {
      navigate("/login", { replace: true });
      return;
    }

    // If at /dashboard root or /dashboard/home, redirect to role-specific home
    if (!loading && user && (location.pathname === "/dashboard" || location.pathname === "/dashboard/home")) {
      if (user.role === "hr") {
        navigate("/dashboard/hr-home", { replace: true });
      } else {
        navigate("/dashboard/employee-home", { replace: true });
      }
    }
  }, [user, loading, location.pathname, navigate]);

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Don't render if no user
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-base-200">
      <DashboardNavbar />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 lg:ml-64 mt-16 min-w-0 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
