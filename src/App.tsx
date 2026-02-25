import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import First from "./First";

import Index from "./pages/Index";
import MemberForm from "./pages/MemberForm";
import AllObjectives from "./pages/AllObjectives";
import Donations from "./pages/Donations";
import NotFound from "./pages/NotFound";
import Discount from "./pages/Discount";

// ✅ Legal imports 
import LegalIndex from "./pages/legaleIndex";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsAndConditions from "./pages/legal/TermsAndConditions";
import RefundPolicy from "./pages/legal/RefundPolicy";
import Disclaimer from "./pages/legal/Disclaimer";

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
        path: "member-form",
        element: <MemberForm />,
      },

      {
        path: "objectives",
        element: <AllObjectives />,
      },

      {
        path: "donations",
        element: <Donations />,
      },

      {
        path: "discount",
        element: <Discount />,
      },

      // ✅ Legal Index Page
      {
        path: "legal",
        element: <LegalIndex />,
      },

      // ✅ Privacy Policy
      {
        path: "legal/privacy-policy",
        element: <PrivacyPolicy />,
      },

      // ✅ Terms
      {
        path: "legal/terms-and-conditions",
        element: <TermsAndConditions />,
      },

      // ✅ Refund
      {
        path: "legal/refund-policy",
        element: <RefundPolicy />,
      },

      // ✅ Disclaimer
      {
        path: "legal/disclaimer",
        element: <Disclaimer />,
      },

    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },

]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;