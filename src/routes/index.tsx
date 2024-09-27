import React, { Suspense, lazy, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ProgressBar from "../components/ProgressBar"; // Component ProgressBar

const Home = lazy(() => import("../pages/Home"));
const Dashboard = lazy(() => import("../pages/Dashboard"));

const AppRoutes: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // Tăng dần progress lên 100%
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setLoading(false); // Chỉ tắt loading khi progress đạt 100%
          return 100;
        }
        return prevProgress + 5; // Mỗi lần tăng 5%
      });
    }, 150); // Tăng sau 150ms

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Hiển thị ProgressBar nếu loading vẫn là true, chỉ mount các component sau khi loading = false
  if (loading) {
    return <ProgressBar progress={progress} />;
  }

  return (
    <Suspense fallback={<ProgressBar progress={progress} />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
