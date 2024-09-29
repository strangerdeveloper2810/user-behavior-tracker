import React, { Suspense, lazy, useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProgressBar from "../components/ProgressBar"; // Component ProgressBar

const Home = lazy(() => import("../pages/Home"));
const Dashboard = lazy(() => import("../pages/Dashboard"));

const AppRoutes: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();

  // Reset progress và loading khi chuyển trang
  useEffect(() => {
    setProgress(0); // Reset progress mỗi khi điều hướng
    setLoading(true); // Bật lại loading khi chuyển trang

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
  }, [location.pathname]); // Lắng nghe sự thay đổi của URL

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
      <ToastContainer />
    </Suspense>
  );
};

export default AppRoutes;
