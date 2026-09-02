import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// provider
import AppProvider from "./providers/AppProvider";

// routes
import { Route, Routes } from "react-router-dom";

// pages
import App from "./App.jsx";
import Home from "./pages/home/Home";
import Login from "./pages/validations/Login.jsx";
import Pricing from "./pages/pricing/Pricing.jsx";
import FAQs from "./pages/faqs/FAQs.jsx";
import Builder from "./app/builder/Builder.jsx";
import Content from "./app/builder/Content.jsx";
import QRDesign from "./app/builder/QRDesign.jsx";
import MyQRCode from "./app/qrcode/MyQRCode.jsx";
import Payments from "./pages/payments/Payments.jsx";
import Stats from "./pages/stats/Stats.jsx";
import Templates from "./pages/templates/Templates.jsx";
import Bulk from "./app/bulk/Bulk.jsx";
import QRDetails from "./app/qrcode/QRDetails.jsx";
import QRBulkDesign from "./app/bulk/QRBulkDesign.jsx";
import UploadBulkExcel from "./app/bulk/UploadBulkExcel.jsx";
import Profile from "./pages/profile/Profile.jsx";
import AllUsers from "./pages/users/AllUsers.jsx";
import CreateTemplate from "./pages/templates/CreateTemplate.jsx";
import Routing from "./routes/Routing.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}

    <AppProvider>
      {/* <Routes>
        <Route path="/" element={<App />} index />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path='/faq' element={<FAQs />} />
        <Route path='/app'>
          <Route path='builder'>
            <Route path="" element={<Builder />} index />
            <Route path='content' element={<Content />} />
            <Route path='qr-design' element={<QRDesign />} />
          </Route>
          <Route path='my-qr-codes' element={<MyQRCode />} />
          <Route path='plans-and-payments' element={<Payments />} />
          <Route path="stats" element={<Stats />} />
          <Route path="templates">
            <Route path="" element={<Templates />} />
            <Route path="create" element={<CreateTemplate />} />
          </Route>
          <Route path='bulk-qr-code-generator'>
            <Route path="" element={<Bulk />} index />
            <Route path='qr-design' element={<QRBulkDesign />} />
            <Route path='upload' element={<UploadBulkExcel />} />
          </Route>
          <Route path="my-qr-codes/details" element={<QRDetails />} />
          <Route path='profile' element={<Profile />} />
          <Route path='users' element={<AllUsers />} />
        </Route>
      </Routes> */}
      <Routing />
    </AppProvider>
  </StrictMode>,
);
