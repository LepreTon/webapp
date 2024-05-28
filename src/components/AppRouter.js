import React, { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import Loader from "./Loader";
const HomePage = lazy(async () => await import("../pages/HomePage"));
const Statistic = lazy(async () => await import("../pages/Statistic"))
const Referrals = lazy(async () => await import("../pages/Referrals"));

const AppRouter = () => {
  const [showMainContent, setShowMainContent] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowMainContent(true);
    }, 1000);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Suspense fallback={<Loader />}>{showMainContent ? <Layout /> : <Loader />}</Suspense>}>
        <Route index element={<HomePage />} />
        <Route path="referral" element={<Referrals />} />
        <Route path="statistic" element={<Statistic />} />
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Route>
    </Routes>
  );
};

export default AppRouter;
