import { createBrowserRouter } from "react-router";

// Layouts
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Public Pages
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import RegisterEmployee from "../pages/auth/RegisterEmployee";
import RegisterHR from "../pages/auth/RegisterHR";
import NotFound from "../pages/NotFound";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Blog from "../pages/Blog";
import Privacy from "../pages/Privacy";
import Terms from "../pages/Terms";
import Features from "../pages/Features";
import Pricing from "../pages/Pricing";
import HowItWorks from "../pages/HowItWorks";
import FAQ from "../pages/FAQ";
import Assets from "../pages/Assets";

// Employee Dashboard Pages
import EmployeeDashboard from "../pages/employee/Dashboard";
import EmployeeMyAssets from "../pages/employee/MyAssets";
import EmployeeRequestAsset from "../pages/employee/RequestAsset";
import EmployeeMyTeam from "../pages/employee/MyTeam";
import EmployeeProfile from "../pages/employee/Profile";

// HR Dashboard Pages
import HRDashboard from "../pages/hr/Dashboard";
import HRAssetList from "../pages/hr/AssetList";
import HRAddAsset from "../pages/hr/AddAsset";
import HRUpdateAsset from "../pages/hr/UpdateAsset";
import HRAllRequests from "../pages/hr/AllRequests";
import HREmployeeList from "../pages/hr/EmployeeList";
import HRUpgradePackage from "../pages/hr/UpgradePackage";
import HRProfile from "../pages/hr/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "join-as-employee",
        element: <RegisterEmployee />,
      },
      {
        path: "join-as-hr",
        element: <RegisterHR />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "privacy",
        element: <Privacy />,
      },
      {
        path: "terms",
        element: <Terms />,
      },
      {
        path: "features",
        element: <Features />,
      },
      {
        path: "pricing",
        element: <Pricing />,
      },
      {
        path: "how-it-works",
        element: <HowItWorks />,
      },
      {
        path: "faq",
        element: <FAQ />,
      },
      {
        path: "assets",
        element: <Assets />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <NotFound />,
    children: [
      // Dashboard Home Routes
      {
        path: "home",
        element: <HRDashboard />, // Will be conditionally rendered in layout
      },
      {
        path: "hr-home",
        element: <HRDashboard />,
      },
      {
        path: "employee-home",
        element: <EmployeeDashboard />,
      },
      // Employee Routes
      {
        path: "my-assets",
        element: <EmployeeMyAssets />,
      },
      {
        path: "request-asset",
        element: <EmployeeRequestAsset />,
      },
      {
        path: "my-team",
        element: <EmployeeMyTeam />,
      },
      {
        path: "employee-profile",
        element: <EmployeeProfile />,
      },
      // HR Routes
      {
        path: "asset-list",
        element: <HRAssetList />,
      },
      {
        path: "add-asset",
        element: <HRAddAsset />,
      },
      {
        path: "update-asset/:id",
        element: <HRUpdateAsset />,
      },
      {
        path: "all-requests",
        element: <HRAllRequests />,
      },
      {
        path: "employee-list",
        element: <HREmployeeList />,
      },
      {
        path: "upgrade-package",
        element: <HRUpgradePackage />,
      },
      {
        path: "hr-profile",
        element: <HRProfile />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
