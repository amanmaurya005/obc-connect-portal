import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./pages/AdminLogin";

import First from "./First";

import Index from "./pages/Index";
import MemberForm from "./pages/MemberForm";
import AllObjectives from "./pages/AllObjectives";
import Donations from "./pages/Donations";
import NotFound from "./pages/NotFound";
import Discount from "./pages/Discount";
import DetailedGallery from "./pages/DetailedGallery";
import Team from "./pages/Team";

import LegalIndex from "./pages/legaleIndex";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsAndConditions from "./pages/legal/TermsAndConditions";
import RefundPolicy from "./pages/legal/RefundPolicy";
import Disclaimer from "./pages/legal/Disclaimer";
import AdminPanel from "./pages/AdminPanel";
import AdminLayout from "./layouts/AdminLayout";
import DonationAdmin from "./pages/DonationAdmin";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <First />,
//     children: [
//       {
//         index: true,
//         element: <Index />,
//       },

//       {
//         path: "/member-form",
//         element: <MemberForm />,
//       },

//       {
//         path: "/objectives",
//         element: <AllObjectives />,
//       },

//       {
//         path: "/donations",
//         element: <Donations />,
//       },

//       {
//         path: "/discount",
//         element: <Discount />,
//       },

//       {
//         path: "/legal",
//         element: <LegalIndex />,
//       },

//       {
//         path: "/legal/privacy-policy",
//         element: <PrivacyPolicy />,
//       },

//       {
//         path: "/legal/terms-and-conditions",
//         element: <TermsAndConditions />,
//       },

//       {
//         path: "/legal/refund-policy",
//         element: <RefundPolicy />,
//       },
//       {
//         path: "/legal/disclaimer",
//         element: <Disclaimer />,
//       },
//       {
//         path: "/gallery",
//         element: <DetailedGallery />,
//       },

//       {
//         path: "/admin",
//         element: <AdminPanel />,
//       },
//     ],
//   },

//   {
//     path: "*",
//     element: <NotFound />,
//   },
// ]);

const router = createBrowserRouter([
  {
    path: "/",
    element: <First />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "/member-form",
        element: <MemberForm />,
      },
      {
        path: "/objectives",
        element: <AllObjectives />,
      },
      {
        path: "/donations",
        element: <Donations />,
      },
      {
        path: "/discount",
        element: <Discount />,
      },
      {
        path: "/legal",
        element: <LegalIndex />,
      },
      {
        path: "/legal/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/legal/terms-and-conditions",
        element: <TermsAndConditions />,
      },
      {
        path: "/legal/refund-policy",
        element: <RefundPolicy />,
      },
      {
        path: "/legal/disclaimer",
        element: <Disclaimer />,
      },
      {
        path: "/gallery",
        element: <DetailedGallery />,
      },
      {
        path: "/team",
        element: <Team />,
      },
    ],
  },

  // ✅ ADMIN ROUTES (HEADER NAHI AAYEGA)
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },

  // Protected Admin Routes
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminPanel /> },
      { path: "members", element: <AdminPanel /> },
      { path: "donations", element: <DonationAdmin /> },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
