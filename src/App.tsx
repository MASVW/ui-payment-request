// src/App.tsx
import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Navigation } from "./components/Navigation";
import { Header }   from "./components/Header";
import TitleNavigation from "./components/TitleNavigation";
import { CustomButton } from "./components/CustomButton";

const Home = lazy(() => import("./pages/Home"));
const Create = lazy(() => import  ("./pages/Create"));
const Approval = lazy(() => import("./pages/Approval"));

export default function App() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <div className="flex h-screen w-screen">
        <Navigation />
        <div className="flex flex-col flex-1">
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

              <Route path="/" element={<Navigate to="/home" replace />} />

              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Suspense>
  );
}
