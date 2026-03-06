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

import LegalIndex from "./pages/legaleIndex";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsAndConditions from "./pages/legal/TermsAndConditions";
import RefundPolicy from "./pages/legal/RefundPolicy";
import Disclaimer from "./pages/legal/Disclaimer";
import AdminPanel from "./pages/AdminPanel";

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
        path: "/admin",
        element: <AdminPanel />,
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