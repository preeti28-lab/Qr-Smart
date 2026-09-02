import React, { useMemo } from "react";
import { Navigate, useRoutes, useLocation, Outlet } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import panels from "./panels";
import { useSelector } from "react-redux";

import Home from "../pages/home/Home";
import FAQs from "../pages/faqs/FAQs";
import Pricing from "../pages/pricing/Pricing";
import Login from "../pages/validations/Login";
import App from "../App";
import Register from "../pages/validations/Register";

import { lazy } from "react";

const Builder = lazy(() => import("../app/builder/Builder"));
const Content = lazy(() => import("../app/builder/Content"));
const QRDesign = lazy(() => import("../app/builder/QRDesign"));

const Bulk = lazy(() => import("../app/bulk/Bulk"));
const QRBulkDesign = lazy(() => import("../app/bulk/QRBulkDesign"));
const UploadBulkExcel = lazy(() => import("../app/bulk/UploadBulkExcel"));

const MyQRCode = lazy(() => import("../app/qrcode/MyQRCode"));
const BulkQRCode = lazy(() => import("../app/qrcode/BulkQRCode"));
const AllBulkQRCode = lazy(() => import("../app/qrcode/AllBulkQRCode"));
const QRDetails = lazy(() => import("../app/qrcode/QRDetails"));

const Payments = lazy(() => import("../pages/payments/Payments"));
const Stats = lazy(() => import("../pages/stats/Stats"));

const Templates = lazy(() => import("../pages/templates/Templates"));
const CreateTemplate = lazy(() => import("../pages/templates/CreateTemplate"));
const EditTemplate = lazy(() => import("../pages/templates/EditTemplate"));

const Profile = lazy(() => import("../pages/profile/Profile"));
const AllUsers = lazy(() => import("../pages/users/AllUsers"));
const ApiKeys = lazy(() => import("../pages/apiKey/ApiKeys"));

import ProtectedRoutes from "./ProtectedRoutes";
import Text from "../pages/redirectPages/Text";
import Images from "../pages/redirectPages/Images";
import Video from "../pages/redirectPages/Video";
import AllPayments from "../pages/payments/AllPayments";
import PaymentHistory from "../pages/payments/PaymentHistory";
import PrivacyPolicy from "../pages/Privacy/PrivacyPolicy";
import Terms from "../pages/Terms/Terms";
import ReportAbuse from "../pages/abuse/ReportAbuse";
import Contact from "../pages/contact/Contact";
import Blogs from "../pages/blogs/Blogs";
import AddBlog from "../pages/blogs/AddBlog";
import EditBlog from "../pages/blogs/EditBlog";
import AllBlogs from "../pages/blogs/AllBlogs";
import ReadBlog from "../pages/blogs/ReadBlog";
import ContactQuery from "../pages/contact/ContactQuery";
import QRTypes from "../pages/qrTypes/QRTypes";
import BusinessPage from "../pages/QRbussiness/BusinessCardPage";
import IndustryPage from "../pages/QRbussiness/IndustryPage";
import QRMarketingPage from "../pages/resources/QRMarketingPage";
import QRDetailPage from "../pages/resources/QRDetailPage";
import QRTypesPage from "../pages/qrTypes/QRTypesPage";
import StaticQRs from "../pages/products/StaticQRs";
import BulkCreation from "../pages/products/BulkCreation";
import DynamicQR from "../pages/products/DynamicQR";
import GooglePixel from "../pages/products/GooglePixel";
import DownloadFormats from "../pages/products/DownloadFormats";
import CustomDomain from "../pages/products/CustomDomain";
import CollaboratingUsers from "../pages/products/CollaboratingUsers";
import TemplatesPage from "../pages/products/Templates";
import CompleteAnalytics from "../pages/products/CompleteAnalytics";
import EventTracking from "../pages/products/EventTracking";
import EditingDynamicQRPage from "../pages/products/EditingDynamicQRPage";
import PasswordAccessProtectionPage from "../pages/products/PasswordAccessProtectionPage";
import PurchasePlan from "../pages/payments/PurchasePlan";
import PurchaseSuccess from "../pages/payments/PurchaseSuccess";
import UserProfile from "../pages/profile/UserProfile";
import Query from "../pages/Query";
import APIDoc from "../pages/apiDoc/APIDoc";
import VCardQRGenerator from "../pages/VCardQRGenerator.JSX";
import QRScanPage from "../pages/scan/QRScanPage";
import InternalAPIDoc from "../pages/internalApiDoc/InternalAPIDoc";

// ── Guard: redirects already-logged-in users away from login / register ──
const GuestOnlyRoute = ({ children }) => {
  const token = localStorage.getItem("qrmsart");
  if (token) {
    return <Navigate to="/builder" replace />;
  }
  return children;
};

const Routing = () => {
  const { isAuthenticated, role, paidPlan, trialPlanUsed } = useSelector(
    (state) => state.auth,
  );

  const isAuth = true;
  const token = "";

  const location = useLocation();

  const destination = useMemo(() => {
    if (isAuth) {
      return `/${role}/builder`;
    } else if (!isAuth) {
      return `/`;
    } else {
      return `/${role}`;
    }
  }, [role, isAuth, token]);

  const metaConfig = (meta = {}) => {
    try {
      if (meta.title) {
        window.document.title = meta.title;
      }
      if (meta.desc || meta.description) {
        const description = document.querySelector("meta[name='description']");
        if (description) {
          description.setAttribute("content", meta.desc || meta.description);
        } else {
          const metaDesc = document.createElement("meta");
          metaDesc.name = "description";
          metaDesc.content = meta.desc || meta.description;
          document.head.appendChild(metaDesc);
        }
      }
    } catch (err) {
      console.error("Error in meta configuration:", err);
    }
  };

  const childrenElement = (item, parentPath) => {
    const path = `${item.path || ""}`;
    if (
      item.meta &&
      location.pathname === `${parentPath}/${path}` &&
      item.permission !== false
    ) {
      metaConfig(item.meta);
    }
    if (item.element) {
      return {
        path,
        element:
          item.permission === false ? <Navigate to={"/"} /> : item.element,
      };
    } else {
      throw new Error("Element must have `element` or `children`!");
    }
  };

  const processElement = (item) => {
    const path = `${role ? `/${role}/` : ""}${item.path || ""}`;
    if (item.meta && location.pathname === path && item.permission !== false) {
      metaConfig(item.meta);
    }
    if (item.children && Array.isArray(item.children) && item.element) {
      return {
        path,
        element:
          item.permission === false ? <Navigate to={"/"} /> : item.element,
        children: item.children.map((child) => childrenElement(child, path)),
      };
    } else if (item.children && Array.isArray(item.children)) {
      return {
        path,
        children: item.children.map((child) => childrenElement(child, path)),
      };
    } else if (item.element) {
      return {
        path,
        element:
          item.permission === false ? <Navigate to={"/"} /> : item.element,
      };
    } else {
      throw new Error("Element must have `element` or `children`!");
    }
  };

  const parentElement = (item) => {
    const path = `/${item.path || ""}`;
    if (item.meta && location.pathname === path && item.permission !== false) {
      metaConfig(item.meta);
    }
    if (item.children && Array.isArray(item.children) && item.element) {
      return {
        path,
        element:
          item.permission === false ? <Navigate to={"/"} /> : item.element,
        children: item.children.map((child) => childrenElement(child, path)),
      };
    } else if (item.children && Array.isArray(item.children)) {
      return {
        path,
        children: item.children.map((child) => childrenElement(child, path)),
      };
    } else if (item.element) {
      return {
        path,
        element:
          item.permission === false ? <Navigate to={"/"} /> : item.element,
      };
    } else {
      throw new Error("Element must have `element` or `children`!");
    }
  };

  const routes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/scan/:shortUrl",
      element: <QRScanPage />,
    },
    {
      path: "/faq",
      element: <FAQs />,
    },
    {
      path: "/privacy-policy",
      element: <PrivacyPolicy />,
    },
    {
      path: "/report-abuse",
      element: <ReportAbuse />,
    },
    {
      path: "/testvcard",
      element: <VCardQRGenerator />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path: "/docs/QR",
      // element: <APIDoc />,
      element: <InternalAPIDoc />,
    },

    {
      path: "/terms-and-conditions",
      element: <Terms />,
    },
    {
      path: "/pricing",
      element: <Pricing />,
    },
    {
      path: "*",
      element: <Navigate to={"/"} />,
    },

    // ── Guest-only routes ──────────────────────────────────────────────────
    {
      path: `/login`,
      element: (
        <GuestOnlyRoute>
          <Login />
        </GuestOnlyRoute>
      ),
    },
    {
      path: `/register`,
      element: (
        <GuestOnlyRoute>
          <Register />
        </GuestOnlyRoute>
      ),
    },
    // ──────────────────────────────────────────────────────────────────────

    {
      path: "/text/:randomtext",
      element: <Text />,
    },
    {
      path: "/image/:ids",
      element: <Images />,
    },
    {
      path: "/video/:id",
      element: <Video />,
    },
    {
      path: `/blog/:id`,
      element: <ReadBlog />,
    },
    {
      path: `/blogs`,
      element: <AllBlogs />,
    },
    {
      path: `/qr-types`,
      element: <QRTypes />,
    },
    {
      path: `/qr-type/:type`,
      element: <QRTypesPage />,
    },
    {
      path: "/plans-and-payments",
      element: <Payments />,
      meta: { title: "Plans and payments" },
    },
    {
      path: `/resources/qr-types-bussiness`,
      element: <BusinessPage />,
    },
    {
      path: `/resources/industry/:industry`,
      element: <IndustryPage />,
    },
    {
      path: `/resources/qr-codes-on`,
      element: <QRMarketingPage />,
    },
    {
      path: `/resources/qr-on/:category`,
      element: <QRDetailPage />,
    },
    {
      path: `/products/static-qrs`,
      element: <StaticQRs />,
    },
    {
      path: `/products/bulk-creation`,
      element: <BulkCreation />,
    },
    {
      path: `/products/dynamic-qr`,
      element: <DynamicQR />,
    },
    {
      path: `/products/integrations`,
      element: <GooglePixel />,
    },
    {
      path: `/products/download-variety`,
      element: <DownloadFormats />,
    },
    {
      path: `/products/custom-domains`,
      element: <CustomDomain />,
    },
    {
      path: `/products/collaborators`,
      element: <CollaboratingUsers />,
    },
    {
      path: `/products/templates`,
      element: <TemplatesPage />,
    },
    {
      path: `/products/analytics`,
      element: <CompleteAnalytics />,
    },
    {
      path: `/products/event-tracking`,
      element: <EventTracking />,
    },
    {
      path: `/products/edit-and-management`,
      element: <EditingDynamicQRPage />,
    },
    {
      path: `/products/access-protection`,
      element: <PasswordAccessProtectionPage />,
    },
    {
      path: `/`,
      element: <DashboardLayout />,
      children: [
        {
          path: "/builder",
          children: [
            {
              path: "",
              element: <Builder />,
              meta: { title: "QR Builder" },
            },
            {
              path: "content",
              element: <Content />,
              meta: { title: "QR Content" },
            },
            {
              path: "content/:id",
              element: <Content />,
              meta: { title: "Edit QR Content" },
            },
            {
              path: "qr-design",
              element: (
                <ProtectedRoutes
                  isAuthenticated={isAuthenticated}
                  paidPlan={paidPlan}
                  trialPlanUsed={trialPlanUsed}
                  redirect={"/register"}
                >
                  <QRDesign />
                </ProtectedRoutes>
              ),
              meta: { title: "QR Design" },
            },
          ],
          meta: { title: "QR Builder" },
        },
        {
          path: "/bulk-qr-code-generator",
          children: [
            {
              path: "",
              element: (
                <ProtectedRoutes
                  isAuthenticated={isAuthenticated}
                  paidPlan={paidPlan}
                  trialPlanUsed={trialPlanUsed}
                  redirect={"/plans-and-payments"}
                >
                  <Bulk />
                </ProtectedRoutes>
              ),
              meta: { title: "Bulk" },
            },
            {
              path: "qr-design",
              element: (
                <ProtectedRoutes
                  isAuthenticated={isAuthenticated}
                  redirect={"/plans-and-payments"}
                  paidPlan={paidPlan}
                  trialPlanUsed={trialPlanUsed}
                >
                  <QRBulkDesign />
                </ProtectedRoutes>
              ),
              meta: { title: "QR Design" },
            },
            {
              path: "upload",
              element: (
                <ProtectedRoutes
                  isAuthenticated={isAuthenticated}
                  redirect={"/plans-and-payments"}
                  paidPlan={paidPlan}
                  trialPlanUsed={trialPlanUsed}
                >
                  <UploadBulkExcel />
                </ProtectedRoutes>
              ),
              meta: { title: "Upload Bulk Excel" },
            },
          ],
          meta: { title: "Bulk" },
        },
        {
          path: "/contact-query",
          children: [
            {
              path: "",
              element: (
                <ProtectedRoutes
                  isAuthenticated={isAuthenticated}
                  redirect={"/builder"}
                  paidPlan={paidPlan}
                  trialPlanUsed={trialPlanUsed}
                  role={role}
                >
                  <ContactQuery />
                </ProtectedRoutes>
              ),
              meta: { title: "Contact Query" },
            },
          ],
        },
        {
          path: "/my-qr-codes",
          children: [
            {
              path: "",
              element: (
                <ProtectedRoutes
                  isAuthenticated={isAuthenticated}
                  redirect={"/plans-and-payments"}
                  paidPlan={paidPlan}
                  trialPlanUsed={trialPlanUsed}
                >
                  <MyQRCode />
                </ProtectedRoutes>
              ),
              meta: { title: "My QR Codes" },
            },
            {
              path: "details",
              element: (
                <ProtectedRoutes
                  isAuthenticated={isAuthenticated}
                  redirect={"/plans-and-payments"}
                  paidPlan={paidPlan}
                  trialPlanUsed={trialPlanUsed}
                >
                  <QRDetails />
                </ProtectedRoutes>
              ),
              meta: { title: "QR Code Details" },
            },
          ],
          meta: { title: "My QR Codes" },
        },
        {
          path: "/bulk-qr-codes",
          children: [
            {
              path: "",
              element: (
                <ProtectedRoutes
                  isAuthenticated={isAuthenticated}
                  redirect={"/plans-and-payments"}
                  paidPlan={paidPlan}
                  trialPlanUsed={trialPlanUsed}
                >
                  <BulkQRCode />
                </ProtectedRoutes>
              ),
              meta: { title: "Bulk QR Codes" },
            },
            {
              path: "folder/:id",
              element: (
                <ProtectedRoutes
                  isAuthenticated={isAuthenticated}
                  redirect={"/plans-and-payments"}
                  paidPlan={paidPlan}
                  trialPlanUsed={trialPlanUsed}
                >
                  <AllBulkQRCode />
                </ProtectedRoutes>
              ),
              meta: { title: "Bulk QR Folder" },
            },
          ],
          meta: { title: "Bulk QR Codes" },
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoutes
              isAuthenticated={isAuthenticated}
              redirect={"/plans-and-payments"}
            >
              <Profile />
            </ProtectedRoutes>
          ),
          meta: { title: "Profile" },
        },
        {
          path: "/allUsers",
          element: (
            <ProtectedRoutes
              isAuthenticated={isAuthenticated}
              redirect={"/plans-and-payments"}
            >
              <AllUsers />
            </ProtectedRoutes>
          ),
          meta: { title: "All Users" },
        },
        {
          path: "/allblogs",
          element: (
            <ProtectedRoutes
              isAuthenticated={isAuthenticated}
              redirect={"/builder"}
            >
              <Blogs />
            </ProtectedRoutes>
          ),
          meta: { title: "Blogs" },
        },
        {
          path: "/addblog",
          element: (
            <ProtectedRoutes
              isAuthenticated={isAuthenticated}
              redirect={"/builder"}
            >
              <AddBlog />
            </ProtectedRoutes>
          ),
          meta: { title: "Add Blog" },
        },
        {
          path: "/editblog",
          element: (
            <ProtectedRoutes
              isAuthenticated={isAuthenticated}
              redirect={"/builder"}
            >
              <EditBlog />
            </ProtectedRoutes>
          ),
          meta: { title: "Edit Blog" },
        },
        {
          path: "/allpayments",
          element: (
            <ProtectedRoutes
              isAuthenticated={isAuthenticated}
              redirect={"/plans-and-payments"}
            >
              <AllPayments />
            </ProtectedRoutes>
          ),
          meta: { title: "All Payments" },
        },
        {
          path: "/paymenthistory",
          element: (
            <ProtectedRoutes
              isAuthenticated={isAuthenticated}
              redirect={"/plans-and-payments"}
            >
              <PaymentHistory />
            </ProtectedRoutes>
          ),
          meta: { title: "Payment History" },
        },
        {
          path: "/stats",
          element: (
            <ProtectedRoutes
              isAuthenticated={isAuthenticated}
              paidPlan={paidPlan}
              trialPlanUsed={trialPlanUsed}
              redirect={"/plans-and-payments"}
            >
              <Stats />
            </ProtectedRoutes>
          ),
          meta: { title: "Stats" },
        },
        {
          path: "/templates",
          children: [
            {
              path: "",
              element: (
                <ProtectedRoutes
                  isAuthenticated={isAuthenticated}
                  paidPlan={paidPlan}
                  trialPlanUsed={trialPlanUsed}
                  redirect={"/plans-and-payments"}
                >
                  <Templates />
                </ProtectedRoutes>
              ),
              meta: { title: "Templates" },
            },
            {
              path: "create",
              element: (
                <ProtectedRoutes
                  isAuthenticated={isAuthenticated}
                  paidPlan={paidPlan}
                  trialPlanUsed={trialPlanUsed}
                  redirect={"/plans-and-payments"}
                >
                  <CreateTemplate />
                </ProtectedRoutes>
              ),
              meta: { title: "Create Template" },
            },
            {
              path: "edit",
              element: (
                <ProtectedRoutes
                  isAuthenticated={isAuthenticated}
                  paidPlan={paidPlan}
                  trialPlanUsed={trialPlanUsed}
                  redirect={"/plans-and-payments"}
                >
                  <EditTemplate />
                </ProtectedRoutes>
              ),
              meta: { title: "Edit Template" },
            },
          ],
          meta: { title: "Templates" },
        },
        {
          path: "/checkout",
          element: (
            <ProtectedRoutes
              isAuthenticated={isAuthenticated}
              paidPlan={paidPlan}
              trialPlanUsed={trialPlanUsed}
              redirect={"/register"}
            >
              <PurchasePlan />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/query",
          element: (
            <ProtectedRoutes
              isAuthenticated={isAuthenticated}
              paidPlan={paidPlan}
              trialPlanUsed={trialPlanUsed}
              redirect={"/register"}
            >
              <Query />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/my-account",
          element: (
            <ProtectedRoutes
              isAuthenticated={isAuthenticated}
              paidPlan={paidPlan}
              trialPlanUsed={trialPlanUsed}
              redirect={"/register"}
            >
              <UserProfile />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/api-keys",
          element: (
            <ProtectedRoutes
              isAuthenticated={isAuthenticated}
              paidPlan={paidPlan}
              trialPlanUsed={trialPlanUsed}
              redirect={"/register"}
            >
              <ApiKeys />
            </ProtectedRoutes>
          ),
        },
        // <Route path="api-keys" element={<ApiKeys />} />

      ],
    },
  ];

  const element = useRoutes(routes);
  return element;
};

export default Routing;
