// src/App.tsx
import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { Navigation } from "./components/Navigation";
import { Header }   from "./components/Header";
import TitleNavigation from "./components/TitleNavigation";
import { CustomButton } from "./components/CustomButton";
import PrintPreview from "./pages/PrintPreview";

const Home = lazy(() => import("./pages/Home"));
const Create = lazy(() => import  ("./pages/Create"));
const Approval = lazy(() => import("./pages/Approval"));
const List = lazy(() => import("./pages/List"));

function usePageTitle(titles: any) {
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;
    document.title = titles[path] || "Default Title";
  }, [location, titles]);
}

export default function App() {
  const titles = {
    "/home": "Payment Request",
    "/approval": "Approval Payment Request",
    "/create-payment-request": "Create Payment Request",
    "/list-payment-request": "List Payment Request",
    "/print-preview": "Print Preview",
  };
  usePageTitle(titles);

  return (
    <Suspense fallback={<div>Loading…</div>}>
      <div className="flex h-screen w-screen">
        <Navigation />
        <div className="w-full">
          <Header />
            <TitleNavigation />
            <div id="headerCreateContent" className="sticky top-0 z-10 w-full flex justify-end gap-x-5 py-2 bg-white px-5">
              <CustomButton name="Print" size="md"></CustomButton> 
              <CustomButton name="Reapprove" size="md"></CustomButton> 
            </div>
            <main className="flex-1 px-5 overflow-auto">
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/approval" element={<Approval />} />
                <Route path="/create-payment-request" element={<Create />} />

                <Route path="/list-payment-request" element={<List />} />
                <Route path="/print-preview" element={<PrintPreview />} />

                <Route path="*" element={<Navigate to="/home" replace />} />
              </Routes>
            </main>
        </div>
      </div>
    </Suspense>
  );
}
