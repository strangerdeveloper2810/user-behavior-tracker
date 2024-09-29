import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserActivityChart from "../../components/UserActivityChart";
import UserActivityTracker from "../../components/UserActivityTracker";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    toast.info("Redirecting to Home page...");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-4">
        <button
          onClick={handleGoHome}
          className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 mr-4"
        >
          Back to Home
        </button>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          User Behavior Dashboard
        </h2>
      </div>
      <UserActivityTracker />
      <UserActivityChart />
    </div>
  );
};

export default Dashboard;
